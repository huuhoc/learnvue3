<template>
  <footer class="container mx-auto flex items-center h-16 py-3 px-4 sm:px-4 md:px-4">
    <div class="flex items-center justify-between flex-auto w-full text-sm">
      <span>Copyright © 2023 <span class="font-semibold">Synodus</span> All rights reserved.</span>
      <div>
        <a class="text-gray" href="/#">Term &amp; Conditions</a
        ><span class="mx-2 text-muted"> | </span
        ><a class="text-gray" href="/#">Privacy &amp; Policy</a>
      </div>
    </div>
  </footer>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'TheFooter',
  setup() {}
})
</script>
