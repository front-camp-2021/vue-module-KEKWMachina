<template>
  <div v-if="!loading">
    <div class="item-container">
      <div class="item-container__image-container">
        <div class="item-container__image-container-wrapper">
          <img
            class="item-container__image-container-image"
            :src="cardForRender.images[0]"
            :alt="cardForRender.title"
          >
        </div>
      </div>
      <div class="item-container__description">
        <ul class="item-container__description-stats">
          <li>Code: {{ cardForRender.id }}</li>
          <li>Rating: {{ cardForRender.rating }}</li>
          <li>Price: {{ cardForRender.price }}</li>
        </ul>
        <p class="item-container__description-name">
          {{ cardForRender.title }}
        </p>
        <button class="item-container__description-button">
          Buy
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, watchEffect, defineComponent } from "@vue/runtime-core";
import { useMainContentComposable } from "../main-content/main-content-composable";
<<<<<<< HEAD
=======
import { useStore } from "vuex";
>>>>>>> 50758ce813864e06a6cfc98a0925cbcdfc373659
export default defineComponent({
  name: "Product",
  components: {},
  props: {
    card: {
      type: String,
      default: "",
    },
  },
  setup(props) {
    const BACKEND_URL = "http://localhost:3001/";
    const products = new URL("products", BACKEND_URL);
    const cardForRender = ref({});
    const loading = ref(true);
    const state = useMainContentComposable();
    
    watchEffect(async () => {
      if (state.cards) {
        loading.value = true;
        cardForRender.value = state.cards.find(el => el.id === props.card);
        loading.value = false;
      } else {
        loading.value = true;
        products.searchParams.set("q", props.card);
        const response = await fetch(products);
        const data = await response.json();
        cardForRender.value = data[0];
        loading.value = false;
      }
    });

    return {
      cardForRender,
      loading
    }
  },
});
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;600&display=swap");
@import "/src/assets/styles/varibles.scss";

.wishlist-nav-container__wishlist-back-btn {
  text-decoration: none;
  border: none;
  background-color: $button-primary-color;
  height: 50px;
  width: 220px;
  font-weight: 400;
  border-radius: 8px;
  margin: 15px;
  font-size: 18px;
  background-image: url(/img/pagination-arrow-back.svg);
  background-repeat: no-repeat;
  background-position: left 5% bottom 50%;
}

.item-container {
  border-radius: 4px;
  display: flex;

  &__image-container {
    width: 50%;
    border-radius: 4px;
    display: flex;
    justify-content: flex-end;

    &-wrapper {
      width: 70%;
      background-color: $elements-main-color;
      border-radius: 4px;
      text-align: center;
      margin-right: 20px;

      &-image {
        max-width: 200px;
        max-width: 150px;
        max-width: 400px;
        max-height: 300px;
        border-radius: 4px;
      }
    }
  }

  &__description {
    width: 50%;
    border-radius: 4px;
    background-color: $elements-main-color;
    border-radius: 4px;

    &-stats {
      list-style-type: none;
      padding: 0px;
      margin-left: 20px;
    }

    &-name {
      margin-left: 20px;
    }

    &-button {
      margin-left: 20px;
      background-color: $button-primary-color;
      border: none;
      border-radius: 4px;
      height: 40px;
      width: 100px;
      color: $elements-main-color;
    }
  }
}

.page-not-found {
  text-align: center;
}
</style>
