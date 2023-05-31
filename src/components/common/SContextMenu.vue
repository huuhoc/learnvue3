<template>
  <div id="context-menu" ref="contextMenu" v-click-outside="updatePosition">
    <div
      v-if="isShowContext"
      class="fixed bg-white shadow-main leading-tight text-subtitle w-50 z-1000"
      :style="stylePosition"
    >
      <div v-if="!loading.getInfoItemActived">
        <div
          v-if="isShowDetail"
          class="flex items-center px-3 h-10 space-x-2 cursor-pointer hover:bg-hover"
          @click="onViewDetail()"
        >
          <svg-icon class="w-5 h-5" name="eye" />
          <span class="text-title">Xem</span>
        </div>
        <div
          v-if="isShowCopy"
          class="flex items-center px-3 h-10 space-x-2 cursor-pointer hover:bg-hover"
          @click="onEdit(true)"
        >
          <svg-icon class="w-5 h-5" name="copy" />
          <span class="text-title">Tạo bản sao</span>
        </div>
        <div
          v-if="isShowEdit"
          class="flex items-center px-3 h-10 space-x-2 cursor-pointer hover:bg-hover"
          @click="onEdit()"
        >
          <svg-icon class="w-5 h-5" name="edit" />
          <span class="text-title">Chỉnh sửa</span>
        </div>
        <div
          v-if="isShowShare"
          class="flex items-center px-3 h-10 space-x-2 cursor-pointer hover:bg-hover"
          @click="onShare()"
        >
          <svg-icon class="w-5 h-5" name="share" />
          <span class="text-title">Chia sẻ</span>
        </div>
        <div
          v-if="isShowPublish"
          class="flex items-center px-3 h-10 space-x-2 cursor-pointer hover:bg-hover"
          @click="onPublish(itemActived.status)"
        >
          <svg-icon class="w-5 h-5" name="Export" />
          <span class="text-title">
            {{
              itemActived && itemActived.status == $status.PUBLISH
                ? 'Hủy xuất bản'
                : 'Xuất bản'
            }}
          </span>
        </div>
        <div
          v-if="isShowPermission"
          class="flex items-center px-3 h-10 space-x-2 cursor-pointer hover:bg-hover"
          @click="onPermit()"
        >
          <svg-icon class="w-5 h-5" name="user-add" />
          <span class="text-title">Phân quyền</span>
        </div>
      </div>
      <div v-else>
        <div class="flex items-center w-full px-3 h-10 space-x-2">
          <div class="w-5 h-5 bg-gray-100 rounded-full animate-pulse"></div>
          <div class="flex-1">
            <div class="h-3 bg-gray-100 rounded-sm animate-pulse"></div>
          </div>
        </div>
        <div class="flex items-center w-full px-3 h-10 space-x-2">
          <div class="w-5 h-5 bg-gray-100 rounded-full animate-pulse"></div>
          <div class="flex-1">
            <div class="h-3 bg-gray-100 rounded-sm animate-pulse"></div>
          </div>
        </div>
        <div class="flex items-center w-full px-3 h-10 space-x-2">
          <div class="w-5 h-5 bg-gray-100 rounded-full animate-pulse"></div>
          <div class="flex-1">
            <div class="h-3 bg-gray-100 rounded-sm animate-pulse"></div>
          </div>
        </div>
        <div class="flex items-center w-full px-3 h-10 space-x-2">
          <div class="w-5 h-5 bg-gray-100 rounded-full animate-pulse"></div>
          <div class="flex-1">
            <div class="h-3 bg-gray-100 rounded-sm animate-pulse"></div>
          </div>
        </div>
        <div class="flex items-center w-full px-3 h-10 space-x-2">
          <div class="w-5 h-5 bg-gray-100 rounded-full animate-pulse"></div>
          <div class="flex-1">
            <div class="h-3 bg-gray-100 rounded-sm animate-pulse"></div>
          </div>
        </div>
        <div class="flex items-center w-full px-3 h-10 space-x-2">
          <div class="w-5 h-5 bg-gray-100 rounded-full animate-pulse"></div>
          <div class="flex-1">
            <div class="h-3 bg-gray-100 rounded-sm animate-pulse"></div>
          </div>
        </div>
        <div class="flex items-center w-full px-3 h-10 space-x-2">
          <div class="w-5 h-5 bg-gray-100 rounded-full animate-pulse"></div>
          <div class="flex-1">
            <div class="h-3 bg-gray-100 rounded-sm animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  name: 'ContextMenu',
  props: {
    positionContext: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      heightEl: 270,
    }
  },
  computed: {
    ...mapGetters({
      loading: 'loading',
      isRouterNameFolder: 'folders/isRouterNameFolder',
      user: 'user',
      itemActived: 'folders/itemActived',
    }),
    infoRootFolder() {
      return this.$store.state.folders.infoRootFolder
    },
    isCannotMove() {
      return !(
        this.$route.name === 'index' ||
        this.$route.name === 'folders' ||
        this.$route.name === 'folders-slug'
      )
    },
    itemActived() {
      return this.$store.state.folders.itemActived
    },
    stylePosition() {
      if (this.positionContext) {
        const heightEl = this.heightEl
        const clientH = this.positionContext.event.view.innerHeight
        const postionY = this.positionContext.event.pageY
        const postionX = this.positionContext.event.pageX
        const top = postionY
        const transform =
          clientH - postionY > heightEl
            ? 'transform: translateY(0)'
            : 'transform: translateY(-100%)'
        const left = postionX
        return `top: ${top}px; left: ${left}px; ${transform}`
      } else {
        return null
      }
    },
    isShowDetail() {
      return this.$permission('view') || this.itemActived?.shareToMe
    },
    isShowCopy() {
      if (!this.isRouterNameFolder && !this.$permission('admin')) {
        return false
      }
      return (
        this.itemActived.createdBy === this.user.userId ||
        this.$permission('admin')
      )
    },
    isShowEdit() {
      if (!this.isRouterNameFolder && !this.$permission('admin')) {
        return false
      }
      return this.$permission('edit') && !this.$permission('guest')
    },
    isShowShare() {
      if (!this.isRouterNameFolder && !this.$permission('admin')) {
        return false
      }
      return this.$permission('share') && !this.$permission('guest')
    },
    isShowPublish() {
      if (!this.isRouterNameFolder && !this.$permission('admin')) {
        return false
      }
      return (
        this.itemActived &&
        this.itemActived.type === this.$type.REPORT &&
        this.$permission('admin')
      )
    },
    isShowPermission() {
      if (!this.isRouterNameFolder && !this.$permission('admin')) {
        return false
      }
      return this.$permission('admin') || this.$permission('owner')
    },
    isShowContext() {
      return (
        this.positionContext &&
        (this.isShowDetail ||
          this.isShowMove ||
          this.isShowCopy ||
          this.isShowEdit ||
          this.isShowShare ||
          this.isShowPublish ||
          this.isShowPermission)
      )
    },
  },
  methods: {
    updatePosition() {
      this.$store.commit('folders/updatePositionContextMenu', null)
    },
    onViewDetail() {
      this.$store.commit('setShowInfoBar', true)
      this.$store.commit('folders/setDetailTabActived', true)
      this.updatePosition()
    },
    onEdit(isDuplicate = false) {
      if (!this.itemActived) return
      this.updatePosition()
      if (this.itemActived.type === this.$type.FOLDER) {
        this.$modal.show('add-folder', {
          item: this.itemActived,
          type: isDuplicate ? 'copy' : 'edit',
        })
      } else {
        this.$modal.show('add-report', {
          item: this.itemActived,
          type: isDuplicate ? 'copy' : 'edit',
        })
      }
    },
    checkProcess(type) {
      this.$BASEAPI
        .get('/api/Source/check-progress', {
          params: { sourceId: this.itemActived.id, code: type },
        })
        .then((res) => {
          if (res.succeeded && res.status === 1) {
            this.$notification.info({
              message: res.data?.title || 'Dữ liệu đang được xử lý !',
            })
            return true
          } else {
            return false
          }
        })
        .catch(() => {
          return true
        })
    },
    async onShare() {
      if (
        this.itemActived &&
        this.itemActived.type === this.$type.REPORT &&
        this.itemActived.status !== this.$status.PUBLISH
      ) {
        this.$notification.warning({
          message: 'Báo cáo cần được xuất bản trước khi chia sẻ',
        })
        return
      }
      if (this.checkProcess('SET_SHARED')) return
      if (
        this.itemActived &&
        this.itemActived.allPublicReportNumber === this.itemActived.numberReport
      ) {
        this.$modal.show('share', this.itemActived)
      } else {
        await this.$confirmCustom.show({
          message:
            'Thư mục này có báo cáo chưa xuất bản. Bạn có chắc chắn chia sẻ thư mục này không ?',
          okButton: 'Đồng ý',
          iconImage: '/share.svg',
          onConfirm: () => {
            this.$modal.show('share', this.itemActived)
          },
        })
      }
      this.updatePosition()
    },
    async onPublish(status) {
      await this.$confirmCustom.show({
        message:
          status === 2
            ? 'Bạn có chắn chắn hủy xuất bản báo cáo này không?'
            : 'Bạn có chắn chắn xuất bản báo cáo này không?',
        okButton: 'Đồng ý',
        iconImage:
          status === 2 ? '/report-unpublish.svg' : '/report-publish.svg',
        onConfirm: () => {
          this.$store.dispatch('folders/publishReport', {
            id: this.itemActived.id,
            status: status === 2 ? 3 : 2,
          })
          this.$notification.success({
            message:
              status === 2
                ? 'Hủy xuất bản báo cáo thành công'
                : 'Xuất bản báo cáo thành công',
          })
          this.updatePosition()
        },
      })
    },
    onPermit() {
      if (this.checkProcess('SET_PERMISSION')) return
      if (this.itemActived?.id) {
        this.$modal.show('Permission')
        this.updatePosition()
      }
    },
  },
}
</script>
