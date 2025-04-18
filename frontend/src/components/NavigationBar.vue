<template>
  <nav class="fixed top-0 left-0 right-0 bg-white shadow-sm z-50">
    <div class="container mx-auto px-4">
      <div class="flex items-center justify-between h-16">
        <!-- Logo -->
        <router-link to="/" class="flex items-center">
          <img src="@/assets/purpose_logo_light-background.png" alt="Purpose" class="h-8 w-auto" />
        </router-link>

        <!-- Navigation and Auth Buttons -->
        <div class="flex items-center space-x-4">
          <!-- View Switching Buttons -->
          <div class="hidden md:flex items-center space-x-4 mr-4">
            <router-link 
              to="/jobs" 
              :class="[
                'flex items-center gap-2 px-4 py-2 rounded-full transition-colors',
                $route.path === '/jobs' 
                  ? 'bg-[#a680ff] text-white' 
                  : 'bg-[#a680ff]/10 text-[#a680ff] hover:bg-[#a680ff]/20'
              ]"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clip-rule="evenodd" />
                <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
              </svg>
              View Jobs
            </router-link>
            <router-link 
              to="/talent" 
              :class="[
                'flex items-center gap-2 px-4 py-2 rounded-full transition-colors',
                $route.path === '/talent' 
                  ? 'bg-[#a680ff] text-white' 
                  : 'bg-[#a680ff]/10 text-[#a680ff] hover:bg-[#a680ff]/20'
              ]"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
              </svg>
              View Talent
            </router-link>
          </div>

          <!-- Auth Buttons -->
          <template v-if="!authStore.isAuthenticated">
            <router-link 
              to="/auth/signin" 
              class="border border-[#a680ff] text-[#a680ff] px-4 py-2 rounded-md hover:bg-[#a680ff]/5 transition-colors"
            >
              Sign In
            </router-link>
            <router-link 
              to="/auth/signup" 
              class="bg-[#a680ff] text-white px-4 py-2 rounded-md hover:bg-[#a680ff]/90 transition-colors"
            >
              Sign Up
            </router-link>
          </template>
          <template v-else>
            <button 
              @click="authStore.signOut"
              class="border border-[#a680ff] text-[#a680ff] px-4 py-2 rounded-md hover:bg-[#a680ff]/5 transition-colors"
            >
              Sign Out
            </button>
          </template>
        </div>
      </div>

      <!-- Mobile Navigation Bar - Only show on Jobs and Talent pages -->
      <div v-if="$route.path === '/jobs' || $route.path === '/talent'" class="sm:hidden border-t border-gray-100">
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
      <!-- Empty div to maintain consistent height when switching buttons are hidden -->
      <div v-else class="h-0"></div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const route = useRoute()
const authStore = useAuthStore()
</script> 