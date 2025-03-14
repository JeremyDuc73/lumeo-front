<script setup lang="ts">
import { useAuthStore } from '~/store/auth';
const authStore = useAuthStore();
</script>

<template>
    <TravelHero />
    <pre>{{ authStore.user }}</pre>
    <div>
        <NuxtLink v-if="!authStore.hasToken()" to="/login" class="mr-4">Se connecter</NuxtLink>
        <Button v-else severity="danger" @click="authStore.logout()">Déconnexion</Button>
    </div>
</template>
