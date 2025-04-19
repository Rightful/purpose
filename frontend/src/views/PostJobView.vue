<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-2xl sm:text-3xl font-bold text-[#a680ff] mb-6">Post a New Job</h1>
    
    <form @submit.prevent="handleSubmit" class="space-y-6">
      <!-- Basic Information -->
      <div class="bg-white p-6 rounded-lg shadow-sm border border-[#a680ff]/20">
        <h2 class="text-lg font-semibold text-[#a680ff] mb-4">Basic Information</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Job Title</label>
            <input
              v-model="job.title"
              type="text"
              required
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#a680ff] focus:border-transparent"
            >
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
            <input
              v-model="job.company"
              type="text"
              required
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#a680ff] focus:border-transparent"
            >
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Location</label>
            <input
              v-model="job.location"
              type="text"
              required
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#a680ff] focus:border-transparent"
            >
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Job Type</label>
            <select
              v-model="job.type"
              required
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#a680ff] focus:border-transparent"
            >
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Contract">Contract</option>
              <option value="Internship">Internship</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Ethical Compliance -->
      <div class="bg-white p-6 rounded-lg shadow-sm border border-[#a680ff]/20">
        <h2 class="text-lg font-semibold text-[#a680ff] mb-4">Ethical Compliance</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="space-y-4">
            <h3 class="font-medium text-[#a680ff]">Business Practices</h3>
            <div class="space-y-2">
              <label class="flex items-center">
                <input type="checkbox" v-model="job.ethicalCompliance.alcohol" class="rounded border-[#a680ff]/20 text-[#a680ff] focus:ring-[#a680ff]">
                <span class="ml-2">No Alcohol Involvement</span>
              </label>
              <label class="flex items-center">
                <input type="checkbox" v-model="job.ethicalCompliance.pork" class="rounded border-[#a680ff]/20 text-[#a680ff] focus:ring-[#a680ff]">
                <span class="ml-2">No Pork Products</span>
              </label>
              <label class="flex items-center">
                <input type="checkbox" v-model="job.ethicalCompliance.gambling" class="rounded border-[#a680ff]/20 text-[#a680ff] focus:ring-[#a680ff]">
                <span class="ml-2">No Gambling</span>
              </label>
              <label class="flex items-center">
                <input type="checkbox" v-model="job.ethicalCompliance.conventionalFinance" class="rounded border-[#a680ff]/20 text-[#a680ff] focus:ring-[#a680ff]">
                <span class="ml-2">No Conventional Finance</span>
              </label>
            </div>
          </div>

          <div class="space-y-4">
            <h3 class="font-medium text-[#a680ff]">Environmental & Social</h3>
            <div class="space-y-2">
              <label class="flex items-center">
                <input type="checkbox" v-model="job.ethicalCompliance.environmentalImpact" class="rounded border-[#a680ff]/20 text-[#a680ff] focus:ring-[#a680ff]">
                <span class="ml-2">Positive Environmental Impact</span>
              </label>
              <label class="flex items-center">
                <input type="checkbox" v-model="job.ethicalCompliance.socialResponsibility" class="rounded border-[#a680ff]/20 text-[#a680ff] focus:ring-[#a680ff]">
                <span class="ml-2">Social Responsibility</span>
              </label>
              <label class="flex items-center">
                <input type="checkbox" v-model="job.ethicalCompliance.fairTrade" class="rounded border-[#a680ff]/20 text-[#a680ff] focus:ring-[#a680ff]">
                <span class="ml-2">Fair Trade Practices</span>
              </label>
              <label class="flex items-center">
                <input type="checkbox" v-model="job.ethicalCompliance.animalWelfare" class="rounded border-[#a680ff]/20 text-[#a680ff] focus:ring-[#a680ff]">
                <span class="ml-2">Animal Welfare</span>
              </label>
            </div>
          </div>

          <div class="space-y-4">
            <h3 class="font-medium text-[#a680ff]">Workplace Policies</h3>
            <div class="space-y-2">
              <label class="flex items-center">
                <input type="checkbox" v-model="job.ethicalCompliance.prayerBreak" class="rounded border-[#a680ff]/20 text-[#a680ff] focus:ring-[#a680ff]">
                <span class="ml-2">Prayer Break Accommodation</span>
              </label>
              <label class="flex items-center">
                <input type="checkbox" v-model="job.ethicalCompliance.modestDress" class="rounded border-[#a680ff]/20 text-[#a680ff] focus:ring-[#a680ff]">
                <span class="ml-2">Modest Dress Code</span>
              </label>
              <label class="flex items-center">
                <input type="checkbox" v-model="job.ethicalCompliance.ethicalFood" class="rounded border-[#a680ff]/20 text-[#a680ff] focus:ring-[#a680ff]">
                <span class="ml-2">Ethical Food Options</span>
              </label>
            </div>
          </div>

          <div class="space-y-4">
            <h3 class="font-medium text-[#a680ff]">Financial Ratios</h3>
            <div class="space-y-2">
              <div>
                <label class="block text-sm font-medium text-gray-700">Debt Ratio (%)</label>
                <input type="number" v-model="job.ethicalCompliance.debtRatio" class="mt-1 block w-full rounded-md border-[#a680ff]/20 shadow-sm focus:border-[#a680ff] focus:ring-[#a680ff]">
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700">Non-Ethical Income Ratio (%)</label>
                <input type="number" v-model="job.ethicalCompliance.nonEthicalIncomeRatio" class="mt-1 block w-full rounded-md border-[#a680ff]/20 shadow-sm focus:border-[#a680ff] focus:ring-[#a680ff]">
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Job Details -->
      <div class="bg-white rounded-xl shadow-sm p-6">
        <h2 class="text-xl font-semibold text-[#a680ff] mb-4">Job Details</h2>
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              v-model="job.description"
              required
              rows="4"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#a680ff] focus:border-transparent"
            ></textarea>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Requirements</label>
            <div class="space-y-2">
              <div v-for="(req, index) in job.requirements" :key="index" class="flex items-center">
                <input
                  v-model="job.requirements[index]"
                  type="text"
                  required
                  class="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#a680ff] focus:border-transparent"
                >
                <button
                  type="button"
                  @click="removeRequirement(index)"
                  class="ml-2 text-red-500 hover:text-red-700"
                >
                  Remove
                </button>
              </div>
              <button
                type="button"
                @click="addRequirement"
                class="text-[#a680ff] hover:text-[#a680ff]/80"
              >
                + Add Requirement
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="flex justify-end">
        <button
          type="submit"
          class="px-6 py-2 bg-[#a680ff] text-white rounded-lg hover:bg-[#a680ff]/90 transition-colors"
        >
          Post Job
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useJobsStore } from '@/stores/jobs'
import type { Job } from '@/types'

const router = useRouter()
const authStore = useAuthStore()
const jobsStore = useJobsStore()

const job = ref<Job>({
  id: '',
  title: '',
  company: '',
  companyId: authStore.user?.id || '',
  companyLogo: '',
  location: '',
  type: '',
  description: '',
  salary: {
    min: 0,
    max: 0,
    currency: 'EUR'
  },
  requirements: [],
  experience: '',
  responsibilities: [],
  faithAlignment: {
    ethicalIncome: false,
    prayerFriendly: false,
    flexibleHours: false,
    modestDressCode: false
  },
  ethicalCompliance: {
    alcohol: false,
    pork: false,
    gambling: false,
    conventionalFinance: false,
    environmentalImpact: false,
    socialResponsibility: false,
    fairTrade: false,
    animalWelfare: false,
    prayerBreak: false,
    modestDress: false,
    ethicalFood: false,
    debtRatio: 0,
    nonEthicalIncomeRatio: 0
  },
  postedDate: new Date().toISOString(),
  applicationDeadline: '',
  contactEmail: '',
  website: ''
})

const addRequirement = () => {
  job.value.requirements?.push('')
}

const removeRequirement = (index: number) => {
  job.value.requirements?.splice(index, 1)
}

const handleSubmit = async () => {
  try {
    const newJob: Job = {
      ...job.value,
      id: crypto.randomUUID(),
      postedDate: new Date().toISOString(),
      applicationDeadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      contactEmail: authStore.user?.email || '',
      website: '',
      faithAlignment: {
        ethicalIncome: job.value.ethicalCompliance.conventionalFinance,
        prayerFriendly: job.value.ethicalCompliance.prayerBreak,
        flexibleHours: true,
        modestDressCode: job.value.ethicalCompliance.modestDress
      }
    }
    
    await jobsStore.addJob(newJob)
    router.push(`/jobs/${newJob.id}`)
  } catch (error) {
    console.error('Error posting job:', error)
  }
}

onMounted(() => {
  if (!authStore.isAuthenticated) {
    router.push('/login')
  }
})
</script> 