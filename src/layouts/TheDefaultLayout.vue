<script lang="ts">
import { defineComponent, defineAsyncComponent } from 'vue'

export default defineComponent({
  name: 'TheDefaultLayout',
  components: {
    TheHeader: defineAsyncComponent(() => import('@/components/TheHeader.vue')),
    TheFooter: defineAsyncComponent(() => import('@/components/TheFooter.vue'))
  }
})
</script>

<template>
  <div class="flex flex-col min-h-screen">
    <TheHeader />
    <div class="flex-1 flex flex-col container mx-auto px-4 sm:px-6 md:px-8 py-4 sm:py-6">
      <div class="rounded-md shadow h-full p-3 flex-1 bg-white">
        <slot></slot>
      </div>
    </div>
    <TheFooter />
  </div>
</template>
