<template>
  <label class="flex items-center text-xs text-content">
    <div
      class="border w-4.5 h-4.5 rounded-full flex flex-shrink-0 justify-center items-center cursor-pointer focus-within:border-brand"
      :class="shouldBeChecked ? 'border-brand' : 'border-subtitle'"
    >
      <span
        class="w-2.5 h-2.5 rounded-full"
        :class="shouldBeChecked ? 'bg-brand' : ''"
      ></span>
    </div>
    <span v-if="label" class="leading-relaxed cursor-pointer ml-3">{{
      label
    }}</span>
    <input
      :checked="shouldBeChecked"
      :value="value"
      type="radio"
      class="opacity-0 absolute h-4.5 w-4.5 cursor-pointer"
      @change="updateInput"
    />
  </label>
</template>

<script>
export default {
  name: 'RadioBox',
  props: {
    value: {
      type: String,
      default: '',
    },
    label: {
      type: String,
      default: '',
    },
    modelValue: {
      type: String,
      default: '',
    },
  },
  computed: {
    shouldBeChecked() {
      return this.modelValue === this.value
    },
  },
  methods: {
    updateInput() {
      this.$emit('change', this.value)
    },
  },
}
</script>
