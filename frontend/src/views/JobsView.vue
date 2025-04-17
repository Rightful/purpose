<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-gray-900">Faith-Aligned Jobs</h1>
      <p class="mt-2 text-gray-600">Find opportunities that match your values and professional goals</p>
    </div>

    <!-- Search and Filters -->
    <div class="bg-white p-6 rounded-lg shadow-sm mb-8">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700">Search</label>
          <input
            type="text"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
            placeholder="Search jobs..."
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700">Faith-Based Filters</label>
          <select class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500">
            <option value="">All Opportunities</option>
            <option value="halal">Halal Income Only</option>
            <option value="prayer-friendly">Prayer-Friendly Workplace</option>
            <option value="muslim-led">Muslim-Led Companies</option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700">Location</label>
          <select class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500">
            <option value="">All Locations</option>
            <option value="nl">Netherlands</option>
            <option value="eu">Europe</option>
            <option value="remote">Remote</option>
          </select>
        </div>
      </div>
    </div>

    <!-- Job Listings -->
    <div class="space-y-6">
      <!-- Sample Job Card -->
      <div class="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
        <div class="flex justify-between items-start">
          <div>
            <h3 class="text-lg font-medium text-gray-900">Senior Software Engineer</h3>
            <p class="text-sm text-gray-500">Tech Company • Amsterdam, NL</p>
          </div>
          <div class="flex space-x-2">
            <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
              Prayer-Friendly
            </span>
            <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
              Halal Income
            </span>
          </div>
        </div>
        <p class="mt-2 text-gray-600">
          Join our growing team of Muslim professionals in building innovative solutions...
        </p>
        <div class="mt-4 flex items-center justify-between">
          <div class="flex items-center space-x-4">
            <span class="text-sm text-gray-500">Posted 2 days ago</span>
            <span class="text-sm text-gray-500">• 15 applications</span>
          </div>
          <button class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700">
            Apply Now
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Component logic will go here
</script> 