<template>
  <div v-if="!state.loading">
    <main-content-nav :items-found="setCardsForRender().length" />
    <div class="main-content">
      <div class="filters">
        <div class="filters__main">
          <div class="filters__slider">
            <price-slider
              :cards="state.cards[0]"
              :price-range="state.priceRange"
              @set-price="setPrice"
            />
          </div>
          <div class="filters__category">
            <h5 class="filters__section-header">
              Categories
            </h5>
            <checkbox
              v-for="item in state.categories[0]"
              :key="item"
              :item-name="item"
              name="selectedCategories"
              :checked="isChecked(item, 'categories')"
              @set-filter="setFilter"
            />
          </div>
          <div class="filters__line" />
          <div class="filters__category">
            <h5 class="filters__section-header">
              Brands
            </h5>
            <checkbox
              v-for="item in state.brands[0]"
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
          v-if="state.cards[0]" 
          class="merchandise-cards"
        >
          <card
            v-for="card in setCardsForRender().slice(
              state.selectedPage[0],
              state.selectedPage[1]
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
      :active-page="state.selectedPage[2]"
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
import { defineComponent } from "@vue/runtime-core";
import { useMainContentComposable } from "./main-content-composable";

export default defineComponent({
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
    const {
      state,
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
    } = useMainContentComposable();

    return {
      state,
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
    };
  },
});
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

    &__main {
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
    }

    &__slider {
      margin-top: 15px;
      margin-right: 3%;
      margin-left: 3%;
    }

    &__section-header {
      font-weight: $font-weight-large;
      font-size: 18px;
      line-height: 21px;
    }

    &__line {
      margin-top: 5px;
      margin-left: 5px;
      justify-content: center;
      border-bottom: 2px solid $button-secondary-color;
      width: 95%;
    }

    &__category {
      margin-left: 10px;

      &__checkbox-square {
        cursor: pointer;
      }

      &__checkbox-label {
        cursor: pointer;
      }
    }

    &__filters-reset-button {
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

      &__filters-error-message {
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
        &__wishlist-button {
          font-size: 12px;
        }

        &__add-to-cart-button {
          font-size: 12px;
        }
      }
    }
  }
}

@media (max-width: 1024px) {
  .header__logo {
    width: 70px!important;
    height: 50px!important;
  }

  .header__text {
    font-size: 40px!important;
    line-height: 20px!important;
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

        &__card {
          height: 350px;
        }

        &__image {
          max-height: 130px !important;
        }
      }
    }
  }

  .wishlist-cards-wrapper {
    text-align: center;
    border-radius: 4px;
    display: flex;
    justify-content: center;

    &__container {
      border-radius: 4px;
      width: 100%;
      display: grid;
      grid-template-columns: 49.5% 49.5%;
      grid-template-rows: 1fr 1fr;
      gap: 0rem 8px;
    }
  }
}

@media (max-width: 769px) {
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

        &__wishlist-button {
          font-size: 9px;
        }

        &__add-to-cart-button {
          font-size: 9px;
        }
      }
    }
  }

  .wishlist-cards-wrapper {
    text-align: center;
    border-radius: 4px;
    display: flex;
    justify-content: center;

    &__container {
      border-radius: 4px;
      width: 100%;
      display: grid;
      grid-template-columns: 49.5% 49.5%;
      grid-template-rows: 1fr 1fr;
      gap: 0rem 8px;
    }
  }

  .pagination {
    &__button-page-back {
      max-width: 25px;
      padding: 0px;
    }

    &__button-page-forward {
      max-width: 25px;
      padding: 0px;
    }

    &__main {
      border-radius: 25px;
    }

    &__page {
      max-height: 25px;
      max-width: 25px;

      .active {
        border-radius: 50%;
      }
    }
  }
}

@media (max-width: 600px) {
  .header__logo {
    width: 65px !important;
    height: 45px !important;
  }

  .header__text {
    font-size: 30px !important;
    line-height: 30px !important;
  }
  
  .merchandise-cards__rating {
    background-size: 15px !important;
  }
}

@media (max-width: 426px) {
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

        &__card {
          width: 100% !important;
          height: 320px !important;

          &__wishlist-button {
            font-size: 12px !important;
          }

          &__add-to-cart-button {
            font-size: 12px !important;
          }
        }
      }
    }
  }

  .wishlist-cards-wrapper {
    &__container {
      width: 100%;
      display: grid;
      grid-template-columns: 95%;
      grid-template-rows: 1fr;
      gap: 0rem 8px;
    }
  }
}
</style>
