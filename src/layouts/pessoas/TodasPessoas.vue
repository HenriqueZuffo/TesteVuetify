<template>
    <div v-if="!loaded">
        <Table :actions="true" :fields="fields" :data="pessoas" :height="height" 
            :on-edit-click="edit" :on-delete-click="deleteClick" :on-new-record-click="novaPessoa"
        />
    </div>

    <v-dialog v-else v-model="loaded" width="100px">
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
                {key: 'data_nascimento', title: 'Data de Nascimento'}
            ]
            const height = '100%'
            return {fields, height}
        },
        data(){
            return{
                pessoas: [],
                loaded: true,
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
                //Todo: Implementar o delete da pessoa na tela de Todas as Pessoas
                console.log(`Entrou no delete ${item}`)
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
                        return _pessoa
                    })                    
                    this.loaded = false                    
                }, error => {
                    this.errorMsg = error.message
                    this.error = true
                    this.loaded = false
                    return Promise.reject(error)
                })
                .catch(error => {
                    this.errorMsg = error.message
                    this.loaded = false
                    this.error = true
                })
        }
    }
</script>
