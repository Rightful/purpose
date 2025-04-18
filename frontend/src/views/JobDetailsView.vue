<template>
  <div class="container mx-auto px-4 py-8">
    <div v-if="job" class="max-w-4xl mx-auto">
      <!-- Back Button -->
      <button 
        @click="router.back()"
        class="flex items-center text-primary-600 hover:text-primary-700 mb-6"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clip-rule="evenodd" />
        </svg>
        Back to Jobs
      </button>

      <!-- Job Header -->
      <div class="bg-white rounded-lg shadow-md p-4 sm:p-8">
        <div class="flex flex-col sm:flex-row sm:items-start space-y-4 sm:space-y-0 sm:space-x-6 mb-6 sm:mb-8">
          <div class="flex-shrink-0 mx-auto sm:mx-0">
            <img
              :src="job.companyLogo"
              :alt="job.company"
              class="h-20 w-20 sm:h-24 sm:w-24 rounded-full object-cover ring-2 ring-primary-200"
            />
          </div>
          <div class="flex-1 text-center sm:text-left">
            <h1 class="text-2xl sm:text-3xl font-bold text-primary-900 mb-2">{{ job.title }}</h1>
            <p class="text-lg sm:text-xl text-gray-600 mb-4">{{ job.company }}</p>
            <div class="flex flex-wrap justify-center sm:justify-start gap-2 text-gray-600">
              <span class="flex items-center text-sm">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {{ job.location }}
              </span>
              <span class="flex items-center text-sm">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {{ job.experience }}
              </span>
              <span 
                :class="[
                  'inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium',
                  job.type.toLowerCase() === 'full-time' 
                    ? 'bg-primary-600 text-white border border-primary-700' 
                    : 'bg-primary-50 text-primary-600 border border-primary-100'
                ]"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {{ job.type }}
              </span>
            </div>
          </div>
        </div>

        <!-- Faith Alignment Section -->
        <div class="bg-gray-50 rounded-lg p-4 mb-6">
          <h2 class="text-lg font-semibold text-primary-900 mb-4">Faith Alignment</h2>
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div class="flex items-center space-x-2">
              <span :class="job.faithAlignment.halalIncome ? 'text-green-500' : 'text-red-500'">
                <svg v-if="job.faithAlignment.halalIncome" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                </svg>
                <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
                </svg>
              </span>
              <span class="text-sm font-medium">Halal Income</span>
            </div>
            <div class="flex items-center space-x-2">
              <span :class="job.faithAlignment.prayerFriendly ? 'text-green-500' : 'text-red-500'">
                <svg v-if="job.faithAlignment.prayerFriendly" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                </svg>
                <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
                </svg>
              </span>
              <span class="text-sm font-medium">Prayer Friendly</span>
            </div>
            <div class="flex items-center space-x-2">
              <span :class="job.faithAlignment.flexibleHours ? 'text-green-500' : 'text-red-500'">
                <svg v-if="job.faithAlignment.flexibleHours" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                </svg>
                <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
                </svg>
              </span>
              <span class="text-sm font-medium">Flexible Hours</span>
            </div>
            <div class="flex items-center space-x-2">
              <span :class="job.faithAlignment.modestDressCode ? 'text-green-500' : 'text-red-500'">
                <svg v-if="job.faithAlignment.modestDressCode" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                </svg>
                <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
                </svg>
              </span>
              <span class="text-sm font-medium">Modest Dress Code</span>
            </div>
          </div>
        </div>

        <!-- Job Description -->
        <div class="mb-6">
          <h2 class="text-lg font-semibold text-primary-900 mb-4">Job Description</h2>
          <p class="text-gray-700 whitespace-pre-line">{{ job.description }}</p>
        </div>

        <!-- Requirements -->
        <div class="mb-6">
          <h2 class="text-lg font-semibold text-primary-900 mb-4">Requirements</h2>
          <ul class="list-disc list-inside space-y-2 text-gray-700">
            <li v-for="requirement in job.requirements" :key="requirement">
              {{ requirement }}
            </li>
          </ul>
        </div>

        <!-- Responsibilities -->
        <div class="mb-6">
          <h2 class="text-lg font-semibold text-primary-900 mb-4">Responsibilities</h2>
          <ul class="list-disc list-inside space-y-2 text-gray-700">
            <li v-for="responsibility in job.responsibilities" :key="responsibility">
              {{ responsibility }}
            </li>
          </ul>
        </div>

        <!-- Application Info -->
        <div class="bg-gray-50 rounded-lg p-6">
          <h2 class="text-lg font-semibold text-primary-900 mb-4">Application Information</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p class="text-sm text-gray-600">Posted Date</p>
              <p class="font-medium">{{ formatDate(job.postedDate) }}</p>
            </div>
            <div>
              <p class="text-sm text-gray-600">Application Deadline</p>
              <p class="font-medium">{{ formatDate(job.applicationDeadline) }}</p>
            </div>
            <div>
              <p class="text-sm text-gray-600">Contact Email</p>
              <a :href="'mailto:' + job.contactEmail" class="text-primary-600 hover:text-primary-700">
                {{ job.contactEmail }}
              </a>
            </div>
            <div>
              <p class="text-sm text-gray-600">Company Website</p>
              <a :href="job.website" target="_blank" class="text-primary-600 hover:text-primary-700">
                {{ job.website }}
              </a>
            </div>
          </div>
        </div>

        <!-- Apply Button -->
        <div class="mt-8">
          <a 
            :href="'mailto:' + job.contactEmail + '?subject=Application for ' + job.title + ' at ' + job.company"
            class="w-full bg-primary-600 text-white py-3 px-6 rounded-lg hover:bg-primary-700 transition-colors flex items-center justify-center gap-2 text-lg font-medium"
          >
            <span>Apply Now</span>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd" />
            </svg>
          </a>
        </div>
      </div>
    </div>

    <!-- Loading State -->
    <div v-else-if="loading" class="flex justify-center items-center h-64">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
    </div>

    <!-- Error State -->
    <div v-else class="text-center py-12">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 mx-auto text-primary-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <p class="text-gray-600 text-lg">Job not found.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { jobs } from '@/data/jobs'
import type { Job } from '@/types'

const route = useRoute()
const router = useRouter()
const job = ref<Job | null>(null)
const loading = ref(true)

onMounted(() => {
  const jobId = route.params.id as string
  job.value = jobs.find(j => j.id === jobId) || null
  loading.value = false
})

const formatSalary = (salary: Job['salary']) => {
  return `${salary.currency} ${salary.min.toLocaleString()} - ${salary.max.toLocaleString()}`
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}
</script> 