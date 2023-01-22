<template>
    <Table :actions="true" :fields="fields" :data="pessoas" :height="height" 
        :on-edit-click="edit" :on-delete-click="deleteClick" :on-new-record-click="novaPessoa"
    />
</template>

<script lang="ts">
    import Table from '@/components/Table.vue';
    export default{
        setup(){
            const fields = [
                {key: 'id', title: 'Id'}, 
                {key: 'nome', title: 'Nome'},
                {key: 'identificacao', title: 'Identificação'},
                {key: 'data_nascimento', title: 'Data de Nascimento'}
            ]
            //Todo: Implementar o carregamento de todas as pessoas do banco
            const pessoas = [
                {id: 1, nome: 'Teste', identificacao: 1, data_nascimento: '01/01/2002'},
                {id: 1, nome: 'Teste', identificacao: 1, data_nascimento: '01/01/2002'},
                {id: 1, nome: 'Teste', identificacao: 1, data_nascimento: '01/01/2002'},
                {id: 1, nome: 'Teste', identificacao: 1, data_nascimento: '01/01/2002'},
                {id: 1, nome: 'Teste', identificacao: 1, data_nascimento: '01/01/2002'},
                {id: 1, nome: 'Teste', identificacao: 1, data_nascimento: '01/01/2002'},
                {id: 1, nome: 'Teste', identificacao: 1, data_nascimento: '01/01/2002'},
                {id: 1, nome: 'Teste', identificacao: 1, data_nascimento: '01/01/2002'},
                {id: 1, nome: 'Teste', identificacao: 1, data_nascimento: '01/01/2002'},
                {id: 1, nome: 'Teste', identificacao: 1, data_nascimento: '01/01/2002'},
                {id: 1, nome: 'Teste', identificacao: 1, data_nascimento: '01/01/2002'},
                {id: 1, nome: 'Teste', identificacao: 1, data_nascimento: '01/01/2002'},
                {id: 1, nome: 'Teste', identificacao: 1, data_nascimento: '01/01/2002'},
                {id: 1, nome: 'Teste', identificacao: 1, data_nascimento: '01/01/2002'},
                {id: 1, nome: 'Teste', identificacao: 1, data_nascimento: '01/01/2002'},
                {id: 1, nome: 'Teste', identificacao: 1, data_nascimento: '01/01/2002'},
                {id: 1, nome: 'Teste', identificacao: 1, data_nascimento: '01/01/2002'},
                {id: 1, nome: 'Teste', identificacao: 1, data_nascimento: '01/01/2002'},
                {id: 1, nome: 'Teste', identificacao: 1, data_nascimento: '01/01/2002'},
                {id: 1, nome: 'Teste', identificacao: 1, data_nascimento: '01/01/2002'},
                {id: 1, nome: 'Teste', identificacao: 1, data_nascimento: '01/01/2002'},
                {id: 1, nome: 'Teste', identificacao: 1, data_nascimento: '01/01/2002'},
                {id: 1, nome: 'Teste', identificacao: 1, data_nascimento: '01/01/2002'},
                {id: 1, nome: 'Teste', identificacao: 1, data_nascimento: '01/01/2002'},
                {id: 1, nome: 'Teste', identificacao: 1, data_nascimento: '01/01/2002'},
                {id: 1, nome: 'Teste', identificacao: 1, data_nascimento: '01/01/2002'},
                {id: 1, nome: 'Teste', identificacao: 1, data_nascimento: '01/01/2002'},
                {id: 1, nome: 'Teste', identificacao: 1, data_nascimento: '01/01/2002'},
            ] 

            const height = '100%'
            return {fields, pessoas, height}
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
        }
    }
</script>
