<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold mb-8 text-primary-900">Faith-Aligned Jobs</h1>
    
    <!-- Search and Filters -->
    <div class="mb-8">
      <div class="flex flex-col md:flex-row gap-4">
        <div class="flex-1 relative">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search jobs by title, company, location, or skills..."
            class="w-full p-3 border-2 border-primary-200 rounded-lg focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-colors"
            @input="handleSearch"
          />
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 absolute right-3 top-1/2 transform -translate-y-1/2 text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <select
          v-model="locationFilter"
          class="p-3 border-2 border-primary-200 rounded-lg focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-colors"
        >
          <option value="">All Locations</option>
          <option value="Amsterdam, NL">Amsterdam</option>
          <option value="Rotterdam, NL">Rotterdam</option>
          <option value="Utrecht, NL">Utrecht</option>
          <option value="The Hague, NL">The Hague</option>
        </select>
      </div>
    </div>

    <!-- Job Listings -->
    <div v-if="!loading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="job in filteredJobs"
        :key="job.id"
        class="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow border border-primary-100 flex flex-col h-full"
      >
        <div class="flex-grow">
          <h2 class="text-xl font-semibold mb-2 text-primary-900">{{ job.title }}</h2>
          <p class="text-gray-600 mb-2">{{ job.company }}</p>
          <p class="text-gray-500 mb-4">{{ job.location }}</p>
          
          <div class="mb-4">
            <span 
              :class="[
                'text-sm px-3 py-1 rounded-full inline-flex items-center gap-1',
                job.type.toLowerCase() === 'full-time' 
                  ? 'bg-primary-600 text-white border border-primary-700' 
                  : 'bg-primary-50 text-primary-600 border border-primary-100'
              ]"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {{ job.type }}
            </span>
          </div>
          
          <p class="text-gray-700 mb-4 line-clamp-3">{{ job.description }}</p>
          
          <div class="mb-4">
            <h3 class="font-semibold mb-2 text-primary-900">Required Skills:</h3>
            <div class="flex flex-wrap gap-2">
              <span
                v-for="skill in job.requirements.slice(0, 3)"
                :key="skill"
                class="bg-primary-50 text-primary-700 text-sm px-3 py-1 rounded-full"
              >
                {{ skill }}
              </span>
              <span
                v-if="job.requirements.length > 3"
                class="bg-gray-100 text-gray-800 text-sm px-3 py-1 rounded-full cursor-pointer hover:bg-gray-200"
                @click="toggleShowAllRequirements(job.id)"
              >
                {{ isShowingAllRequirements(job.id) ? 'Show Less' : `+${job.requirements.length - 3} more` }}
              </span>
            </div>
            <div v-if="isShowingAllRequirements(job.id)" class="mt-2 flex flex-wrap gap-2">
              <span
                v-for="skill in job.requirements.slice(3)"
                :key="skill"
                class="bg-primary-50 text-primary-700 text-sm px-3 py-1 rounded-full"
              >
                {{ skill }}
              </span>
            </div>
          </div>

          <div class="border-t border-gray-200 pt-4 mt-4">
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
                <span class="text-sm text-gray-600">Halal Income</span>
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
                <span class="text-sm text-gray-600">Prayer Friendly</span>
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
                <span class="text-sm text-gray-600">Flexible Hours</span>
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
                <span class="text-sm text-gray-600">Modest Dress Code</span>
              </div>
            </div>
          </div>
        </div>
        
        <button
          class="w-full bg-primary-600 text-white py-2 px-4 rounded-lg hover:bg-primary-700 transition-colors flex items-center justify-center gap-2 mt-4"
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
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
    </div>

    <!-- No Results -->
    <div
      v-if="!loading && filteredJobs.length === 0"
      class="text-center py-12"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 mx-auto text-primary-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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

const router = useRouter()
const loading = ref(false)
const searchQuery = ref('')
const locationFilter = ref('')
const expandedJobs = ref<Set<string>>(new Set())

const filteredJobs = computed(() => {
  return jobs.filter(job => {
    const matchesSearch = searchQuery.value === '' || 
      job.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      job.company.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      job.location.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      job.requirements.some(skill => 
        skill.toLowerCase().includes(searchQuery.value.toLowerCase())
      )
    
    const matchesLocation = locationFilter.value === '' || 
      job.location === locationFilter.value
    
    return matchesSearch && matchesLocation
  })
})

const formatSalary = (salary: Job['salary']) => {
  return `${salary.currency} ${salary.min.toLocaleString()} - ${salary.max.toLocaleString()}`
}

const handleSearch = () => {
  // Debounce could be added here if needed
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