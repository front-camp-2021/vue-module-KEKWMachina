<template>
  <div v-if="!loading">
    <main-content-nav :items-found="setCardsForRender().length" />
    <div class="main-content">
      <div class="filters">
        <div class="filters__main">
          <div class="filters__slider">
            <price-slider
              :cards="cards[0]"
              :price-range="priceRange"
              @set-price="setPrice"
            />
          </div>
          <div class="filters__category">
            <h5 class="filters__section-header">
              Categories
            </h5>
            <checkbox
              v-for="item in categories[0]"
              :key="item"
              :item-name="item"
              name="selectedCategories"
              :checked="isChecked(item, 'categories')"
              @set-filter="setFilter"
            />
          </div>
          <div class="filters_line" />
          <div class="filters__category">
            <h5 class="filters__section-header">
              Brands
            </h5>
            <checkbox
              v-for="item in brands[0]"
              :key="item.id"
              :item-name="item"
              name="selectedBrands"
              :checked="isChecked(item, 'brands')"
              @set-filter="setFilter"
            />
          </div>
        </div>
        <button
          class="filters__filters-reset-button"
          @click="resetSelections()"
        >
          Reset Filters
        </button>
      </div>
      <div class="cards">
        <searchfield @on-input="setUserInput" />
        <div 
          v-if="cards[0]" 
          class="merchandise-cards"
        >
          <card
            v-for="card in setCardsForRender().slice(
              selectedPage[0],
              selectedPage[1]
            )"
            :key="card.id"
            :card-data="card"
          />
          <div
            v-if="setCardsForRender().length === 0"
            class="merchandise-cards__filters-error-message"
          >
            Nothing found, please, reset your filters and try again.
          </div>
        </div>
      </div>
    </div>
    <pagination
      :card-data="setCardsForRender()"
      :active-page="selectedPage[2]"
      @set-page="setPage"
      @page-back="pageBack"
      @page-forward="pageForward"
    />
  </div>
</template>

<script>
import MainContentNav from "../main-content-nav/main-content-nav.vue";
import Checkbox from "../checkbox/checkbox.vue";
import Searchfield from "../searchfield/searchfield.vue";
import Card from "../card/card.vue";
import Pagination from "../pagination/pagination.vue";
import PriceSlider from "../slider/price-slider.vue";
import { filterUserInput } from "../helper-functions/filterUserInput.js";
import { filterData } from "../helper-functions/filterLogic";
import { findMinMax } from "../helper-functions/findMinMax";
import { ref, onBeforeMount } from "@vue/runtime-core";
import { useStore } from 'vuex';
export default {
  name: "MainContent",
  components: {
    MainContentNav,
    Checkbox,
    Searchfield,
    Card,
    Pagination,
    PriceSlider,
  },
  setup() {
    const cards = ref([]);
    const categories = ref([]);
    const brands = ref([]);
    const filters = ref({
      selectedCategories: [],
      selectedBrands: [],
    });
    const selectedCategories = ref([]);
    const selectedBrands = ref([]);
    const loading = ref(true);
    const userInput = ref("");
    const priceRange = ref([]);
    const selectedPage = ref([0, 9, 1]);
    const store = useStore();

    onBeforeMount(async () => {
      loading.value = true;
      await getCards();
      await getCategories();
      await getBrands();
      await store.commit("setCards", cards.value[0]);
      loading.value = false;
    });

    const getCards = async function () {
      const request = await fetch("http://localhost:3001/products");
      const response = await request.json();
      await cards.value.push(response);
      await setPriceRange();
    };
    const getCategories = async function () {
      const request = await fetch("http://localhost:3001/categories");
      const response = await request.json();
      categories.value.push(response);
    };
    const getBrands = async function () {
      const request = await fetch("http://localhost:3001/brands");
      const response = await request.json();
      brands.value.push(response);
    };
    const setUserInput = function (input) {
      setPage(0);
      userInput.value = input;
    };
    const setFilter = function (name, type) {
      setPage(0);
      if (filters.value[type].includes(name)) {
        filters.value[type] = filters.value[type].filter(
          (value) => value !== name
        );
      } else {
        filters.value[type] = [...filters.value[type], name];
      }
      console.log(filters.value);
    };
    const isChecked = function (name, type) {
      return [type].includes(name);
    };
    const setPrice = function (prices) {
      setPage(0);
      const selectedPriceRange = prices;
      cards.value.push(
        cards.value[0].filter((card) => {
          return (
            card.price >= selectedPriceRange[0] &&
            card.price <= selectedPriceRange[1]
          );
        })
      );
    };
    const setPriceRange = function () {
      priceRange.value = findMinMax(cards.value[0]);
    };
    const setCardsForRender = function () {
      return filterData(
        filterUserInput(userInput.value, cards.value[cards.value.length - 1]),
        filters.value.selectedCategories,
        filters.value.selectedBrands,
        filterUserInput(userInput.value, cards.value[cards.value.length - 1])
      );
    };
    const setPage = function (page) {
      selectedPage.value = [page * 9, (page + 1) * 9, page + 1];
    };
    const pageBack = function () {
      selectedPage.value[0] -= 9;
      selectedPage.value[1] -= 9;
      selectedPage.value[2] -= 1;
    };
    const pageForward = function () {
      selectedPage.value[0] += 9;
      selectedPage.value[1] += 9;
      selectedPage.value[2] += 1;
    };
    const resetSelections = function () {
      setPage(0);
      selectedCategories.value = [];
      selectedBrands.value = [];
      userInput.value = "";
      document.querySelector(".searchfield__input").value = "";
      document
        .querySelectorAll(".filters__checkbox-square")
        .forEach((checkbox) => (checkbox.checked = false));
      const prices = document.querySelectorAll(".slider-tooltip");
      priceRange.value = findMinMax(cards.value[0]);
      prices[0].textContent = priceRange.value[0];
      prices[1].textContent = priceRange.value[1];
    };

    return {
      cards,
      categories,
      brands,
      selectedCategories,
      selectedBrands,
      loading,
      userInput,
      priceRange,
      selectedPage,
      getCards,
      getCategories,
      getBrands,
      setUserInput,
      setFilter,
      isChecked,
      setPrice,
      setPriceRange,
      resetSelections,
      setCardsForRender,
      pageBack,
      setPage,
      pageForward,
    };
  },
};
</script>

<style lang="scss">
@import "/src/assets/styles/varibles.scss";
@import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;600&display=swap");

.main-content {
  display: flex;
  height: 1296.5px;
  margin: 10px;

  .filters {
    width: 30%;
    position: relative;

    .filters__main {
      filter: drop-shadow(-0.4px 0.5px 0.05rem $shadow-color);
      margin-top: 5px;
      position: absolute;
      width: 95%;
      height: 96%;
      background-color: $elements-main-color;
      border-radius: 4px;
      font-size: 16px;
      line-height: 32px;
      font-weight: $font-weight-large;

      .filters__slider {
        margin-top: 15px;
        margin-right: 3%;
        margin-left: 3%;
      }

      .filters__section-header {
        font-weight: $font-weight-large;
        font-size: 18px;
        line-height: 21px;
      }

      .filters_line {
        margin-top: 5px;
        margin-left: 5px;
        justify-content: center;
        border-bottom: 2px solid $button-secondary-color;
        width: 95%;
      }

      .filters__category {
        margin-left: 10px;

        .filters__checkbox-square {
          cursor: pointer;
        }

        .filters__checkbox-label {
          cursor: pointer;
        }
      }
    }

    .filters__filters-reset-button {
      font-size: 100%;
      height: 30px;
      width: 95%;
      position: absolute;
      bottom: 0px;
      background-color: $button-primary-color;
      color: $elements-main-color;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
  }

  .cards {
    width: 70%;

    .merchandise-cards {
      display: grid;
      grid-template-columns: 33% 33% 33%;
      grid-template-rows: 1fr 1fr 1fr;
      gap: 0rem 8px;
      width: 100%;
      text-align: center;

      .merchandise-cards__filters-error-message {
        grid-column: span 3;
        border-radius: 4px;
        padding: 15px;
        background-color: $elements-main-color;
        filter: drop-shadow(-0.4px 0.5px 0.05rem $shadow-color);
      }
    }
  }
}

@media (max-width: 1250px) {
  .main-content {
    height: 1295px;

    .filters {
      width: 25%;
    }

    .cards {
      width: 75%;

      .merchandise-cards {
        .merchandise-cards__card {
          .merchandise-cards__buttons {
            .merchandise-cards__wishlist-button {
              font-size: 12px;
            }

            .merchandise-cards__add-to-cart-button {
              font-size: 12px;
            }
          }
        }
      }
    }
  }
}

@media (max-width: 1024px) {
  .header {
    .header__logo {
      width: 70px;
      height: 50px;
    }

    .header__text {
      font-size: 40px;
      line-height: 20px;
      color: $secondary-text-color;
    }
  }

  .main-content {
    height: 1885px;

    .filters {
      width: 30%;
    }

    .cards {
      width: 70%;

      .merchandise-cards {
        display: grid;
        grid-template-columns: 49% 49%;
        grid-template-rows: 1fr 1fr;
        gap: 0rem 8px;
        width: 100%;

        .merchandise-cards__card {
          height: 350px;

          .merchandise-cards__image {
            max-height: 130px !important;
          }

          .merchandise-cards__buttons {
            .merchandise-cards__wishlist-button {
              font-size: 9px;
            }

            .merchandise-cards__add-to-cart-button {
              font-size: 9px;
            }
          }
        }
      }
    }
  }

  .wishlist-cards-wrapper {
    text-align: center;
    border-radius: 4px;
    display: flex;
    justify-content: center;

    .wishlist-cards-wrapper__container {
      border-radius: 4px;
      width: 100%;
      display: grid;
      grid-template-columns: 49.5% 49.5%;
      grid-template-rows: 1fr 1fr;
      gap: 0rem 8px;
    }
  }

  .pagination {
    text-align: center;
    display: flex;
    justify-content: center;
    margin-top: 10px;
    margin-bottom: 30px;

    .pagination__button-page-back {
      width: 25px;
      border: none;
      border-radius: 50%;
      margin-right: 20px;
      background-color: $button-secondary-color;
      background-repeat: no-repeat;
      background-position: bottom 50% left 50%;
      cursor: pointer;
    }

    .pagination__button-page-forward {
      width: 25px;
      border: none;
      border-radius: 50%;
      background-color: $button-secondary-color;
      background-repeat: no-repeat;
      background-position: bottom 50% left 50%;
      margin-left: 20px;
      cursor: pointer;
    }

    .pagination__main {
      background-color: $button-secondary-color;
      border-radius: 25px;

      .active {
        background-color: $button-primary-color;
        border-radius: 50%;
      }

      .pagination__page {
        height: 25px;
        width: 25px;
        text-decoration: none;
        display: inline-block;
        color: $main-text-color;
        border: none;
        border-radius: 50%;

        .active {
          background-color: $button-primary-color;
          border-radius: 50%;
        }
      }
    }
  }
}

@media (max-width: 769px) {
  .header {
    .header__logo {
      width: 70px;
      height: 50px;
    }

    .header__text {
      font-size: 40px;
      line-height: 20px;
      color: $secondary-text-color;
    }
  }

  .main-content {
    height: 1920px;

    .filters {
      display: none;
    }

    .cards {
      width: 100%;

      .merchandise-cards {
        display: grid;
        grid-template-columns: 49% 49%;
        grid-template-rows: 1fr 1fr;
        gap: 0rem 8px;
        width: 100%;

        .merchandise-cards__card {
          height: 350px;

          .merchandise-cards__image {
            max-height: 130px !important;
          }

          .merchandise-cards__buttons {
            .merchandise-cards__wishlist-button {
              font-size: 9px;
            }

            .merchandise-cards__add-to-cart-button {
              font-size: 9px;
            }
          }
        }
      }
    }
  }

  .wishlist-cards-wrapper {
    text-align: center;
    border-radius: 4px;
    display: flex;
    justify-content: center;

    .wishlist-cards-wrapper__container {
      border-radius: 4px;
      width: 100%;
      display: grid;
      grid-template-columns: 49.5% 49.5%;
      grid-template-rows: 1fr 1fr;
      gap: 0rem 8px;
    }
  }

  .pagination {
    text-align: center;
    display: flex;
    justify-content: center;
    margin-top: 10px;
    margin-bottom: 30px;

    .pagination__button-page-back {
      width: 25px;
      border: none;
      border-radius: 50%;
      margin-right: 20px;
      background-color: $button-secondary-color;
      background-repeat: no-repeat;
      background-position: bottom 50% left 50%;
      cursor: pointer;
    }

    .pagination__button-page-forward {
      width: 25px;
      border: none;
      border-radius: 50%;
      background-color: $button-secondary-color;
      background-repeat: no-repeat;
      background-position: bottom 50% left 50%;
      margin-left: 20px;
      cursor: pointer;
    }

    .pagination__main {
      background-color: $button-secondary-color;
      border-radius: 25px;

      .active {
        background-color: $button-primary-color;
        border-radius: 50%;
      }

      .pagination__page {
        height: 25px;
        width: 25px;
        text-decoration: none;
        display: inline-block;
        color: $main-text-color;
        border: none;
        border-radius: 50%;

        .active {
          background-color: $button-primary-color;
          border-radius: 50%;
        }
      }
    }
  }
}

@media (max-width: 600px) {
  .merchandise-cards__card {
    height: 350px;

    .merchandise-cards__image {
      max-height: 130px !important;
    }

    .merchandise-cards__rating-and-price {
      .merchandise-cards__rating {
        background-size: 15px;
      }
    }
    .merchandise-cards__buttons {
      .merchandise-cards__wishlist-button {
        font-size: 9px;
      }

      .merchandise-cards__add-to-cart-button {
        font-size: 9px;
      }
    }
  }
}

@media (max-width: 426px) {
  .header {
    .header__logo {
      width: 65px;
      height: 45px;
    }

    .header__text {
      font-size: 25px;
      line-height: 18px;
      color: $secondary-text-color;
    }
  }

  .main-content-nav {
    flex-direction: column;

    .filters-header {
      width: 50%;
    }

    .search-resluts {
      width: 100%;
    }
  }

  .main-content {
    height: 3130px;

    .cards {
      width: 100%;

      .merchandise-cards {
        display: flex;
        flex-direction: column;

        .merchandise-cards__card {
          width: 100% !important;
          height: 320px !important;

          .merchandise-cards__buttons {
            .merchandise-cards__wishlist-button {
              font-size: 10px;
            }

            .merchandise-cards__add-to-cart-button {
              font-size: 10px;
            }
          }
        }
      }
    }
  }

  .pagination {
    .pagination__button-page-back {
      width: 25px;
      height: 25px;
    }

    .pagination__button-page-forward {
      width: 25px;
      height: 25px;
    }

    .pagination__page-outer-first {
      padding: 2px 7px;
    }

    .pagination__page-outer-last {
      padding: 2px 7px;
    }

    .pagination__page {
      padding: 2px 7px;
    }

    .pagination__main {
      .pagination__page-active {
        padding: 2px 7px;
      }
      .pagination__page {
        float: left;
      }
    }
  }

  .wishlist-cards-wrapper {
    .wishlist-cards-wrapper__container {
      width: 100%;
      display: grid;
      grid-template-columns: 95%;
      grid-template-rows: 1fr;
      gap: 0rem 8px;
    }
  }
}
</style>
