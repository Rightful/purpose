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
          class="btn-primary flex items-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
          </svg>
          Edit Profile
        </button>
      </div>

      <!-- Stats Overview -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div class="bg-white rounded-lg shadow-sm p-6 border border-primary-100">
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
        </div>
        <div class="bg-white rounded-lg shadow-sm p-6 border border-primary-100">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-600">Interviews</p>
              <p class="text-2xl font-bold text-primary-900 mt-1">3</p>
            </div>
            <div class="bg-blue-100 p-3 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          </div>
        </div>
        <div class="bg-white rounded-lg shadow-sm p-6 border border-primary-100">
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
        </div>
      </div>

      <!-- Profile Overview -->
      <div class="bg-white rounded-lg shadow-sm border border-primary-100 mb-8">
        <div class="p-6 border-b border-gray-200">
          <h2 class="text-xl font-semibold text-primary-900">Profile Overview</h2>
        </div>
        <div class="p-6">
          <div class="flex items-start space-x-6">
            <img 
              :src="`https://ui-avatars.com/api/?name=${encodeURIComponent(profile.name)}&background=6366F1&color=fff`"
              :alt="profile.name"
              class="h-24 w-24 rounded-full"
            />
            <div class="flex-1">
              <div class="flex items-center justify-between">
                <div>
                  <h3 class="text-2xl font-bold text-primary-900">{{ profile.name }}</h3>
                  <p class="text-gray-600">{{ profile.title }}</p>
                </div>
                <span class="px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                  Available for Work
                </span>
              </div>
              <div class="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 class="text-sm font-medium text-gray-500">Location</h4>
                  <p class="mt-1 text-gray-900">{{ profile.location }}</p>
                </div>
                <div>
                  <h4 class="text-sm font-medium text-gray-500">Experience</h4>
                  <p class="mt-1 text-gray-900">{{ profile.experience }}+ years</p>
                </div>
                <div>
                  <h4 class="text-sm font-medium text-gray-500">Skills</h4>
                  <div class="mt-1 flex flex-wrap gap-2">
                    <span 
                      v-for="skill in profile.skills.slice(0, 3)" 
                      :key="skill"
                      class="bg-primary-100 text-primary-800 text-sm px-3 py-1 rounded-full"
                    >
                      {{ skill }}
                    </span>
                    <span 
                      v-if="profile.skills.length > 3"
                      class="bg-gray-100 text-gray-800 text-sm px-3 py-1 rounded-full"
                    >
                      +{{ profile.skills.length - 3 }} more
                    </span>
                  </div>
                </div>
                <div>
                  <h4 class="text-sm font-medium text-gray-500">Languages</h4>
                  <div class="mt-1 flex flex-wrap gap-2">
                    <span 
                      v-for="language in profile.languages" 
                      :key="language"
                      class="bg-gray-100 text-gray-800 text-sm px-3 py-1 rounded-full"
                    >
                      {{ language }}
                    </span>
                  </div>
                </div>
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
          <div v-for="application in applications" :key="application.id" class="p-6">
            <div class="flex items-center justify-between">
              <div>
                <h3 class="text-lg font-medium text-primary-900">{{ application.jobTitle }}</h3>
                <p class="text-gray-600">{{ application.company }}</p>
                <div class="flex items-center mt-2">
                  <span class="text-sm text-gray-500">Applied {{ application.appliedDate }}</span>
                  <span class="mx-2 text-gray-300">•</span>
                  <span :class="getStatusClass(application.status)" class="text-sm font-medium">
                    {{ application.status }}
                  </span>
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
const profile = ref({
  name: 'Ahmed Hassan',
  title: 'Senior Software Engineer',
  location: 'Amsterdam, Netherlands',
  experience: 5,
  skills: ['JavaScript', 'TypeScript', 'React', 'Node.js', 'AWS', 'Docker'],
  languages: ['English', 'Arabic', 'Dutch']
})

const applications = ref([
  {
    id: '1',
    jobTitle: 'Senior Software Engineer',
    company: 'TechCorp',
    status: 'Under Review',
    appliedDate: '2 days ago'
  },
  {
    id: '2',
    jobTitle: 'Full Stack Developer',
    company: 'StartupX',
    status: 'Interview Scheduled',
    appliedDate: '1 week ago'
  }
])

const getStatusClass = (status: string) => {
  switch (status.toLowerCase()) {
    case 'under review':
      return 'text-yellow-600'
    case 'interview scheduled':
      return 'text-blue-600'
    case 'rejected':
      return 'text-red-600'
    case 'accepted':
      return 'text-green-600'
    default:
      return 'text-gray-600'
  }
}

const editProfile = () => {
  // TODO: Implement profile editing flow
  console.log('Edit profile')
}
</script> 