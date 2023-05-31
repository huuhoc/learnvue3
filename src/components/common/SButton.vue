<template>
  <div class="flex items-center justify-center rounded font-medium cursor-pointer">
    {{ type }}
    <slot>Action name df</slot>
  </div>
</template>
<script setup lang="ts">
interface Props {
  type: 'solid' | 'outline'
}
const props = defineProps<Props>()
</script>

<s
