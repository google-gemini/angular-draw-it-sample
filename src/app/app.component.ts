/**
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { Component, afterNextRender, inject, viewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { CanvasComponent } from './canvas.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { FormsModule } from '@angular/forms';
import { SpeechService } from './speech.service';
import { marked } from 'marked';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

import { GenerativeModel } from '@google/generative-ai';
import { GenerativeService } from './generative.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    CanvasComponent,
    MatButtonModule,
    FormsModule,
    MatIconModule,
  ],
  templateUrl: 'app.component.html',
  styleUrl: 'app.component.css',
})
export class AppComponent {
  private canvas = viewChild(CanvasComponent);
  private speech = inject(SpeechService);
  private sanitizer = inject(DomSanitizer);
  private model: GenerativeModel | null = null;
  private generativeService: GenerativeService = inject(GenerativeService);

  protected disabled = false;
  protected speechActive = false;
  protected output: SafeHtml = '';
  protected prompt = '';
  protected languages = this.speech.languages;
  protected currentLanguage = 'en-US';
  protected apiKey = '';
  protected error: any = null;

  async speechInput() {
    this.prompt = '';
    this.speechActive = true;

    const prompt = await this.speech.listen(this.currentLanguage);
    this.prompt = prompt;

    this.speechActive = false;

    this.recognize();
  }

  async recognize() {
    if (!this.canvas()) return;
    if (!this.prompt) return;

    this.error = null;

    console.info('Querying the model with prompt', this.prompt);
    const data = this.canvas()!.getBase64Drawing();
    if (!data) return;

    this.disabled = true;

    this.model = this.generativeService.getModel(this.apiKey);

    try {
      const result = await this.model.generateContent([
        this.prompt,
        {
          inlineData: {
            data,
            mimeType: 'image/png',
          },
        },
      ]);

      const response = await result.response;
      const text = response.text();

      this.output = this.sanitizer.bypassSecurityTrustHtml(
        await marked.parse(text)
      );

      console.info('Received output from the model', text);
      await this.say(text);
    } catch (e) {
      this.error = e;
    } finally {
      this.disabled = false;
    }
  }

  async say(text: string) {
    return this.speech.say(text, this.currentLanguage);
  }
}
