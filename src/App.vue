<script setup lang="ts">
import { ref } from 'vue'
import { useUserStore } from './store/user'
import UserTable from './components/UserTable.vue'
import UserForm  from './components/UserFormModal.vue'

const showForm = ref(false)
const selectedUser = ref(null)

function openCreate() {
  selectedUser.value = null
  showForm.value = true
}

function openEdit(user: any) {
  selectedUser.value = user
  showForm.value = true
}

function deleteUser(id: number) {
   if (confirm('¿Estás seguro de que quieres eliminar este usuario?')) {
    const store = useUserStore()
    store.deleteUser(id)
  }
}

</script>

<template>
 <div style="padding: 2rem">
    <el-button type="primary" @click="openCreate">Crear Usuario</el-button>

    <UserTable @edit-user="openEdit"  @delete-user="deleteUser" />

    <UserForm v-model="showForm" :userToEdit="selectedUser" />
  </div>
</template>
