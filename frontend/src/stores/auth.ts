import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

interface User {
  name: string
  email: string
  role: 'talent' | 'company'
  preferences?: {
    alcohol: boolean
    pork: boolean
    gambling: boolean
    interest: boolean
    environmental: boolean
    social: boolean
    governance: boolean
    diversity: boolean
    workLifeBalance: boolean
    prayer: boolean
    dressCode: boolean
    debtToEquity: number
    currentRatio: number
    returnOnEquity: number
  }
}

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  const isLoading = ref(false)

  const isAuthenticated = computed(() => !!user.value)

  const signUp = async (data: {
    name: string
    email: string
    role: 'talent' | 'company'
  }) => {
    try {
      isLoading.value = true
      
      // Create simple user object
      const newUser: User = {
        name: data.name,
        email: data.email,
        role: data.role
      }

      // Store user in localStorage
      localStorage.setItem('user', JSON.stringify(newUser))
      user.value = newUser
      
      return newUser
    } catch (error: any) {
      throw new Error(error.message || 'An error occurred during signup')
    } finally {
      isLoading.value = false
    }
  }

  const signOut = () => {
    user.value = null
    localStorage.removeItem('user')
  }

  const checkAuth = () => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      user.value = JSON.parse(storedUser)
    }
  }

  const updatePreferences = async (preferences: User['preferences']) => {
    try {
      isLoading.value = true
      if (!user.value) throw new Error('User not authenticated')

      // Update user preferences
      const updatedUser = {
        ...user.value,
        preferences
      }

      // Store updated user in localStorage
      localStorage.setItem('user', JSON.stringify(updatedUser))
      user.value = updatedUser

      return updatedUser
    } catch (error: any) {
      throw new Error(error.message || 'Failed to update preferences')
    } finally {
      isLoading.value = false
    }
  }

  return {
    user,
    isLoading,
    isAuthenticated,
    signUp,
    signOut,
    checkAuth,
    updatePreferences
  }
}) 