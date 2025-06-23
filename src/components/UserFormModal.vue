<script setup lang="ts">
    import {  ref, watch, defineProps, defineEmits } from 'vue'
    import { useUserStore } from '../store/user'
    import { ElMessage } from 'element-plus'

    const userStore = useUserStore();

    const props = defineProps<{
        modelValue: boolean
        userToEdit?: any
    }>()


    

const emit = defineEmits(['update:modelValue'])
    
const isVisible = ref(props.modelValue)


   watch(() => props.modelValue, (val) => {
  isVisible.value = val
})

watch(isVisible, (val) => {
  emit('update:modelValue', val)
})

// Campos del formulario
const name = ref('')
const username = ref('')
const email = ref('')
const phone = ref('')

watch(
  () => props.userToEdit,
  (user) => {
    if (user) {
      name.value = user.name
      username.value = user.username
      email.value = user.email
      phone.value = user.phone
    } else {
      name.value = ''
      username.value = ''
      email.value = ''
      phone.value = ''
    }
  },
  { immediate: true }
)

function submitForm() {
 const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(email.value)){
            ElMessage.error('Correo inválido')
            return
        }

  const correoRepetido = userStore.users.find(u => u.email === email.value)
  if (correoRepetido){
    ElMessage.error('Correo ya registrado, ingrese otro correo')
    return
  }

  const data = {
    name: name.value,
    username: username.value,
    email: email.value,
    phone: phone.value,
  }

  if (props.userToEdit) {
    userStore.editUser(props.userToEdit.id, data)
    ElMessage({
    message: 'Felicitaciones se edito el Usuario correctamente.',
    type: 'success',
  })
  } else {
    userStore.addUser(data)
    ElMessage({
    message: 'Felicitaciones se creo el Usuario.',
    type: 'success',
  })
  }

  isVisible.value = false
}

</script>
<template>
    <el-dialog v-model="isVisible" :title="userToEdit ? 'Editar Usuario': 'Crear Usuario '" width="500px">
        <el-form label-width="100px" @submit.prevent="submitForm">
            <el-form-item label="Nombre">
                <el-input v-model="name" />
            </el-form-item>
            <el-form-item label="Usuario">
                <el-input v-model="username" />
            </el-form-item>
            <el-form-item label="Correo Electrónico">
                <el-input v-model="email" />
            </el-form-item>
            <el-form-item label="Telefono">
                <el-input v-model="phone" />
            </el-form-item>
        </el-form>
        <template #footer>
            <el-button @click="isVisible = false"> Cancelar</el-button>
            <el-button type="primary" @click="submitForm"> {{ userToEdit ? 'Guardar Cambios' : 'Crear' }}</el-button>
        </template>
    </el-dialog>
</template>