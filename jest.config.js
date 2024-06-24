/** @type {import('jest').Config} */
const config = {
  testMatch: [
    "<rootDir>/tests/**/*.[jt]s?(x)",
    "<rootDir>/tests/?(*.)+(spec|test).[tj]s?(x)"
  ],

  setupFiles: ['fake-indexeddb/auto'],

  testEnvironment: 'jsdom',

  transform: {
    '^.+\\.(js|ts)$': 'babel-jest',
  },

  moduleNameMapper: {
    '^idb$': '<rootDir>/node_modules/idb/build/index.cjs',
    '\\.(css|less)$': 'identity-obj-proxy',
  },

  testPathIgnorePatterns: ['/node_modules/'],
};

module.exports = config;