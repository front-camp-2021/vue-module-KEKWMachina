<template>
  <header class="header">
    <div class="header__logo" />
    <div class="header__text">
      Online Store
    </div>
  </header>
</template>

<script>
export default {
  name: "Header",
};
</script>

<style scoped lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;600&display=swap");
@import "/src/assets/styles/varibles.scss";

.header {
  display: flex;
  align-items: center;

  &__logo {
    align-self: center;
    background-image: url(~@/assets/img/logo.svg);
    margin: 10px;
    width: 90px;
    height: 70px;
    background-size: 100%;
    background-repeat: no-repeat;
  }

  &__text {
    font-size: 48px;
    line-height: 27px;
    color: $secondary-text-color;
    font-weight: $font-weight-large;
  }
}
</style>
