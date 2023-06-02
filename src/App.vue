<script lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

export default {
  setup() {
    const route = useRoute()
    const layout = computed(() =>
      route.meta.layout ? `The${route.meta.layout}Layout` : 'TheDefaultLayout'
    )
    return { layout }
  }
}
</script>

<template>
  <component :is="layout">
    <RouterView />
  </component>
</template>
