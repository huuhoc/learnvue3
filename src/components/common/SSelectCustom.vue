<template>
  <v-popover
    ref="selectCustom"
    :disabled="disabled"
    :placement="placement"
    :container="false"
    class="trigger-add relative w-3/4"
    @apply-show="onShow"
  >
    <div
      class="text-title text-xs font-normal flex items-center w-full break-all"
      :class="disabled ? 'cursor-not-allowed opacity-80' : 'cursor-pointer'"
    >
      <div class="flex flex-wrap gap-3">
        <div
          v-for="item in nameSelected"
          :key="item.id"
          class="flex items-center space-x-2"
        >
          <svg-icon name="folder" class="w-5 h-5 text-subtitle" />
          <span>{{ item.name }}</span>
        </div>
        <div
          v-if="defaultSelected && defaultSelected.length > maxCountTag"
          class="h-7 w-7 text-sx bg-brand bg-opacity-20 flex items-center justify-center rounded-full text-brand"
        >
          +{{ defaultSelected.length - maxCountTag }}
        </div>
      </div>
    </div>
    <div
      slot="popover"
      class="text-xs space-y-2 py-3 w-full min-w-288px h-80 bg-white shadow-main text-title font-normal flex flex-col overflow-hidden"
    >
      <div v-if="filterable" class="px-3">
        <div
          class="text-xs flex items-center px-2 rounded border border-gray-1"
        >
          <input
            v-model="keyword"
            class="bg-transparent h-8 focus:outline-none flex-1"
            :placeholder="placeholderSearch"
          />
          <span class="cursor-pointer text-white">
            <svg-icon name="search" class="h-4 w-4" />
          </span>
        </div>
      </div>
      <div
        v-if="
          (allowAddNew && $permission('add-folder')) ||
          (allowAddNew && $permission('admin'))
        "
        class="flex items-center space-x-2 px-5 text-xs pt-2 cursor-pointer hover:text-brand"
        @click="showAddFolder"
      >
        <svg-icon name="page-plus" class="text-subtitle w-6 h-6" />
        <span>Thêm mới thư mục</span>
      </div>
      <div v-if="folders && folders.length > 0" class="flex-1 overflow-hidden">
        <VuePerfectScrollbar ref="scrollbar" class="h-full">
          <a-tree
            v-model="checkedKeys"
            :tree-data="folders"
            :replace-fields="{ children: 'childs', title: 'name', key: 'id' }"
            check-strictly
            :multiple="multiple"
            :checkable="multiple"
            :load-data="onLoadData"
            :expanded-keys="expandedKeys"
            :default-checked-keys="defaultCheckedKeys"
            :default-selected-keys="defaultCheckedKeys"
            :selectable="!multiple"
            class="text-xs"
            @select="onSelect"
            @check="onCheck"
            @expand="onExpand"
          >
          </a-tree>
        </VuePerfectScrollbar>
      </div>
      <div v-else class="min-h-100px flex items-center justify-center">
        Không có dữ liệu phù hợp !
      </div>
    </div>
  </v-popover>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'SelectCustom',
  props: {
    value: {
      type: [String, Array, Object],
      default: null,
    },
    options: {
      type: Array,
      default: () => [],
    },
    maxCountTag: {
      type: Number,
      default: 3,
    },
    filterable: {
      type: Boolean,
      default: false,
    },
    placement: {
      type: String,
      default: 'auto',
    },
    placeholder: {
      type: String,
      default: 'Chọn giá trị',
    },
    placeholderSearch: {
      type: String,
      default: 'Tìm kiếm...',
    },
    showIcon: {
      type: Boolean,
      default: false,
    },
    width: {
      type: String,
      default: 'auto',
    },
    multiple: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    defaultSelected: {
      type: Array,
      default: () => [],
    },
    allowAddNew: {
      type: Boolean,
      default: false,
    },
    inForm: {
      type: String,
      default: 'add-report',
    },
  },
  data() {
    return {
      keyword: '',
      checkedKeys: this.defaultSelected.map((item) => item.id),
      expandedKeys: [],
    }
  },
  computed: {
    ...mapGetters({
      infoRootFolder: 'folders/infoRootFolder',
      listFoldersOfRoot: 'folders/listFoldersOfRoot',
      currentFolder: 'folders/currentFolder',
      breadCrumb: 'folders/breadCrumb',
      user: 'user',
    }),
    nameSelected() {
      if (
        this.defaultSelected &&
        this.defaultSelected.length > this.maxCountTag
      ) {
        return this.defaultSelected.slice(0, this.maxCountTag)
      }
      return this.defaultSelected
    },
    defaultExpanded() {
      return this.breadCrumb && this.breadCrumb.length > 1
        ? this.breadCrumb.map((item) => item.id)
        : [this.infoRootFolder.id]
    },
    defaultCheckedKeys() {
      return this.defaultSelected.map((item) => item.id)
    },
    folders() {
      const options = []
      const root = {
        ...this.infoRootFolder,
        key: this.infoRootFolder.id,
        name: 'Thư mục của tôi',
        childs: [],
      }
      options.push(root)
      options[0].childs = this.listFoldersOfRoot.map((item) => ({
        ...item,
        key: item.id,
        childs: item.childs
          ? item.childs.map((el) => ({
              ...el,
              key: el.id,
            }))
          : [],
        disabled:
          this.inForm === 'add-report'
            ? item.hasMoveAccessReport === false
            : item.hasMoveAccessFolder === false,
      }))
      if (this.value && this.value.length === 1) {
        const idFolderSelected = this.value[0].id
        options.forEach((item) => {
          if (item.id === idFolderSelected) {
            item.disableCheckbox = true
          } else {
            this.findId(item.childs, idFolderSelected)
          }
        })
      }
      return options
    },
    showSelectFolder() {
      return this.$store.state.showSelectFolder
    },
  },
  watch: {
    showSelectFolder(val) {
      val ? this.$refs.selectCustom.show() : this.$refs.selectCustom.hide()
    },
    value(valNew, valOld) {
      const processItemTree = (item, idFolderSelected, allowCheck) => {
        if (item.id === idFolderSelected) {
          item.disableCheckbox = allowCheck
        } else {
          this.findId(item.childs, idFolderSelected)
        }
      }
      if (valNew.length === 1) {
        const idFolderSelected = valNew[0].id

        this.folders.forEach((item) => {
          processItemTree(item, idFolderSelected, true)
        })
      }
    },
  },
  mounted() {
    this.getNavigation(this.defaultSelected[0].id)
  },
  methods: {
    findId(arr, id) {
      if (arr && arr.length > 0) {
        arr.forEach((item) => {
          if (item.id === id) {
            item.disableCheckbox = true
          } else {
            this.findId(item.childs, id)
          }
        })
      }
    },
    onShow() {
      this.$refs.scrollbar.update()
    },
    onSelect(_selectedKeys, info) {
      this.$refs.selectCustom.hide()
      const nodeSelect = info.selectedNodes.map((item) => ({
        id: item.data.props.id,
        name: item.data.props.name,
      }))
      this.$emit('input', nodeSelect)
    },
    onCheck(_checkedKeys, info) {
      const nodeSelect = info.checkedNodes.map((item) => ({
        id: item.data.props.id,
        name: item.data.props.name,
      }))
      this.$emit('input', nodeSelect)
    },
    onLoadData(treeNode) {
      return new Promise((resolve) => {
        const { id } = treeNode.dataRef
        setTimeout(() => {
          this.$BASEAPI
            .get('/api/Folder/list', {
              params: { folderId: id, sort: 0, keyword: '' },
            })
            .then((res) => {
              const childs = res.data.items
                .filter((item) => item.type === 0)
                .map((item) => ({
                  ...item,
                  disabled:
                    this.inForm === 'add-report'
                      ? item.hasMoveAccessReport === false ||
                        item.isOwner === false
                      : item.hasMoveAccessFolder === false ||
                        item.isOwner === false,
                  childs: [],
                }))
              this.$store.commit('folders/updateChildsMenu', {
                id,
                childs,
              })
              this.expandedKeys.push(id)
            })
          resolve()
        }, 300)
      })
    },
    onExpand(expandedKeys) {
      this.expandedKeys = expandedKeys
    },
    showAddFolder() {
      this.$modal.show('add-folder', {
        type: 'add',
        showOn: 'add-report',
      })
    },
    getNavigation(id) {
      this.$BASEAPI
        .get('/api/Folder/get-navigation', { params: { folderId: id } })
        .then((res) => {
          res.data.forEach((item) => {
            this.expandedKeys.push(item.id)
            if (item.id !== this.infoRootFolder.id) {
              this.$BASEAPI
                .get('/api/Folder/list', {
                  params: { folderId: item.id, sort: 0, keyword: '' },
                })
                .then((result) => {
                  const childs = result.data.items
                    .filter((itemFilter) => itemFilter.type === 0)
                    .map((itemMap) => ({
                      ...itemMap,
                      childs: [],
                    }))
                  this.$store.commit('folders/updateChildsMenu', {
                    id: item.id,
                    childs,
                  })
                })
            }
          })
        })
    },
  },
}
</script>
