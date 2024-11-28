export default {
  data() {
    return {
      dados: {},
    };
  },
  methods: {
    async getDadosApi(url, queryParams = {}) {
      // Esse código está usando Object.keys e forEach para iterar sobre todas as chaves do objeto this.formSearch. O objetivo é remover as chaves que têm valor igual a 0
      Object.keys(queryParams).forEach((key) => {
        if (queryParams[key] == "") delete queryParams[key];
      });
      const urlQueryParams = new URLSearchParams(this.queryParams).toString();
      const urlCompleta = urlQueryParams ? `${url}&${urlQueryParams}` : url;
      const response = await fetch(urlCompleta);
      const data = await response.json();
      this.dados = data;
    },
  },
};
