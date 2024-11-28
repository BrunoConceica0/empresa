<template>
  <h3>Página não encontrado!</h3>
  <p>Erro 404</p>
  <button
    class="btn btn-primary"
    type="button"
    @click="$router.push({ path: '/home' })"
  >
    Voltar para Home
  </button>
</template>

<script>
export default {};
</script>

<style></style>
