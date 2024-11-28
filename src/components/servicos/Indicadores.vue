<template>
  <h5>Componente indicadores</h5>
</template>

<script>
export default {
  name: "Indicadores",
  props: ["id"],
  created() {
    console.log("Indicador", this.id);
  },
};
</script>

<style></style>
