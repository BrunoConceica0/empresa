<template>
  <div>
    <h5>Componente Opiçoes</h5>
    <p>Parâmetro via props: {{ id }}</p>
  </div>
</template>

<script>
export default {
  name: "Opicoes",
  props: ["id"],
  created() {
    console.log("Parâmentro via props:", this.id);
  },
  // beforeRouteUpdate(to, from, next) {
  beforeRouteUpdate() {
    console.log("Guada do componente de routa beforeRouteUpdate");
  },
};
</script>

<style></style>
