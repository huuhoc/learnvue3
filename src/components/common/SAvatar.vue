<template>
  <div class="relative overflow-hidden pt-full">
    <img :src="srcImage" :alt="name" class="object-cover w-full h-full bg-gray-300" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'SAvatar',
  props: {
    srcImage: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      required: true
    }
  },
  setup() {}
})
</script>
