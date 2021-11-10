<template>
  <div class="breadcrumbs">
    <div class="breadcrumbs__home-button" />
    <div class="breadcrumbs__arrows" />
    <div class="breadcrumbs__active-page">
      eCommerce
    </div>
    <div class="breadcrumbs__arrows" />
    <div class="breadcrumbs__page">
      Electronics
    </div>
  </div>
</template>

<script>
export default {
  name: "Breadcrumbs",
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

.breadcrumbs {
  display: flex;
  align-items: center;
  align-content: center;
  margin: 10px;

  &__home-button {
    background-image: url(~@/assets/img/home.svg);
    width: 20px;
    height: 20px;
    background-size: 100%;
    background-repeat: no-repeat;
    cursor: pointer;
  }

  &__arrows {
    margin: 5px;
    background-image: url(~@/assets/img/breadcrumbs-arrows-right.svg);
    width: 20px;
    height: 14px;
    background-size: 100%;
    background-repeat: no-repeat;
  }

  &__active-page {
    color: $secondary-text-color;
    font-weight: $font-weight-medium;
    cursor: pointer;
  }

  &__page {
    color: $main-text-color;
    font-weight: $font-weight-medium;
    cursor: pointer;
  }
}
</style>
