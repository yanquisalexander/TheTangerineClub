import { defineConfig } from 'cypress'
export default defineConfig({
    e2e: {
        supportFile: false,
        baseUrl: 'http://localhost:4321',
        taskTimeout: 10000,
        defaultCommandTimeout: 10000
    }
})