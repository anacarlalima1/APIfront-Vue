<template>
  <div id="app">

    <nav>
      <div class="nav-wrapper blue-grey darken-3">
        <a href="#" class="brand-logo center">API Rest</a>
      </div>
    </nav>

    <br/>
    <br/>
    
    <div class="container">

        <form @submit.prevent="salvar" @submit="checkForm">
          <label>Nome completo:</label>
          <input style="margin-bottom: 30px;" type="text" placeholder="Nome" v-model="usuario.nome">
          <label>Número do CPF:</label>
          <input style="margin-bottom: 30px;" type="text" placeholder="CPF" v-model="usuario.cpf">
          <label>Data de Nascimento:</label>
          <input style="margin-bottom: 30px;" type="date" placeholder="Data de nascimento" v-model="usuario.data_nasc">
          <label>Email:</label>
          <input style="margin-bottom: 30px;" type="text" placeholder="Insira seu email" v-model="usuario.email">
          
          <div class="d-grid gap-2 col-6 mx-auto">
          <button class="waves-effect waves-light btn-small">Cadastrar usuário<i class="material-icons right">send</i></button>
          </div>
        </form>

      <br/>
      <br/>
      <table class="responsive-table">

        <thead>

          <tr>
            <th>Nome</th>
            <th>CPF</th>
            <th>Data de Nascimento</th>
            <th>Email</th>
            <th>Opções</th>
          </tr>

        </thead>

        <tbody>

          <tr v-for="usuario of usuarios" :key="usuario.codigo">

            <td>{{usuario.nome}}</td>
            <td>{{usuario.cpf}}</td>
            <td>{{usuario.data_nasc}}</td>
            <td>{{usuario.email}}</td>
            <td>
              <button @click="editar(usuario)" class="btn-floating btn-small waves-effect waves-light green"><i class="material-icons">create</i></button>
              <button @click="remover(usuario)" class="btn-floating btn-small waves-effect waves-light red"><i class="material-icons">delete</i></button>
            </td>

          </tr>

        </tbody>
      
      </table>

    </div>

  </div>
</template>

<script>

import Usuario from './services/usuarios'

export default {

  data(){
    return {
      usuario: {
        codigo:'',
        nome:'',
        cpf:'',
        data_nasc:'',
        email:''

      },
      usuarios: [],
      errors: []
    }
  },

  mounted(){
    this.listar()
  },

  methods:{

    checkForm: function (e) {
      if (this.usuario.nome && this.usuario.cpf && this.usuario.data_nasc && this.usuario.email) {
        return true;
      }

      this.errors = [];

      if (!this.usuario.nome) {
        this.errors.push()
        alert('Informe o seu nome!');
      }
      if (!this.usuario.cpf) {
        this.errors.push()
        alert('Informe o seu CPF!');
      }
      if (!this.usuario.data_nasc) {
        this.errors.push()
        alert('Informe a sua data de nascimento!');
      }
      if (!this.usuario.email) {
        this.errors.push()
        alert('Informe o seu email!');
      }

      e.preventDefault();
    },

    listar(){
      Usuario.listar().then(resposta => {
      console.log(resposta.data)
      this.usuarios = resposta.data
    })
    },

    salvar(){
      
      if(!this.usuario.codigo){
      Usuario.salvar(this.usuario).then(resposta =>{
        console.log(resposta.data)
        this.usuarios = resposta.data
        alert('Salvo com sucesso!')
        this.listar()
        this.errors = {}
      })
      }else{

        Usuario.atualizar(this.usuario).then(resposta => {
          console.log(resposta.data)
          this.usuarios = resposta.data
          this.errors = {}
          alert('Atualizado com sucesso!')
          this.listar()
        })
      }

    },

    editar(usuario){
      this.usuario = usuario
    },

    remover(usuario){
      if(confirm('Deseja excluir o produto?')){
        Usuario.remover(usuario).then(resposta => {
          console.log(resposta.data)
          this.usuarios = resposta.data
          this.listar()
          this.errors = {}
        })
      }
    }
  }
}
</script>

<style>

</style>
