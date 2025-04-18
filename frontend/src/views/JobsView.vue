<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-2xl sm:text-3xl font-bold text-[#a680ff]">Available Jobs</h1>
    <p class="text-lg text-gray-600 mb-8">Find faith-aligned opportunities that match your values</p>

    <!-- Search and Filters -->
    <div class="flex flex-col sm:flex-row gap-4 mb-8">
      <div class="flex-1">
        <div class="relative">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search jobs..."
            class="w-full pl-10 pr-4 py-2 border border-[#a680ff]/20 rounded-lg focus:ring-2 focus:ring-[#a680ff]/20 focus:border-[#a680ff] placeholder:text-[#a680ff]/40 focus:outline-none focus:ring-offset-0"
          />
          <MagnifyingGlassIcon class="h-5 w-5 text-[#a680ff] absolute left-3 top-1/2 transform -translate-y-1/2" />
        </div>
      </div>
      <div class="flex-1">
        <div class="relative">
          <select
            v-model="selectedLocation"
            class="w-full pl-10 pr-4 py-2 border border-[#a680ff]/20 rounded-lg focus:ring-2 focus:ring-[#a680ff]/20 focus:border-[#a680ff] appearance-none bg-white text-[#a680ff] placeholder:text-[#a680ff]/40 focus:outline-none focus:ring-offset-0"
          >
            <option value="" class="text-[#a680ff]/40">All Locations</option>
            <option v-for="location in locations" :key="location" :value="location">
              {{ location }}
            </option>
          </select>
          <MapPinIcon class="h-5 w-5 text-[#a680ff] absolute left-3 top-1/2 transform -translate-y-1/2" />
        </div>
      </div>
    </div>

    <!-- Job Listings -->
    <div v-if="!loading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="job in filteredJobs"
        :key="job.id"
        class="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow border border-[#a680ff]/20 flex flex-col h-full"
      >
        <div class="flex-grow">
          <div class="flex items-start space-x-4">
            <div class="flex-shrink-0">
              <img
                :src="job.companyLogo"
                :alt="job.company"
                class="h-16 w-16 rounded-full object-cover ring-2 ring-[#a680ff]/20"
              />
            </div>
            <div class="flex-1 min-w-0">
              <h2 class="text-xl font-semibold mb-2 text-[#a680ff]">{{ job.title }}</h2>
              <p class="text-gray-600 mb-2">{{ job.company }}</p>
              <p class="text-gray-500 mb-4">{{ job.location }}</p>
              
              <div class="mb-4">
                <span 
                  :class="[
                    'text-sm px-3 py-1 rounded-full inline-flex items-center gap-1',
                    job.type.toLowerCase() === 'full-time' 
                      ? 'bg-[#a680ff] text-white border border-[#a680ff]' 
                      : 'bg-[#a680ff]/10 text-[#a680ff] border border-[#a680ff]/20'
                  ]"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {{ job.type }}
                </span>
              </div>
              
              <p class="text-gray-700 mb-6 line-clamp-4">{{ job.description }}</p>
            </div>
          </div>
        </div>

        <div class="mt-auto">
          <div class="border-t border-[#a680ff]/20 pt-4">
            <div class="grid grid-cols-2 gap-4">
              <div class="flex items-center">
                <span
                  :class="job.faithAlignment.halalIncome ? 'text-green-500' : 'text-red-500'"
                  class="mr-2"
                >
                  <svg v-if="job.faithAlignment.halalIncome" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                  </svg>
                  <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
                  </svg>
                </span>
                <span class="text-sm text-[#a680ff]">Halal Income</span>
              </div>
              <div class="flex items-center">
                <span
                  :class="job.faithAlignment.prayerFriendly ? 'text-green-500' : 'text-red-500'"
                  class="mr-2"
                >
                  <svg v-if="job.faithAlignment.prayerFriendly" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                  </svg>
                  <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
                  </svg>
                </span>
                <span class="text-sm text-[#a680ff]">Prayer Friendly</span>
              </div>
              <div class="flex items-center">
                <span
                  :class="job.faithAlignment.flexibleHours ? 'text-green-500' : 'text-red-500'"
                  class="mr-2"
                >
                  <svg v-if="job.faithAlignment.flexibleHours" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                  </svg>
                  <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
                  </svg>
                </span>
                <span class="text-sm text-[#a680ff]">Flexible Hours</span>
              </div>
              <div class="flex items-center">
                <span
                  :class="job.faithAlignment.modestDressCode ? 'text-green-500' : 'text-red-500'"
                  class="mr-2"
                >
                  <svg v-if="job.faithAlignment.modestDressCode" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                  </svg>
                  <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
                  </svg>
                </span>
                <span class="text-sm text-[#a680ff]">Modest Dress Code</span>
              </div>
            </div>
          </div>
        </div>
        
        <button
          class="w-full bg-[#a680ff] text-white py-2 px-4 rounded-lg hover:bg-[#a680ff]/90 transition-colors flex items-center justify-center gap-2 mt-4"
          @click="viewJobDetails(job.id)"
        >
          <span>View Details</span>
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd" />
          </svg>
        </button>
      </div>
    </div>

    <!-- Loading State -->
    <div v-else class="flex justify-center items-center h-64">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-[#a680ff]"></div>
    </div>

    <!-- No Results -->
    <div
      v-if="!loading && filteredJobs.length === 0"
      class="text-center py-12"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 mx-auto text-[#a680ff]/40 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <p class="text-gray-600 text-lg">No jobs found matching your criteria.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { jobs } from '@/data/jobs'
import type { Job } from '@/types'
import { MapPinIcon, MagnifyingGlassIcon } from '@heroicons/vue/24/outline'

const router = useRouter()
const loading = ref(false)
const searchQuery = ref('')
const selectedLocation = ref('')
const expandedJobs = ref<Set<string>>(new Set())

// Get unique locations
const locations = computed(() => {
  const locations = new Set(jobs.map(job => job.location))
  return Array.from(locations)
})

// Filter jobs based on search query and location
const filteredJobs = computed(() => {
  return jobs.filter(job => {
    const matchesSearch = 
      job.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      job.company.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      job.description.toLowerCase().includes(searchQuery.value.toLowerCase())

    const matchesLocation = !selectedLocation.value || job.location === selectedLocation.value

    return matchesSearch && matchesLocation
  })
})

const formatSalary = (salary: Job['salary']) => {
  return `${salary.currency} ${salary.min.toLocaleString()} - ${salary.max.toLocaleString()}`
}

const isShowingAllRequirements = (jobId: string) => {
  return expandedJobs.value.has(jobId)
}

const toggleShowAllRequirements = (jobId: string) => {
  if (expandedJobs.value.has(jobId)) {
    expandedJobs.value.delete(jobId)
  } else {
    expandedJobs.value.add(jobId)
  }
}

const viewJobDetails = (jobId: string) => {
  router.push(`/jobs/${jobId}`)
}
</script> 