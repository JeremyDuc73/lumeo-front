<script setup lang="ts">
import { useAuthStore } from '~/store/auth';
const { isWide } = useLayout();
const authStore = useAuthStore();
const config = useRuntimeConfig();

authStore.checkAuth();

let url = '';
if (!authStore.user.image) {
    url = '/profile.webp';
} else {
    url = `${config.public.serverBase}/images/${authStore.user.image.imageName}`;
}
</script>

<template>
    <AnimatedContainer :className="`overflow-hidden ${isWide ? '' : 'pt-6'}`">
        <div v-if="isWide" class="absolute top-0 inset-x-0 h-[35rem] lg:h-[32rem] shadow-black-card bg-main-gradient overflow-hidden">
            <CirclePattern class="absolute -bottom-[115%] -right-[40rem] w-[82rem] lg:block hidden" />
        </div>
        <div class="container relative">
            <div v-if="!isWide" class="absolute top-0 left-4 right-4 h-[45rem] lg:h-[42rem] rounded-3xl lg:rounded-4xl shadow-black-card bg-main-gradient overflow-hidden">
                <CirclePattern class="absolute -bottom-[115%] -right-[40rem] w-[82rem] lg:block hidden" />
            </div>
            <div class="h-full relative">
                <Navbar class="relative" />
                <div class="px-6 lg:px-12 mt-10 lg:mt-60 relative z-4">
                    <div class="group flex items-center justify-center h-[15rem] w-[15rem] mt-12 lg:mt-10 rounded-full relative overflow-hidden shadow-blue-card m-auto">
                        <div class="absolute inset-0 z-2 bg-[linear-gradient(0deg,rgba(0,0,0,0.06)_0%,rgba(0,0,0,0.06)_100%)]" />
                        <img :src="url" class="object-cover object-center z-1 absolute w-full h-full" alt="Agency Hero Video Background" />
                    </div>
                </div>
            </div>
            <h1 class="mt-12 text-3xl lg:text-5xl font-semibold !leading-tight text-surface-950 dark:text-surface-0 text-center">
                {{ authStore.user.username }}
            </h1>
            <p class="mt-8 text-lg font-normal text-surface-950 dark:text-surface-0 text-center">{{ authStore.user.description }}</p>
            <NuxtLink to="/profile/details" class="button-gradient mt-10 mx-auto">Gestion du profil</NuxtLink>
            <button class="!block m-auto mt-3 w-fit text-red-400 hover:text-red-500" @click="authStore.logout()">Déconnexion</button>
        </div>
    </AnimatedContainer>
</template>
