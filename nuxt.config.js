import path from 'path'

export default {
  env: {
    ENV_VERSION: process.env.ENV_VERSION,
    STRAPI_GRAPHQL: process.env.STRAPI_GRAPHQL,
    STRAPI_REST: process.env.STRAPI_REST,
    AUTH0: process.env.AUTH0,
    HK_STRAPI_GRAPHQL: process.env.HK_STRAPI_GRAPHQL,
    HK_ES_SERVICE: process.env.HK_ES_SERVICE,
    ACCOUNT_SERVICE: process.env.ACCOUNT_SERVICE,
    AUTH0_SERVICE: process.env.AUTH0_SERVICE,
    PORT: process.env.PORT,
    CLIENT_ID: process.env.CLIENT_ID,
    CAT_MIDDLEWARE_REST: process.env.CAT_MIDDLEWARE_REST,
    CAT_MIDDLEWARE_USER: process.env.CAT_MIDDLEWARE_USER,
    CAT_MIDDLEWARE_PASSWORD: process.env.CAT_MIDDLEWARE_PASSWORD,
  },
  server: {
    port: process.env.PORT || 3000,
  },
  alias: {
    '@use': path.resolve(__dirname, './composables'),
    '@gql': path.resolve(__dirname, './graphql'),
  },
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Circularity Assessment Tool',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.png' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['~/style/index.css'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/cookie.ts',
    '~/plugins/ajax.ts',
    '~/plugins/user.ts',
    '~/plugins/organisation.ts',
    { src: '~/plugins/dayjs.ts', mode: 'client' },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://go.nuxtjs.dev/stylelint
    '@nuxtjs/stylelint-module',
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
    // https://composition-api.nuxtjs.org/getting-started/introduction
    '@nuxtjs/composition-api/module',
    // https://github.com/nuxt-community/dotenv-module
    '@nuxtjs/dotenv',
    // https://github.com/nuxt-community/svg-sprite-module
    '@nuxtjs/svg-sprite',
  ],
  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    // https://www.npmjs.com/package/cookie-universal-nuxt
    'cookie-universal-nuxt',
    '@nuxtjs/apollo', // just for *.gql loader
    '@nuxtjs/dayjs', // https://github.com/nuxt-community/dayjs-module,
    // https://github.com/nuxt-community/component-cache-module
    [
      '@nuxtjs/component-cache',
      { maxAge: +process.env.COMPONENT_CACHE || 1000 * 60 * 60 },
    ],
  ],
  apollo: {
    clientConfigs: {
      default: {
        httpEndpoint: 'ignore',
      },
    },
  },

  dayjs: {},
  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},

  // svgSprite option
  svgSprite: {
    input: '~/assets/svg/',
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  // pwa: {
  //   manifest: {
  //     lang: 'en',
  //   },
  // },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
}
