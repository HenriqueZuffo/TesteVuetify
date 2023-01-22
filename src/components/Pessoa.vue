<template>
  <v-tabs v-model="tab" bg-color="deep-purple">
    <v-tab value="pessoa">Pessoa</v-tab>
    <v-tab value="endereco">Endereços</v-tab>
  </v-tabs>

  <v-window v-model="tab" v-if="!loading">
    <v-window-item value="pessoa">
      <v-form ref="form" class="ma-8" v-model="isValid">
        <v-row>
            <v-col cols="auto">
                <v-btn @click="voltar" class="bg-deep-purple"> <v-icon icon="mdi-arrow-left-thin" /> </v-btn>
            </v-col>
        </v-row>

        <v-row justify="space-between">
          <v-col cols="3">
            <v-text-field v-model="pessoa.id" label="Id" readonly />
          </v-col>

          <v-col cols="3">
            <v-text-field v-model="pessoa.dataNascimento" :rules="pessoaRules.dataNascimentoRules" 
              label="Data de Nascimento" type="date"
            />
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
            <v-btn class="bg-deep-purple" @click="onSaveClick()" :disabled="!isValid"> Salvar </v-btn>
          </v-col>

          <v-col cols="auto">
            <v-btn class="bg-red" @click="onDeleteClick()"> Excluir </v-btn>
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

  <v-dialog v-else v-model="loading" width="100px">
        <v-card height="100px" style="justify-content: center; align-items: center;" >
            <v-progress-circular indeterminate color="deep-purple"/>
        </v-card>
  </v-dialog> 

  <v-alert v-if="error" type="error" closable>{{ errorMsg }}</v-alert>
  <v-alert v-if="success" type="success" closable> {{ successMsg }}</v-alert>
   
</template>

<script lang="ts">
  import Table from './Table.vue'
  import Endereco from './Endereco.vue'
  import { HTTP } from '@/plugins/axios'
  import  moment  from 'moment'
  export default {
    data(){
      return{
        isValid: true,
        tab: null,
        id: Number(this.$route.params.id) || null,
        select: null,
        dialog: false,
        
        error: false,
        errorMsg: '',
        loading: true,
        success: false,
        successMsg: '',

        pessoa: {
          id: '',
          nome: '',
          identificacao: '',
          tipoPessoa: [
            {title: 'Física', value: 1},
            {title: 'Jurídica', value: 2} 
          ],
          dataNascimento: Date,
          enderecos: null
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
        if (!this.pessoa.enderecos || this.pessoa.enderecos.length <= 0){
          this.error = true
          this.errorMsg = 'É necessário cadastrar ao menos 1 endereço!'
          return
        }

        if(this.id){
          HTTP.put(`pessoa/${this.id}`, this.pessoa)
            .then(_ => {
              this.successMsg = 'Pessoa alterada com sucesso'
              this.success = true
            })
            .catch(error => {
              this.error = true
              this.errorMsg = error.message
            })
        } else {
          HTTP.post(`pessoa`, this.pessoa)
            .then(res => {
              this.successMsg = res.data
              this.success = true
            })
            .catch(error => {
              this.error = true
              this.errorMsg = error.message
            })
        }
      },
      async onDeleteClick(){
        await HTTP.delete(`pessoa/${this.id}`)
          .then(_ => {
            this.successMsg = `Pessoa ${this.id} excluída com sucesso!`
            this.success = true
          })
          .catch(error => {
            this.errorMsg = error.message
            this.error = true
          })
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
        if(!item.id || item.id <= 0){
          this.pessoa.enderecos.insert(item)
        }else{
          let objIndex = this.pessoas.enderecos.findIndex(obj => obj.id == item.id)
          console.log(`Antes de alterar? ${this.pessoas.enderecos[0].logradouro}`)
          this.pessoas.enderecos[objIndex] = item
          
        }
        console.log(`OnSalvar Endereco ${item.id}`)
      }
    },
    components:{
      Table,
      Endereco
    },
    mounted(){
      if(!this.id) {
        this.loading = false
        return
      }

      HTTP.get(`pessoa/${this.id}`)
        .then(res => {
          this.pessoa = Object.assign(this.pessoa, res.data)
          if(res.data.tipo == 1){
            this.pessoa.tipo_pessoa = 1
            this.select = {title: 'Física', value: 1}
          }else{
            this.pessoa.tipo_pessoa = 2
            this.select = {title: 'Jurídica', value: 2} 
          }         
          this.loading = false
        }, error => {
          this.loading = false
          this.error = true
          this.errorMsg = error.message
        })
        .catch(error => {
          this.loading = false
          this.error = true
          this.errorMsg = error.message
        })
    }
  }
</script>