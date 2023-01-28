<template>
  <v-tabs v-model="tab" bg-color="deep-purple">
    <v-tab value="pessoa">Pessoa</v-tab>
    <v-tab value="endereco">Endereços</v-tab>
  </v-tabs>

  <v-window v-model="tab" v-if="!loading">
    <v-window-item value="pessoa">
      <v-form ref="form" class="ma-8">
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
            <v-select v-model="select" :items="tipoPessoa" item-title="title" 
              item-value="value" label="Tipo" single-line :rules="pessoaRules.tipoPessoaRules" />
          </v-col>     
          
        </v-row>
        
        <v-row>
          <v-col cols="auto" class="me-auto">
            <v-btn class="bg-deep-purple" @click="onSaveClick()"> Salvar </v-btn>
          </v-col>

          <v-col cols="auto">
            <v-btn class="bg-red" @click="onDeleteClick()" :disabled="!id || id<= 0"> Excluir </v-btn>
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
  export default {
    data(){
      return{
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
          tipoPessoa: '',
          dataNascimento: '',
          enderecos: []
        },

        tipoPessoa: [
          {title: 'Física', value: 1},
          {title: 'Jurídica', value: 2} 
        ],

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
          {key: 'tipo', title: 'Tipo'}, 
        ],        

        enderecoSelecionado: null,

        heightTable: '100%'      
      }
    },
    methods: {
      async onSaveClick(){
        const { valid } = await this.$refs.form.validate()
        if(!valid) return
        if (!this.pessoa.enderecos || this.pessoa.enderecos.length <= 0){
          this.error = true
          this.errorMsg = 'É necessário cadastrar ao menos 1 endereço!'
          return
        }

        let pessoas = this.getAllPessoas()
        this.pessoa.tipoPessoa = this.select

        if(!this.id || this.id <= 0){
          this.pessoa.id = this.gerarId(pessoas);
          pessoas.push(this.pessoa)
        }else{
          let index = pessoas.findIndex(p => p.id == this.id)
          pessoas[index] = this.pessoa
        }          
        
        this.salvarPessoa(pessoas)
        this.successMsg = `Pessoa ${this.pessoa.id} salva com sucesso`
        this.success = true
        setTimeout(this.voltar, 3000)
      },

      onDeleteClick(){
        let _pessoas = this.getAllPessoas()
        let index = _pessoas.findIndex(p => p.id == this.id)
        _pessoas.splice(index, 1)
        this.salvarPessoa(_pessoas)
        this.successMsg = `Pessoa excluída com sucesso`
        this.success = true
        setTimeout(this.voltar, 3000)        
        this.voltar()
      },

      voltar(){
        this.$router.push(`/pessoas`)
      },

      onEdit(item: any){
        this.enderecoSelecionado = item
        this.dialog = true
      },

      onNewRecord(){
        this.enderecoSelecionado = null
        this.dialog = true
      },

      onDeleteEndereco(item: any){
        let index = this.pessoa.enderecos.findIndex(e => e.id == item.id)
        this.pessoa.enderecos.splice(index, 1)
        
        if(!this.id || this.id <= 0){
          return
        }

        let _pessoa = this.getPessoa(this.id)
        _pessoa.enderecos = this.pessoa.enderecos
        
        this.salvarPessoa(this.editarPessoa(_pessoa))
      },

      voltarEndereco(){
        this.dialog = false
      },

      onSalvarEndereco(item: any){
        if(!this.id || this.id <= 0){
          if(!item.id || item.id <= 0){            
            item.id = this.gerarId(this.pessoa.enderecos)
            this.pessoa.enderecos.push(item)
          } else {
            let index = this.pessoa.enderecos.findIndex(obj => obj.id == item.id)
            this.pessoa.enderecos[index] = item
          }
          
          this.voltarEndereco()
          return
        }
        
        item.id_pessoa = this.id;

        let _pessoa = this.getPessoa(this.id)

        if(!item.id || item.id <= 0){
          item.id = this.gerarId(_pessoa.enderecos)
          _pessoa.enderecos.push(item)
        } else {
          let objIndex = _pessoa.enderecos.findIndex(obj => obj.id == item.id)
          _pessoa.enderecos[objIndex] = item
        }

        const pessoaEditada = this.editarPessoa(_pessoa)

        this.salvarPessoa(pessoaEditada) 
        this.voltarEndereco() 
        this.carregaPessoa()          
      },

      salvarPessoa(pessoas: any){
        localStorage.setItem('pessoas', JSON.stringify(pessoas))          
      },

      getPessoa(id: number): any{
        let _pessoas = this.getAllPessoas()
        let objIndex = _pessoas.findIndex(obj => obj.id == id)
        let _pessoa = _pessoas[objIndex]
        return _pessoa
      },

      getAllPessoas(): any{
        return JSON.parse(localStorage.getItem('pessoas')) || []
      },

      editarPessoa(pessoa): any{
        let _pessoas = this.getAllPessoas()
        let index = _pessoas.findIndex(obj => obj.id == pessoa.id)
        _pessoas[index] = pessoa
        return _pessoas
      },

      carregaPessoa(){
        if(!this.id) {
          this.loading = false
          return
        }

        this.pessoa = this.getPessoa(this.id)
        this.select = this.pessoa.tipoPessoa
        this.loading = false

        if(!this.pessoa){
          this.errorMsg = 'Não foi encontrado nenhuma pessoa com esse id!'
          this.error = true
        }
      },

      gerarId(item: any){
        return item.length == 0 ? 1 : item[item.length -1].id + 1
      }
    },
    components:{
      Table,
      Endereco
    },

    mounted(){
      this.carregaPessoa()
    }
  }
</script>