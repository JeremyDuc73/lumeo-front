<script setup lang="ts">
import { twMerge } from 'tailwind-merge';

interface Props {
    className?: string;
    withText?: boolean;
}

withDefaults(defineProps<Props>(), {
    className: '',
    withText: true
});
</script>

<template>
    <div class="flex gap-2 items-center">
        <IconLogosLumeo class="!w-50 !h-50" />
        <h1 class="text-2xl lg:text-4xl font-semibold text-surface-0">Lumeo</h1>
    </div>
</template>
