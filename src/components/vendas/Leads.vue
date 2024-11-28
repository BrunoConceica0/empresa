<template>
  <div>
    <h5>Leads</h5>
    <table class="table table-hover">
      <thead>
        <tr>
          <th scope="col">ID</th>
          <th scope="col">NOME</th>
          <th scope="col">TELEFONE</th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="d in dados" :key="d.id">
          <td>{{ d.id }}</td>
          <td>{{ d.nome }}</td>
          <td>{{ d.telefone }}</td>
          <td>
            <!-- <router-link
              :to="`/home/vendas/leads/${d.id}`"
              class="btn btn-sm btn-primary"
            >
              <i class="bi bi-pencil-square" style="curso: pointer"></i
            ></router-link> -->
            <router-link
              :to="{
                name: 'lead',
                params: { id: d.id, paramsOther: ` test_${d.id}` },
              }"
              class="btn btn-sm btn-primary"
            >
              <i class="bi bi-pencil-square" style="curso: pointer"></i
            ></router-link>
          </td>
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
      url: "http://localhost:3000/leads",
    };
  },
  methods: {},
  created() {
    this.getDadosApi(this.url);
  },
  beforeRouteEnter() {
    console.log("Guarda dem componenete beforeRouteEnter");
  },
  beforeRouteLeave() {
    console.log("Guarda dem componenete beforeRouteLeave");
  },
};
</script>

<style></style>
