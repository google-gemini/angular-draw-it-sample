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

import { Injectable } from '@angular/core';

import { GenerativeModel, GoogleGenerativeAI } from '@google/generative-ai';

@Injectable({
  providedIn: 'root',
})
export class GenerativeService {
  getModel(apiKey: string): GenerativeModel {

    /**
     * For production apps, make sure you use the Gemini API key **only**
     * on the server. Find more at https://ai.google.dev/gemini-api/docs/get-started/web
     */
    const api = new GoogleGenerativeAI(apiKey);
    return api.getGenerativeModel({ model: 'gemini-pro-vision' });
  }
}
