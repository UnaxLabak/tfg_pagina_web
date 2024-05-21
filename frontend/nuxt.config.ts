export default {
  devtools: { enabled: true },

  buildModules: [
    '@nuxtjs/axios',
  ],

  axios: {
    baseURL: 'http://localhost:8000/api',
  },

  modules: ["@nuxt/ui"]
};