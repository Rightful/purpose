<template>
  <div>
    <!-- Hero Section -->
    <div class="relative bg-white overflow-hidden">
      <div class="max-w-7xl mx-auto">
        <div class="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
          <main class="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
            <div class="sm:text-center lg:text-left">
              <h1 class="text-4xl tracking-tight font-extrabold text-primary-900 sm:text-5xl md:text-6xl">
                <span class="block text-primary-600">Faith-Aligned</span>
                <span class="block text-gray-900">Career Platform</span>
              </h1>
              <p class="mt-6 text-lg text-gray-600 sm:text-xl max-w-xl">
                Connecting Muslim professionals with opportunities that respect their values. Find jobs that align with Islamic principles or discover talented professionals for your organization.
              </p>
              <div class="mt-8 sm:mt-10 flex flex-col sm:flex-row sm:justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-4">
                <router-link to="/jobs" class="btn-primary">
                  Find Opportunities
                </router-link>
                <router-link to="/talent" class="btn-secondary">
                  Hire Talent
                </router-link>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>

    <!-- Value Proposition Section -->
    <div class="py-16 bg-gray-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="lg:text-center mb-16">
          <h2 class="text-base text-primary-600 font-bold tracking-wider uppercase">Why Purpose</h2>
          <p class="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Values-First Career Growth
          </p>
          <p class="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            We understand the unique needs of Muslim professionals in the modern workplace.
          </p>
        </div>

        <div class="mt-10">
          <div class="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
            <!-- Value Prop 1 -->
            <div class="relative bg-white p-6 rounded-lg shadow-md border border-primary-100">
              <div class="absolute flex items-center justify-center h-12 w-12 rounded-md bg-primary-600 text-white">
                <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div class="ml-16">
                <h3 class="text-lg font-bold text-gray-900 uppercase tracking-wide">Verified Opportunities</h3>
                <p class="mt-2 text-base text-gray-500">
                  Every job listing is vetted to ensure alignment with Islamic principles and values.
                </p>
              </div>
            </div>

            <!-- Value Prop 2 -->
            <div class="relative bg-white p-6 rounded-lg shadow-md border border-primary-100">
              <div class="absolute flex items-center justify-center h-12 w-12 rounded-md bg-primary-600 text-white">
                <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div class="ml-16">
                <h3 class="text-lg font-bold text-gray-900 uppercase tracking-wide">Trusted Network</h3>
                <p class="mt-2 text-base text-gray-500">
                  Connect with a community of professionals who understand and respect your faith-based requirements.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Component logic will go here
</script> 