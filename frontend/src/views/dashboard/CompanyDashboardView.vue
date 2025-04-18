<template>
  <div class="min-h-screen bg-gray-50">
    <div class="container mx-auto px-4 py-8">
      <!-- Header -->
      <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-8">
        <div>
          <h1 class="text-2xl sm:text-3xl font-bold text-primary-900">Company Dashboard</h1>
          <p class="text-gray-600 mt-1 text-sm sm:text-base">Manage your job postings and view applications</p>
        </div>
        <div class="flex justify-end">
          <button 
            @click="createNewJob"
            class="bg-primary-600 text-white px-3 py-1.5 rounded-lg hover:bg-primary-700 transition-colors flex items-center gap-1.5 text-sm"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd" />
            </svg>
            Post New Job
          </button>
        </div>
      </div>

      <!-- Stats Overview -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div class="bg-white rounded-lg shadow-sm p-6 border border-primary-100">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-600">Active Jobs</p>
              <p class="text-2xl font-bold text-primary-900 mt-1">12</p>
            </div>
            <div class="bg-primary-100 p-3 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
          </div>
        </div>
        <div class="bg-white rounded-lg shadow-sm p-6 border border-primary-100">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-600">Total Applications</p>
              <p class="text-2xl font-bold text-primary-900 mt-1">48</p>
            </div>
            <div class="bg-green-100 p-3 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>
        <div class="bg-white rounded-lg shadow-sm p-6 border border-primary-100">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-600">Interviews Scheduled</p>
              <p class="text-2xl font-bold text-primary-900 mt-1">8</p>
            </div>
            <div class="bg-blue-100 p-3 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <!-- Active Jobs -->
      <div class="bg-white rounded-lg shadow-sm border border-primary-100 mb-8">
        <div class="p-6 border-b border-gray-200">
          <h2 class="text-xl font-semibold text-primary-900">Active Job Postings</h2>
        </div>
        <div class="divide-y divide-gray-200">
          <div v-for="job in activeJobs" :key="job.id" class="p-6">
            <div class="flex items-center justify-between">
              <div>
                <h3 class="text-lg font-medium text-primary-900">{{ job.title }}</h3>
                <p class="text-gray-600 mt-1">{{ job.location }} • {{ job.type }}</p>
                <div class="flex items-center mt-2">
                  <span class="text-sm text-gray-500">Posted {{ job.postedDate }}</span>
                  <span class="mx-2 text-gray-300">•</span>
                  <span class="text-sm text-gray-500">{{ job.applications }} applications</span>
                </div>
              </div>
              <div class="flex items-center space-x-4">
                <button class="text-primary-600 hover:text-primary-700">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                  </svg>
                </button>
                <button class="text-red-600 hover:text-red-700">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Recent Applications -->
      <div class="bg-white rounded-lg shadow-sm border border-primary-100">
        <div class="p-6 border-b border-gray-200">
          <h2 class="text-xl font-semibold text-primary-900">Recent Applications</h2>
        </div>
        <div class="divide-y divide-gray-200">
          <div v-for="application in recentApplications" :key="application.id" class="p-6">
            <div class="flex items-center justify-between">
              <div class="flex items-center space-x-4">
                <img
                  :src="application.candidateImage"
                  :alt="application.candidateName"
                  class="h-12 w-12 rounded-full object-cover ring-2 ring-primary-200"
                />
                <div>
                  <h3 class="text-lg font-medium text-primary-900">{{ application.candidateName }}</h3>
                  <p class="text-gray-600">{{ application.jobTitle }}</p>
                  <div class="flex items-center mt-2">
                    <span class="text-sm text-gray-500">Applied {{ application.appliedDate }}</span>
                    <span class="mx-2 text-gray-300">•</span>
                    <span :class="getStatusClass(application.status)" class="text-sm font-medium">
                      {{ application.status }}
                    </span>
                  </div>
                </div>
              </div>
              <button class="text-primary-600 hover:text-primary-700 text-sm font-medium">
                View Details
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// Mock data - replace with actual data from your backend
const activeJobs = ref([
  {
    id: '1',
    title: 'Senior Software Engineer',
    location: 'Amsterdam',
    type: 'Full-time',
    postedDate: '2 days ago',
    applications: 12
  },
  {
    id: '2',
    title: 'UX/UI Designer',
    location: 'Remote',
    type: 'Full-time',
    postedDate: '1 week ago',
    applications: 8
  }
])

const recentApplications = ref([
  {
    id: '1',
    candidateName: 'Ahmed Hassan',
    candidateImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    jobTitle: 'Senior Software Engineer',
    status: 'Pending',
    appliedDate: '2 hours ago'
  },
  {
    id: '2',
    candidateName: 'Fatima Rahman',
    candidateImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    jobTitle: 'UX/UI Designer',
    status: 'Shortlisted',
    appliedDate: '1 day ago'
  }
])

const getStatusClass = (status: string) => {
  switch (status.toLowerCase()) {
    case 'pending':
      return 'bg-amber-50 text-amber-700 rounded-full px-3 py-1'
    case 'shortlisted':
      return 'bg-teal-50 text-teal-700 rounded-full px-3 py-1'
    case 'rejected':
      return 'bg-rose-50 text-rose-700 rounded-full px-3 py-1'
    case 'hired':
      return 'bg-emerald-50 text-emerald-700 rounded-full px-3 py-1'
    default:
      return 'bg-gray-50 text-gray-700 rounded-full px-3 py-1'
  }
}

const createNewJob = () => {
  // TODO: Implement job creation flow
  console.log('Create new job')
}
</script> 