import {createApp} from 'vue'
import './style.css'
import App from './App.vue'
import router from '../src/router/index'
import {createPinia} from 'pinia'

// Vuetify
import 'vuetify/styles'
import {createVuetify} from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
// mdi icons
import '@mdi/font/css/materialdesignicons.css'

const pinia = createPinia()


const vuetify = createVuetify({
    components,
    directives,
    theme: {
        defaultTheme: 'dark',
    }
})
const app = createApp(App)
app.use(vuetify)
app.use(router)
app.use(pinia)
app.mount('#app')
