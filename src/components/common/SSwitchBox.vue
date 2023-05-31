<template>
  <div class="switchbox" :class="{ checked: value }" @click="toggleSwitch">
    <div class="switchbox__handle"></div>
    <div class="switchbox__inner flex items-center justify-center">
      <slot v-if="value" name="checked">
        <svg
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12.075 4.49167L5.65833 10.9083C5.54167 11.025 5.425 11.0833 5.25 11.0833C5.075 11.0833 4.95833 11.025 4.84167 10.9083L1.925 7.99167C1.69167 7.75833 1.69167 7.40833 1.925 7.175C2.15833 6.94167 2.50833 6.94167 2.74167 7.175L5.25 9.68333L11.2583 3.675C11.4917 3.44167 11.8417 3.44167 12.075 3.675C12.3083 3.90833 12.3083 4.25833 12.075 4.49167Z"
            fill="black"
          />
          <mask
            id="mask0_2982_24535"
            style="mask-type: alpha"
            maskUnits="userSpaceOnUse"
            x="1"
            y="3"
            width="12"
            height="9"
          >
            <path
              d="M12.075 4.49167L5.65833 10.9083C5.54167 11.025 5.425 11.0833 5.25 11.0833C5.075 11.0833 4.95833 11.025 4.84167 10.9083L1.925 7.99167C1.69167 7.75833 1.69167 7.40833 1.925 7.175C2.15833 6.94167 2.50833 6.94167 2.74167 7.175L5.25 9.68333L11.2583 3.675C11.4917 3.44167 11.8417 3.44167 12.075 3.675C12.3083 3.90833 12.3083 4.25833 12.075 4.49167Z"
              fill="white"
            />
          </mask>
          <g mask="url(#mask0_2982_24535)">
            <rect width="14" height="14" fill="white" />
          </g>
        </svg>
      </slot>
      <slot v-else name="closed">
        <svg
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10.9084 10.0915C11.1417 10.3248 11.1417 10.6748 10.9084 10.9082C10.7917 11.0248 10.6751 11.0832 10.5001 11.0832C10.3251 11.0832 10.2084 11.0248 10.0917 10.9082L7.00008 7.8165L3.90841 10.9082C3.79175 11.0248 3.67508 11.0832 3.50008 11.0832C3.32508 11.0832 3.20841 11.0248 3.09175 10.9082C2.85841 10.6748 2.85841 10.3248 3.09175 10.0915L6.18342 6.99984L3.09175 3.90817C2.85841 3.67484 2.85841 3.32484 3.09175 3.0915C3.32508 2.85817 3.67508 2.85817 3.90841 3.0915L7.00008 6.18317L10.0917 3.0915C10.3251 2.85817 10.6751 2.85817 10.9084 3.0915C11.1417 3.32484 11.1417 3.67484 10.9084 3.90817L7.81675 6.99984L10.9084 10.0915Z"
            fill="black"
          />
          <mask
            id="mask0_2982_24525"
            style="mask-type: alpha"
            maskUnits="userSpaceOnUse"
            x="2"
            y="2"
            width="10"
            height="10"
          >
            <path
              d="M10.9084 10.0915C11.1417 10.3248 11.1417 10.6748 10.9084 10.9082C10.7917 11.0248 10.6751 11.0832 10.5001 11.0832C10.3251 11.0832 10.2084 11.0248 10.0917 10.9082L7.00008 7.8165L3.90841 10.9082C3.79175 11.0248 3.67508 11.0832 3.50008 11.0832C3.32508 11.0832 3.20841 11.0248 3.09175 10.9082C2.85841 10.6748 2.85841 10.3248 3.09175 10.0915L6.18342 6.99984L3.09175 3.90817C2.85841 3.67484 2.85841 3.32484 3.09175 3.0915C3.32508 2.85817 3.67508 2.85817 3.90841 3.0915L7.00008 6.18317L10.0917 3.0915C10.3251 2.85817 10.6751 2.85817 10.9084 3.0915C11.1417 3.32484 11.1417 3.67484 10.9084 3.90817L7.81675 6.99984L10.9084 10.0915Z"
              fill="white"
            />
          </mask>
          <g mask="url(#mask0_2982_24525)">
            <rect width="14" height="14" fill="#586B8B" />
          </g>
        </svg>
      </slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SwitchBox',
  props: {
    value: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {}
  },
  methods: {
    toggleSwitch() {
      this.$emit('input', !this.value)
    },
  },
}
</script>

<style lang="scss" scoped>
.switchbox {
  position: relative;
  background: #e2e8f0;
  border-radius: 14px;
  height: 24px;
  width: 42px;
  cursor: pointer;
  &.checked {
    background: #4c6fff;
    .switchbox__handle {
      left: 23px;
    }
    .switchbox__inner {
      right: 23px;
    }
  }
}
.switchbox__handle {
  position: absolute;
  top: 50%;
  margin-top: -7px;
  left: 5px;
  height: 14px;
  width: 14px;
  background: #ffffff;
  border-radius: 100%;
  box-shadow: -1px 2px 3px rgba(0, 0, 0, 0.2);
  transition: all 0.35s ease;
  z-index: 2;
}
.switchbox__inner {
  position: absolute;
  top: 50%;
  margin-top: -7px;
  right: 5px;
  height: 14px;
  width: 14px;
  transition: all 0.35s ease;
  z-index: 1;
}
</style>
