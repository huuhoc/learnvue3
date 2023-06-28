<template>
  <div class="flex items-center justify-center rounded font-medium cursor-pointer">
    <label>
      <span>{{ label }}</span>
      <input type="input" v-model="value" />
    </label>
  </div>
</template>
<script setup lang="ts">
import { computed } from 'vue'
interface propsType {
  modelValue?: string
  label?: string
}
const props = defineProps<propsType>()
const emits = defineEmits(['update:modelValue'])

const value = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emits('update:modelValue', value)
  }
})
</script>
