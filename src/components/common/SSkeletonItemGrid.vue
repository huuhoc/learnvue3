<template>
  <div
    class="flex items-center p-4 space-x-4 border border-normal rounded-lg w-full"
  >
    <div class="animate-pulse px-4 py-4 flex items-center w-full">
      <div class="w-8 h-8 bg-gray-100 rounded-full"></div>
      <div class="flex-1">
        <div class="h-3 bg-gray-100 rounded-sm"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SkeletonItemGrid',
}
</script>
