<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold mb-8 text-primary-900">Muslim Talent Pool</h1>
    <p class="text-lg text-gray-600 mb-8">Connect with skilled professionals who share your values</p>

    <!-- Search and Filters -->
    <div class="bg-white p-6 rounded-lg shadow-sm mb-8 border border-primary-100">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-medium text-primary-900 mb-2">Search</label>
          <div class="relative">
            <input
              v-model="searchQuery"
              type="text"
              class="block w-full rounded-lg border-2 border-primary-200 shadow-sm focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-colors pl-4 pr-10 py-3"
              placeholder="Search by name, skills, or location..."
            />
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 absolute right-3 top-1/2 transform -translate-y-1/2 text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
        <div>
          <label class="block text-sm font-medium text-primary-900 mb-2">Location</label>
          <select
            v-model="locationFilter"
            class="block w-full rounded-lg border-2 border-primary-200 shadow-sm focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-colors py-3 px-4"
          >
            <option value="">All Locations</option>
            <option v-for="location in uniqueLocations" :key="location" :value="location">
              {{ location }}
            </option>
          </select>
        </div>
      </div>
    </div>

    <!-- Talent Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="talent in filteredTalents"
        :key="talent.id"
        class="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow border border-primary-100 flex flex-col h-full"
      >
        <div class="flex items-start space-x-4">
          <div class="flex-shrink-0">
            <img
              :src="talent.image"
              :alt="talent.name"
              class="h-20 w-20 rounded-full object-cover ring-2 ring-primary-200"
            />
          </div>
          <div class="flex-1 min-w-0">
            <div class="flex items-center justify-between mb-1">
              <h3 class="text-xl font-semibold text-primary-900 truncate">{{ talent.name }}</h3>
              <span 
                :class="[
                  'inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium',
                  talent.availability.toLowerCase() === 'full-time' 
                    ? 'bg-primary-600 text-white border border-primary-700' 
                    : 'bg-primary-50 text-primary-600 border border-primary-100'
                ]"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {{ talent.availability }}
              </span>
            </div>
            <p class="text-base text-gray-600 mb-3">{{ talent.title }}</p>
            <div class="flex items-center space-x-4 mb-4 text-sm text-gray-600">
              <span class="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {{ talent.location }}
              </span>
              <span class="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {{ talent.experience }}
              </span>
            </div>
          </div>
        </div>

        <!-- Skills -->
        <div class="mb-3">
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

        <!-- Faith-related Information -->
        <div class="mt-auto">
          <!-- Badges -->
          <div class="flex items-center space-x-2 mb-3">
            <span v-if="talent.isVerified" class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 border border-green-200">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
              </svg>
              Verified Profile
            </span>
            <span v-if="talent.isCommunityMember" class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800 border border-purple-200">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
              </svg>
              Active Community Member
            </span>
          </div>

          <div class="border-t border-gray-200 pt-3">
            <div class="grid grid-cols-2 gap-3">
              <div class="flex items-start space-x-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-primary-500 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div class="flex flex-col">
                  <span class="text-xs text-gray-500">Prayer Time</span>
                  <span class="text-sm font-medium text-primary-900 capitalize">{{ talent.faithAlignment.prayerTimePreference === 'fixed' ? 'Fixed Schedule' : 'Flexible Schedule' }}</span>
                </div>
              </div>
              <div class="flex items-start space-x-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-primary-500 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <div class="flex flex-col">
                  <span class="text-xs text-gray-500">Hijab Policy</span>
                  <span class="text-sm font-medium text-primary-900 capitalize">{{ talent.faithAlignment.hijabPolicy.replace('_', ' ') }}</span>
                </div>
              </div>
              <div class="flex items-start space-x-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-primary-500 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <div class="flex flex-col">
                  <span class="text-xs text-gray-500">Gender</span>
                  <span class="text-sm font-medium text-primary-900 capitalize">{{ talent.faithAlignment.genderPreference === 'none' ? 'All Genders' : talent.faithAlignment.genderPreference === 'male' ? 'Male Team' : 'Female Team' }}</span>
                </div>
              </div>
              <div class="flex items-start space-x-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-primary-500 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <div class="flex flex-col">
                  <span class="text-xs text-gray-500">Dietary</span>
                  <span class="text-sm font-medium text-primary-900 capitalize">{{ talent.faithAlignment.dietaryRequirements === 'halal' ? 'Halal Diet' : 'No Restrictions' }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="mt-4">
          <button
            class="w-full bg-primary-600 text-white py-2 px-4 rounded-lg hover:bg-primary-700 transition-colors flex items-center justify-center gap-2 font-medium"
            @click="viewTalentDetails(talent.id)"
          >
            <span>View Profile</span>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- No Results -->
    <div
      v-if="filteredTalents.length === 0"
      class="text-center py-12"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 mx-auto text-primary-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <p class="text-gray-600 text-lg">No talents found matching your criteria.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { talents } from '@/data/talent'
import type { Talent } from '@/types'

const router = useRouter()
const searchQuery = ref('')
const locationFilter = ref('')

// Get unique locations
const uniqueLocations = computed(() => {
  const locations = new Set(talents.map(talent => talent.location))
  return Array.from(locations)
})

// Filter talents based on search query and location
const filteredTalents = computed(() => {
  return talents.filter(talent => {
    const matchesSearch = talent.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      talent.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      talent.skills.some(skill => skill.toLowerCase().includes(searchQuery.value.toLowerCase())) ||
      talent.location.toLowerCase().includes(searchQuery.value.toLowerCase())
    
    const matchesLocation = !locationFilter.value || talent.location === locationFilter.value
    
    return matchesSearch && matchesLocation
  })
})

const viewTalentDetails = (id: string) => {
  router.push(`/talent/${id}`)
}
</script> 