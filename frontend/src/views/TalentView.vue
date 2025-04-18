<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-primary-900">Muslim Talent Pool</h1>
      <p class="mt-2 text-gray-600">Connect with skilled professionals who share your values</p>
    </div>

    <!-- Search and Filters -->
    <div class="bg-white p-6 rounded-lg shadow-sm mb-8 border border-primary-100">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label class="block text-sm font-medium text-primary-900">Search Skills</label>
          <div class="relative mt-1">
            <input
              v-model="searchQuery"
              type="text"
              class="block w-full rounded-lg border-2 border-primary-200 shadow-sm focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-colors pl-3 pr-10 py-2"
              placeholder="Search by skills..."
              @input="handleSearch"
            />
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 absolute right-3 top-1/2 transform -translate-y-1/2 text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
        <div>
          <label class="block text-sm font-medium text-primary-900">Experience Level</label>
          <select 
            v-model="experienceFilter"
            class="mt-1 block w-full rounded-lg border-2 border-primary-200 shadow-sm focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-colors py-2"
          >
            <option value="">All Levels</option>
            <option value="2">2+ years</option>
            <option value="3">3+ years</option>
            <option value="4">4+ years</option>
            <option value="5">5+ years</option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-medium text-primary-900">Location</label>
          <select 
            v-model="locationFilter"
            class="mt-1 block w-full rounded-lg border-2 border-primary-200 shadow-sm focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-colors py-2"
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

    <!-- Talent Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <!-- Talent Card -->
      <div 
        v-for="talent in filteredTalents" 
        :key="talent.id"
        class="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-primary-100"
      >
        <div class="flex items-start space-x-4">
          <div class="flex-shrink-0">
            <img 
              class="h-16 w-16 rounded-full ring-2 ring-primary-200" 
              :src="`https://ui-avatars.com/api/?name=${encodeURIComponent(talent.name)}&background=6366F1&color=fff`" 
              :alt="talent.name" 
            />
          </div>
          <div class="flex-1">
            <div class="flex items-center justify-between">
              <h3 class="text-lg font-medium text-primary-900">{{ talent.name }}</h3>
              <div class="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span class="ml-1 text-sm text-gray-600">4.9</span>
              </div>
            </div>
            <p class="text-sm text-gray-500">{{ talent.title }}</p>
            <div class="mt-2 flex flex-wrap gap-2">
              <span 
                v-for="skill in talent.skills.slice(0, 3)" 
                :key="skill"
                class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800"
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
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {{ talent.location }}, NL
            </span>
            <span class="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {{ talent.experience }}+ years exp.
            </span>
          </div>
        </div>
        <div class="mt-4 flex items-center justify-between">
          <div class="flex items-center space-x-2">
            <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
              </svg>
              Verified
            </span>
            <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
              </svg>
              Community Member
            </span>
          </div>
          <button 
            class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-primary-600 hover:bg-primary-700 transition-colors"
            @click="viewTalentDetails(talent)"
          >
            <span>Connect</span>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-2" viewBox="0 0 20 20" fill="currentColor">
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
import { ref, computed } from 'vue';
import { talents } from '@/data/talents';
import type { Talent } from '@/types';

const searchQuery = ref('');
const locationFilter = ref('');
const experienceFilter = ref('');

const filteredTalents = computed(() => {
  return talents.filter(talent => {
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

const handleSearch = () => {
  // Debounce could be added here if needed
};

const viewTalentDetails = (talent: Talent) => {
  // Implement talent details view
  console.log('Viewing talent:', talent);
};
</script> 