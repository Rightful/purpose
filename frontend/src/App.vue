<template>
  <div class="min-h-screen bg-gray-50">
    <nav class="bg-white shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex">
            <router-link to="/" class="flex-shrink-0 flex items-center">
              <img src="@/assets/purpose_logo_light-background.png" alt="Purpose" class="h-8 w-auto" />
            </router-link>
            <div class="hidden sm:ml-8 sm:flex sm:space-x-8">
              <router-link
                to="/jobs"
                class="border-transparent text-gray-900 hover:border-primary-500 hover:text-primary-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-bold uppercase tracking-wider"
                :class="{ 'border-primary-500': $route.path === '/jobs' }"
              >
                Jobs
              </router-link>
              <router-link
                to="/talent"
                class="border-transparent text-gray-900 hover:border-primary-500 hover:text-primary-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-bold uppercase tracking-wider"
                :class="{ 'border-primary-500': $route.path === '/talent' }"
              >
                Talent
              </router-link>
            </div>
          </div>
          <div class="flex items-center space-x-4">
            <button class="btn-secondary">
              Sign Up
            </button>
            <button class="btn-primary">
              Sign In
            </button>
          </div>
        </div>
      </div>
    </nav>

    <main>
      <router-view></router-view>
    </main>
  </div>
</template>

<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<style>
@import './assets/main.css';

@font-face {
  font-family: 'Arabic';
  src: url('https://fonts.googleapis.com/css2?family=Noto+Naskh+Arabic:wght@400;500;600;700&display=swap');
}

.font-arabic {
  font-family: 'Noto Naskh Arabic', serif;
}
</style> 