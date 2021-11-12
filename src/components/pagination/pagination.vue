<template>
  <div class="pagination">
    <button
      v-if="
        $store.state.activePage[
          $store.state.activePage.length - 1
        ][2] !== 1
      "
      class="pagination__button-page-back"
      @click="pageBack()"
    />
    <div class="pagination__main">
      <button
        v-for="page in pagesCount()"
        :key="page"
        :class="assingClass(page)"
        @click="setPage(page)"
      >
        {{ page + 1 }}
      </button>
    </div>
    <button
      v-if="
        $store.state.activePage[
          $store.state.activePage.length - 1
        ][2] !== Math.ceil(cardData.length / 9)
      "
      class="pagination__button-page-forward"
      @click="pageForward()"
    />
  </div>
</template>

<script>
export default {
  name: "Pagination",
  props: {
    cardData: {
      type: Object,
      default: Function,
    }
  },
  methods: {
    pagesCount() {
      return [...Array(Math.ceil(this.cardData.length / 9)).keys()];
    },
    assingClass(page) {
      if (
        page + 1 ===
        this.$store.state.activePage[this.$store.state.activePage.length - 1][2]
      ) {
        return "pagination__page active";
      } else {
        return "pagination__page";
      }
    },
    setPage(page) {
      this.$store.commit("setPage", page);
    },
    pageBack() {
      this.$store.commit(
        "pageBack",
        this.$store.state.activePage[this.$store.state.activePage.length - 1]
      );
    },
    pageForward() {
      this.$store.commit(
        "pageForward",
        this.$store.state.activePage[this.$store.state.activePage.length - 1]
      );
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

.pagination {
  display: flex;
  justify-content: center;
  margin-bottom: 30px;

  &__button-page-back {
    width: 37px;
    border: none;
    border-radius: 50%;
    margin-right: 20px;
    background-color: $button-secondary-color;
    background-image: url(~@/assets/img/pagination-arrow-back.svg);
    background-repeat: no-repeat;
    background-position: bottom 50% left 50%;
    cursor: pointer;
  }

  &__button-page-forward {
    width: 37px;
    border: none;
    border-radius: 50%;
    background-color: $button-secondary-color;
    background-image: url(~@/assets/img/pagination-arrow-forward.svg);
    background-repeat: no-repeat;
    background-position: bottom 50% left 50%;
    margin-left: 20px;
    cursor: pointer;
  }

  &__main {
    background-color: $button-secondary-color;
    border-radius: 25px;
    display: flex;

    .active {
      background-color: $button-primary-color;
      border-radius: 50%;
    }

    .pagination__page {
      height: 37px;
      width: 37px;
      text-decoration: none;
      display: inline-block;
      color: $main-text-color;
      border: none;
      border-radius: 50%;
      cursor: pointer;

      .active {
        background-color: $button-primary-color;
        border-radius: 50%;
      }
    }
  }
}
</style>
