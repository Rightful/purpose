<template>
  <div class="container mx-auto px-4 py-8" v-if="talent">
    <div class="max-w-4xl mx-auto">
      <!-- Back Button -->
      <button 
        @click="router.back()"
        class="mb-6 flex items-center text-primary-600 hover:text-primary-700"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clip-rule="evenodd" />
        </svg>
        Back to Talent Pool
      </button>

      <!-- Profile Header -->
      <div class="bg-white rounded-lg shadow-md p-6 mb-6 border border-primary-100">
        <div class="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
          <img
            :src="talent.image"
            :alt="talent.name"
            class="h-32 w-32 rounded-full object-cover ring-4 ring-primary-200"
          />
          <div class="flex-1">
            <div class="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
              <div>
                <h1 class="text-2xl font-bold text-primary-900">{{ talent.name }}</h1>
                <p class="text-lg text-gray-600">{{ talent.title }}</p>
              </div>
              <div class="flex items-center space-x-2 mt-2 md:mt-0">
                <span 
                  :class="[
                    'inline-flex items-center px-3 py-1 rounded-full text-sm font-medium',
                    talent.availability.toLowerCase() === 'full-time' 
                      ? 'bg-primary-600 text-white border border-primary-700' 
                      : 'bg-primary-50 text-primary-600 border border-primary-100'
                  ]"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {{ talent.availability }}
                </span>
                <span v-if="talent.isVerified" class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800 border border-green-200">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                  </svg>
                  Verified Profile
                </span>
                <span v-if="talent.isCommunityMember" class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800 border border-purple-200">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                  </svg>
                  Active Community Member
                </span>
              </div>
            </div>
            <div class="flex items-center space-x-4 text-gray-600">
              <span class="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {{ talent.location }}
              </span>
              <span class="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {{ talent.experience }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- Main Content -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <!-- Left Column -->
        <div class="md:col-span-2 space-y-6">
          <!-- About Section -->
          <div class="bg-white rounded-lg shadow-md p-6 border border-primary-100">
            <h2 class="text-xl font-semibold text-primary-900 mb-4">About</h2>
            <p class="text-gray-600">{{ talent.bio || 'No bio available' }}</p>
          </div>

          <!-- Skills Section -->
          <div class="bg-white rounded-lg shadow-md p-6 border border-primary-100">
            <h2 class="text-xl font-semibold text-primary-900 mb-4">Skills</h2>
            <div class="flex flex-wrap gap-2">
              <span
                v-for="skill in talent.skills"
                :key="skill"
                class="bg-primary-100 text-primary-800 text-sm px-3 py-1 rounded-full"
              >
                {{ skill }}
              </span>
            </div>
          </div>

          <!-- Experience Section -->
          <div class="bg-white rounded-lg shadow-md p-6 border border-primary-100">
            <h2 class="text-xl font-semibold text-primary-900 mb-4">Experience</h2>
            <div class="space-y-4">
              <div v-if="talent.experienceDetails && talent.experienceDetails.length > 0">
                <div v-for="(exp, index) in talent.experienceDetails" :key="index" class="border-l-2 border-primary-200 pl-4">
                  <h3 class="font-medium text-primary-900">{{ exp.title }}</h3>
                  <p class="text-sm text-gray-500">{{ exp.company }} • {{ exp.duration }}</p>
                  <p class="text-gray-600 mt-1">{{ exp.description }}</p>
                </div>
              </div>
              <div v-else class="text-gray-600">
                No experience details available
              </div>
            </div>
          </div>
        </div>

        <!-- Right Column -->
        <div class="space-y-6">
          <!-- Faith Alignment -->
          <div class="bg-white rounded-lg shadow-md p-6 border border-primary-100">
            <h2 class="text-xl font-semibold text-primary-900 mb-4">Faith Alignment</h2>
            <div class="space-y-4">
              <div class="flex items-start space-x-3">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-primary-500 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <h3 class="text-sm font-medium text-gray-500">Prayer Time</h3>
                  <p class="text-primary-900">{{ talent.faithAlignment.prayerTimePreference === 'fixed' ? 'Fixed Schedule' : 'Flexible Schedule' }}</p>
                </div>
              </div>
              <div class="flex items-start space-x-3">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-primary-500 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <div>
                  <h3 class="text-sm font-medium text-gray-500">Hijab Policy</h3>
                  <p class="text-primary-900 capitalize">{{ talent.faithAlignment.hijabPolicy.replace('_', ' ') }}</p>
                </div>
              </div>
              <div class="flex items-start space-x-3">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-primary-500 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <div>
                  <h3 class="text-sm font-medium text-gray-500">Gender Preference</h3>
                  <p class="text-primary-900 capitalize">{{ talent.faithAlignment.genderPreference === 'none' ? 'All Genders' : talent.faithAlignment.genderPreference === 'male' ? 'Male Team' : 'Female Team' }}</p>
                </div>
              </div>
              <div class="flex items-start space-x-3">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-primary-500 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <div>
                  <h3 class="text-sm font-medium text-gray-500">Dietary Requirements</h3>
                  <p class="text-primary-900 capitalize">{{ talent.faithAlignment.dietaryRequirements === 'halal' ? 'Halal Diet' : 'No Restrictions' }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Contact Button -->
          <button
            class="w-full bg-primary-600 text-white py-3 px-4 rounded-lg hover:bg-primary-700 transition-colors flex items-center justify-center gap-2 font-medium"
            @click="contactTalent"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
              <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
            </svg>
            Contact {{ talent.name }}
          </button>
        </div>
      </div>
    </div>
  </div>
  <div v-else class="container mx-auto px-4 py-8 text-center">
    <p class="text-gray-600">Loading profile...</p>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { talents } from '@/data/talent'
import type { Talent } from '@/types'

const route = useRoute()
const router = useRouter()
const talent = ref<Talent | null>(null)

onMounted(() => {
  const talentId = route.params.id
  const foundTalent = talents.find(t => t.id === talentId)
  if (foundTalent) {
    talent.value = foundTalent
  } else {
    router.push('/')
  }
})

const contactTalent = () => {
  // TODO: Implement contact functionality
  alert('Contact functionality coming soon!')
}
</script> 