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
            v-for="card in setCardsForRender().slice(selectedPage[0], selectedPage[1])"
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
  data: function () {
    return {
      cards: [],
      cardsToRender: [],
      categories: [],
      brands: [],
      selectedCategories: [],
      selectedBrands: [],
      loading: true,
      userInput: "",
      priceRange: [],
      selectedPriceRange: [],
      selectedPage: [0, 9, 1],
    };
  },
  async created() {
    this.loading = true;
    await this.getCards();
    await this.getCategories();
    await this.getBrands();
    await this.setPriceRange();
    this.loading = false;
  },
  methods: {
    async getCards() {
      const request = await fetch("http://localhost:3001/products");
      const response = await request.json();
      this.cards.push(response);
    },
    async getCategories() {
      const request = await fetch("http://localhost:3001/categories");
      const response = await request.json();
      this.categories.push(response);
    },
    async getBrands() {
      const request = await fetch("http://localhost:3001/brands");
      const response = await request.json();
      this.brands.push(response);
    },
    setUserInput(input) {
      this.setPage(0);
      this.userInput = input;
    },
    setFilter(name, type) {
      this.setPage(0);
      if (this[type].includes(name)) {
        this[type] = this[type].filter((value) => value !== name);
      } else {
        this[type] = [...this[type], name];
      }
    },
    isChecked(name, type) {
      return this[type].includes(name);
    },
    setPrice(prices) {
      this.setPage(0);
      this.selectedPriceRange = prices;
      this.cards.push(
        this.cards[0].filter((card) => {
          return card.price >= this.selectedPriceRange[0] && card.price <= this.selectedPriceRange[1];
        })
      );
    },
    setPriceRange() {
      this.priceRange = findMinMax(this.cards[0]);
    },
    resetSelections() {
      this.setPage(0);
      this.selectedCategories = [];
      this.selectedBrands = [];
      this.userInput = '';
      this.selectedPriceRange = [];
      this.cards.push(this.cards[0]);
      document.querySelector(".searchfield__input").value = '';
      document.querySelectorAll(".filters__checkbox-square").forEach(checkbox => checkbox.checked = false);
      const prices = document.querySelectorAll(".slider-tooltip");
      this.priceRange = findMinMax(this.cards[0]);
      prices[0].textContent = this.priceRange[0];
      prices[1].textContent = this.priceRange[1];
    },
    setCardsForRender() {
      return filterData(
        filterUserInput(this.userInput, this.cards[this.cards.length - 1]),
        this.selectedCategories,
        this.selectedBrands,
        filterUserInput(this.userInput, this.cards[this.cards.length - 1])
      )
    },
    setPage(page) {
      this.selectedPage = [page * 9, (page + 1) * 9, page + 1];
    },
    pageBack() {
      this.selectedPage[0] -= 9;
      this.selectedPage[1] -= 9;
      this.selectedPage[2] -= 1;
    },
    pageForward() {
      this.selectedPage[0] += 9;
      this.selectedPage[1] += 9;
      this.selectedPage[2] += 1;
    },
  },
};
</script>

<style scoped lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;600&display=swap");

$page-background-color: #f9f9f9;
$elements-main-color: #ffffff;
$button-primary-color: #6f64f8;
$button-secondary-color: #ededed;
$main-text-color: #2c2c2c;
$secondary-text-color: #7e72f2;
$shadow-color: grey;

$font-weight-light: 300;
$font-weight-medium: 400;
$font-weight-large: 600;

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
    }
  }
}

@media (max-width: 1024px) {
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
