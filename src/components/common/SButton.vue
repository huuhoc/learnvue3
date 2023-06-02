<template>
  <div class="flex items-center justify-center rounded font-medium cursor-pointer">
    {{ type }}
    <slot>Action name {{ type }}</slot>
  </div>
</template>
<script setup lang="ts">
interface Props {
  type: 'solid' | 'outline'
}
defineProps<Props>()
</script>
