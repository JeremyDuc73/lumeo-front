<script setup lang="ts">
import { useAuthStore } from '~/store/auth';
import Credits from '~/components/profile/Credits.vue';
const authStore = useAuthStore();
authStore.checkAuth();
</script>

<template>
    <ProfileHero />
    <Credits />
</template>
