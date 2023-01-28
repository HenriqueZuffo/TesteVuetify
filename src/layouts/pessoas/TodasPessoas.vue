<template>
    <div v-if="!loading">
        <Table :actions="true" :fields="fields" :data="pessoas" :height="height" 
            :on-edit-click="edit" :on-delete-click="deleteClick" :on-new-record-click="novaPessoa"
        />
    </div>

    <v-dialog v-else v-model="loading" width="100px">
        <v-card height="100px" style="justify-content: center; align-items: center;" >
            <v-progress-circular indeterminate color="deep-purple"/>
        </v-card>
    </v-dialog>   
  
    <v-alert v-if="error" type="error" closable>{{ errorMsg }}</v-alert>
</template>

<script lang="ts">
    import Table from '@/components/Table.vue';
    import { HTTP } from '@/plugins/axios'
    export default{
        setup(){
            const fields = [
                {key: 'id', title: 'Id'}, 
                {key: 'nome', title: 'Nome'},
                {key: 'identificacao', title: 'Identificação'},
                {key: 'data_nascimento', title: 'Data de Nascimento'},
                {key: 'tipo', title: 'Tipo'}
            ]
            const height = '100%'
            return {fields, height}
        },
        data(){
            return{
                pessoas: [
                    {
                        nome: '',
                        identificacao: '',
                        tipoPessoa: '',
                        dataNascimento: Date,                       
                    }
                ],
                loading: true,
                error: false,
                errorMsg: ''
            }
        },

        components: {
            Table
        },
        methods:{
            edit(item: any){
                this.$router.push(`/pessoa/${item.id}`)
            },
            deleteClick(item: any){
                this.pessoas.forEach((pessoa, index) => {
                    if(pessoa.id == item.id) this.pessoas.splice(index, 1)
                })
            },
            novaPessoa(){
                this.$router.push(`/pessoa`)
            }
        },
        mounted(){
            this.pessoas = JSON.parse(localStorage.getItem('pessoas'))
            this.loading = false
            if (!this.pessoas){
                this.errorMsg = 'Nenhum registro foi encontrado!'
                this.error = true
                return
            }
        }
    }
</script>
