// https://nuxt.com/docs/api/configuration/nuxt-config
const dotenv = require('dotenv');
dotenv.config();

export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },

  runtimeConfig: {
    public: {
      apiUrl: process.env.API_URL,
    }
  },

  css: [
    '@/assets/css/main.css'
  ]

})
