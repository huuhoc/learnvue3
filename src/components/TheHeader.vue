<template>
  <header class="py-3 shadow text-base bg-white sticky top-0 w-full z-30">
    <div class="container mx-auto px-4 sm:px-4 md:px-4">
      <div class="flex items-center justify-between">
        <div class="w-32 cursor-pointer">
          <RouterLink to="/">
            <img src="@/assets/images/logo.svg" class="max-w-full h-auto" alt="logo synodus" />
          </RouterLink>
        </div>
        <nav class="flex items-center space-x-5 font-semibold">
          <RouterLink to="/" class="text-menu hover:text-menu-hover">Trang chủ</RouterLink>
          <RouterLink to="/about" class="text-menu hover:text-menu-hover">Giới thiệu</RouterLink>
        </nav>
        <div class="w-32 flex items-center justify-end space-x-5">
          <svg-icon name="bell" class="w-6 h-6 text-black cursor-pointer hover:text-brand" />
          <svg-icon name="setting" class="w-6 h-6 text-black cursor-pointer hover:text-brand" />
          <div class="cursor-pointer">
            <s-avatar :srcImage="AvatarImage" name="Avatar" class="w-10 h-10 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import SAvatar from '@/components/common/SAvatar.vue'

import AvatarImage from '@/assets/images/avatar.png'

export default defineComponent({
  name: 'TheHeader',
  components: {
    SAvatar
  },
  setup() {
    return { AvatarImage }
  }
})
</script>
