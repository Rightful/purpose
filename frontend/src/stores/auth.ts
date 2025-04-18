import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

export type UserRole = 'company' | 'talent'

interface User {
  id: string
  email: string
  fullName: string
  role: UserRole
}

interface SignUpData {
  name: string
  email: string
  password: string
  role: 'company' | 'talent'
}

export const useAuthStore = defineStore('auth', () => {
  const router = useRouter()
  const user = ref<User | null>(null)
  const isAuthenticated = ref(false)
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  const signIn = async (email: string, password: string) => {
    try {
      isLoading.value = true
      error.value = null
      
      // TODO: Replace with actual API call
      // Simulated API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Demo accounts
      if (email === 'company@example.com' && password === 'password') {
        user.value = {
          id: '1',
          email: 'company@example.com',
          fullName: 'Demo Company',
          role: 'company'
        }
      } else if (email === 'talent@example.com' && password === 'password') {
        user.value = {
          id: '2',
          email: 'talent@example.com',
          fullName: 'Demo Talent',
          role: 'talent'
        }
      } else {
        throw new Error('Invalid credentials')
      }

      isAuthenticated.value = true
      router.push(user.value.role === 'company' ? '/company/dashboard' : '/talent/dashboard')
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'An error occurred during sign in'
    } finally {
      isLoading.value = false
    }
  }

  const signUp = async (data: SignUpData) => {
    try {
      isLoading.value = true
      error.value = null
      
      // TODO: Replace with actual API call
      // Simulated API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      user.value = {
        id: Math.random().toString(36).substr(2, 9),
        email: data.email,
        fullName: data.name,
        role: data.role
      }

      isAuthenticated.value = true
      router.push(data.role === 'company' ? '/company/dashboard' : '/talent/dashboard')
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'An error occurred during sign up'
    } finally {
      isLoading.value = false
    }
  }

  const signOut = () => {
    user.value = null
    isAuthenticated.value = false
    router.push('/auth/signin')
  }

  return {
    user,
    isAuthenticated,
    isLoading,
    error,
    signIn,
    signUp,
    signOut
  }
}) 