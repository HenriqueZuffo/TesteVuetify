<template>
  <v-tabs v-model="tab" bg-color="deep-purple">
    <v-tab value="pessoa">Pessoa</v-tab>
    <v-tab value="endereco">Endereços</v-tab>
  </v-tabs>

  <v-window v-model="tab">
    <v-window-item value="pessoa">
      <v-form ref="form" class="ma-8" lazy-validation>
        
        <v-row justify="space-between">
          <v-col cols="3">
            <v-text-field v-model="id" label="Id" readonly />
          </v-col>

          <v-col cols="3">
            <v-text-field v-model="pessoa.dataNascimento" :rules="pessoaRules.dataNascimentoRules" label="Data de Nascimento" type="date" />
          </v-col>
        </v-row>

        <v-row>

          <v-col cols="4">
            <v-text-field v-model="pessoa.nome" :rules="pessoaRules.nomeRules" label="Nome" />
          </v-col>
          
          <v-col cols="4">
            <v-text-field v-model="pessoa.identificacao" :rules="pessoaRules.identificacaoRules" label="Identificação" />
          </v-col>       

          <v-col cols="4">
            <v-select v-model="select" :items="pessoa.tipoPessoa" item-title="title" 
              item-value="value" label="Tipo" single-line :rules="pessoaRules.tipoPessoaRules" />
          </v-col>     
          
        </v-row>
        

        <v-row>
          <v-col cols="auto" class="me-auto">
            <v-btn class="bg-deep-purple" @click="onSaveClick"> Salvar </v-btn>
          </v-col>

          <v-col cols="auto">
            <v-btn class="bg-red" @click="onDeleteClick"> Excluir </v-btn>
          </v-col>      
        </v-row>

      </v-form>
    </v-window-item>

    <v-window-item value="endereco">
      <Table :fields="fields" :data="enderecos" :actions="true" :height="heightTable"/>
    </v-window-item>

  </v-window> 
</template>

<script lang="ts">
  import Table from './Table.vue'
  export default {
    data(){
      return{
        tab: null,
        id: this.$route.params.id,
        select: null,
        valid: false,
        pessoa: {
          nome: '',
          identificacao: '',
          tipoPessoa: [
            {title: 'Física', value: 1},
            {title: 'Jurídica', value: 2} 
          ],
          dataNascimento: Date
        },

        pessoaRules:{
          nomeRules: [
            (v: any) => !!v || 'Nome é obrigatório',
            (v: any) => (v && v.length < 150) || 'Tamanho máximo é 150 caracteres'
          ],
          identificacaoRules: [
            (v: any) => !!v || 'Identificação é obrigatório'
          ],
          tipoPessoaRules: [
            (v: any) => !!v || 'Tipo da Pessoa é obrigatório'
          ],
          dataNascimentoRules: [
            (v: any) => !!v || 'Data de nascimento é obrigatória!'
          ]
        },

        fields: [
          {key: 'id', title: 'Id'}, 
          {key: 'cep', title: 'CEP'},
          {key: 'logradouro', title: 'Logradouro'},
          {key: 'numero', title: 'Número'}, 
          {key: 'bairro', title: 'Bairro'},
          {key: 'complemento', title: 'Complemento'}, 
          {key: 'cidade', title: 'Cidade'}, 
          {key: 'uf', title: 'UF'}, 
          {key: 'tipo_pessoa', title: 'Tipo'}, 
        ],

        enderecos: [
          {id: 1, cep: '123456789', logradouro: 'Teste', numero: 1, bairro: 'teste', complemento: '', cidade: 'cidade', uf: 'PR', tipo_pessoa: 1},
          {id: 1, cep: '123456789', logradouro: 'Teste', numero: 1, bairro: 'teste', complemento: '', cidade: 'cidade', uf: 'PR', tipo_pessoa: 1},
          {id: 1, cep: '123456789', logradouro: 'Teste', numero: 1, bairro: 'teste', complemento: '', cidade: 'cidade', uf: 'PR', tipo_pessoa: 1},
          {id: 1, cep: '123456789', logradouro: 'Teste', numero: 1, bairro: 'teste', complemento: '', cidade: 'cidade', uf: 'PR', tipo_pessoa: 1},
          {id: 1, cep: '123456789', logradouro: 'Teste', numero: 1, bairro: 'teste', complemento: '', cidade: 'cidade', uf: 'PR', tipo_pessoa: 1},
          {id: 1, cep: '123456789', logradouro: 'Teste', numero: 1, bairro: 'teste', complemento: '', cidade: 'cidade', uf: 'PR', tipo_pessoa: 1},
          {id: 1, cep: '123456789', logradouro: 'Teste', numero: 1, bairro: 'teste', complemento: '', cidade: 'cidade', uf: 'PR', tipo_pessoa: 1},
          {id: 1, cep: '123456789', logradouro: 'Teste', numero: 1, bairro: 'teste', complemento: '', cidade: 'cidade', uf: 'PR', tipo_pessoa: 1},
          {id: 1, cep: '123456789', logradouro: 'Teste', numero: 1, bairro: 'teste', complemento: '', cidade: 'cidade', uf: 'PR', tipo_pessoa: 1},
        ],

        heightTable: '100%'      
      }
    },
    methods: {
      onSaveClick(){
        this.$refs.form.validate()
        console.log(`Data: ${!!this.tipoPessoa} `)
      },
      
      onDeleteClick(){
        console.log(`Ondelete not implemented`)
      }
    },
    components:{
      Table
    }
  }
</script>