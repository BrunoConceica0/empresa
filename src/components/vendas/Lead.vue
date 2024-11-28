<template>
  <div>
    <h5>Lead</h5>
    <div class="mb-3 row" v-if="dados">
      <label class="col-sm-2 col-form-label">ID</label>
      <div class="col-sm-10">
        <input
          type="text"
          readonly
          class="form-control-plaintext"
          :value="dados.id"
        />
      </div>
    </div>
    <div class="mb-3 row" v-if="dados">
      <label class="col-sm-2 col-form-label">Nome</label>
      <div class="col-sm-10">
        <input type="text" class="form-control" :value="dados.nome" />
      </div>
    </div>
    <div class="mb-3 row" v-if="dados">
      <label class="col-sm-2 col-form-label">Telefone</label>
      <div class="col-sm-10">
        <input type="text" class="form-control" :value="dados.telefone" />
      </div>
    </div>
    <div class="col-auto d-flex justify-content-between">
      <button
        type="button"
        class="btn btn-warning"
        @click="$router.push({ name: 'leads' })"
      >
        Voltar
      </button>
      <button type="button" class="btn btn-primary">Atualizar</button>
    </div>
  </div>
</template>

<script>
import ApiMixins from "@/mixins/apiMixins";
export default {
  name: "Lead",
  props: ["id", "paramsOther"],
  mixins: [ApiMixins],
  data() {
    return {
      url: `http://localhost:3000/leads/${this.$route.params.id}`,
    };
  },
  created() {
    // console.log(this.id);
    // console.log(this.$props);
    // console.log(this.id, this.paramsOther);
    this.getDadosApi(this.url);
  },
  // O beforeRouteLeave é um guard de rota (ou "guarda de navegação") no Vue Router, usado em componentes para interceptar a saída de uma rota antes que a navegação aconteça. Ele é útil para executar ações ou verificar condições antes que o usuário saia da rota atual.
  // beforeRouterLeave(to, from, next) {
  beforeRouteLeave() {
    const confirma = window.confirm("Deseja sair da página?");
    if (confirma) {
      return true;
    } else {
      return false;
    }
  },
};
</script>

<style></style>
