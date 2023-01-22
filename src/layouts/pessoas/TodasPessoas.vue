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
            async deleteClick(item: any){
                //Todo: Implementar o delete da pessoa na tela de Todas as Pessoas
                await HTTP.delete(`pessoa/${item.id}`)
                    .then(_ => {
                        this.successMsg = `Pessoa ${item.id} excluída com sucesso!`
                        this.success = true
                        this.$router.push(`/pessoas`)
                    })
                    .catch(error => {
                        this.errorMsg = error.message
                        this.error = true
                    })
            },
            novaPessoa(){
                this.$router.push(`/pessoa`)
            }
        },
        mounted(){
            HTTP.get('pessoa')
                .then((res) => {
                    this.pessoas = res.data.map(p => {
                        let {enderecos, ..._pessoa} = p
                        _pessoa.tipo = _pessoa.tipo = 1 ? 'Física' : 'Jurídica'
                        return _pessoa
                    })                    
                    this.loading = false                    
                }, error => {
                    this.errorMsg = error.message
                    this.error = true
                    this.loading = false
                    return Promise.reject(error)
                })
                .catch(error => {
                    this.errorMsg = error.message
                    this.loading = false
                    this.error = true
                })
        }
    }
</script>
