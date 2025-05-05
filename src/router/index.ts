import { createRouter, createWebHistory } from 'vue-router';
import ToDoList from '../components/ToDoList.vue';
import AddTaskOverlay from '../components/AddTaskOverlay.vue';
import LoginForm from '../components/LoginForm.vue';
import RegisterForm from '../components/RegisterForm.vue';
import ProfileSetup from "../components/ProfileSetup.vue";
import TodaysTasks from '../components/TodaysTasks.vue';
import UpcomingTasks from '../components/UpcomingTasks.vue';
import CompletedTasks from '../components/CompletedTasks.vue';
import TaskSearch from '../components/TaskSearch.vue';
import UserSettings from '../components/UserSettings.vue'; // UserSettings importiert

const routes = [
  {
    path: '/',
    name: 'ToDoList',
    component: ToDoList,
  },
  {
    path: '/add',
    name: 'AddToDo',
    component: AddTaskOverlay,
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginForm,
  },
  {
    path: '/register',
    name: 'Register',
    component: RegisterForm,
  },
  {
    path: '/profile',
    name: 'YourProfile',
    component: ProfileSetup,
  },
  {
    path: '/todays-tasks',
    name: 'TodaysTasks',
    component: TodaysTasks,
    props: { msg: 'Heutige Aufgaben' }
  },
  {
    path: '/upcoming-tasks',
    name: 'UpcomingTasks',
    component: UpcomingTasks,
  },
  {
    path: '/completed-tasks',
    name: 'CompletedTasks',
    component: CompletedTasks,
  },
  {
    path: '/search-tasks',
    name: 'TaskSearch',
    component: TaskSearch,
  },
  {
    path: '/settings', // Hier ändern wir den Pfad auf /settings
    name: 'Settings',  // Name auch angepasst
    component: UserSettings, // Die UserSettings-Komponente
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
