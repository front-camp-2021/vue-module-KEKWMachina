<template>
  <div>
    <div 
      v-if="!loading" 
      class="wishlist-cards-wrapper"
    >
      <div class="wishlist-cards-wrapper__container">
        <card
          v-for="card in getDiscountedCards()"
          :key="card.id"
          :card-data="card"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
import Card from "../card/card.vue";
import { onBeforeMount } from "@vue/runtime-core";
export default {
  name: "Discounts",
  components: {
    Card,
  },
  setup() {
    const cards = ref([]);
    const loading = ref(true);
    const discountedCards = ref([]);

    onBeforeMount(async () => {
      loading.value = true;
      await getCards();
      await findDiscountedCards();
      loading.value = false;
    });

    const getCards = async function () {
      const request = await fetch("http://localhost:3001/products");
      const response = await request.json();
      await cards.value.push(response);
    };

    const findDiscountedCards = function () {
      discountedCards.value = cards.value[0].filter((card) =>
        Boolean(card.discount)
      );
    };

    const getDiscountedCards = function () {
      return discountedCards.value;
    };

    return {
      loading,
      getDiscountedCards,
    };
  },
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;600&display=swap");
@import "/src/assets/styles/varibles.scss";

.wishlist-cards-wrapper {
  text-align: center;
  border-radius: 4px;
  display: flex;
  justify-content: center;

  &__container {
    border-radius: 4px;
    width: 100%;
    display: grid;
    grid-template-columns: 24.5% 24.5% 24.5% 24.5%;
    grid-template-rows: 1fr 1fr 1fr 1fr;
    gap: 0rem 8px;
  }
}

@media (max-width: 1200px) {
  .wishlist-cards-wrapper__container {
    grid-template-columns: 33% 33% 33%;
    grid-template-rows: 1fr 1fr 1fr;
  }
}

@media (max-width: 768px) {
  .wishlist-cards-wrapper__container {
    grid-template-columns: 49% 49%;
    grid-template-rows: 1fr 1fr;
  }
}

@media (max-width: 540px) {
  .wishlist-cards-wrapper__container {
    display: flex;
    flex-direction: column;
  }
}
</style>