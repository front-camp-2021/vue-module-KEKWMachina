<template>
  <div class="pagination">
    <button
      v-if="activePage !== 1"
      class="pagination__button-page-back"
      @click="$emit('page-back')"
    />
    <div class="pagination__main">
      <button
        v-for="page in pagesCount"
        :key="page"
        :class="assingClass(page)"
        @click="$emit('set-page', page)"
      >
        {{ page + 1 }}
      </button>
    </div>
    <button
      v-if="activePage !== Math.ceil(cardData.length / 9)"
      class="pagination__button-page-forward"
      @click="$emit('page-forward')"
    />
  </div>
</template>

<script>
import { computed } from '@vue/reactivity';
export default {
  name: "Pagination",
  props: {
    cardData: {
      type: Object,
      default: () => {},
    },
    activePage: {
      type: Number,
      default: 1,
    },
  },
  setup(props) {
    const pagesCount = computed(() => [...Array(Math.ceil(props.cardData.length / 9)).keys()]);
    const assingClass = function(page) {
      if (page + 1 === props.activePage) {
        return "pagination__page active";
      } else {
        return "pagination__page";
      }
    } 
    return {
      pagesCount,
      assingClass
    }
  }
};
</script>

<style scoped lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;600&display=swap");
@import "/src/assets/styles/varibles.scss";

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
