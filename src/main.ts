import { createApp } from 'vue';
import App from './App.vue';
import router from './router'; // importieren!
import '@fortawesome/fontawesome-free/css/all.css';


const app = createApp(App);

app.use(router); // Router verwenden
app.mount('#app');
