<script setup lang="ts">
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
        <IconLogosLumeo />
        <h1 class="text-2xl lg:text-4xl font-semibold text-surface-0">Lumeo</h1>
    </div>
</template>
