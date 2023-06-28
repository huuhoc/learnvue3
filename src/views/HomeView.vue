<template>
  <div>
    <SButton type="solid" />
    <SInput label="Name" v-model="name" />
    {{ name }}
    <span @click="clearInput" class="cursor-pointer px-4 py-3 border">Clear</span>
  </div>
</template>

<script lang="ts">
import { defineComponent, defineAsyncComponent, ref } from 'vue'

export default defineComponent({
  components: {
    SButton: defineAsyncComponent(() => import('@/components/common/SButton.vue')),
    SInput: defineAsyncComponent(() => import('@/components/common/SInput.vue'))
  },
  setup() {
    const name = ref('')
    const clearInput = () => {
      name.value = ''
    }
    return { name, clearInput }
  }
})
</script>
