import { createStore } from "vuex";

export default createStore({
  state: {
    cardData: [],
    categoriesData: [],
    brandsData: [],
    activePage: [[0, 9, 1]],
    userInput: [""],
    selectedCategories: [],
    selectedBrands: [],
  },
  mutations: {
    setCardData(state, cardsData) {
      state.cardData.push(cardsData);
    },
    setCategoriesData(state, categoriesData) {
      state.categoriesData.push(categoriesData);
    },
    setBrandsData(state, brandsData) {
      state.brandsData.push(brandsData);
    },
    setPage(state, page) {
      const result = [page * 9, (page + 1) * 9, page + 1];
      state.activePage.push(result);
    },
    pageBack(state, page) {
      const result = [page[0] - 9, page[1] - 9, page[2] - 1];
      state.activePage.push(result);
    },
    pageForward(state, page) {
      const result = [page[0] + 9, page[1] + 9, page[2] + 1];
      state.activePage.push(result);
    },
    setUserInput(state, input) {
      state.userInput.push(input);
    },
    filterByPrice(state, prices) {
      const lowestPrice = Number(prices[0].textContent);
      const highestPrice = Number(prices[1].textContent);
      state.cardData.push(
        state.cardData[0].filter((card) => {
          return card.price >= lowestPrice && card.price <= highestPrice;
        })
      );
    },
    addCategory(state, category) {
      state.selectedCategories.push(category);
    },
    removeCategory(state, category) {
      state.selectedCategories = state.selectedCategories.filter(
        (item) => item !== category
      );
    },
    addBrand(state, brand) {
      state.selectedBrands.push(brand);
    },
    removeBrand(state, brand) {
      state.selectedBrands = state.selectedBrands.filter(
        (item) => item !== brand
      );
    },
  },
  actions: {
    async setCardData({ commit }) {
      const request = await fetch("http://localhost:3001/products");
      const response = await request.json();
      commit("setCardData", response);
    },
    async setCategoriesData({ commit }) {
      const request = await fetch("http://localhost:3001/categories");
      const response = await request.json();
      commit("setCategoriesData", response);
    },
    async setBrandsData({ commit }) {
      const request = await fetch("http://localhost:3001/brands");
      const response = await request.json();
      commit("setBrandsData", response);
    },
  },
});
