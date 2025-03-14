<script setup lang="ts">
import { twMerge } from 'tailwind-merge';
import { useRouter } from 'vue-router';
import { useAuthStore } from '~/store/auth';

const authStore = useAuthStore();

defineProps<{
    className?: string;
}>();

const router = useRouter();
const pathname = router.currentRoute.value.path;

const navbarData = [
    {
        id: 'accueil',
        title: 'Accueil',
        content: [
            {
                label: 'Accueil',
                to: '/'
            }
        ]
    },
    {
        id: 'test',
        title: 'Test',
        content: [
            {
                label: 'test',
                to: '/'
            }
        ]
    },
    {
        id: 'test',
        title: 'Test',
        content: [
            {
                label: 'test',
                to: '/'
            }
        ]
    },
];

const config = useRuntimeConfig();
const url = computed(() => {
    if (!authStore.user.image) {
        return '/profile.webp';
    } else {
        return `${config.public.serverBase}/images/${authStore.user.image.imageName}`;
    }
});
</script>

<template>
    <nav :class="twMerge('flex items-center relative z-[99999] justify-between py-6 w-[calc(100%-3rem)] max-h-[75px] mx-auto border-b border-white/10 border-dashed', className)">
        <NuxtLink to="/">
            <Logo />
        </NuxtLink>
        <ul class="hidden lg:flex items-center gap-3">
            <li v-for="data in navbarData" :key="data.id">
                <a
                    v-styleclass="{ selector: '@next', enterFromClass: 'hidden', enterActiveClass: 'animate-fadein', leaveActiveClass: 'animate-fadeout', leaveToClass: 'hidden', hideOnOutsideClick: true }"
                    class="inline-flex items-center gap-2 rounded-full py-1 pr-2 pl-3 select-none transition-all cursor-pointer text-white/72 hover:text-white hover:bg-white/8 hover:shadow-[0px_10px_10px_-8px_rgba(18,18,23,0.02),0px_2px_2px_-1.5px_rgba(18,18,23,0.02),0px_1px_1px_-0.5px_rgba(18,18,23,0.02),0px_0px_0px_1px_rgba(18,18,23,0.02)] group-data-[open=true]:!bg-white/16 group-data-[open=true]:!text-white group-data-[open=true]:!backdrop-blur-2xl border border-white/0 group-data-[open=true]:!border-white/4 group-data-[open=true]:!shadow-[0px_2px_5px_0px_rgba(255,255,255,0.06)_inset,0px_12px_20px_0px_rgba(0,0,0,0.06)]"
                >
                    <span class="text-base">{{ data.title }}</span>
                    <i class="pi pi-chevron-down !text-xs"></i>
                </a>
                <div class="hidden absolute top-[calc(100%-1rem)] z-[999999] max-w-40 w-full flex flex-col transition-all ease-in-out duration-100 p-2 gap-2 rounded-lg shadow-stroke dark:shadow-none border-0 dark:border border-white/12 bg-surface-0">
                    <NuxtLink
                        v-for="(item, index) in data.content"
                        :key="index"
                        :to="item.to"
                        :class="`w-full text-left py-2 px-3 rounded-lg transition-all font-medium ${item.to === pathname ? 'text-surface-950 bg-surface-200' : 'text-surface-500 hover:text-surface-950 hover:bg-surface-200'}`"
                    >
                        {{ item.label }}
                    </NuxtLink>
                </div>
            </li>
        </ul>
        <ul class="hidden lg:flex items-center">
            <li v-if="authStore.hasToken()">
                <NuxtLink to="/profile" class="button-regular">
                    <div class="w-8 h-8 flex items-center justify-center rounded-full bg-white/16 shadow-[0px_2px_5px_0px_rgba(255,255,255,0.06)_inset,0px_12px_20px_0px_rgba(0,0,0,0.06)]">
                        <img :src="url" alt="Image du profil" class="w-full h-full object-cover object-center rounded-full" />
                    </div>
                    Profil
                </NuxtLink>
            </li>
            <li v-if="!authStore.hasToken()">
                <NuxtLink to="/login" class="button-regular lg:me-3"> Se connecter </NuxtLink>
            </li>
            <li v-if="!authStore.hasToken()">
                <NuxtLink to="/register" class="button-regular"> S'inscrire </NuxtLink>
            </li>
        </ul>
        <div class="relative lg:hidden block">
            <a
                v-styleclass="{ selector: '@next', enterFromClass: 'hidden', enterActiveClass: 'animate-scalein', leaveActiveClass: 'animate-fadeout', leaveToClass: 'hidden', hideOnOutsideClick: true }"
                class="w-10 h-10 cursor-pointer inline-flex items-center justify-center rounded-full bg-surface-0 text-surface-950 hover:bg-surface-200"
            >
                <i class="pi pi-bars"></i>
            </a>
            <div class="hidden absolute top-[calc(100%+0.5rem)] max-h-96 overflow-auto left-auto !right-0 w-60 p-2 rounded-2xl shadow-blue-card flex flex-col bg-surface-0">
                <div class="flex flex-col">
                    <div v-for="data in navbarData" :key="data.id" class="mt-4">
                        <span class="px-3 !py-2 text-surface-950 font-medium">{{ data.title }}</span>
                        <div class="flex flex-col gap-1 my-2">
                            <NuxtLink v-for="(item, index) in data.content" :key="index" :to="item.to" class="py-2 px-3 rounded-lg hover:bg-surface-200 font-medium text-surface-500 hover:text-surface-950">
                                {{ item.label }}
                            </NuxtLink>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </nav>
</template>
