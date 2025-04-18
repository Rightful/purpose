<template>
  <div class="min-h-screen bg-gray-50">
    <div class="container mx-auto px-4 py-8">
      <!-- Header -->
      <div class="flex justify-between items-center mb-8">
        <div>
          <h1 class="text-3xl font-bold text-primary-900">Talent Dashboard</h1>
          <p class="text-gray-600 mt-1">Manage your applications and profile</p>
        </div>
        <button 
          @click="editProfile"
          class="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors flex items-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
          </svg>
          Edit Profile
        </button>
      </div>

      <!-- Profile Overview -->
      <div class="bg-white rounded-lg shadow-md p-6 mb-8">
        <div class="flex flex-col md:flex-row gap-8">
          <!-- Left Column: Photo and Basic Info -->
          <div class="md:w-1/4">
            <div class="flex flex-col items-center">
              <div class="relative">
                <img
                  :src="user.image"
                  :alt="user.name"
                  class="h-40 w-40 rounded-full object-cover ring-4 ring-primary-100"
                />
                <button class="absolute bottom-0 right-0 bg-primary-600 text-white p-2 rounded-full hover:bg-primary-700 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                  </svg>
                </button>
              </div>
              <div class="mt-4 text-center w-full">
                <h2 class="text-xl font-bold text-primary-900">{{ user.name }}</h2>
                <p class="text-gray-600">{{ user.title }}</p>
                <div class="mt-3 flex flex-col gap-2">
                  <span v-if="user.isVerified" class="inline-flex items-center justify-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1.5" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                    </svg>
                    Verified Profile
                  </span>
                  <span v-if="user.isCommunityMember" class="inline-flex items-center justify-center px-3 py-1 rounded-full text-sm font-medium bg-primary-100 text-primary-800">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1.5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                    </svg>
                    Community Member
                  </span>
                </div>
              </div>
            </div>
          </div>

          <!-- Right Column: Details -->
          <div class="md:w-3/4">
            <!-- Quick Info -->
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div class="bg-gray-50 p-4 rounded-lg">
                <div class="text-sm text-gray-600 mb-1">Location</div>
                <div class="font-medium text-primary-900">{{ user.location }}</div>
              </div>
              <div class="bg-gray-50 p-4 rounded-lg">
                <div class="text-sm text-gray-600 mb-1">Experience</div>
                <div class="font-medium text-primary-900">{{ user.experience }}</div>
              </div>
              <div class="bg-gray-50 p-4 rounded-lg">
                <div class="text-sm text-gray-600 mb-1">Availability</div>
                <div class="font-medium text-primary-900">{{ user.availability }}</div>
              </div>
              <div class="bg-gray-50 p-4 rounded-lg">
                <div class="text-sm text-gray-600 mb-1">Languages</div>
                <div class="font-medium text-primary-900">{{ user.languages.join(', ') }}</div>
              </div>
            </div>

            <!-- Skills -->
            <div class="mb-6">
              <h3 class="text-sm font-medium text-gray-700 mb-3">Skills</h3>
              <div class="bg-gray-50 p-4 rounded-lg">
                <div class="flex flex-wrap gap-2">
                  <span
                    v-for="skill in user.skills"
                    :key="skill"
                    class="bg-white text-primary-800 text-sm px-3 py-1.5 rounded-full border border-primary-200"
                  >
                    {{ skill }}
                  </span>
                </div>
              </div>
            </div>

            <!-- Faith Alignment -->
            <div class="mb-6">
              <h3 class="text-sm font-medium text-gray-700 mb-3">Faith Alignment</h3>
              <div class="bg-gray-50 p-4 rounded-lg">
                <div class="grid grid-cols-2 gap-4">
                  <div class="flex flex-col">
                    <div class="text-sm text-gray-600 mb-1">Prayer Time</div>
                    <div class="font-medium text-primary-900 capitalize">{{ user.faithAlignment.prayerTimePreference }}</div>
                  </div>
                  <div class="flex flex-col">
                    <div class="text-sm text-gray-600 mb-1">Hijab Policy</div>
                    <div class="font-medium text-primary-900 capitalize">{{ user.faithAlignment.hijabPolicy.replace('_', ' ') }}</div>
                  </div>
                  <div class="flex flex-col">
                    <div class="text-sm text-gray-600 mb-1">Gender Preference</div>
                    <div class="font-medium text-primary-900 capitalize">{{ user.faithAlignment.genderPreference }}</div>
                  </div>
                  <div class="flex flex-col">
                    <div class="text-sm text-gray-600 mb-1">Dietary Requirements</div>
                    <div class="font-medium text-primary-900 capitalize">{{ user.faithAlignment.dietaryRequirements }}</div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Bio -->
            <div class="mb-6">
              <h3 class="text-sm font-medium text-gray-700 mb-3">Bio</h3>
              <div class="bg-gray-50 p-4 rounded-lg">
                <p class="text-gray-600 leading-relaxed">{{ user.bio }}</p>
              </div>
            </div>

            <!-- Education -->
            <div>
              <h3 class="text-sm font-medium text-gray-700 mb-3">Education</h3>
              <div class="bg-gray-50 p-4 rounded-lg">
                <p class="text-gray-600">{{ user.education }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Stats Overview -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div class="bg-white rounded-lg shadow-md p-6 border border-primary-100">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-600">Applications</p>
              <p class="text-2xl font-bold text-primary-900 mt-1">8</p>
            </div>
            <div class="bg-primary-100 p-3 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
          </div>
          <div class="mt-4">
            <div class="flex items-center justify-between text-sm">
              <span class="text-gray-600">Under Review</span>
              <span class="text-primary-900 font-medium">3</span>
            </div>
            <div class="flex items-center justify-between text-sm mt-2">
              <span class="text-gray-600">Interviews</span>
              <span class="text-primary-900 font-medium">2</span>
            </div>
            <div class="flex items-center justify-between text-sm mt-2">
              <span class="text-gray-600">Offers</span>
              <span class="text-primary-900 font-medium">1</span>
            </div>
          </div>
        </div>
        <div class="bg-white rounded-lg shadow-md p-6 border border-primary-100">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-600">Profile Views</p>
              <p class="text-2xl font-bold text-primary-900 mt-1">24</p>
            </div>
            <div class="bg-green-100 p-3 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </div>
          </div>
          <div class="mt-4">
            <div class="flex items-center justify-between text-sm">
              <span class="text-gray-600">This Week</span>
              <span class="text-primary-900 font-medium">12</span>
            </div>
            <div class="flex items-center justify-between text-sm mt-2">
              <span class="text-gray-600">This Month</span>
              <span class="text-primary-900 font-medium">24</span>
            </div>
            <div class="flex items-center justify-between text-sm mt-2">
              <span class="text-gray-600">Total</span>
              <span class="text-primary-900 font-medium">156</span>
            </div>
          </div>
        </div>
        <div class="bg-white rounded-lg shadow-md p-6 border border-primary-100">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-600">Profile Completion</p>
              <p class="text-2xl font-bold text-primary-900 mt-1">85%</p>
            </div>
            <div class="bg-blue-100 p-3 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <div class="mt-4">
            <div class="w-full bg-gray-200 rounded-full h-2">
              <div class="bg-primary-600 h-2 rounded-full" style="width: 85%"></div>
            </div>
            <div class="mt-2 text-sm text-gray-600">
              <p>Complete your profile to increase visibility</p>
            </div>
          </div>
        </div>
        <div class="bg-white rounded-lg shadow-md p-6 border border-primary-100">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-600">Saved Jobs</p>
              <p class="text-2xl font-bold text-primary-900 mt-1">5</p>
            </div>
            <div class="bg-yellow-100 p-3 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
              </svg>
            </div>
          </div>
          <div class="mt-4">
            <div class="flex items-center justify-between text-sm">
              <span class="text-gray-600">New Matches</span>
              <span class="text-primary-900 font-medium">2</span>
            </div>
            <div class="flex items-center justify-between text-sm mt-2">
              <span class="text-gray-600">Expiring Soon</span>
              <span class="text-primary-900 font-medium">1</span>
            </div>
            <div class="flex items-center justify-between text-sm mt-2">
              <span class="text-gray-600">Applied</span>
              <span class="text-primary-900 font-medium">2</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Recent Applications -->
      <div class="bg-white rounded-lg shadow-md border border-primary-100">
        <div class="p-6 border-b border-gray-200">
          <h2 class="text-xl font-semibold text-primary-900">Recent Applications</h2>
        </div>
        <div class="divide-y divide-gray-200">
          <div v-for="application in applications" :key="application.id" class="p-6">
            <div class="flex items-center justify-between">
              <div class="flex items-center space-x-4">
                <img
                  :src="application.companyLogo"
                  :alt="application.company"
                  class="h-12 w-12 rounded-full object-cover ring-2 ring-primary-200"
                />
                <div>
                  <h3 class="text-lg font-medium text-primary-900">{{ application.jobTitle }}</h3>
                  <p class="text-gray-600">{{ application.company }}</p>
                  <div class="flex items-center mt-2">
                    <span class="text-sm text-gray-500">Applied {{ application.appliedDate }}</span>
                    <span class="mx-2 text-gray-300">•</span>
                    <span :class="getStatusClass(application.status)" class="text-sm font-medium inline-flex items-center">
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
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { talents } from '@/data/talent'
import type { Talent } from '@/types/index'

const router = useRouter()
const authStore = useAuthStore()

// Get the first talent for demo purposes - in real app this would come from auth store
const user = ref(talents[0] as Talent)

// Mock data - replace with actual data from your backend
const applications = ref([
  {
    id: '1',
    jobTitle: 'Senior Software Engineer',
    company: 'TechCorp',
    companyLogo: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    status: 'Pending',
    appliedDate: '2 days ago'
  },
  {
    id: '2',
    jobTitle: 'UX/UI Designer',
    company: 'DesignHub',
    companyLogo: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    status: 'Shortlisted',
    appliedDate: '1 week ago'
  }
])

const getStatusClass = (status: string) => {
  switch (status.toLowerCase()) {
    case 'pending':
      return 'bg-amber-100 text-amber-800 rounded-full px-3 py-1'
    case 'shortlisted':
      return 'bg-teal-100 text-teal-800 rounded-full px-3 py-1'
    case 'rejected':
      return 'bg-red-100 text-red-800 rounded-full px-3 py-1'
    case 'accepted':
      return 'bg-green-100 text-green-800 rounded-full px-3 py-1'
    default:
      return 'bg-gray-100 text-gray-800 rounded-full px-3 py-1'
  }
}

const editProfile = () => {
  // TODO: Implement profile editing flow
  console.log('Edit profile')
}
</script> 