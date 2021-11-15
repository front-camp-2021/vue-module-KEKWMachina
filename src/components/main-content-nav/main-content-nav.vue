<template>
  <div class="main-content-nav">
    <div class="filters-header">
      <div class="filters-header__nav">
        <div class="filters-header__marker">
          Filters
        </div>
        <button class="filters-header__filters-hide-button" />
      </div>
    </div>
    <div class="search-results">
      <div class="search-results__number">
        {{ itemsFound }} Results Found
      </div>
      <div class="search-results__btn-container">
        <router-link to="/products/discounts">
          <button class="search-results__discount" />
        </router-link>
        <button class="search-results__wishlist-button" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MainContentNav",
  props: {
    itemsFound: {
      type: Number,
      default: 0,
    },
  },
};
</script>

<style scoped lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;600&display=swap");
@import "/src/assets/styles/varibles.scss";

.main-content-nav {
  display: flex;
  margin: 10px;

  .filters-header {
    width: 30%;

    &__nav {
      display: flex;
      justify-content: space-between;
      width: 95%;
    }

    &__marker {
      font-size: 18px;
      line-height: 21px;
      font-weight: $font-weight-medium;
    }

    &__filters-hide-button {
      background-color: $elements-main-color;
      height: 25px;
      width: 30px;
      border-radius: 4px;
      border: none;
      background-image: url(~@/assets/img/arrows-left.svg);
      background-repeat: no-repeat;
      background-position: left 50% bottom 50%;
      filter: drop-shadow(-0.4px 0.5px 0.05rem $shadow-color);
      cursor: pointer;
    }
  }

  .search-results {
    display: flex;
    justify-content: space-between;
    width: 70%;

    &__number {
      align-items: center;
      font-size: 18px;
      line-height: 21px;
      font-weight: $font-weight-medium;
    }

    &__wishlist-button {
      margin-left: 5px;
      height: 25px;
      width: 25px;
      border: none;
      border-radius: 4px;
      background-color: $button-primary-color;
      background-image: url(~@/assets/img/wishlist-img.svg);
      background-repeat: no-repeat;
      background-position: bottom 50% left 50%;
      cursor: pointer;
    }

    &__discount {
      margin-left: 5px;
      height: 25px;
      width: 25px;
      border: none;
      border-radius: 4px;
      background-image: url(~@/assets/img/discount-btn.svg);
      background-repeat: no-repeat;
      background-position: bottom 50% left 50%;
      cursor: pointer;
    }
  }
}
</style>
