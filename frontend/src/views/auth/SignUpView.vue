<template>
  <div class="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <h2 class="mt-6 text-center text-3xl font-extrabold text-[#a680ff]">
        Create your account
      </h2>
      <p class="mt-2 text-center text-sm text-gray-600">
        Or
        <router-link to="/auth/signin" class="font-medium text-[#a680ff] hover:text-[#a680ff]/80">
          sign in to your account
        </router-link>
      </p>
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <form class="space-y-6" @submit.prevent="handleSubmit">
          <div v-if="authStore.error" class="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md text-sm">
            {{ authStore.error }}
          </div>

          <!-- Step 1: Basic Information -->
          <div>
            <h3 class="text-lg font-medium text-[#a680ff] mb-4">Create Your Account</h3>
            <div class="space-y-4">
              <div>
                <label for="name" class="block text-sm font-medium text-gray-700">Full name</label>
                <input
                  id="name"
                  v-model="form.name"
                  type="text"
                  required
                  class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#a680ff] focus:border-[#a680ff] sm:text-sm"
                />
              </div>

              <div>
                <label for="email" class="block text-sm font-medium text-gray-700">Email address</label>
                <input
                  id="email"
                  v-model="form.email"
                  type="email"
                  required
                  class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#a680ff] focus:border-[#a680ff] sm:text-sm"
                />
              </div>

              <div>
                <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
                <input
                  id="password"
                  v-model="form.password"
                  type="password"
                  required
                  class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#a680ff] focus:border-[#a680ff] sm:text-sm"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700">I am a</label>
                <div class="mt-2 space-x-4">
                  <label class="inline-flex items-center">
                    <input
                      type="radio"
                      v-model="form.role"
                      value="talent"
                      class="h-4 w-4 text-[#a680ff] focus:ring-[#a680ff] border-gray-300"
                    />
                    <span class="ml-2 text-sm text-gray-700">Job Seeker</span>
                  </label>
                  <label class="inline-flex items-center">
                    <input
                      type="radio"
                      v-model="form.role"
                      value="company"
                      class="h-4 w-4 text-[#a680ff] focus:ring-[#a680ff] border-gray-300"
                    />
                    <span class="ml-2 text-sm text-gray-700">Company</span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div>
            <button
              type="submit"
              class="w-full px-4 py-2 bg-[#a680ff] text-white rounded-md hover:bg-[#a680ff]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#a680ff]"
            >
              Create Account
            </button>
          </div>
        </form>

        <div class="mt-6">
          <div class="relative">
            <div class="absolute inset-0 flex items-center">
              <div class="w-full border-t border-gray-300"></div>
            </div>
            <div class="relative flex justify-center text-sm">
              <span class="px-2 bg-white text-gray-500">
                Demo accounts
              </span>
            </div>
          </div>

          <div class="mt-6 grid grid-cols-2 gap-3">
            <div>
              <button
                @click="useDemoAccount('company')"
                class="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              >
                <span>Company Demo</span>
              </button>
            </div>
            <div>
              <button
                @click="useDemoAccount('talent')"
                class="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              >
                <span>Talent Demo</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()

const form = ref({
  name: '',
  email: '',
  password: '',
  role: 'talent' as 'talent' | 'company'
})

const handleSubmit = async () => {
  await authStore.signUp(form.value)
  if (!authStore.error) {
    router.push('/dashboard')
  }
}

const useDemoAccount = (role: 'company' | 'talent') => {
  if (role === 'company') {
    authStore.signIn('company@example.com', 'password')
  } else {
    authStore.signIn('talent@example.com', 'password')
  }
}
</script> 