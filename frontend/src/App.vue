<template>
  <div class="min-h-screen bg-gray-50">
    <nav class="bg-white shadow-sm">
      <div class="container mx-auto px-4">
        <div class="flex justify-between items-center h-16">
          <div class="flex items-center space-x-8">
            <router-link to="/" class="flex-shrink-0 flex items-center">
              <img src="@/assets/purpose_logo_light-background.png" alt="Purpose" class="h-8 w-auto" />
            </router-link>
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
          <div class="flex items-center space-x-4">
            <template v-if="!authStore.isAuthenticated">
              <router-link to="/auth/signup" class="btn-secondary">
                Sign Up
              </router-link>
              <router-link to="/auth/signin" class="btn-primary">
                Sign In
              </router-link>
            </template>
            <template v-else>
              <button @click="handleSignOut" class="btn-secondary">
                Sign Out
              </button>
            </template>
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