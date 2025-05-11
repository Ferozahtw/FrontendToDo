import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/AuthStore'

// Layout
import AppLayout from '../components/Layout/AppLayout.vue'

// Auth pages
import LoginForm from "@/components/Auth/LoginForm.vue";
import RegisterForm from "@/components/Auth/RegisterForm.vue";

// Task pages
import TaskList from '@/components/Task/TaskList.vue';
import TodaysTasksView from "@/components/Task/TodaysTasksView.vue";
import UpcomingTasksView from "@/components/Task/UpcomingTasksView.vue";
import CompletedTasks from "@/components/Task/CompletedTasks.vue";

// User pages
import UserSettings from "@/components/Settings/UserSettings.vue";
import AccountSettings from "@/components/Settings/AccountSettings.vue";

const routes = [
  {
    path: '/login',
    name: 'login',
    component: LoginForm,
    meta: { requiresAuth: false }
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterForm,
    meta: { requiresAuth: false }
  },
  {
    path: '/',
    component: AppLayout,
    meta: { requiresAuth: true },
    children: [
      {
        path: '',
        name: 'tasks',
        component: TaskList
      },
      {
        path: 'todays-tasks',
        name: 'todays-tasks',
        component: TodaysTasksView
      },
      {
        path: 'upcoming-tasks',
        name: 'upcoming-tasks',
        component: UpcomingTasksView
      },
      {
        path: 'completed-tasks',
        name: 'completed-tasks',
        component: CompletedTasks
      },
      {
        path: 'settings',
        name: 'settings',
        component: AccountSettings,
      },
      {
        path: 'profile',
        name: 'profile',
        component: UserSettings
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Navigation guard
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)

  if (requiresAuth && !authStore.isAuthenticated) {
    next('/login')
  } else if (!requiresAuth && authStore.isAuthenticated) {
    next('/')
  } else {
    next()
  }
})

export default router
