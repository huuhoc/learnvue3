<template>
  <div>
    <h1 class="font-bold text-black text-lg mb-3">Upload Video Youtube</h1>
    <div class="text-sm space-y-4">
      <div class="grid grid-cols-2 gap-10">
        <div class="flex flex-col space-y-2">
          <label class="font-semibold text-sm">Tiêu đề</label>
          <input
            type="text"
            v-model="params.title"
            class="border border-gray-500 px-3 rounded-sm focus:border-brand outline-none h-10"
          />
        </div>
        <div class="flex flex-col space-y-2">
          <label class="font-semibold text-sm">Author</label>
          <input
            type="text"
            v-model="params.author"
            class="border border-gray-500 px-3 rounded-sm focus:border-brand outline-none h-10"
          />
        </div>
      </div>
      <div class="grid grid-cols-2 gap-10">
        <div class="flex flex-col space-y-2">
          <label class="font-semibold text-sm">Tags</label>
          <input
            type="text"
            v-model="params.tags"
            class="border border-gray-500 px-3 rounded-sm focus:border-brand outline-none h-10"
          />
        </div>
      </div>

      <div class="flex items-center justify-end space-x-3">
        <div class="cursor-pointer rounded border border-gray-300 px-3 py-2 font-bold">Cancel</div>
        <div
          class="cursor-pointer rounded border border-brand px-3 py-2 font-bold bg-brand text-white"
        >
          Upload
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive } from 'vue'

interface Video {
  title: string
  author: string
  tags: string
}

const defaultParams = {
  title: '',
  author: '',
  tags: ''
}

export default defineComponent({
  name: 'PageUploadVideo',
  setup() {
    const params: Video = reactive(defaultParams)
    return { params }
  }
})
</script>
