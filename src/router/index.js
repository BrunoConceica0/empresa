import { createRouter, createWebHistory } from "vue-router";
// createWebHistory = Não necessário do # mas é necessário  configura de reescrita do url do servidor
// createWebHasHistory = Adiciona o # do navegador
import Home from "@/views/Home";
import Login from "@/views/Login";
import Site from "@/views/Site";
import Vendas from "@/components/vendas/Vendas";
import Servicos from "@/components/servicos/Servicos";

const routes = [
  {
    path: "/",
    component: Site,
    name: "site",
    meta: { requerAtorizacao: false },
  },
  {
    path: "/home",
    alias: "/app",
    name: "home",
    component: Home,
    meta: { requerAtorizacao: true },

    children: [
      {
        path: "vendas",
        component: Vendas,
        name: "vendas",
        children: [
          {
            path: "leads",
            component: () => import("@/components/vendas/Leads"),
            name: "leads",
            // beforeEnter(to, from, next) {
            beforeEnter() {
              //poderia verificar se o usuário tem permiissão  de carregar a rota
              console.log("Guarda de rota beforeE:");
            },
          },
          {
            path: "leads/:id/paramsOther",
            // props: {
            //   id: 4,
            //   paramsOther: "pt-br",
            // },
            props: (route) => {
              console.log("Rota ativa:", route);

              //implementação um lógica para definer as props que serão submetidas ao compenente roteado, no cosa é o componente lead
              let teste = route.query.idioma
                ? route.query.idioma
                : route.params.paramsOther;

              return {
                id: parseInt(route.params.id) + 1,
                paramsOther: teste,
              };
            },
            component: () => import("@/components/vendas/Lead"),
            name: "lead",
          },
          {
            // quando não houver informação do conteudo ainda, as vendasPadrao, vai ser o home de vendas ate uma ação for feita
            path: "", //home de vendas
            component: () => import("@/components/vendas/VendasPadrao"),
            name: "VendasPadrao",
          },
          {
            path: "contratos",
            component: () => import("@/components/servicos/Contratos"),
            name: "contratos",
          },
        ],
      },
      {
        path: "servicos",
        component: Servicos,
        name: "servicos",
        children: [
          {
            path: ":id", // Exemplo de acesso: localhost:8080/servicos/1
            component: () => import("@/components/servicos/Servico"),
            name: "servico",
            alias: "/s/:id", // Apelidos para  url
            props: {
              default: true,
              indicadores: true,
              opcoes: true,
            },
            components: {
              default: () => import("@/components/servicos/Servico"),
              opcoes: () => import("@/components/servicos/Opicoes"),
              indicadores: () => import("@/components/servicos/Indicadores"),
            },
          },
        ],
      },
      {
        path: "dashboard",
        component: () => import("@/components/dashboard/Dashboard"),
        name: "dashboard",
        components: {
          default: () => import("@/components/dashboard/Dashboard"),
          rodape: () => import("@/components/dashboard/DashboardRodape"),
        },
      },
    ],
  },
  {
    path: "/Login",
    component: Login,
    name: "Login",
    meta: { requerAtorizacao: false, caompo2: "teste", campo3: 50 },
  },

  {
    path: "/redireciomento-1",
    redirect: "/home/servicos",
  },
  {
    path: "/redireciomento-2",
    redirect: { name: "leads" },
  },
  {
    path: "/redireciomento-3",
    redirect: { path: "/home/vendas" },
  },
  {
    path: "/redireciomento-3",
    redirect: { name: "vendas " },
  },
  {
    path: "/redireciomento-4",
    redirect: (to) => {
      // pode programa algo antes de redirecionar ser efetuado
      console.log(to);
      return { name: "vendas" };
    },
  },
  {
    //quando não encontrar a rota do url e der erro 404 vai ser dirtecionado para a rota home ou para componente NotFound.
    //Vue 2 = *
    //Vue 3 = :catchAll(.*)*
    // path: "/:catchAll(.*)*", //Vue 2 = *
    // redirect: "/",
    path: "/:catchAll(.*)*", //Vue 2 = *
    component: () => import("@/views/NotFound"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  scrollBehavior(to, from, sevedPosition) {
    // return {
    //   left: 0, //Barra horizontal X
    //   top: 150, //Barra vertical Y
    // };
    if (sevedPosition) {
      return sevedPosition;
    }
    if (to.hash) {
      return { el: to.hash }; //o to.hash tem que corresponder um ID de elemento HTML
    }
    return { left: 0, top: 0 };
  },
  routes,
});

router.beforeEach((to) => {
  if (("Origem:", to.meta.requerAtorizacao === true)) {
    console.log("Validar o acesso");
  } else {
    console.log("Usuário não esta autorizado a acessar esta rota");
  }

  //Verifica se o usuario esta outorrizado nesta rota
  console.log("Metodo execultado antes do acesso a rota destino");
});
router.afterEach((to, from) => {
  //Guardo de roto executado após a conclusão da navegação

  console.log("Origem:", from);
  console.log("Destino:", to);
});
router.beforeResolve(() => {
  console.log("Guarda global beforeResolve");
});

export default router;
