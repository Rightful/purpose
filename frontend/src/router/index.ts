import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import HomeView from '../views/HomeView.vue'
import TalentView from '@/views/TalentView.vue'
import TalentProfileView from '@/views/TalentProfileView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/HomeView.vue')
    },
    {
      path: '/signup',
      name: 'signup',
      component: () => import('@/views/SignUpView.vue')
    },
    {
      path: '/signin',
      name: 'signin',
      component: () => import('@/views/SignInView.vue')
    },
    {
      path: '/auth/signup',
      redirect: '/signup'
    },
    {
      path: '/auth/signin',
      redirect: '/signin'
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('@/views/DashboardView.vue'),
      meta: { requiresAuth: true }
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
      path: '/talent/:id',
      name: 'talent-profile',
      component: TalentProfileView,
      props: true
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
  const isAuthenticated = authStore.isAuthenticated
  const user = authStore.user

  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/signin')
  } else if (isAuthenticated && (to.path === '/signin' || to.path === '/auth/signin')) {
    next('/dashboard')
  } else {
    next()
  }
})

// Scroll to top after navigation
router.afterEach((to, from) => {
  window.scrollTo(0, 0)
})

export default router 