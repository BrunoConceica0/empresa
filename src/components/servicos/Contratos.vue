<template>
  <div>
    <!-- <router-link
      class="btn btn-primary"
      :to="{ name: 'contratos', query: { leadId_like: 1 } }"
      >LeadId=1</router-link
    >
    <router-link
      class="btn btn-primary"
      :to="{ contratos: 2, query: { servicoId_like: 2 } }"
      >ServicoId=2</router-link
    > -->
    <div class="card mb-4">
      <div class="card-header">Contratos</div>
      <div class="card-body">
        <div class="row">
          <div class="col-6">
            <label class="form-label">ID Contrato:</label>
            <input
              type="text"
              class="form-control"
              v-model="formSearch.id_like"
            />
          </div>
          <div class="col-6">
            <label class="form-label">Data início:</label>
            <div class="input-group">
              <input
                type="date"
                class="form-control"
                v-model="formSearch.inicio_gte"
              />
              <input
                type="date"
                class="form-control"
                v-model="formSearch.data_inicio_lte"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="card-footer">
        <button type="button" class="btn btn-primary" @click="search">
          Pesquisar
        </button>
      </div>
    </div>

    <table class="table table-hover">
      <thead>
        <tr>
          <th scope="col">ID</th>
          <th scope="col">LEADS</th>
          <th scope="col">SERVIÇO</th>
          <th scope="col">DATA INÍCIO</th>
          <th scope="col">DATA FIM</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="d in dados" :key="d.id">
          <td>{{ d.id }}</td>
          <td>{{ d.servico.servico || "Lead não encontrado" }}</td>
          <td>{{ d.lead.nome || "Serviço não encontrado" }}</td>
          <td>{{ d.data_inicio }}</td>
          <td>{{ d.data_fim }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import ApiMixins from "@/mixins/apiMixins";
export default {
  name: "Leads",
  mixins: [ApiMixins],
  data() {
    return {
      paramsUrl: "?_expand=lead&_expand=servico",
      url_base: "http://localhost:3000/contratos",
      formSearch: {
        id_like: "",
        data_inicio_gte: "",
        data_inicio_lte: "",
      },
    };
  },
  methods: {
    search() {
      const url = `${this.url_base}${this.paramsUrl}`;
      console.log(url);
      if (this.url_base.length) {
        this.getDadosApi(url, this.formSearch);
      }
    },
  },
  created() {
    // queryParams é usando para quando usar o url link direto para acessar a pagina, para nçao ter erro, o hook created é usado para fazer salvamento da queryParams e usando com & junto com o template string

    const url = `${this.url_base}${this.paramsUr}`;
    if (this.url_base.length) {
      this.getDadosApi(url, this.$route.query);
    }
  },
  beforeRouteUpdate(to, from, next) {
    const queryParams = new URLSearchParams(to.query).toString(); // URLSearchParams é sixtase que a url representa: 'https://www.google.com' que vai pegar o paramentro do query.to que vai ser convertido abaixo
    console.log(queryParams.toString()); //Convertendo o Objeto em String
    const url = `${this.url_base}${this.paramsUrl}&${queryParams}`;
    this.getDadosApi(url);
    next();
  },
};
</script>

<style></style>
