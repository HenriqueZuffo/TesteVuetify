<template>
    <v-form ref="form" class="ma-8">
        <v-row>
            <v-col cols="auto">
                <v-btn @click="onVoltar()" class="bg-deep-purple"> <v-icon icon="mdi-arrow-left-thin" /> </v-btn>
            </v-col>
        </v-row>
        <v-row justify="space-between">
            <v-col cols="3">
                <v-text-field v-model="infoEndereco.id" label="id" readonly/>
            </v-col>
                        
            <v-col cols="3">
                <v-select v-model="select" :items="tipo" item-title="title" 
                    item-value="value" label="Tipo" single-line :rules="enderecoRules.tipo"/>
            </v-col>
        </v-row>
        
        <v-row>

            <v-col cols="3">
                <v-text-field v-model="infoEndereco.cep" label="Cep" :rules="enderecoRules.cep"/>
            </v-col>

            <v-col cols="1">
                <v-text-field v-model="infoEndereco.uf" label="Uf" :rules="enderecoRules.uf"/>
            </v-col>

            <v-col cols="2">
                <v-text-field v-model="infoEndereco.cidade" label="Cidade" :rules="enderecoRules.cidade"/> 
            </v-col>

            <v-col cols="3">
                <v-text-field v-model="infoEndereco.bairro" label="Bairro" :rules="enderecoRules.bairro"/>
            </v-col>


            
            <v-col cols="3">
                <v-text-field v-model="infoEndereco.numero" type="number" label="Número" :rules="enderecoRules.numero"/>
            </v-col>
        </v-row>

        <v-row>
            <v-col cols="6">
                <v-text-field v-model="infoEndereco.logradouro" label="Logradouro" :rules="enderecoRules.logradouro"/>
            </v-col>

            <v-col cols="6">
                <v-text-field v-model="infoEndereco.complemento" label="Complemento" />
            </v-col>

        </v-row>

        <v-row>
            <v-col cols="auto" class="me-auto">
                <v-btn class="bg-deep-purple" @click="onSalvar"> Salvar </v-btn>
            </v-col>

            <v-col cols="auto">
                <v-btn class="bg-red" @click="onDelete" :disabled="!infoEndereco.id || infoEndereco.id <= 0"> Excluir </v-btn>
            </v-col>            
        </v-row>
    </v-form>
</template>

<script lang="ts">
export default {
    
    props: {
        endereco: Object,
        onSalvarClick: Function,
        onDeleteClick: Function,
        idPessoa: Number,
        voltarClick: Function
    },
    data(){
        return{
            select: null,
            infoEndereco: {
                id: null,
                cep: '',
                logradouro: '',
                numero: null,
                bairro: '',
                complemento: '',
                cidade: '',
                uf: '',
                tipo: ''
            },

            tipo: [
                {title: 'Residencial', value: 1},
                {title: 'Comercial', value: 2} 
            ],
            enderecoRules: {
                cep: [
                    (v: any) => !!v || 'Cep é obrigatório',
                    (v: any) => (v && v.length == 9) || 'Cep deve conter 9 caracteres'
                ],
                logradouro: [
                    (v: any) => !!v || 'Logradouro é obrigatório'
                ],
                numero: [
                    (v: any) => !!v || 'Número é obrigatório'
                ],
                bairro: [
                    (v: any) => !!v || 'Bairro é obrigatório'
                ],
                cidade: [
                    (v: any) => !!v || 'Cidade é obrigatório'
                ],
                uf: [
                    (v: any) => !!v || 'Uf é obrigatório',
                    (v: any) => (v && v.length == 2) || 'Uf deve conter 2 caracteres'
                ],
                tipo: [
                    (v: any) => !!v || 'Tipo é obrigatório'
                ]

            }
        }
        
    },
    methods: {
        async onSalvar(){
            const { valid } = await this.$refs.form.validate()

            if(this.onSalvarClick && valid){
                this.infoEndereco.tipo = this.select
                this.onSalvarClick(this.infoEndereco);
            }
        },   
        onDelete(){
            if(this.onDeleteClick){
                this.onDeleteClick(this.infoEndereco)
            }
        },
        onVoltar(){
            if(this.voltarClick){
                this.voltarClick()
            }
        } 
    },
    created(){
        if (!this.endereco) return
        this.infoEndereco = Object.assign(this.infoEndereco, this.endereco)
        this.select = this.endereco.tipo
    },
}

</script>