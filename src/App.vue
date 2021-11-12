<template>
  <div>
    <Header />
    <Breadcrumbs />
    <MainContent />
  </div>
</template>

<script>
import Header from "./components/header/header.vue";
import Breadcrumbs from "./components/breadcrumbs/breadcrumbs.vue";
import MainContent from "./components/main-content/main-content.vue";

export default {
  name: "App",
  components: {
    Header,
    Breadcrumbs,
    MainContent,
  },
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;600&display=swap");
@import "./assets/styles/global.css";

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
