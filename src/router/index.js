import { createRouter, createWebHistory } from 'vue-router';
import MainContent from "../components/main-content/main-content.vue";
import NotFound from "../components/not-found/not-found.vue";
import Discounts from "../components/discounts/discounts.vue"
import ProductPage from "../components/item-page/product-page.vue";

const routes = [
  { 
    path: '/', 
    redirect: '/products' 
  },
  {
    path: "/products",
    name: "Products",
    component: MainContent
  },
  {
    path: `/products/product-:cardId`,
    name: "Product",
    component: ProductPage,
    props: route => ({ card: route.params.cardId })
  },
  {
    path: "/products/discounts",
    name: "Discounts",
    component: Discounts
  },
  { 
    path: '/:pathMatch(.*)*', 
    name: 'NotFound', component: NotFound 
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
