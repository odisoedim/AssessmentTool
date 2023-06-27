module.exports = {
  moduleNameMapper: {
    '^~/assets/(.*)$': '<rootDir>/__mocks__/fileMock.ts',
    '^@/(.*)$': '<rootDir>/$1',
    '^~/(.*)$': '<rootDir>/$1',
    '^@use/(.*)$': '<rootDir>/composables/$1',
    '^@gql/(.*)$': '<rootDir>/graphql/$1',
    '^vue$': 'vue/dist/vue.common.js',
    'nuxt-composition-api': 'nuxt-composition-api/lib/cjs/entrypoint.js',
  },
  moduleFileExtensions: ['ts', 'js', 'vue', 'json', 'gql', 'graphql'],
  transform: {
    '^.+\\.ts$': 'ts-jest',
    '^.+\\.js$': 'babel-jest',
    '.*\\.(vue)$': 'vue-jest',
    '.*\\.(gql|graphql)$': 'jest-transform-graphql',
  },
  collectCoverage: true,
  collectCoverageFrom: [
    '<rootDir>/components/**/*.vue',
    '<rootDir>/pages/**/*.vue',
    '<rootDir>/util/**/*.ts',
    '<rootDir>/composables/**/*.ts',
    '<rootDir>/pages-helper/**/*.ts',
  ],
  testEnvironment: 'jsdom',
  setupFiles: [
    '<rootDir>/test/helper/svgIcon.ts',
    '<rootDir>/test/helper/nuxtLink.ts',
    '<rootDir>/test/helper/ClientOnly.ts',
    '<rootDir>/test/helper/ignoreConsoleError.ts',
  ],
}
