<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-2xl sm:text-3xl font-bold text-[#a680ff]">Available Jobs</h1>
    <p class="text-lg text-gray-600 mb-8">Find faith-aligned opportunities that match your values</p>

    <!-- Search and Filters -->
    <div class="bg-white rounded-xl shadow-sm p-6 mb-8">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <input
            type="text"
            v-model="searchQuery"
            placeholder="Search jobs..."
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#a680ff] focus:border-transparent"
          >
        </div>
        <div>
          <select
            v-model="locationFilter"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#a680ff] focus:border-transparent"
          >
            <option value="">All Locations</option>
            <option v-for="location in locations" :key="location" :value="location">
              {{ location }}
            </option>
          </select>
        </div>
        <div>
          <select
            v-model="typeFilter"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#a680ff] focus:border-transparent"
          >
            <option value="">All Types</option>
            <option v-for="type in jobTypes" :key="type" :value="type">
              {{ type }}
            </option>
          </select>
        </div>
        <div>
          <button
            @click="toggleHalalFilters"
            class="w-full px-4 py-2 bg-[#a680ff] text-white rounded-lg hover:bg-[#a680ff]/90 transition-colors"
          >
            Halal Filters
          </button>
        </div>
      </div>

      <!-- Halal Filters Panel -->
      <div v-if="showHalalFilters" class="mt-6 p-4 bg-gray-50 rounded-lg">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <!-- Core Business Compliance -->
          <div>
            <h3 class="text-lg font-medium text-[#a680ff] mb-3">Core Business Compliance</h3>
            <div class="space-y-2">
              <div class="flex items-center">
                <input type="checkbox" id="filterAlcohol" v-model="halalFilters.alcohol" class="h-4 w-4 text-[#a680ff] border-gray-300 rounded">
                <label for="filterAlcohol" class="ml-2 text-gray-700">No alcohol</label>
              </div>
              <div class="flex items-center">
                <input type="checkbox" id="filterPork" v-model="halalFilters.pork" class="h-4 w-4 text-[#a680ff] border-gray-300 rounded">
                <label for="filterPork" class="ml-2 text-gray-700">No pork</label>
              </div>
              <div class="flex items-center">
                <input type="checkbox" id="filterGambling" v-model="halalFilters.gambling" class="h-4 w-4 text-[#a680ff] border-gray-300 rounded">
                <label for="filterGambling" class="ml-2 text-gray-700">No gambling</label>
              </div>
              <div class="flex items-center">
                <input type="checkbox" id="filterFinance" v-model="halalFilters.conventionalFinance" class="h-4 w-4 text-[#a680ff] border-gray-300 rounded">
                <label for="filterFinance" class="ml-2 text-gray-700">No conventional finance</label>
              </div>
            </div>
          </div>

          <!-- Financial Purity -->
          <div>
            <h3 class="text-lg font-medium text-[#a680ff] mb-3">Financial Purity</h3>
            <div class="space-y-4">
              <div>
                <label class="block text-sm text-gray-700 mb-1">Max debt ratio (%)</label>
                <input 
                  type="number" 
                  v-model="halalFilters.maxDebtRatio" 
                  min="0" 
                  max="100" 
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#a680ff] focus:border-transparent"
                >
              </div>
              <div>
                <label class="block text-sm text-gray-700 mb-1">Max non-halal income (%)</label>
                <input 
                  type="number" 
                  v-model="halalFilters.maxNonHalalIncome" 
                  min="0" 
                  max="100" 
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#a680ff] focus:border-transparent"
                >
              </div>
            </div>
          </div>

          <!-- Workplace Accommodation -->
          <div>
            <h3 class="text-lg font-medium text-[#a680ff] mb-3">Workplace Accommodation</h3>
            <div class="space-y-2">
              <div class="flex items-center">
                <input type="checkbox" id="filterPrayer" v-model="halalFilters.prayerBreak" class="h-4 w-4 text-[#a680ff] border-gray-300 rounded">
                <label for="filterPrayer" class="ml-2 text-gray-700">Prayer breaks</label>
              </div>
              <div class="flex items-center">
                <input type="checkbox" id="filterDress" v-model="halalFilters.modestDress" class="h-4 w-4 text-[#a680ff] border-gray-300 rounded">
                <label for="filterDress" class="ml-2 text-gray-700">Modest dress</label>
              </div>
              <div class="flex items-center">
                <input type="checkbox" id="filterFood" v-model="halalFilters.halalFood" class="h-4 w-4 text-[#a680ff] border-gray-300 rounded">
                <label for="filterFood" class="ml-2 text-gray-700">Halal food</label>
              </div>
            </div>
          </div>
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
import { useAuthStore } from '@/stores/auth'
import { useJobsStore } from '@/stores/jobs'
import type { Job } from '@/types'
import { MapPinIcon, BriefcaseIcon } from '@heroicons/vue/24/outline'

const router = useRouter()
const authStore = useAuthStore()
const jobsStore = useJobsStore()

const loading = ref(false)
const searchQuery = ref('')
const locationFilter = ref('')
const typeFilter = ref('')
const showHalalFilters = ref(false)
const expandedJobs = ref<Set<string>>(new Set())

const halalFilters = ref({
  alcohol: false,
  pork: false,
  gambling: false,
  conventionalFinance: false,
  maxDebtRatio: 33,
  maxNonHalalIncome: 5,
  prayerBreak: false,
  modestDress: false,
  halalFood: false
})

const toggleHalalFilters = () => {
  showHalalFilters.value = !showHalalFilters.value
}

const filteredJobs = computed(() => {
  return jobsStore.jobs.filter(job => {
    // Text search
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                         job.company.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                         job.description.toLowerCase().includes(searchQuery.value.toLowerCase())
    
    // Location filter
    const matchesLocation = !locationFilter.value || job.location === locationFilter.value
    
    // Type filter
    const matchesType = !typeFilter.value || job.type === typeFilter.value
    
    // Halal compliance filters
    const matchesHalal = !showHalalFilters.value || (
      (!halalFilters.value.alcohol || !job.halalCompliance.alcohol) &&
      (!halalFilters.value.pork || !job.halalCompliance.pork) &&
      (!halalFilters.value.gambling || !job.halalCompliance.gambling) &&
      (!halalFilters.value.conventionalFinance || !job.halalCompliance.conventionalFinance) &&
      (!halalFilters.value.maxDebtRatio || job.halalCompliance.debtRatio <= halalFilters.value.maxDebtRatio) &&
      (!halalFilters.value.maxNonHalalIncome || job.halalCompliance.nonHalalIncomeRatio <= halalFilters.value.maxNonHalalIncome) &&
      (!halalFilters.value.prayerBreak || job.halalCompliance.prayerBreak) &&
      (!halalFilters.value.modestDress || job.halalCompliance.modestDress) &&
      (!halalFilters.value.halalFood || job.halalCompliance.halalFood)
    )
    
    return matchesSearch && matchesLocation && matchesType && matchesHalal
  })
})

// Get unique locations
const locations = computed(() => {
  const locations = new Set(jobsStore.jobs.map(job => job.location))
  return Array.from(locations)
})

const jobTypes = computed(() => {
  const types = new Set(jobsStore.jobs.map(job => job.type))
  return Array.from(types)
})

const formatSalary = (salary: { min: number; max: number; currency: string }) => {
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