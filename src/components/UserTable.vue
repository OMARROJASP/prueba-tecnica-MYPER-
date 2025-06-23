<!-- src/components/UserTable.vue -->
<script setup lang="ts">
import { onMounted } from 'vue'
import { useUserStore } from '../store/user'
defineEmits(['edit-user', 'delete-user'])


const userStore = useUserStore()

onMounted(() => {
  userStore.fetchUsers()
})
</script>

<template>
  <el-card style="margin-top: 20px; width: 100%;" shadow="never">
    <el-table
      v-loading="userStore.isLoading"
      :data="userStore.users"
      style="width: 100%"
      border
    >
      <el-table-column prop="name" label="Nombre" />
      <el-table-column prop="username" label="Usuario" />
      <el-table-column prop="email" label="Email" />
      <el-table-column prop="phone" label="Teléfono" />
      <el-table-column label="Acciones" width="220">
        <template #default="{ row }">
          <el-button type="primary" size="small" @click="$emit('edit-user', row)">Editar</el-button>
          <el-button type="danger" size="small" @click="$emit('delete-user', row.id)">Eliminar</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

