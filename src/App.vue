<template>
  <div class="app-wrapper">
    <header-logo />
    <breadcrumbs />
    <router-view />
  </div>
</template>

<script>
import Breadcrumbs from "./components/breadcrumbs/breadcrumbs.vue";
import HeaderLogo from "./components/header-logo/header-logo.vue";

export default {
  name: "App",
  components: {
    HeaderLogo,
    Breadcrumbs,
  },
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;600&display=swap");
@import "/src/assets/styles/varibles.scss";

:root {
  --slider-connect-bg: #7e72f2;
  --slider-tooltip-bg: #7e72f2;
  --slider-handle-ring-color: #7e72f2;
}

body {
  background-color: $page-background-color;
  position: relative !important;
}

* {
  font-family: "Montserrat", sans-serif;
  font-style: normal;
  font-weight: normal;
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
    width: 70px !important;
    height: 50px !important;
  }

  .header__text {
    font-size: 40px !important;
    line-height: 20px !important;
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
