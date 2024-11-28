<template>
  <div class="card">
    <div class="card-header bg-primary text-white">
      {{ dados.servico }}
    </div>
    <div class="card-body">
      <p class="card-text">
        {{ dados.descricao }}
      </p>
    </div>
  </div>
</template>

<script>
import ApiMixins from "@/mixins/apiMixins";
export default {
  name: "Servico",
  mixins: [ApiMixins],
  data() {
    return {
      url: `http://localhost:3000/servicos/${this.$route.params.id}`,
    };
  },

  //o multiplo de props tem que ter o msm nome do parâmentro dinãmico da path
   
  props: ["id"],

  created() {
    console.log("Serviço:", this.$route.params.id);
    this.getDadosApi(this.url);
  },
  beforeRouteUpdate(to, from, next) {
    //to = $route para onde esta indo
    // from = $route de onde esta vindo
    // next = faz que o fluixo de navegação siga em frente e ele é execultado no final da linha de codigo

    if (to.params != undefined) console.log("Via props:", this.$props);

    // this.getDadosApi(`http://localhost:3000/servicos/${to.params.id}`);

    //usando o props multiplos parametros em presicar usar o $route.params.id
    this.getDadosApi(`http://localhost:3000/servicos/${this.id}`);

    next();
  },
  // watch comentado para usar o beforeRouteUpdate() no lugar, dando mesmo resultado porém com mais estática.

  // watch: {
  //   $route(to) {
  //     if (to.params.id != undefined) {
  //       this.getDadosApi(`http://localhost:3000/servicos/${to.params.id}`);
  //     }
  //   },
  // },
};
</script>

<style></style>
