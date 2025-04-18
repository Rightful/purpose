import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/jobs',
      name: 'jobs',
      component: () => import('../views/JobsView.vue')
    },
    {
      path: '/jobs/:id',
      name: 'job-details',
      component: () => import('../views/JobDetailsView.vue')
    },
    {
      path: '/talent',
      name: 'talent',
      component: () => import('../views/TalentView.vue')
    },
    {
      path: '/auth/signup',
      name: 'signup',
      component: () => import('../views/auth/SignUpView.vue')
    },
    {
      path: '/auth/signin',
      name: 'signin',
      component: () => import('../views/auth/SignInView.vue')
    },
    {
      path: '/company/dashboard',
      name: 'company-dashboard',
      component: () => import('../views/dashboard/CompanyDashboardView.vue'),
      meta: { requiresAuth: true, role: 'company' }
    },
    {
      path: '/talent/dashboard',
      name: 'talent-dashboard',
      component: () => import('../views/dashboard/TalentDashboardView.vue'),
      meta: { requiresAuth: true, role: 'talent' }
    }
  ]
})

// Navigation guard
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  
  if (to.meta.requiresAuth) {
    if (!authStore.isAuthenticated) {
      next({ name: 'signin' })
      return
    }
    
    if (to.meta.role && authStore.user?.role !== to.meta.role) {
      next({ name: 'home' })
      return
    }
  }
  
  next()
})

export default router 