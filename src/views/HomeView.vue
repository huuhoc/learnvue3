<template>
  <div>
    <SButton type="solid" />
    <SInput label="Name" v-model="name" />
    {{ name }}
    <span @click="clearInput" class="cursor-pointer px-4 py-3 border">Clear</span>
  </div>
  <table>
    <thead>
      <th>Name</th>
      <th>Index</th>
    </thead>
    <tbody>
      <tr v-for="(row, idx) in rows" :key="idx">
        <td>{{ row.Name }}</td>
        <td>{{ row.Index }}</td>
      </tr>
    </tbody>
    <tfoot>
      <td colSpan="{2}">
        <button @click="exportFile">Export XLSX</button>
      </td>
    </tfoot>
  </table>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { read, utils, writeFileXLSX } from 'xlsx'

const rows = ref([])

onMounted(async () => {
  /* Download from https://sheetjs.com/pres.numbers */
  const f = await fetch('https://sheetjs.com/pres.numbers')
  const ab = await f.arrayBuffer()

  /* parse workbook */
  const wb = read(ab)

  /* update data */
  rows.value = utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]])
})

/* get state data and export to XLSX */
function exportFile() {
  const ws = utils.json_to_sheet(rows.value)
  const wb = utils.book_new()
  utils.book_append_sheet(wb, ws, 'Data')
  writeFileXLSX(wb, 'SheetJSVueAoO.xlsx')
}
</script>
