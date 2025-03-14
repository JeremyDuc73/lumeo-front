<script setup lang="ts">
import { updatePreset, updateSurfacePalette } from '@primevue/themes';
import { twMerge } from 'tailwind-merge';

defineProps<{
    className?: string;
}>();

interface ColorType {
    name: string;
    palette: Record<string, string>;
}

const { layoutConfig } = useLayout();

const configTheme = ref(layoutConfig.darkTheme);

const themeOptions = ref([
    { name: 'Light', value: false },
    { name: 'Dark', value: true }
]);

const primaryColors = ref([
    { name: 'emerald', palette: { 50: '#ecfdf5', 100: '#d1fae5', 200: '#a7f3d0', 300: '#6ee7b7', 400: '#34d399', 500: '#10b981', 600: '#059669', 700: '#047857', 800: '#065f46', 900: '#064e3b', 950: '#022c22' } },
    { name: 'green', palette: { 50: '#f0fdf4', 100: '#dcfce7', 200: '#bbf7d0', 300: '#86efac', 400: '#4ade80', 500: '#22c55e', 600: '#16a34a', 700: '#15803d', 800: '#166534', 900: '#14532d', 950: '#052e16' } },
    { name: 'lime', palette: { 50: '#f7fee7', 100: '#ecfccb', 200: '#d9f99d', 300: '#bef264', 400: '#a3e635', 500: '#84cc16', 600: '#65a30d', 700: '#4d7c0f', 800: '#3f6212', 900: '#365314', 950: '#1a2e05' } },
    { name: 'orange', palette: { 50: '#fff7ed', 100: '#ffedd5', 200: '#fed7aa', 300: '#fdba74', 400: '#fb923c', 500: '#f97316', 600: '#ea580c', 700: '#c2410c', 800: '#9a3412', 900: '#7c2d12', 950: '#431407' } },
    { name: 'amber', palette: { 50: '#fffbeb', 100: '#fef3c7', 200: '#fde68a', 300: '#fcd34d', 400: '#fbbf24', 500: '#f59e0b', 600: '#d97706', 700: '#b45309', 800: '#92400e', 900: '#78350f', 950: '#451a03' } },
    { name: 'yellow', palette: { 50: '#fefce8', 100: '#fef9c3', 200: '#fef08a', 300: '#fde047', 400: '#facc15', 500: '#eab308', 600: '#ca8a04', 700: '#a16207', 800: '#854d0e', 900: '#713f12', 950: '#422006' } },
    { name: 'teal', palette: { 50: '#f0fdfa', 100: '#ccfbf1', 200: '#99f6e4', 300: '#5eead4', 400: '#2dd4bf', 500: '#14b8a6', 600: '#0d9488', 700: '#0f766e', 800: '#115e59', 900: '#134e4a', 950: '#042f2e' } },
    { name: 'cyan', palette: { 50: '#ecfeff', 100: '#cffafe', 200: '#a5f3fc', 300: '#67e8f9', 400: '#22d3ee', 500: '#06b6d4', 600: '#0891b2', 700: '#0e7490', 800: '#155e75', 900: '#164e63', 950: '#083344' } },
    { name: 'sky', palette: { 50: '#f0f9ff', 100: '#e0f2fe', 200: '#bae6fd', 300: '#7dd3fc', 400: '#38bdf8', 500: '#0ea5e9', 600: '#0284c7', 700: '#0369a1', 800: '#075985', 900: '#0c4a6e', 950: '#082f49' } },
    { name: 'blue', palette: { 50: '#eff6ff', 100: '#dbeafe', 200: '#bfdbfe', 300: '#93c5fd', 400: '#60a5fa', 500: '#3b82f6', 600: '#2563eb', 700: '#1d4ed8', 800: '#1e40af', 900: '#1e3a8a', 950: '#172554' } },
    { name: 'indigo', palette: { 50: '#eef2ff', 100: '#e0e7ff', 200: '#c7d2fe', 300: '#a5b4fc', 400: '#818cf8', 500: '#6366f1', 600: '#4f46e5', 700: '#4338ca', 800: '#3730a3', 900: '#312e81', 950: '#1e1b4b' } },
    { name: 'violet', palette: { 50: '#f5f3ff', 100: '#ede9fe', 200: '#ddd6fe', 300: '#c4b5fd', 400: '#a78bfa', 500: '#8b5cf6', 600: '#7c3aed', 700: '#6d28d9', 800: '#5b21b6', 900: '#4c1d95', 950: '#2e1065' } },
    { name: 'purple', palette: { 50: '#faf5ff', 100: '#f3e8ff', 200: '#e9d5ff', 300: '#d8b4fe', 400: '#c084fc', 500: '#a855f7', 600: '#9333ea', 700: '#7e22ce', 800: '#6b21a8', 900: '#581c87', 950: '#3b0764' } },
    { name: 'fuchsia', palette: { 50: '#fdf4ff', 100: '#fae8ff', 200: '#f5d0fe', 300: '#f0abfc', 400: '#e879f9', 500: '#d946ef', 600: '#c026d3', 700: '#a21caf', 800: '#86198f', 900: '#701a75', 950: '#4a044e' } },
    { name: 'pink', palette: { 50: '#fdf2f8', 100: '#fce7f3', 200: '#fbcfe8', 300: '#f9a8d4', 400: '#f472b6', 500: '#ec4899', 600: '#db2777', 700: '#be185d', 800: '#9d174d', 900: '#831843', 950: '#500724' } },
    { name: 'rose', palette: { 50: '#fff1f2', 100: '#ffe4e6', 200: '#fecdd3', 300: '#fda4af', 400: '#fb7185', 500: '#f43f5e', 600: '#e11d48', 700: '#be123c', 800: '#9f1239', 900: '#881337', 950: '#4c0519' } }
]);

function getPresetExt() {
    const color = primaryColors.value.find((c) => c.name === layoutConfig.primary)!;

    return {
        semantic: {
            primary: color.palette,
            colorScheme: {
                light: {
                    primary: {
                        color: '{primary.500}',
                        contrastColor: '#ffffff',
                        hoverColor: '{primary.600}',
                        activeColor: '{primary.700}'
                    },
                    highlight: {
                        background: '{primary.50}',
                        focusBackground: '{primary.100}',
                        color: '{primary.700}',
                        focusColor: '{primary.800}'
                    }
                },
                dark: {
                    primary: {
                        color: '{primary.400}',
                        contrastColor: '{surface.900}',
                        hoverColor: '{primary.300}',
                        activeColor: '{primary.200}'
                    },
                    highlight: {
                        background: 'color-mix(in srgb, {primary.400}, transparent 84%)',
                        focusBackground: 'color-mix(in srgb, {primary.400}, transparent 76%)',
                        color: 'rgba(255,255,255,.87)',
                        focusColor: 'rgba(255,255,255,.87)'
                    }
                }
            }
        }
    };
}

function updateColors(type: string, color: ColorType) {
    if (type === 'primary') {
        layoutConfig.primary = color.name;
    } else if (type === 'surface') {
        layoutConfig.surface = color.name;
    }

    applyTheme(type, color);
}

function applyTheme(type: string, color: ColorType) {
    if (type === 'primary') {
        updatePreset(getPresetExt());
    } else if (type === 'surface') {
        updateSurfacePalette(color.palette);
    }
}

function toggleDarkMode() {
    if (!document.startViewTransition) {
        executeDarkModeToggle();

        return;
    }

    document.startViewTransition(() => executeDarkModeToggle());
}

function executeDarkModeToggle() {
    layoutConfig.darkTheme = !layoutConfig.darkTheme;
    document.documentElement.classList.toggle('dark');
}
</script>

<template>
    <div :class="twMerge('fixed bottom-6 xl:bottom-auto xl:top-6 right-6 z-[9999999]', className)">
        <button
            v-styleclass="{ selector: '@next', enterFromClass: 'hidden', enterActiveClass: 'animate-scalein', leaveToClass: 'hidden', leaveActiveClass: 'animate-fadeout', hideOnOutsideClick: true }"
            class="config-button relative group rounded-lg w-10 h-10 flex items-center justify-center transition-all overflow-hidden"
        >
            <span
                :style="{
                    animationDuration: '2s',
                    background: `conic-gradient(from 90deg, #f97316, #f59e0b, #eab308, #84cc16, #22c55e, #10b981, #14b8a6, #06b6d4,#0ea5e9,#3b82f6,#6366f1,#8b5cf6,#a855f7,#d946ef,#ec4899,#f43f5e)`
                }"
                class="absolute -top-5 -left-5 w-20 h-20 animate-spin"
            ></span>
            <span :style="{ inset: '1px', borderRadius: '0.42rem' }" class="absolute z-2 bg-surface-0 dark:bg-surface-900 group-hover:bg-surface-100 dark:group-hover:bg-surface-800 transition-all"></span>
            <span class="relative z-10 text-surface-800 dark:text-surface-100 flex">
                <i class="pi pi-palette text-lg leading-none"></i>
            </span>
        </button>

        <div
            :class="[
                'hidden flex flex-col gap-4 absolute bottom-[calc(100%+0.5rem)] xl:bottom-auto xl:top-[calc(100%+0.5rem)] right-0 w-[15.4rem] h-fit p-3 rounded-lg bg-surface-0 dark:bg-surface-900 border border-surface-200 dark:border-surface-700 shadow-sm transition-all ease-in-out'
            ]"
        >
            <div>
                <span class="text-lg font-semibold">Couleur principale</span>
                <div class="pt-2 flex gap-2 flex-wrap">
                    <button
                        v-for="primaryColor of primaryColors"
                        :key="primaryColor.name"
                        :title="primaryColor.name"
                        type="button"
                        :class="`w-5 h-5 rounded-md border border-black/16 dark:border-white/12 outline outline-offset-2 ${layoutConfig.primary === primaryColor.name ? 'outline-1' : 'focus:outline-1 outline-0'}`"
                        :style="{ backgroundColor: `${primaryColor.palette['500']}`, outlineColor: `${primaryColor.palette['500']}` }"
                        @click="updateColors('primary', primaryColor)"
                    ></button>
                </div>
            </div>

            <div>
                <div class="flex flex-col gap-2">
                    <span class="text-lg font-semibold">Thème</span>
                    <SelectButton v-model="configTheme" :options="themeOptions" optionLabel="name" optionValue="value" :allowEmpty="false" @change="toggleDarkMode" />
                </div>
            </div>
        </div>
    </div>
</template>
