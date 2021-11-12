<template>
  <div class="searchfield">
    <input
      class="searchfield__input"
      type="text"
      name="filter"
      placeholder="Search"
      @input="setSearchInput($event)"
    >
  </div>
</template>

<script>
export default {
  name: "Searchfield",
  methods: {
    setSearchInput(event) {
      this.$store.commit("setUserInput", event.target.value);
      this.$store.commit("setPage", 0);
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

.searchfield {
  width: 100%;
  filter: drop-shadow(-0.4px 0.5px 0.05rem $shadow-color);

  &__input {
    box-sizing: border-box;
    margin: 5px 0px 20px 0px;
    padding: 5px 5px 5px 15px;
    width: 100%;
    height: 30px;
    border: none;
    border-radius: 4px;
    font-size: 18px;
    background-image: url(~@/assets/img/search.svg);
    background-repeat: no-repeat;
    background-color: $elements-main-color;
    background-position: left 99% bottom 50%;
  }
}
</style>
