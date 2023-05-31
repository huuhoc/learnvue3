<template>
  <label
    class="flex items-center text-xs text-content relative select-none"
    :class="{ 'text-subtitle': disabled }"
  >
    <div
      class="border-2 w-4.5 h-4.5 rounded-sm flex flex-shrink-0 justify-center items-center cursor-pointer focus-within:border-brand focus-within:bg-brand focus-within:text-white"
      :class="
        isSelected
          ? 'bg-brand border-brand text-white'
          : 'bg-white border-checkbox'
      "
    >
      <svg-icon v-if="isSelected" class="w-4 h-4" name="check" />
    </div>
    <slot></slot>
    <input
      :id="id"
      type="checkbox"
      :value="value"
      :checked="isSelected"
      :disabled="disabled"
      class="opacity-0 absolute h-4.5 w-4.5 cursor-pointer top-1/2 -translate-y-1/2"
      :class="disabled ? 'cursor-not-allowed' : 'cursor-pointer'"
      @change="toggleCheck"
    />
  </label>
</template>

<script>
export default {
  name: 'CheckBox',
  model: {
    prop: 'model',
    event: 'change',
  },
  props: {
    model: {
      type: [String, Boolean, Object, Number, Array],
      default: '',
    },
    id: {
      type: String,
      default: '',
    },
    checked: {
      type: Boolean,
      default: false,
    },
    falseValue: {
      type: Boolean,
      default: false,
    },
    value: {
      type: [String, Boolean, Object, Number],
      default: '',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    isModelArray() {
      return Array.isArray(this.model)
    },
    isValueObject() {
      return this.value !== null && typeof this.value === 'object'
    },
    isSelected() {
      if (this.isModelArray) {
        if (this.isValueObject) {
          return this.model.some((obj) => this.isEqual(obj, this.value))
        } else {
          return this.model.includes(this.value)
        }
      }

      if (this.isValueObject) {
        return this.isEqual(this.model, this.value)
      }

      return this.model === this.value
    },
  },
  methods: {
    isEqual(a, b) {
      return JSON.stringify(a) === JSON.stringify(b)
    },
    toggleCheck() {
      if (!this.disabled) {
        if (this.isModelArray) {
          this.handleArrayCheckbox()
        } else {
          this.handleSingleSelectCheckbox()
        }
      }
    },
    handleArrayCheckbox() {
      const newModel = this.model.map((item) => item)
      if (!this.isSelected) {
        this.addValueToModel(newModel)
      } else {
        this.removeValueFromModel(newModel)
      }
    },
    handleSingleSelectCheckbox() {
      this.$emit('change', this.isSelected ? this.falseValue : this.value)
    },
    removeValueFromModel(newModel) {
      if (this.isValueObject) {
        newModel = newModel.filter((obj) => !this.isEqual(obj, this.value))
      } else {
        const index = newModel.indexOf(this.value)
        if (index !== -1) {
          newModel.splice(index, 1)
        }
      }
      this.$emit('change', newModel)
    },
    addValueToModel(newModel) {
      newModel.push(this.value)
      this.$emit('change', newModel)
    },
  },
}
</script>
