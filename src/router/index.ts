import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue')
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
      meta: {
        layout: 'Default'
      }
    },
    {
      path: '/upload-video',
      name: 'uploadvideo',
      component: () => import('../views/UploadVideo.vue')
    }
  ]
})

export default router
