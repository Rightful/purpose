<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-gray-900">Muslim Talent Pool</h1>
      <p class="mt-2 text-gray-600">Connect with skilled professionals who share your values</p>
    </div>

    <!-- Search and Filters -->
    <div class="bg-white p-6 rounded-lg shadow-sm mb-8">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700">Search Skills</label>
          <input
            v-model="searchQuery"
            type="text"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
            placeholder="Search by skills..."
            @input="handleSearch"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700">Experience Level</label>
          <select 
            v-model="experienceFilter"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
          >
            <option value="">All Levels</option>
            <option value="2">2+ years</option>
            <option value="3">3+ years</option>
            <option value="4">4+ years</option>
            <option value="5">5+ years</option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700">Location</label>
          <select 
            v-model="locationFilter"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
          >
            <option value="">All Locations</option>
            <option value="Amsterdam">Amsterdam</option>
            <option value="Rotterdam">Rotterdam</option>
            <option value="Utrecht">Utrecht</option>
            <option value="The Hague">The Hague</option>
          </select>
        </div>
      </div>
    </div>

    <!-- Loading State -->
    <div
      v-if="loading"
      class="flex justify-center items-center py-8"
    >
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
    </div>

    <!-- Error Message -->
    <div
      v-if="error"
      class="text-center py-8 text-red-500"
    >
      {{ error }}
    </div>

    <!-- Talent Grid -->
    <div v-if="!loading && !error" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <!-- Talent Card -->
      <div 
        v-for="talent in filteredTalents" 
        :key="talent.id"
        class="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
      >
        <div class="flex items-start space-x-4">
          <div class="flex-shrink-0">
            <img 
              class="h-16 w-16 rounded-full" 
              :src="`https://ui-avatars.com/api/?name=${encodeURIComponent(talent.name)}&background=0D8ABC&color=fff`" 
              :alt="talent.name" 
            />
          </div>
          <div class="flex-1">
            <div class="flex items-center justify-between">
              <h3 class="text-lg font-medium text-gray-900">{{ talent.name }}</h3>
              <div class="flex items-center">
                <span class="text-yellow-400">★</span>
                <span class="ml-1 text-sm text-gray-600">4.9</span>
              </div>
            </div>
            <p class="text-sm text-gray-500">{{ talent.title }}</p>
            <div class="mt-2 flex flex-wrap gap-2">
              <span 
                v-for="skill in talent.skills.slice(0, 3)" 
                :key="skill"
                class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
              >
                {{ skill }}
              </span>
              <span 
                v-if="talent.skills.length > 3" 
                class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
              >
                +{{ talent.skills.length - 3 }} more
              </span>
            </div>
          </div>
        </div>
        <div class="mt-4">
          <div class="flex items-center space-x-4 text-sm text-gray-500">
            <span class="flex items-center">
              <svg class="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {{ talent.location }}, NL
            </span>
            <span class="flex items-center">
              <svg class="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {{ talent.experience }}+ years exp.
            </span>
          </div>
        </div>
        <div class="mt-4 flex items-center justify-between">
          <div class="flex items-center space-x-2">
            <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
              Verified
            </span>
            <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
              Community Member
            </span>
          </div>
          <button 
            class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700"
            @click="viewTalentDetails(talent)"
          >
            Connect
          </button>
        </div>
      </div>
    </div>

    <!-- No Results -->
    <div
      v-if="!loading && !error && filteredTalents.length === 0"
      class="text-center py-8 text-gray-500"
    >
      No talents found matching your criteria.
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import api, { type Talent } from '@/services/api';

const talents = ref<Talent[]>([]);
const loading = ref(true);
const error = ref<string | null>(null);
const searchQuery = ref('');
const locationFilter = ref('');
const experienceFilter = ref('');

const filteredTalents = computed(() => {
  if (!Array.isArray(talents.value)) {
    return [];
  }
  
  return talents.value.filter(talent => {
    const matchesLocation = !locationFilter.value || talent.location === locationFilter.value;
    const matchesExperience = !experienceFilter.value || talent.experience >= parseInt(experienceFilter.value);
    
    // If there's a search query, check if it matches any skills
    if (searchQuery.value.trim()) {
      const searchTerms = searchQuery.value.toLowerCase().split(' ');
      const searchableText = [
        talent.name,
        talent.title,
        talent.location,
        talent.bio,
        ...talent.skills,
        ...talent.languages,
        ...talent.certifications,
        ...talent.education.map(edu => `${edu.degree} ${edu.institution}`)
      ].join(' ').toLowerCase();
      
      return searchTerms.every(term => searchableText.includes(term)) && 
             matchesLocation && 
             matchesExperience;
    }
    
    return matchesLocation && matchesExperience;
  });
});

const handleSearch = async () => {
  if (searchQuery.value.trim()) {
    loading.value = true;
    error.value = null;
    try {
      talents.value = await api.searchTalents(searchQuery.value);
    } catch (err) {
      console.error('Error searching talents:', err);
      error.value = 'Failed to search talents. Please try again.';
      talents.value = [];
    }
    loading.value = false;
  } else {
    loadTalents();
  }
};

const loadTalents = async () => {
  loading.value = true;
  error.value = null;
  try {
    talents.value = await api.getTalents();
  } catch (err) {
    console.error('Error loading talents:', err);
    error.value = 'Failed to load talents. Please try again later.';
    talents.value = [];
  }
  loading.value = false;
};

const viewTalentDetails = (talent: Talent) => {
  // Implement talent details view
  console.log('Viewing talent:', talent);
};

onMounted(() => {
  loadTalents();
});
</script> 