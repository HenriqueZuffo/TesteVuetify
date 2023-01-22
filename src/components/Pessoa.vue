<template>
  <v-tabs v-model="tab" bg-color="deep-purple">
    <v-tab value="pessoa">Pessoa</v-tab>
    <v-tab value="endereco">Endereços</v-tab>
  </v-tabs>

  <v-window v-model="tab">
    <v-window-item value="pessoa">
      <v-form ref="form" class="ma-8" v-model="isValid">
        <v-row>
            <v-col cols="auto">
                <v-btn @click="voltar" class="bg-deep-purple"> <v-icon icon="mdi-arrow-left-thin" /> </v-btn>
            </v-col>
        </v-row>

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
            <v-btn class="bg-deep-purple" @click="onSaveClick" :disabled="!isValid"> Salvar </v-btn>
          </v-col>

          <v-col cols="auto">
            <v-btn class="bg-red" @click="onDeleteClick"> Excluir </v-btn>
          </v-col>      
        </v-row>

      </v-form>
    </v-window-item>

    <v-window-item value="endereco">
      <Table :fields="fieldsEndereco" :data="pessoa.enderecos" :actions="true" :height="heightTable"
        :on-delete-click="onDeleteEndereco" :on-new-record-click="onNewRecord" :on-edit-click="onEdit"
      />

      <v-dialog v-model="dialog">
        <v-card>
          <Endereco :id-pessoa="id" :voltar-click="voltarEndereco"
            :endereco="enderecoSelecionado" :on-salvar-click="onSalvarEndereco"
            :on-delete-click="onDeleteEndereco"
          />        
        </v-card>      
      </v-dialog>
    </v-window-item>

  </v-window> 
</template>

<script lang="ts">
  import Table from './Table.vue'
  import Endereco from './Endereco.vue'
  export default {
    data(){
      return{
        isValid: true,
        tab: null,
        id: Number(this.$route.params.id) || null,
        select: null,
        valid: false,
        dialog: false,

        //Todo: Carregar a pessoa e seus endereços
        pessoa: {
          nome: '',
          identificacao: '',
          tipoPessoa: [
            {title: 'Física', value: 1},
            {title: 'Jurídica', value: 2} 
          ],
          dataNascimento: Date,
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
          ]
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

        fieldsEndereco: [
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

        enderecoSelecionado: null,

        heightTable: '100%'      
      }
    },
    methods: {
      onSaveClick(){
        //Todo: Implementar save da Pessoa
        this.$refs.form.validate()
      },
      onDeleteClick(){
        //Todo: Implementar onDelete da Pessoa
        console.log(`Ondelete not implemented`)
      },
      voltar(){
        this.$router.push(`/pessoas`)
      },
      onEdit(item: any){
        this.enderecoSelecionado = item
        this.dialog = true
      },
      onNewRecord(){
        this.dialog = true
      },
      onDeleteEndereco(item: any){
        //Todo: Implementar onDeleteEndereco
        console.log(`OnDelete Endereço ${item}`)
      },
      voltarEndereco(){
        this.dialog = false
      },
      onSalvarEndereco(item: any){
        //Todo: Implementar Salvar Endereço
        console.log(`OnSalvar Endereco ${item.id}`)
      }
    },
    components:{
      Table,
      Endereco
    }
  }
</script>