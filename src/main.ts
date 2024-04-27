import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from '../src/router/index'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
// mdi icons
import '@mdi/font/css/materialdesignicons.css'

const vuetify = createVuetify({
    components,
    directives,
    theme: {
        defaultTheme: 'dark',
    }
})


createApp(App)
    .use(vuetify)
    .use(router)
    .mount('#app')
