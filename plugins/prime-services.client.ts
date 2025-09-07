import ToastService from 'primevue/toastservice';
import ConfirmationService from 'primevue/confirmationservice';

export default defineNuxtPlugin((nuxtApp) => {
  // Ensure PrimeVue services are registered on client
  nuxtApp.vueApp.use(ToastService);
  nuxtApp.vueApp.use(ConfirmationService);
});
