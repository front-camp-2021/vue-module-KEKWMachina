<template>
  <div class="merchandise-cards__card">
    <img
      class="merchandise-cards__image"
      :src="cardData.images[0]"
      :alt="cardData.title"
    >
    <div class="merchandise-cards__rating-and-price">
      <div class="merchandise-cards__rating"> 
        {{ cardData.rating }} 
      </div>
      <div class="merchandise-cards__price">
        ₴{{ cardData.price }}
      </div>
    </div>
    <ul class="merchandise-cards__item-descriptions">
      <li 
        v-ellipsis="cardData.title"
        class="merchandise-cards__item-name"
      >
        {{ cardData.title }}>
      </li>
      <li class="merchandise-cards__item-description">
        Redesigned from scratch and completely revised.
      </li>
    </ul>
    <div class="merchandise-cards__buttons">
      <button class="merchandise-cards__wishlist-button">
        WISHLIST
      </button>
      <button class="merchandise-cards__add-to-cart-button">
        ADD TO CART
      </button>
    </div>
  </div>
</template>

<script>
import { ellipsis } from "../directives/v-ellipsis"
export default {
  name: "Card",
  directives: {
    ellipsis,
  },
  props: {
    cardData : {
    type: Object,
    default: () => {},
    }
  },
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;600&display=swap");
@import "/src/assets/styles/varibles.scss";

.merchandise-cards__card {
  z-index: 0;
  filter: drop-shadow(-0.4px 0.5px 0.05rem $shadow-color);
  position: relative;
  text-align: center;
  height: 400px;

  background-color: $elements-main-color;
  border-radius: 4px;
  margin-bottom: 20px;

  .merchandise-cards__image {
    margin-top: 20px;
    margin-bottom: 40px;
    max-height: 180px;
    max-width: 180px;
  }

  .merchandise-cards__rating-and-price {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0% 10% 0% 10%;

    .merchandise-cards__rating {
      bottom: 150px;
      position: absolute;
      color: $elements-main-color;
      padding: 2% 10% 2% 5%;
      background-color: $button-primary-color;
      background-image: url(~@/assets/img/rating-star.svg);
      background-repeat: no-repeat;
      background-position: bottom 50% left 90%;
      background-size: 20px;
      border-radius: 4px;
      font-size: 15px;
    }

    .merchandise-cards__price {
      right: 25px;
      bottom: 155px;
      position: absolute;
    }
  }

  .merchandise-cards__item-descriptions {
    position: absolute;
    z-index: 1;
    list-style-type: none;
    text-align: start;
    color: $main-text-color;
    padding: 0% 0% 2% 7%;
    margin: 2%;
    bottom: 60px;

    .merchandise-cards__item-name {
      max-height: 40px;
      
      
      z-index: 2;
      font-size: 16px;
      line-height: 19px;
      font-weight: $font-weight-medium;
      cursor: pointer;

      .merchandise-cards__tooltip {
        visibility: hidden;
        
        bottom: 8px;
        width: 90%;
        background-color: $button-secondary-color;
        color: $main-text-color;
        text-align: center;
        border-radius: 6px;
        padding: 5px 0;
        z-index: 2;
      }
    }

    .merchandise-cards__item-name:hover .merchandise-cards__tooltip {
      visibility: visible; 
    }

    .merchandise-cards__item-description {
      position: relative;
      z-index: 0;
      
      font-size: 12px;
      line-height: 14px;
      font-weight: $font-weight-light;
    }

  }

  .merchandise-cards__buttons {
    z-index: 0;
    position: absolute;
    bottom: 0px;
    width: 100%;
    height: 10%;
    display: flex;

    .merchandise-cards__wishlist-button {
      align-items: center;
      width: 50%;
      border: none;
      background-color: $button-secondary-color;
      border-bottom-left-radius: 4px;
      background-image: url(~@/assets/img/wishlist-img.svg);
      background-size: 10%;
      background-repeat: no-repeat;
      background-position: left 15% bottom 50%;
      cursor: pointer;
    }

    .merchandise-cards__add-to-cart-button {
      align-items: center;
      border: none;
      width: 50%;
      color: $elements-main-color;
      background-color: $button-primary-color;
      border-bottom-right-radius: 4px;
      background-image: url(~@/assets/img/add-to-cart-img.svg);
      background-size: 10%;
      background-repeat: no-repeat;
      background-position: left 5% bottom 50%;
      cursor: pointer;
    }
  }
}
</style>
