<template>
  <div class="min-h-screen bg-gray-50">
    <NavigationBar />
    <main :class="['transition-all duration-200', mainPadding]">
      <router-view />
    </main>
  </div>
</template>

<script setup lang="ts">
import NavigationBar from '@/components/NavigationBar.vue'
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const mainPadding = computed(() => {
  return route.path === '/jobs' || route.path === '/talent' ? 'pt-24' : 'pt-16'
})
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