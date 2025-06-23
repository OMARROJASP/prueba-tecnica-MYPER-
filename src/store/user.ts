import axios from "axios";
import { defineStore } from "pinia";

export interface User {
    id: number
    name: string
    username: string
    email: string
    phone: string
}

export const useUserStore = defineStore('user', {
    state: () => ({
        users: [] as User[],
        isLoading: false
    }),

    actions: {
        async fetchUsers() {
            this.isLoading = true;
            try {
                const response = await axios.get<User[]>('https://jsonplaceholder.typicode.com/users')
                this.users = response.data;
                await new Promise(resolve => setTimeout(resolve, 2000))
            } catch (error ) {
                console.error('Error al llamar a API: ', error)
            } finally {
                this.isLoading = false
            }
        },

        addUser(newUser: any) {
            const lastId = this.users[this.users.length - 1]?.id || 0      
            this.users.push({ id: lastId + 1, ...newUser})
        },

        editUser(id: number, updateUser: any){
            const index = this.users.findIndex(u => u.id === id)
            if (index !== -1){
                this.users[index] = {...this.users[index], ...updateUser}
            }
        },

        deleteUser(id: number) {
            this.users = this.users.filter(user => user.id !== id)
        }


    }
})