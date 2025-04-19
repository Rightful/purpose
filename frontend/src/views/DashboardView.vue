<template>
  <div class="min-h-screen bg-gradient-to-br from-[#6941c6]/10 to-[#6941c6]/5">
    <main class="max-w-4xl mx-auto py-6 sm:px-6 lg:px-8">
      <!-- Account Completion Progress -->
      <div class="bg-white rounded-lg shadow-sm p-6 mb-8">
        <h2 class="text-2xl font-bold text-[#6941c6] mb-4">Account Completion Progress</h2>
        <div class="w-full bg-gray-200 rounded-full h-2.5 mb-4">
          <div class="bg-[#6941c6] h-2.5 rounded-full" :style="{ width: `${completionPercentage}%` }"></div>
        </div>
        <p class="text-gray-600">
          Complete your profile to increase your chances of finding the perfect match! 
          <span class="font-semibold">{{ completionPercentage }}%</span> complete
        </p>
      </div>

      <!-- Step Indicator -->
      <div class="mb-8">
        <div class="flex items-center justify-between">
          <div v-for="(step, index) in steps" :key="index" class="flex items-center">
            <div
              :class="[
                'w-8 h-8 rounded-full flex items-center justify-center',
                currentStep >= index ? 'bg-[#6941c6] text-white' : 'border border-[#6941c6] text-[#6941c6] bg-white'
              ]"
            >
              {{ index + 1 }}
            </div>
            <div
              v-if="index < steps.length - 1"
              :class="[
                'h-1 w-32',
                currentStep > index ? 'bg-[#6941c6]' : 'bg-gray-200'
              ]"
            ></div>
          </div>
        </div>
        <div class="flex justify-between mt-2">
          <div v-for="(step, index) in steps" :key="index" class="text-sm font-medium" :class="currentStep >= index ? 'text-[#6941c6]' : 'text-gray-500'">
            {{ step }}
          </div>
        </div>
      </div>

      <!-- Step 1: AI Chat -->
      <div v-if="currentStep === 0" class="bg-white rounded-lg shadow-sm p-6">
        <h2 class="text-2xl font-bold text-[#6941c6] mb-4">Let's Get to Know You</h2>
        <p class="text-gray-600 mb-6">
          We'll ask you some questions to understand your values and what matters to you in a business. 
          This helps us find the best matches for you.
        </p>
        
        <div class="chat-container h-[400px] overflow-y-auto mb-4 p-4 bg-[#F9F5FF] rounded-lg">
          <div v-for="(message, index) in chatMessages" :key="index" class="mb-4">
            <div :class="['p-3 rounded-lg max-w-[80%]', message.role === 'user' ? 'bg-[#6941c6] text-white ml-auto' : 'bg-white text-[#6941c6]']" style="white-space: pre-wrap;">
              {{ message.content }}
            </div>
          </div>
        </div>

        <div v-if="!isConversationComplete" class="flex flex-col gap-4">
          <div class="flex gap-2 w-full">
            <input
              v-model="userMessage"
              type="text"
              placeholder="Type your message..."
              class="flex-1 p-3 border-2 border-[#6941c6]/20 rounded-lg focus:ring-2 focus:ring-[#6941c6] focus:border-[#6941c6] text-[#6941c6] placeholder-gray-400 bg-white w-full outline-none"
              :disabled="isLoading"
              @keyup.enter="sendMessage"
            />
            <button
              @click="sendMessage"
              class="px-4 py-2 bg-[#6941c6] text-white rounded-lg hover:bg-[#6941c6]/90 disabled:opacity-50 h-[46px]"
              :disabled="isLoading || !userMessage.trim()"
            >
              Send
            </button>
            <input
              type="file"
              id="cv-upload"
              ref="cvUpload"
              class="hidden"
              accept=".pdf,.doc,.docx"
              @change="handleCVUpload"
            />
            <button
              @click="() => cvUpload?.click()"
              class="px-4 py-2 border-2 border-[#6941c6] text-[#6941c6] rounded-lg hover:bg-[#6941c6]/10 h-[46px]"
              :disabled="isLoading"
            >
              Upload CV
            </button>
          </div>
        </div>

        <!-- Preferences Review Section -->
        <div v-if="isConversationComplete" class="mt-8">
          <h3 class="text-xl font-semibold text-[#6941c6] mb-4">Based on our conversation, here are your preferences:</h3>
          
          <!-- Core Business Values -->
          <div class="mb-6">
            <h4 class="text-lg font-medium text-[#6941c6] mb-3">Core Business Values</h4>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 bg-[#F9F5FF] p-4 rounded-lg">
              <template v-for="(pref, key) in coreBusinessValues" :key="key">
                <div v-if="selectedPreferences[key as keyof Preferences]" class="flex items-center gap-2">
                  <input
                    type="checkbox"
                    :id="key"
                    v-model="selectedPreferences[key as keyof Preferences]"
                    class="h-4 w-4 text-[#6941c6] focus:ring-[#6941c6] border-gray-300 rounded"
                  />
                  <label :for="key" class="text-gray-700">{{ pref }}</label>
                </div>
              </template>
            </div>
          </div>

          <!-- Workplace Culture -->
          <div class="mb-6">
            <h4 class="text-lg font-medium text-[#6941c6] mb-3">Workplace Culture</h4>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 bg-[#F9F5FF] p-4 rounded-lg">
              <template v-for="(pref, key) in workplaceCulture" :key="key">
                <div v-if="selectedPreferences[key as keyof Preferences]" class="flex items-center gap-2">
                  <input
                    type="checkbox"
                    :id="key"
                    v-model="selectedPreferences[key as keyof Preferences]"
                    class="h-4 w-4 text-[#6941c6] focus:ring-[#6941c6] border-gray-300 rounded"
                  />
                  <label :for="key" class="text-gray-700">{{ pref }}</label>
                </div>
              </template>
            </div>
          </div>

          <!-- Work Style -->
          <div class="mb-6">
            <h4 class="text-lg font-medium text-[#6941c6] mb-3">Work Style</h4>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 bg-[#F9F5FF] p-4 rounded-lg">
              <template v-for="(pref, key) in workStyle" :key="key">
                <div v-if="selectedPreferences[key as keyof Preferences]" class="flex items-center gap-2">
                  <input
                    type="checkbox"
                    :id="key"
                    v-model="selectedPreferences[key as keyof Preferences]"
                    class="h-4 w-4 text-[#6941c6] focus:ring-[#6941c6] border-gray-300 rounded"
                  />
                  <label :for="key" class="text-gray-700">{{ pref }}</label>
                </div>
              </template>
            </div>
          </div>

          <!-- Schedule Preferences -->
          <div class="mb-6">
            <h4 class="text-lg font-medium text-[#6941c6] mb-3">Schedule Preferences</h4>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 bg-[#F9F5FF] p-4 rounded-lg">
              <template v-for="(pref, key) in schedulePreferences" :key="key">
                <div v-if="selectedPreferences[key as keyof Preferences]" class="flex items-center gap-2">
                  <input
                    type="checkbox"
                    :id="key"
                    v-model="selectedPreferences[key as keyof Preferences]"
                    class="h-4 w-4 text-[#6941c6] focus:ring-[#6941c6] border-gray-300 rounded"
                  />
                  <label :for="key" class="text-gray-700">{{ pref }}</label>
                </div>
              </template>
            </div>
          </div>

          <!-- Workplace Accommodations -->
          <div class="mb-6">
            <h4 class="text-lg font-medium text-[#6941c6] mb-3">Workplace Accommodations</h4>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 bg-[#F9F5FF] p-4 rounded-lg">
              <template v-for="(pref, key) in workplaceAccommodations" :key="key">
                <div v-if="selectedPreferences[key as keyof Preferences]" class="flex items-center gap-2">
                  <input
                    type="checkbox"
                    :id="key"
                    v-model="selectedPreferences[key as keyof Preferences]"
                    class="h-4 w-4 text-[#6941c6] focus:ring-[#6941c6] border-gray-300 rounded"
                  />
                  <label :for="key" class="text-gray-700">{{ pref }}</label>
                </div>
              </template>
            </div>
          </div>

          <!-- Company Values -->
          <div class="mb-6">
            <h4 class="text-lg font-medium text-[#6941c6] mb-3">Company Values</h4>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 bg-[#F9F5FF] p-4 rounded-lg">
              <template v-for="(pref, key) in companyValues" :key="key">
                <div v-if="selectedPreferences[key as keyof Preferences]" class="flex items-center gap-2">
                  <input
                    type="checkbox"
                    :id="key"
                    v-model="selectedPreferences[key as keyof Preferences]"
                    class="h-4 w-4 text-[#6941c6] focus:ring-[#6941c6] border-gray-300 rounded"
                  />
                  <label :for="key" class="text-gray-700">{{ pref }}</label>
                </div>
              </template>
            </div>
          </div>

          <div class="mt-6 flex justify-between">
            <button
              @click="showAllPreferences = true"
              class="px-4 py-2 border border-[#6941c6] text-[#6941c6] rounded-lg hover:bg-[#6941c6]/10"
            >
              I'm missing something
            </button>
            <button
              @click="savePreferences"
              class="px-4 py-2 bg-[#6941c6] text-white rounded-lg hover:bg-[#6941c6]/90"
            >
              Yes, I agree
            </button>
          </div>
        </div>

        <!-- All Preferences Modal -->
        <div v-if="showAllPreferences" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div class="bg-white rounded-lg p-6 max-w-4xl w-full max-h-[80vh] overflow-y-auto">
            <div class="flex justify-between items-center mb-4">
              <h3 class="text-xl font-semibold text-[#6941c6]">All Available Preferences</h3>
              <button @click="showAllPreferences = false" class="text-gray-500 hover:text-gray-700">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <!-- Core Business Values -->
            <div class="mb-6">
              <h4 class="text-lg font-medium text-[#6941c6] mb-3">Core Business Values</h4>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4 bg-[#F9F5FF] p-4 rounded-lg">
                <template v-for="(pref, key) in coreBusinessValues" :key="key">
                  <div class="flex items-center gap-2">
                    <input
                      type="checkbox"
                      :id="'all-' + key"
                      v-model="selectedPreferences[key as keyof Preferences]"
                      class="h-4 w-4 text-[#6941c6] focus:ring-[#6941c6] border-gray-300 rounded"
                    />
                    <label :for="'all-' + key" class="text-gray-700">{{ pref }}</label>
                  </div>
                </template>
              </div>
            </div>

            <!-- Workplace Culture -->
            <div class="mb-6">
              <h4 class="text-lg font-medium text-[#6941c6] mb-3">Workplace Culture</h4>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4 bg-[#F9F5FF] p-4 rounded-lg">
                <template v-for="(pref, key) in workplaceCulture" :key="key">
                  <div class="flex items-center gap-2">
                    <input
                      type="checkbox"
                      :id="'all-' + key"
                      v-model="selectedPreferences[key as keyof Preferences]"
                      class="h-4 w-4 text-[#6941c6] focus:ring-[#6941c6] border-gray-300 rounded"
                    />
                    <label :for="'all-' + key" class="text-gray-700">{{ pref }}</label>
                  </div>
                </template>
              </div>
            </div>

            <!-- Work Style -->
            <div class="mb-6">
              <h4 class="text-lg font-medium text-[#6941c6] mb-3">Work Style</h4>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4 bg-[#F9F5FF] p-4 rounded-lg">
                <template v-for="(pref, key) in workStyle" :key="key">
                  <div class="flex items-center gap-2">
                    <input
                      type="checkbox"
                      :id="'all-' + key"
                      v-model="selectedPreferences[key as keyof Preferences]"
                      class="h-4 w-4 text-[#6941c6] focus:ring-[#6941c6] border-gray-300 rounded"
                    />
                    <label :for="'all-' + key" class="text-gray-700">{{ pref }}</label>
                  </div>
                </template>
              </div>
            </div>

            <!-- Schedule Preferences -->
            <div class="mb-6">
              <h4 class="text-lg font-medium text-[#6941c6] mb-3">Schedule Preferences</h4>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4 bg-[#F9F5FF] p-4 rounded-lg">
                <template v-for="(pref, key) in schedulePreferences" :key="key">
                  <div class="flex items-center gap-2">
                    <input
                      type="checkbox"
                      :id="'all-' + key"
                      v-model="selectedPreferences[key as keyof Preferences]"
                      class="h-4 w-4 text-[#6941c6] focus:ring-[#6941c6] border-gray-300 rounded"
                    />
                    <label :for="'all-' + key" class="text-gray-700">{{ pref }}</label>
                  </div>
                </template>
              </div>
            </div>

            <!-- Workplace Accommodations -->
            <div class="mb-6">
              <h4 class="text-lg font-medium text-[#6941c6] mb-3">Workplace Accommodations</h4>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4 bg-[#F9F5FF] p-4 rounded-lg">
                <template v-for="(pref, key) in workplaceAccommodations" :key="key">
                  <div class="flex items-center gap-2">
                    <input
                      type="checkbox"
                      :id="'all-' + key"
                      v-model="selectedPreferences[key as keyof Preferences]"
                      class="h-4 w-4 text-[#6941c6] focus:ring-[#6941c6] border-gray-300 rounded"
                    />
                    <label :for="'all-' + key" class="text-gray-700">{{ pref }}</label>
                  </div>
                </template>
              </div>
            </div>

            <!-- Company Values -->
            <div class="mb-6">
              <h4 class="text-lg font-medium text-[#6941c6] mb-3">Company Values</h4>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4 bg-[#F9F5FF] p-4 rounded-lg">
                <template v-for="(pref, key) in companyValues" :key="key">
                  <div class="flex items-center gap-2">
                    <input
                      type="checkbox"
                      :id="'all-' + key"
                      v-model="selectedPreferences[key as keyof Preferences]"
                      class="h-4 w-4 text-[#6941c6] focus:ring-[#6941c6] border-gray-300 rounded"
                    />
                    <label :for="'all-' + key" class="text-gray-700">{{ pref }}</label>
                  </div>
                </template>
              </div>
            </div>

            <div class="mt-6 flex justify-end">
              <button
                @click="showAllPreferences = false"
                class="px-4 py-2 bg-[#6941c6] text-white rounded-lg hover:bg-[#6941c6]/90"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Step 2: Review Preferences -->
      <div v-if="currentStep === 1" class="bg-white rounded-lg shadow-sm p-6">
        <h2 class="text-2xl font-bold text-[#6941c6] mb-4">Review Your Preferences</h2>
        <p class="text-gray-600 mb-6">
          Based on our conversation, we've identified these preferences that reflect your values. 
          Please review and adjust them as needed.
        </p>

        <!-- Core Business Values -->
        <div class="mb-6">
          <h4 class="text-lg font-medium text-[#6941c6] mb-3">Core Business Values</h4>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 bg-[#F9F5FF] p-4 rounded-lg">
            <template v-for="(pref, key) in coreBusinessValues" :key="key">
              <div class="flex items-center gap-2">
                <input
                  type="checkbox"
                  :id="key"
                  v-model="selectedPreferences[key as keyof Preferences]"
                  class="h-4 w-4 text-[#6941c6] focus:ring-[#6941c6] border-gray-300 rounded"
                />
                <label :for="key" class="text-gray-700">{{ pref }}</label>
              </div>
            </template>
          </div>
        </div>

        <!-- Workplace Culture -->
        <div class="mb-6">
          <h4 class="text-lg font-medium text-[#6941c6] mb-3">Workplace Culture</h4>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 bg-[#F9F5FF] p-4 rounded-lg">
            <template v-for="(pref, key) in workplaceCulture" :key="key">
              <div class="flex items-center gap-2">
                <input
                  type="checkbox"
                  :id="key"
                  v-model="selectedPreferences[key as keyof Preferences]"
                  class="h-4 w-4 text-[#6941c6] focus:ring-[#6941c6] border-gray-300 rounded"
                />
                <label :for="key" class="text-gray-700">{{ pref }}</label>
              </div>
            </template>
          </div>
        </div>

        <!-- Work Style -->
        <div class="mb-6">
          <h4 class="text-lg font-medium text-[#6941c6] mb-3">Work Style</h4>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 bg-[#F9F5FF] p-4 rounded-lg">
            <template v-for="(pref, key) in workStyle" :key="key">
              <div class="flex items-center gap-2">
                <input
                  type="checkbox"
                  :id="key"
                  v-model="selectedPreferences[key as keyof Preferences]"
                  class="h-4 w-4 text-[#6941c6] focus:ring-[#6941c6] border-gray-300 rounded"
                />
                <label :for="key" class="text-gray-700">{{ pref }}</label>
              </div>
            </template>
          </div>
        </div>

        <!-- Schedule Preferences -->
        <div class="mb-6">
          <h4 class="text-lg font-medium text-[#6941c6] mb-3">Schedule Preferences</h4>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 bg-[#F9F5FF] p-4 rounded-lg">
            <template v-for="(pref, key) in schedulePreferences" :key="key">
              <div class="flex items-center gap-2">
                <input
                  type="checkbox"
                  :id="key"
                  v-model="selectedPreferences[key as keyof Preferences]"
                  class="h-4 w-4 text-[#6941c6] focus:ring-[#6941c6] border-gray-300 rounded"
                />
                <label :for="key" class="text-gray-700">{{ pref }}</label>
              </div>
            </template>
          </div>
        </div>

        <!-- Workplace Accommodations -->
        <div class="mb-6">
          <h4 class="text-lg font-medium text-[#6941c6] mb-3">Workplace Accommodations</h4>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 bg-[#F9F5FF] p-4 rounded-lg">
            <template v-for="(pref, key) in workplaceAccommodations" :key="key">
              <div class="flex items-center gap-2">
                <input
                  type="checkbox"
                  :id="key"
                  v-model="selectedPreferences[key as keyof Preferences]"
                  class="h-4 w-4 text-[#6941c6] focus:ring-[#6941c6] border-gray-300 rounded"
                />
                <label :for="key" class="text-gray-700">{{ pref }}</label>
              </div>
            </template>
          </div>
        </div>

        <!-- Company Values -->
        <div class="mb-6">
          <h4 class="text-lg font-medium text-[#6941c6] mb-3">Company Values</h4>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 bg-[#F9F5FF] p-4 rounded-lg">
            <template v-for="(pref, key) in companyValues" :key="key">
              <div class="flex items-center gap-2">
                <input
                  type="checkbox"
                  :id="key"
                  v-model="selectedPreferences[key as keyof Preferences]"
                  class="h-4 w-4 text-[#6941c6] focus:ring-[#6941c6] border-gray-300 rounded"
                />
                <label :for="key" class="text-gray-700">{{ pref }}</label>
              </div>
            </template>
          </div>
        </div>

        <div class="mt-6 flex justify-end">
          <button
            @click="savePreferences"
            class="px-4 py-2 bg-[#6941c6] text-white rounded-lg hover:bg-[#6941c6]/90"
          >
            Complete Profile
          </button>
        </div>
      </div>

      <!-- Step 3: Job Selection -->
      <div v-if="currentStep === 2" class="bg-white rounded-lg shadow-sm p-6">
        <h2 class="text-2xl font-bold text-[#6941c6] mb-4">Recommended Jobs</h2>
        <p class="text-gray-600 mb-6">
          Based on your preferences and values, we've selected these jobs that might interest you. 
          Save the ones you'd like to explore further.
        </p>

        <div v-if="recommendedJobs.length === 0" class="text-center py-8">
          <p class="text-gray-600">Loading recommended jobs...</p>
        </div>

        <div v-else class="space-y-4">
          <div v-for="job in recommendedJobs" :key="job.id" class="border rounded-lg p-4">
            <div class="flex justify-between items-start">
              <div>
                <h3 class="text-lg font-semibold text-[#6941c6]">{{ job.title }}</h3>
                <p class="text-gray-600">{{ job.company }}</p>
                <p class="text-gray-500 text-sm mt-2">{{ job.description }}</p>
              </div>
              <button
                @click="toggleJobSave(job.id)"
                class="p-2 rounded-full hover:bg-gray-100"
                :class="{ 'text-[#6941c6]': savedJobs.includes(job.id) }"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div class="mt-6 flex justify-between">
          <button
            @click="currentStep = 1"
            class="px-4 py-2 border border-[#6941c6] text-[#6941c6] rounded-lg hover:bg-[#6941c6]/10"
          >
            Back to Preferences
          </button>
          <button
            @click="savePreferences"
            class="px-4 py-2 bg-[#6941c6] text-white rounded-lg hover:bg-[#6941c6]/90"
          >
            Complete Profile
          </button>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, reactive } from 'vue'
import { useAuthStore } from '@/stores/auth'
import OpenAI from 'openai'
import * as pdfjsLib from 'pdfjs-dist'
import mammoth from 'mammoth'
import { fileTypeFromBlob } from 'file-type'
import axios from 'axios'

const authStore = useAuthStore()
const user = authStore.user

// Initialize OpenAI
const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
})

// Initialize PDF.js worker
pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.worker.min.js'

const steps = ['Get to know you', 'Your preferences', 'Jobs for you']
const currentStep = ref(0)
const isLoading = ref(false)
const userMessage = ref('')
const chatMessages = ref<Array<{ role: 'user' | 'assistant', content: string }>>([
  {
    role: 'assistant',
    content: "Hi there! I'm PURPOSE AI and I'm here to help you find the best job match!\n\nFirstly I would like to get to know you.\n\nDo you want to upload your resume so I can quickly read it? If not, that's okay too - we can proceed with getting to know you through our conversation."
  }
])
const savedJobs = ref<string[]>([])

const recommendedJobs = ref<Array<{
  id: string
  title: string
  company: string
  description: string
}>>([])

interface Preferences {
  // Core Business Values
  ethicalBusiness: boolean
  halalProducts: boolean
  noAlcohol: boolean
  noGambling: boolean
  noPork: boolean
  noInterest: boolean
  noTobacco: boolean
  noAdultContent: boolean
  noWeapons: boolean
  noAnimalTesting: boolean
  fairTrade: boolean
  sustainable: boolean
  communityFocused: boolean
  familyFriendly: boolean
  kosherProducts: boolean
  vegetarianProducts: boolean
  veganProducts: boolean
  religiousAccommodations: boolean
  // Workplace Culture
  respectfulEnvironment: boolean
  transparency: boolean
  diversityInclusion: boolean
  mentorship: boolean
  careerGrowth: boolean
  continuousLearning: boolean
  openCommunication: boolean
  feedbackCulture: boolean
  innovativeCulture: boolean
  workLifeBalance: boolean
  // Work Style
  teamwork: boolean
  individualWork: boolean
  hybridStyle: boolean
  structuredWork: boolean
  creativeWork: boolean
  clientFacing: boolean
  internalRole: boolean
  leadershipRole: boolean
  collaborativeProjects: boolean
  crossFunctional: boolean
  // Schedule Preferences
  flexibleHours: boolean
  fixedSchedule: boolean
  remoteWork: boolean
  hybridWork: boolean
  officeWork: boolean
  fridayOff: boolean
  fourDayWeek: boolean
  standardHours: boolean
  flexibleBreaks: boolean
  timeZoneFlexible: boolean
  // Workplace Accommodations
  prayerRoom: boolean
  restArea: boolean
  quietSpace: boolean
  dressCode: boolean
  dietaryOptions: boolean
  ergonomicSetup: boolean
  wellnessPrograms: boolean
  parentingFacilities: boolean
  accessibilityNeeds: boolean
  personalSpace: boolean
  // Company Values
  environmentalFocus: boolean
  socialImpact: boolean
  techInnovation: boolean
  customerCentric: boolean
  employeeCentric: boolean
  globalMindset: boolean
  localImpact: boolean
  startupMindset: boolean
  corporateStability: boolean
  nonProfit: boolean
}

type PreferenceKey = keyof Preferences

const selectedPreferences = ref<Preferences>({
  // Core Business Values
  ethicalBusiness: false,
  halalProducts: false,
  noAlcohol: false,
  noGambling: false,
  noPork: false,
  noInterest: false,
  noTobacco: false,
  noAdultContent: false,
  noWeapons: false,
  noAnimalTesting: false,
  fairTrade: false,
  sustainable: false,
  communityFocused: false,
  familyFriendly: false,
  kosherProducts: false,
  vegetarianProducts: false,
  veganProducts: false,
  religiousAccommodations: false,
  // Workplace Culture
  respectfulEnvironment: false,
  transparency: false,
  diversityInclusion: false,
  mentorship: false,
  careerGrowth: false,
  continuousLearning: false,
  openCommunication: false,
  feedbackCulture: false,
  innovativeCulture: false,
  workLifeBalance: false,
  // Work Style
  teamwork: false,
  individualWork: false,
  hybridStyle: false,
  structuredWork: false,
  creativeWork: false,
  clientFacing: false,
  internalRole: false,
  leadershipRole: false,
  collaborativeProjects: false,
  crossFunctional: false,
  // Schedule Preferences
  flexibleHours: false,
  fixedSchedule: false,
  remoteWork: false,
  hybridWork: false,
  officeWork: false,
  fridayOff: false,
  fourDayWeek: false,
  standardHours: false,
  flexibleBreaks: false,
  timeZoneFlexible: false,
  // Workplace Accommodations
  prayerRoom: false,
  restArea: false,
  quietSpace: false,
  dressCode: false,
  dietaryOptions: false,
  ergonomicSetup: false,
  wellnessPrograms: false,
  parentingFacilities: false,
  accessibilityNeeds: false,
  personalSpace: false,
  // Company Values
  environmentalFocus: false,
  socialImpact: false,
  techInnovation: false,
  customerCentric: false,
  employeeCentric: false,
  globalMindset: false,
  localImpact: false,
  startupMindset: false,
  corporateStability: false,
  nonProfit: false
})

const suggestedPreferences = ref<Preferences>({ ...selectedPreferences.value })
const allPreferences: Record<keyof Preferences, string> = {
  // Core Business Values
  ethicalBusiness: 'Ethical business practices',
  halalProducts: 'Halal products/services',
  noAlcohol: 'No alcohol-related business',
  noGambling: 'No gambling-related business',
  noPork: 'No pork-related business',
  noInterest: 'No interest-based finance',
  noTobacco: 'No tobacco-related business',
  noAdultContent: 'No adult content',
  noWeapons: 'No weapons/military business',
  noAnimalTesting: 'No animal testing',
  fairTrade: 'Fair trade practices',
  sustainable: 'Sustainable business practices',
  communityFocused: 'Community-focused initiatives',
  familyFriendly: 'Family-friendly policies',
  kosherProducts: 'Kosher products/services',
  vegetarianProducts: 'Vegetarian products/services',
  veganProducts: 'Vegan products/services',
  religiousAccommodations: 'Religious accommodations',
  // Workplace Culture
  respectfulEnvironment: 'Respectful and inclusive environment',
  transparency: 'Transparent communication and decision-making',
  diversityInclusion: 'Strong diversity and inclusion focus',
  mentorship: 'Mentorship opportunities',
  careerGrowth: 'Clear career growth paths',
  continuousLearning: 'Continuous learning and development',
  openCommunication: 'Open and honest communication',
  feedbackCulture: 'Culture of constructive feedback',
  innovativeCulture: 'Innovative and forward-thinking culture',
  workLifeBalance: 'Strong work-life balance focus',
  // Work Style
  teamwork: 'Team-oriented work',
  individualWork: 'Independent work opportunities',
  hybridStyle: 'Mix of team and individual work',
  structuredWork: 'Structured and organized work',
  creativeWork: 'Creative and innovative projects',
  clientFacing: 'Client-facing opportunities',
  internalRole: 'Internal-focused role',
  leadershipRole: 'Leadership opportunities',
  collaborativeProjects: 'Collaborative project work',
  crossFunctional: 'Cross-functional team exposure',
  // Schedule Preferences
  flexibleHours: 'Flexible working hours',
  fixedSchedule: 'Fixed 9-5 schedule',
  remoteWork: 'Remote work options',
  hybridWork: 'Hybrid work arrangement',
  officeWork: 'Office-based work',
  fridayOff: 'Fridays off',
  fourDayWeek: 'Four-day work week',
  standardHours: 'Standard business hours',
  flexibleBreaks: 'Flexible break times',
  timeZoneFlexible: 'Time zone flexibility',
  // Workplace Accommodations
  prayerRoom: 'Prayer room available',
  restArea: 'Rest and relaxation areas',
  quietSpace: 'Quiet spaces for focus work',
  dressCode: 'Modest/flexible dress code',
  dietaryOptions: 'Dietary accommodation',
  ergonomicSetup: 'Ergonomic workspace setup',
  wellnessPrograms: 'Wellness programs',
  parentingFacilities: 'Parenting facilities',
  accessibilityNeeds: 'Accessibility accommodations',
  personalSpace: 'Personal workspace options',
  // Company Values
  environmentalFocus: 'Environmental sustainability focus',
  socialImpact: 'Social impact mission',
  techInnovation: 'Technology innovation focus',
  customerCentric: 'Customer-centric approach',
  employeeCentric: 'Employee-centric culture',
  globalMindset: 'Global business mindset',
  localImpact: 'Local community impact',
  startupMindset: 'Startup/entrepreneurial culture',
  corporateStability: 'Corporate stability',
  nonProfit: 'Non-profit/social enterprise'
}

const completionPercentage = computed(() => {
  // Adjust the completion percentage based on current step
  switch (currentStep.value) {
    case 0: // Get to know you
      return isConversationComplete.value ? 50 : 0
    case 1: // Your preferences
      return 75
    case 2: // Jobs for you
      return 100
    default:
      return 0
  }
})

const formatPreferenceName = (key: string) => {
  return allPreferences[key as keyof typeof allPreferences] || key
}

const cvUpload = ref<HTMLInputElement | null>(null)

// Define the question queue and context
const followUpQuestions = [
  "What values are most important to you in a workplace? For example, do you care about sustainability, social impact, or ethical business practices?",
  "What kind of work environment helps you do your best work? Do you prefer collaborative teams or more independent work?",
  "How important is work-life balance to you? What kind of flexibility would you like in your work schedule?",
  "Are there any specific industries or business practices that align with your values? For example, do you prefer companies that focus on environmental sustainability or social impact?"
]

// Track which question we're on
const qIndex = ref(0)

// Store the answers
const followUpAnswers = reactive<string[]>([])

// Track conversation context
const conversationContext = ref({
  topicsCovered: {
    workplaceEnvironment: false,
    workStyle: false,
    values: false
  },
  lastTopic: '',
  conversationSummary: {
    workplaceNeeds: [] as string[],
    workStyle: [] as string[],
    values: [] as string[]
  }
})

// Utility functions
async function detectMime(blob: Blob): Promise<string> {
  const type = await fileTypeFromBlob(blob)
  return type?.mime || blob.type || 'application/octet-stream'
}

async function extractPdfText(buffer: ArrayBuffer): Promise<string> {
  const pdf = await pdfjsLib.getDocument(buffer).promise
  let fullText = ''
  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i)
    const { items } = await page.getTextContent()
    fullText += items.map((item: any) => item.str).join(' ') + '\n\n'
  }
  return fullText
}

async function extractDocxText(buffer: ArrayBuffer): Promise<string> {
  const { value: html } = await mammoth.extractRawText({ arrayBuffer: buffer })
  return html
}

async function extractTxtText(blob: Blob): Promise<string> {
  return await blob.text()
}

const getFileType = (file: File): string => {
  const extension = file.name.split('.').pop()?.toLowerCase();
  switch (extension) {
    case 'pdf':
      return 'application/pdf';
    case 'doc':
    case 'docx':
      return 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
    case 'txt':
      return 'text/plain';
    default:
      return file.type;
  }
};

const handleCVUpload = async (event: Event) => {
  const input = event.target as HTMLInputElement;
  if (input.files && input.files[0]) {
    const file = input.files[0];
    const fileType = getFileType(file);
    
    if (!['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain'].includes(fileType)) {
      alert('Please upload a PDF, DOCX, or TXT file');
      return;
    }
    
    chatMessages.value.push({ 
      role: 'user', 
      content: `I've uploaded my CV: ${file.name}` 
    })
    chatMessages.value.push({ 
      role: 'assistant', 
      content: "I'm taking a look at your resume" 
    })
    isLoading.value = true

    try {
      const mime = await detectMime(file)
      const buffer = await file.arrayBuffer()
      let text = ''

      if (mime === 'application/pdf') {
        text = await extractPdfText(buffer)
      } else if (mime === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
        text = await extractDocxText(buffer)
      } else {
        text = await extractTxtText(file)
      }

      if (!text.trim()) throw new Error('No text extracted')

      const maxChars = 800_000
      if (text.length > maxChars) text = text.slice(0, maxChars) + '...'

      const cvPrompt = `Please analyze this CV and provide a clear, structured summary focusing on:
- Name (if available)
- Job title
- Contact information (location, email, phone if available)
- Key skills (focus on 3-5 most relevant)

Format your response like this:
Hey [Name]! Thanks for uploading your CV!

Job title
You are a [Job Title].

Contact
You live in [Location].
Your email is [Email] and your phone number is [Phone].

Your skills
Your key skills are: [List 3-5 key skills].

Is this information correct? Please let me know if there's anything you'd like to clarify or add.

--- CV START ---
${text}
--- CV END ---`

      const completion = await openai.chat.completions.create({
        model: 'gpt-4.1-mini',
        messages: [
          systemMessage,
          { role: 'user', content: cvPrompt }
        ],
        temperature: 0.7,
        max_tokens: 500
      })

      const aiText = completion.choices[0].message?.content
      if (!aiText) throw new Error('AI gave no response')

      chatMessages.value.push({ 
        role: 'assistant', 
        content: aiText
      })

      // Add follow-up about workplace preferences
      chatMessages.value.push({
        role: 'assistant',
        content: "Nice! Based on your impressive background, I'd love to understand more about your workplace preferences.\n\nCould you tell me about what kind of workplace environment do you prefer?"
      })

      if (cvUpload.value) {
        cvUpload.value.value = ''
      }
    } catch (error) {
      console.error('Error analyzing CV:', error)
      chatMessages.value.push({
        role: 'assistant',
        content: "I apologize, but there was an error analyzing your CV. Let's proceed with getting to know you through our conversation. What kind of workplace environment do you prefer?"
      })
    } finally {
      isLoading.value = false
    }
  }
}

// Update the system message to be more focused on completing the conversation
const systemMessage: OpenAI.Chat.ChatCompletionMessageParam = {
  role: 'system',
  content: `You are PURPOSE AI, a friendly and professional career advisor.
- Start by introducing yourself as PURPOSE AI
- After CV upload, provide a concise summary focusing on:
  • Job title
  • Contact information (if available)
  • Key skills
- Keep responses friendly and conversational
- Ask one question at a time
- Acknowledge responses naturally
- Focus on understanding workplace preferences and values
- After 3-4 exchanges or when you have enough information, provide a summary of detected preferences and ask for confirmation
- Format your confirmation request like this:
  "Great! Based on our conversation, I've identified these preferences that are important to you:
  [list preferences]
  
  Is this correct? Would you like to add or modify anything?"
- Only end the conversation after the user confirms the preferences
- If the user wants to add or modify preferences, continue the conversation
- Do not add farewell messages until the user confirms the preferences`
}

const isConversationComplete = ref(false)
const showAllPreferences = ref(false)

const sendMessage = async () => {
  if (!userMessage.value.trim() || isLoading.value) return

  chatMessages.value.push({ role: 'user', content: userMessage.value })
  const userReply = userMessage.value.trim().toLowerCase()
  userMessage.value = ''
  isLoading.value = true

  try {
    const messages = [
      systemMessage,
      ...chatMessages.value.map(msg => ({
        role: msg.role,
        content: msg.content
      }))
    ]

    const completion = await openai.chat.completions.create({
      model: 'gpt-4.1-mini',
      messages: messages,
      temperature: 0.7,
      max_tokens: 500
    })

    const response = completion.choices[0].message.content
    if (!response) throw new Error('No response from GPT')

    // Update preferences based on conversation
    if (userReply.includes('respect') || userReply.includes('respectful') || userReply.includes('dignity') || userReply.includes('courtesy')) {
      selectedPreferences.value.respectfulEnvironment = true
      selectedPreferences.value.diversityInclusion = true
    }
    if (userReply.includes('transparency') || userReply.includes('transparent') || userReply.includes('openness') || userReply.includes('honesty') || userReply.includes('clear communication')) {
      selectedPreferences.value.transparency = true
      selectedPreferences.value.openCommunication = true
    }
    
    // Check for Muslim identity and automatically set prohibited industries
    const isMuslim = userReply.includes('muslim') || userReply.includes('islam') || 
                    userReply.includes('halal') || userReply.includes('hijab') || 
                    userReply.includes('prayer') || userReply.includes('friday') ||
                    userReply.includes('jummah') || userReply.includes('ramadan') ||
                    userReply.includes('eid') || userReply.includes('salah') ||
                    userReply.includes('quran') || userReply.includes('mosque') ||
                    userReply.includes('ummah') || userReply.includes('deen') ||
                    userReply.includes('deen') || userReply.includes('sunnah') ||
                    userReply.includes('salaam') || userReply.includes('salam') ||
                    userReply.includes('mashaallah') || userReply.includes('inshaallah') ||
                    // Additional religious accommodation terms
                    userReply.includes('friday prayer') || userReply.includes('jummah prayer') ||
                    userReply.includes('prayer room') || userReply.includes('prayer space') ||
                    userReply.includes('prayer break') || userReply.includes('prayer time') ||
                    userReply.includes('prayer facility') || userReply.includes('prayer area') ||
                    userReply.includes('wudu') || userReply.includes('ablution') ||
                    userReply.includes('masjid') || userReply.includes('musallah') ||
                    userReply.includes('islamic') || userReply.includes('muslim-friendly') ||
                    userReply.includes('muslim friendly') || userReply.includes('islamic values') ||
                    userReply.includes('islamic principles') || userReply.includes('shariah') ||
                    userReply.includes('sharia') || userReply.includes('islamic finance') ||
                    userReply.includes('islamic banking') || userReply.includes('islamic business') ||
                    userReply.includes('islamic workplace') || userReply.includes('islamic environment')

    if (isMuslim) {
      // Set prohibited industries for Muslims
      selectedPreferences.value.noAlcohol = true
      selectedPreferences.value.noGambling = true
      selectedPreferences.value.noPork = true
      selectedPreferences.value.noInterest = true
      selectedPreferences.value.noAdultContent = true
      selectedPreferences.value.noWeapons = true
      selectedPreferences.value.noTobacco = true
      selectedPreferences.value.ethicalBusiness = true
      selectedPreferences.value.fairTrade = true
      // Set religious accommodations
      selectedPreferences.value.prayerRoom = true
      selectedPreferences.value.flexibleBreaks = true
      selectedPreferences.value.fridayOff = true
      selectedPreferences.value.religiousAccommodations = true
      selectedPreferences.value.dressCode = true
      selectedPreferences.value.dietaryOptions = true
      selectedPreferences.value.halalProducts = true
    }

    // Check for work style preferences
    if (userReply.includes('team') || userReply.includes('collaborative') || userReply.includes('group')) {
      selectedPreferences.value.teamwork = true
      selectedPreferences.value.collaborativeProjects = true
    }
    if (userReply.includes('independent') || userReply.includes('autonomous') || userReply.includes('solo')) {
      selectedPreferences.value.individualWork = true
      selectedPreferences.value.personalSpace = true
    }

    // Check for work arrangement preferences
    if (userReply.includes('remote') || userReply.includes('work from home') || userReply.includes('wfh')) {
      selectedPreferences.value.remoteWork = true
      selectedPreferences.value.flexibleHours = true
    }
    if (userReply.includes('office') || userReply.includes('onsite') || userReply.includes('in-person')) {
      selectedPreferences.value.officeWork = true
      selectedPreferences.value.teamwork = true
    }

    // Check for learning and growth preferences
    if (userReply.includes('learn') || userReply.includes('growth') || userReply.includes('development') || userReply.includes('training')) {
      selectedPreferences.value.continuousLearning = true
      selectedPreferences.value.mentorship = true
    }

    // Check for social impact preferences
    if (userReply.includes('impact') || userReply.includes('purpose') || userReply.includes('meaningful') || userReply.includes('contribution')) {
      selectedPreferences.value.socialImpact = true
      selectedPreferences.value.communityFocused = true
    }

    // Check for family-friendly preferences
    if (userReply.includes('family') || userReply.includes('parent') || userReply.includes('children') || userReply.includes('work-life')) {
      selectedPreferences.value.familyFriendly = true
      selectedPreferences.value.workLifeBalance = true
      selectedPreferences.value.parentingFacilities = true
    }

    // Check if user wants to end the conversation
    const wantsToEnd = userReply.includes('that\'s all') || 
                      userReply.includes('that is all') || 
                      userReply.includes('i\'m done') || 
                      userReply.includes('i am done') ||
                      userReply.includes('no more') ||
                      userReply.includes('nothing else') ||
                      userReply.includes('that\'s it') ||
                      userReply.includes('that is it') ||
                      userReply.includes('finished') ||
                      userReply.includes('complete') ||
                      userReply.includes('thank you') ||
                      userReply.includes('thanks') ||
                      userReply.includes('thank you!') ||
                      userReply.includes('thanks!') ||
                      userReply.includes('that\'s it!') ||
                      userReply.includes('that is it!') ||
                      userReply.includes('that\'s all!') ||
                      userReply.includes('that is all!') ||
                      userReply.includes('i\'m done!') ||
                      userReply.includes('i am done!') ||
                      userReply.includes('no more!') ||
                      userReply.includes('nothing else!') ||
                      userReply.includes('finished!') ||
                      userReply.includes('complete!') ||
                      userReply.includes('okay') ||
                      userReply.includes('ok') ||
                      userReply.includes('okay!') ||
                      userReply.includes('ok!') ||
                      userReply.includes('sounds good') ||
                      userReply.includes('sounds good!') ||
                      userReply.includes('perfect') ||
                      userReply.includes('perfect!') ||
                      userReply.includes('great') ||
                      userReply.includes('great!') ||
                      userReply.includes('awesome') ||
                      userReply.includes('awesome!') ||
                      userReply.includes('excellent') ||
                      userReply.includes('excellent!') ||
                      userReply.includes('that works') ||
                      userReply.includes('that works!') ||
                      userReply.includes('that\'s perfect') ||
                      userReply.includes('that is perfect') ||
                      userReply.includes('that\'s perfect!') ||
                      userReply.includes('that is perfect!') ||
                      userReply.includes('that\'s great') ||
                      userReply.includes('that is great') ||
                      userReply.includes('that\'s great!') ||
                      userReply.includes('that is great!') ||
                      userReply.includes('that\'s awesome') ||
                      userReply.includes('that is awesome') ||
                      userReply.includes('that\'s awesome!') ||
                      userReply.includes('that is awesome!') ||
                      userReply.includes('that\'s excellent') ||
                      userReply.includes('that is excellent') ||
                      userReply.includes('that\'s excellent!') ||
                      userReply.includes('that is excellent!') ||
                      userReply.includes('i think that\'s it') ||
                      userReply.includes('i think that is it') ||
                      userReply.includes('i think that\'s all') ||
                      userReply.includes('i think that is all') ||
                      userReply.includes('i think that\'s it!') ||
                      userReply.includes('i think that is it!') ||
                      userReply.includes('i think that\'s all!') ||
                      userReply.includes('i think that is all!') ||
                      userReply.includes('i think i\'m done') ||
                      userReply.includes('i think i am done') ||
                      userReply.includes('i think i\'m done!') ||
                      userReply.includes('i think i am done!') ||
                      userReply.includes('i think that covers it') ||
                      userReply.includes('i think that covers it!') ||
                      userReply.includes('i think that\'s everything') ||
                      userReply.includes('i think that is everything') ||
                      userReply.includes('i think that\'s everything!') ||
                      userReply.includes('i think that is everything!')

    if (wantsToEnd) {
      // Create a summary of detected preferences by category
      const preferencesByCategory = {
        'Core Business Values': [] as string[],
        'Workplace Culture': [] as string[],
        'Work Style': [] as string[],
        'Schedule Preferences': [] as string[],
        'Workplace Accommodations': [] as string[],
        'Company Values': [] as string[]
      }
      
      // Core Business Values
      if (selectedPreferences.value.halalProducts) preferencesByCategory['Core Business Values'].push('Halal products/services')
      if (selectedPreferences.value.noAlcohol) preferencesByCategory['Core Business Values'].push('No alcohol-related business')
      if (selectedPreferences.value.noGambling) preferencesByCategory['Core Business Values'].push('No gambling-related business')
      if (selectedPreferences.value.noPork) preferencesByCategory['Core Business Values'].push('No pork-related business')
      if (selectedPreferences.value.noInterest) preferencesByCategory['Core Business Values'].push('No interest-based finance')
      if (selectedPreferences.value.ethicalBusiness) preferencesByCategory['Core Business Values'].push('Ethical business practices')
      if (selectedPreferences.value.fairTrade) preferencesByCategory['Core Business Values'].push('Fair trade practices')
      if (selectedPreferences.value.sustainable) preferencesByCategory['Core Business Values'].push('Sustainable business practices')
      if (selectedPreferences.value.communityFocused) preferencesByCategory['Core Business Values'].push('Community-focused initiatives')
      if (selectedPreferences.value.familyFriendly) preferencesByCategory['Core Business Values'].push('Family-friendly policies')
      if (selectedPreferences.value.religiousAccommodations) preferencesByCategory['Core Business Values'].push('Religious accommodations')

      // Workplace Culture
      if (selectedPreferences.value.respectfulEnvironment) preferencesByCategory['Workplace Culture'].push('Respectful and inclusive environment')
      if (selectedPreferences.value.transparency) preferencesByCategory['Workplace Culture'].push('Transparent communication')
      if (selectedPreferences.value.diversityInclusion) preferencesByCategory['Workplace Culture'].push('Diversity and inclusion focus')
      if (selectedPreferences.value.mentorship) preferencesByCategory['Workplace Culture'].push('Mentorship opportunities')
      if (selectedPreferences.value.careerGrowth) preferencesByCategory['Workplace Culture'].push('Career growth paths')
      if (selectedPreferences.value.continuousLearning) preferencesByCategory['Workplace Culture'].push('Continuous learning and development')
      if (selectedPreferences.value.openCommunication) preferencesByCategory['Workplace Culture'].push('Open communication')
      if (selectedPreferences.value.feedbackCulture) preferencesByCategory['Workplace Culture'].push('Culture of constructive feedback')
      if (selectedPreferences.value.innovativeCulture) preferencesByCategory['Workplace Culture'].push('Innovative culture')
      if (selectedPreferences.value.workLifeBalance) preferencesByCategory['Workplace Culture'].push('Work-life balance focus')

      // Work Style
      if (selectedPreferences.value.teamwork) preferencesByCategory['Work Style'].push('Team-oriented work')
      if (selectedPreferences.value.individualWork) preferencesByCategory['Work Style'].push('Independent work opportunities')
      if (selectedPreferences.value.hybridStyle) preferencesByCategory['Work Style'].push('Mix of team and individual work')
      if (selectedPreferences.value.structuredWork) preferencesByCategory['Work Style'].push('Structured and organized work')
      if (selectedPreferences.value.creativeWork) preferencesByCategory['Work Style'].push('Creative and innovative projects')
      if (selectedPreferences.value.clientFacing) preferencesByCategory['Work Style'].push('Client-facing opportunities')
      if (selectedPreferences.value.internalRole) preferencesByCategory['Work Style'].push('Internal-focused role')
      if (selectedPreferences.value.leadershipRole) preferencesByCategory['Work Style'].push('Leadership opportunities')
      if (selectedPreferences.value.collaborativeProjects) preferencesByCategory['Work Style'].push('Collaborative project work')
      if (selectedPreferences.value.crossFunctional) preferencesByCategory['Work Style'].push('Cross-functional team exposure')

      // Schedule Preferences
      if (selectedPreferences.value.flexibleHours) preferencesByCategory['Schedule Preferences'].push('Flexible working hours')
      if (selectedPreferences.value.fixedSchedule) preferencesByCategory['Schedule Preferences'].push('Fixed 9-5 schedule')
      if (selectedPreferences.value.remoteWork) preferencesByCategory['Schedule Preferences'].push('Remote work options')
      if (selectedPreferences.value.hybridWork) preferencesByCategory['Schedule Preferences'].push('Hybrid work arrangement')
      if (selectedPreferences.value.officeWork) preferencesByCategory['Schedule Preferences'].push('Office-based work')
      if (selectedPreferences.value.fridayOff) preferencesByCategory['Schedule Preferences'].push('Fridays off')
      if (selectedPreferences.value.fourDayWeek) preferencesByCategory['Schedule Preferences'].push('Four-day work week')
      if (selectedPreferences.value.standardHours) preferencesByCategory['Schedule Preferences'].push('Standard business hours')
      if (selectedPreferences.value.flexibleBreaks) preferencesByCategory['Schedule Preferences'].push('Flexible break times')
      if (selectedPreferences.value.timeZoneFlexible) preferencesByCategory['Schedule Preferences'].push('Time zone flexibility')

      // Workplace Accommodations
      if (selectedPreferences.value.prayerRoom) preferencesByCategory['Workplace Accommodations'].push('Prayer room available')
      if (selectedPreferences.value.restArea) preferencesByCategory['Workplace Accommodations'].push('Rest and relaxation areas')
      if (selectedPreferences.value.quietSpace) preferencesByCategory['Workplace Accommodations'].push('Quiet spaces for focus work')
      if (selectedPreferences.value.dressCode) preferencesByCategory['Workplace Accommodations'].push('Modest/flexible dress code')
      if (selectedPreferences.value.dietaryOptions) preferencesByCategory['Workplace Accommodations'].push('Dietary accommodation')
      if (selectedPreferences.value.ergonomicSetup) preferencesByCategory['Workplace Accommodations'].push('Ergonomic workspace setup')
      if (selectedPreferences.value.wellnessPrograms) preferencesByCategory['Workplace Accommodations'].push('Wellness programs')
      if (selectedPreferences.value.parentingFacilities) preferencesByCategory['Workplace Accommodations'].push('Parenting facilities')
      if (selectedPreferences.value.accessibilityNeeds) preferencesByCategory['Workplace Accommodations'].push('Accessibility accommodations')
      if (selectedPreferences.value.personalSpace) preferencesByCategory['Workplace Accommodations'].push('Personal workspace options')

      // Company Values
      if (selectedPreferences.value.environmentalFocus) preferencesByCategory['Company Values'].push('Environmental sustainability focus')
      if (selectedPreferences.value.socialImpact) preferencesByCategory['Company Values'].push('Social impact mission')
      if (selectedPreferences.value.techInnovation) preferencesByCategory['Company Values'].push('Technology innovation focus')
      if (selectedPreferences.value.customerCentric) preferencesByCategory['Company Values'].push('Customer-centric approach')
      if (selectedPreferences.value.employeeCentric) preferencesByCategory['Company Values'].push('Employee-centric culture')
      if (selectedPreferences.value.globalMindset) preferencesByCategory['Company Values'].push('Global business mindset')
      if (selectedPreferences.value.localImpact) preferencesByCategory['Company Values'].push('Local community impact')
      if (selectedPreferences.value.startupMindset) preferencesByCategory['Company Values'].push('Startup/entrepreneurial culture')
      if (selectedPreferences.value.corporateStability) preferencesByCategory['Company Values'].push('Corporate stability')
      if (selectedPreferences.value.nonProfit) preferencesByCategory['Company Values'].push('Non-profit/social enterprise')

      // Add final summary message with detected preferences
      let summaryMessage = "Great! Based on our conversation, I've identified these preferences that are important to you:\n\n"
      
      let hasPreferences = false
      for (const [category, preferences] of Object.entries(preferencesByCategory)) {
        if (preferences.length > 0) {
          hasPreferences = true
          summaryMessage += `${category}:\n`
          summaryMessage += preferences.map(pref => `• ${pref}`).join('\n')
          summaryMessage += '\n\n'
        }
      }
      
      if (!hasPreferences) {
        summaryMessage += "I haven't detected any specific preferences yet. Would you like to tell me more about what's important to you in a workplace?"
      }

      chatMessages.value.push({
        role: 'assistant',
        content: summaryMessage
      })
      
      // Set conversation as complete and move to preferences step
      isConversationComplete.value = true
    } else {
      // Continue the conversation with the AI's response
      chatMessages.value.push({ role: 'assistant', content: response })
    }

  } catch (err) {
    console.error(err)
    chatMessages.value.push({
      role: 'assistant',
      content: "I apologize, but I had trouble processing that. Could you please tell me more about what you're looking for in your next role?"
    })
  } finally {
    isLoading.value = false
  }
}

const toggleJobSave = (jobId: string) => {
  const index = savedJobs.value.indexOf(jobId)
  if (index === -1) {
    savedJobs.value.push(jobId)
  } else {
    savedJobs.value.splice(index, 1)
  }
}

const updatePreferences = async (preferences: Partial<Preferences>) => {
  try {
    // Only update preferences that are present in the AI's response
    Object.entries(preferences).forEach(([key, value]) => {
      const preferenceKey = key as keyof Preferences
      if (preferenceKey in selectedPreferences.value) {
        selectedPreferences.value[preferenceKey] = value as boolean
      }
    })
    // Save preferences to user profile
    await authStore.updatePreferences({
      alcohol: selectedPreferences.value.noAlcohol,
      pork: selectedPreferences.value.noPork,
      gambling: selectedPreferences.value.noGambling,
      interest: selectedPreferences.value.noInterest,
      environmental: selectedPreferences.value.sustainable,
      social: selectedPreferences.value.communityFocused,
      governance: selectedPreferences.value.ethicalBusiness,
      diversity: selectedPreferences.value.familyFriendly,
      workLifeBalance: selectedPreferences.value.familyFriendly,
      prayer: selectedPreferences.value.religiousAccommodations,
      dressCode: true, // Default to true for backward compatibility
      debtToEquity: 0,
      currentRatio: 0,
      returnOnEquity: 0
    })
  } catch (error) {
    console.error('Error updating preferences:', error)
  }
}

const savePreferences = async () => {
  try {
    await updatePreferences(selectedPreferences.value)
    currentStep.value = 2 // Move directly to recommended jobs
  } catch (error) {
    console.error('Error saving preferences:', error)
  }
}

// Fetch recommended jobs when entering step 3
watch(currentStep, (newStep) => {
  if (newStep === 2) {
    // TODO: Fetch recommended jobs from API
    // This is a placeholder for demonstration
    recommendedJobs.value = [
      {
        id: '1',
        title: 'Software Developer',
        company: 'Tech Company',
        description: 'Looking for a developer who values work-life balance and diversity.'
      },
      {
        id: '2',
        title: 'Project Manager',
        company: 'Green Energy',
        description: 'Join our team focused on environmental sustainability.'
      }
    ]
  }
})

// Add these computed properties after the completionPercentage computed property
const coreBusinessValues = computed(() => {
  const values: Record<string, string> = {}
  Object.entries(allPreferences)
    .filter(([key]) => [
      'ethicalBusiness', 'halalProducts', 'noAlcohol', 'noGambling',
      'noPork', 'noInterest', 'noTobacco', 'noAdultContent', 'noWeapons',
      'noAnimalTesting', 'fairTrade', 'sustainable', 'communityFocused',
      'familyFriendly', 'kosherProducts', 'vegetarianProducts', 'veganProducts',
      'religiousAccommodations'
    ].includes(key))
    .forEach(([key, value]) => {
      values[key] = value
    })
  return values
})

const workplaceCulture = computed(() => {
  const values: Record<string, string> = {}
  Object.entries(allPreferences)
    .filter(([key]) => [
      'respectfulEnvironment', 'transparency', 'diversityInclusion',
      'mentorship', 'careerGrowth', 'continuousLearning', 'openCommunication',
      'feedbackCulture', 'innovativeCulture', 'workLifeBalance'
    ].includes(key))
    .forEach(([key, value]) => {
      values[key] = value
    })
  return values
})

const workStyle = computed(() => {
  const values: Record<string, string> = {}
  Object.entries(allPreferences)
    .filter(([key]) => [
      'teamwork', 'individualWork', 'hybridStyle', 'structuredWork',
      'creativeWork', 'clientFacing', 'internalRole', 'leadershipRole',
      'collaborativeProjects', 'crossFunctional'
    ].includes(key))
    .forEach(([key, value]) => {
      values[key] = value
    })
  return values
})

const schedulePreferences = computed(() => {
  const values: Record<string, string> = {}
  Object.entries(allPreferences)
    .filter(([key]) => [
      'flexibleHours', 'fixedSchedule', 'remoteWork', 'hybridWork',
      'officeWork', 'fridayOff', 'fourDayWeek', 'standardHours',
      'flexibleBreaks', 'timeZoneFlexible'
    ].includes(key))
    .forEach(([key, value]) => {
      values[key] = value
    })
  return values
})

const workplaceAccommodations = computed(() => {
  const values: Record<string, string> = {}
  Object.entries(allPreferences)
    .filter(([key]) => [
      'prayerRoom', 'restArea', 'quietSpace', 'dressCode',
      'dietaryOptions', 'ergonomicSetup', 'wellnessPrograms',
      'parentingFacilities', 'accessibilityNeeds', 'personalSpace'
    ].includes(key))
    .forEach(([key, value]) => {
      values[key] = value
    })
  return values
})

const companyValues = computed(() => {
  const values: Record<string, string> = {}
  Object.entries(allPreferences)
    .filter(([key]) => [
      'environmentalFocus', 'socialImpact', 'techInnovation',
      'customerCentric', 'employeeCentric', 'globalMindset',
      'localImpact', 'startupMindset', 'corporateStability',
      'nonProfit'
    ].includes(key))
    .forEach(([key, value]) => {
      values[key] = value
    })
  return values
})
</script> 