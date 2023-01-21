<template>
    <Table :actions="true" :fields="fields" :data="pessoas" :height="height" />
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
        }
    }
</script>
