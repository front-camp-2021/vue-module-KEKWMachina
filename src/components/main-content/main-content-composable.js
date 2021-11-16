import { filterUserInput } from "../helper-functions/filterUserInput.js";
import { filterData } from "../helper-functions/filterLogic";
import { findMinMax } from "../helper-functions/findMinMax";
import { onBeforeMount, readonly, reactive } from "@vue/runtime-core";
import { getCards, getCategories, getBrands } from "../helper-functions/API.service";

const state = reactive({
  cards: [],
  categories: [],
  brands: [],
  filters: {
    selectedCategories: [],
    selectedBrands: [],
  },
  selectedCategories: [],
  selectedBrands: [],
  loading: true,
  userInput: "",
  priceRange: [],
  selectedPage: [0, 9, 1],
});

export function useMainContentComposable() {
  onBeforeMount(async () => {
    state.loading = true;
    await state.cards.push(await getCards());
    await state.categories.push(await getCategories());
    await state.brands.push(await getBrands());
    await setPriceRange();
    state.loading = false;
  });
  const setUserInput = function (input) {
    setPage(0);
    state.userInput = input;
  };
  const setFilter = function (name, type) {
    setPage(0);
    if (state.filters[type].includes(name)) {
        state.filters[type] = state.filters[type].filter((value) => value !== name);
    } else {
        state.filters[type] = [...state.filters[type], name];
    }
  };
  const isChecked = function (name, type) {
    return state[type].includes(name);
  };
  const setPrice = function (prices) {
    setPage(0);
    const selectedPriceRange = prices;
    state.cards.push(
        state.cards[0].filter((card) => {
        return card.price >= selectedPriceRange[0] && card.price <= selectedPriceRange[1];
      })
    );
  };
  const setPriceRange = function () {
    state.priceRange = findMinMax(state.cards[0]);
  };
  const setCardsForRender = function () {
    return filterData(
      filterUserInput(state.userInput, state.cards[state.cards.length - 1]),
      state.filters.selectedCategories,
      state.filters.selectedBrands,
      filterUserInput(state.userInput, state.cards[state.cards.length - 1])
    );
  };
  const setPage = function (page) {
    state.selectedPage = [page * 9, (page + 1) * 9, page + 1];
  };
  const pageBack = function () {
    state.selectedPage[0] -= 9;
    state.selectedPage[1] -= 9;
    state.selectedPage[2] -= 1;
  };
  const pageForward = function () {
    state.selectedPage[0] += 9;
    state.selectedPage[1] += 9;
    state.selectedPage[2] += 1;
  };
  const resetSelections = function () {
    setPage(0);
    state.selectedCategories = [];
    state.selectedBrands = [];
    state.userInput = "";
    document.querySelector(".searchfield__input").value = "";
    document
      .querySelectorAll(".filters__checkbox-square")
      .forEach((checkbox) => (checkbox.checked = false));
    const prices = document.querySelectorAll(".slider-tooltip");
    state.priceRange = findMinMax(cards[0]);
    prices[0].textContent = priceRange[0];
    prices[1].textContent = priceRange[1];
  };

  return {
      state: readonly(state),
      setUserInput,
      setFilter,
      isChecked,
      setPrice,
      setPriceRange,
      setCardsForRender,
      setPage,
      pageBack,
      pageForward,
      resetSelections,
  }
}
