<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold mb-8">Islamic Jobs in the Netherlands</h1>
    
    <!-- Search Bar -->
    <div class="mb-8">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Search jobs by title, company, location, or skills..."
        class="w-full p-4 border rounded-lg shadow-sm focus:ring-2 focus:ring-green-500 focus:border-transparent"
        @input="handleSearch"
      />
    </div>

    <!-- Filters -->
    <div class="mb-8 flex flex-wrap gap-4">
      <select
        v-model="locationFilter"
        class="p-2 border rounded-lg"
      >
        <option value="">All Locations</option>
        <option value="Amsterdam">Amsterdam</option>
        <option value="Rotterdam">Rotterdam</option>
        <option value="Utrecht">Utrecht</option>
        <option value="The Hague">The Hague</option>
      </select>

      <select
        v-model="experienceFilter"
        class="p-2 border rounded-lg"
      >
        <option value="">All Experience Levels</option>
        <option value="2">2+ years</option>
        <option value="3">3+ years</option>
        <option value="4">4+ years</option>
        <option value="5">5+ years</option>
      </select>
    </div>

    <!-- Jobs List -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="job in filteredJobs"
        :key="job.id"
        class="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
      >
        <h2 class="text-xl font-semibold mb-2">{{ job.title }}</h2>
        <h3 class="text-lg text-gray-600 mb-2">{{ job.company }}</h3>
        <div class="flex items-center text-gray-500 mb-4">
          <span class="mr-4">{{ job.location }}</span>
          <span>{{ job.type }}</span>
        </div>
        <p class="text-gray-700 mb-4">{{ job.description }}</p>
        <div class="mb-4">
          <h4 class="font-semibold mb-2">Salary Range:</h4>
          <p class="text-green-600">
            {{ job.salary.min.toLocaleString() }} - {{ job.salary.max.toLocaleString() }} {{ job.salary.currency }}
          </p>
        </div>
        <div class="mb-4">
          <h4 class="font-semibold mb-2">Required Skills:</h4>
          <div class="flex flex-wrap gap-2">
            <span
              v-for="skill in job.requirements"
              :key="skill"
              class="bg-gray-100 px-3 py-1 rounded-full text-sm"
            >
              {{ skill }}
            </span>
          </div>
        </div>
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-2">
            <span
              v-if="job.faithAlignment.halalIncome"
              class="bg-green-100 text-green-800 px-2 py-1 rounded text-sm"
            >
              Halal Income
            </span>
            <span
              v-if="job.faithAlignment.prayerFriendly"
              class="bg-green-100 text-green-800 px-2 py-1 rounded text-sm"
            >
              Prayer Friendly
            </span>
          </div>
          <button
            class="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
            @click="viewJobDetails(job)"
          >
            View Details
          </button>
        </div>
      </div>
    </div>

    <!-- Loading State -->
    <div
      v-if="loading"
      class="flex justify-center items-center py-8"
    >
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
    </div>

    <!-- No Results -->
    <div
      v-if="!loading && filteredJobs.length === 0"
      class="text-center py-8 text-gray-500"
    >
      No jobs found matching your criteria.
    </div>

    <!-- Error Message -->
    <div
      v-if="error"
      class="text-center py-8 text-red-500"
    >
      {{ error }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import api, { type Job } from '@/services/api';

const jobs = ref<Job[]>([]);
const loading = ref(true);
const error = ref<string | null>(null);
const searchQuery = ref('');
const locationFilter = ref('');
const experienceFilter = ref('');

const filteredJobs = computed(() => {
  if (!Array.isArray(jobs.value)) {
    return [];
  }
  
  return jobs.value.filter(job => {
    const matchesLocation = !locationFilter.value || job.location === locationFilter.value;
    const matchesExperience = !experienceFilter.value || job.experience >= parseInt(experienceFilter.value);
    return matchesLocation && matchesExperience;
  });
});

const handleSearch = async () => {
  if (searchQuery.value.trim()) {
    loading.value = true;
    error.value = null;
    try {
      jobs.value = await api.searchJobs(searchQuery.value);
    } catch (err) {
      console.error('Error searching jobs:', err);
      error.value = 'Failed to search jobs. Please try again.';
      jobs.value = [];
    }
    loading.value = false;
  } else {
    loadJobs();
  }
};

const loadJobs = async () => {
  loading.value = true;
  error.value = null;
  try {
    jobs.value = await api.getJobs();
  } catch (err) {
    console.error('Error loading jobs:', err);
    error.value = 'Failed to load jobs. Please try again later.';
    jobs.value = [];
  }
  loading.value = false;
};

const viewJobDetails = (job: Job) => {
  // Implement job details view
  console.log('Viewing job:', job);
};

onMounted(() => {
  loadJobs();
});
</script> 