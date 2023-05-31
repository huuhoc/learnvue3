<template>
  <div
    class="flex items-center justify-center rounded font-medium cursor-pointer"
    :class="classList"
  >
    <slot>Action name</slot>
  </div>
</template>
<script>
export default {
  name: 'SNDButton',
  props: {
    type: {
      type: String,
      default: 'solid',
    },
    size: {
      type: String,
      default: 'large',
    },
    bgColor: {
      type: String,
      default: '',
    },
    bgHover: {
      type: String,
      default: '',
    },
    textColor: {
      type: String,
      default: '',
    },
  },
  data() {
    return {}
  },
  computed: {
    classList() {
      let name = ''
      if (this.type === 'outline') name = name + ' border border-normal'
      if (this.size === 'large') name = name + ' h-10 px-5 text-sm'
      if (this.size === 'medium') name = name + ' h-8 px-4 text-xs'
      if (this.bgColor) name = name + ` ${this.bgColor}`
      if (this.bgHover) name = name + ` hover:${this.bgHover}`
      if (this.textColor) name = name + ` ${this.textColor}`
      return name
    },
  },
}
</script>
