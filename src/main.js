import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { Quasar, Cookies, Notify, AppFullscreen } from 'quasar';
import quasarLang from 'quasar/lang/zh-TW';


import './style.css'

// Import icon libraries
import '@quasar/extras/material-icons/material-icons.css'
// Import Quasar css
import 'quasar/src/css/index.sass'
import './scss/main.scss';

import App from './App.vue'

const pinia = createPinia()
const app = createApp(App)

app.use(pinia)
app.use(Quasar, {
  plugins: { Cookies, Notify, AppFullscreen }, // import Quasar plugins and add here
  lang: quasarLang,
  config: {
    cssAddon: true,
  },
})
app.mount('#app')
