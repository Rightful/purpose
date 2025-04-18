<template>
  <div class="min-h-screen bg-gray-50">
    <nav class="bg-white shadow-sm">
      <div class="container mx-auto px-4">
        <div class="flex justify-between items-center h-16">
          <!-- Logo and Desktop Navigation -->
          <div class="flex items-center space-x-8">
            <router-link to="/" class="flex-shrink-0 flex items-center">
              <img src="@/assets/purpose_logo_light-background.png" alt="Purpose" class="h-8 w-auto" />
            </router-link>
            <!-- Desktop Navigation -->
            <div class="hidden sm:flex sm:space-x-8">
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

          <!-- Auth Buttons -->
          <div class="flex items-center space-x-3">
            <template v-if="!authStore.isAuthenticated">
              <router-link to="/auth/signup" class="text-sm px-3 py-1.5 sm:px-4 sm:py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
                Sign Up
              </router-link>
              <router-link to="/auth/signin" class="text-sm px-3 py-1.5 sm:px-4 sm:py-2 border border-transparent rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
                Sign In
              </router-link>
            </template>
            <template v-else>
              <button @click="handleSignOut" class="text-sm px-3 py-1.5 sm:px-4 sm:py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
                Sign Out
              </button>
            </template>
          </div>
        </div>

        <!-- Mobile Navigation Bar (Separate from header) -->
        <div class="sm:hidden border-t border-gray-100">
          <div class="flex justify-center py-2">
            <router-link
              v-if="$route.path === '/jobs'"
              to="/talent"
              class="inline-flex items-center px-4 py-2 text-sm font-medium text-primary-600 hover:text-primary-900 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              Switch to Talent View
            </router-link>
            <router-link
              v-if="$route.path === '/talent'"
              to="/jobs"
              class="inline-flex items-center px-4 py-2 text-sm font-medium text-primary-600 hover:text-primary-900 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Switch to Jobs View
            </router-link>
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
import { RouterLink, RouterView, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const handleSignOut = () => {
  authStore.signOut()
  router.push('/')
}
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

.btn-primary {
  @apply inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500;
}

.btn-secondary {
  @apply inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500;
}
</style> 