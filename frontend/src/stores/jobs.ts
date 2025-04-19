import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Job } from '@/types'
import { jobs as jobData } from '@/data/jobs'

export const useJobsStore = defineStore('jobs', () => {
  const jobs = ref<Job[]>(jobData)

  const addJob = (job: Job) => {
    jobs.value.push(job)
  }

  const updateJob = (id: string, updatedJob: Partial<Job>) => {
    const index = jobs.value.findIndex(job => job.id === id)
    if (index !== -1) {
      jobs.value[index] = { ...jobs.value[index], ...updatedJob }
    }
  }

  const deleteJob = (id: string) => {
    jobs.value = jobs.value.filter(job => job.id !== id)
  }

  const getJob = (id: string) => {
    return jobs.value.find(job => job.id === id)
  }

  return {
    jobs,
    addJob,
    updateJob,
    deleteJob,
    getJob
  }
}) 