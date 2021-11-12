<template>
  <div
    class="filters__checkbox"
    @click="addFilter($event)"
  >
    <input
      :id="itemName"
      type="checkbox"
      :name="name"
      class="filters__checkbox-square"
    >
    <label
      class="filters__checkbox-label"
      :for="itemName"
    >{{
      itemName
    }}
    </label>
  </div>
</template>

<script>
export default {
  name: "Checkbox",
  props: {
    itemName: {
      type: String,
      default: "",
    },
    name: {
      type: String,
      default: "",
    }
  },
  methods: {
    addFilter(event) {
      const formattedItem = event.target.id.toLowerCase().split(" ").join("_");
      if (event.target.type === "checkbox") {
        this.$store.commit("setPage", 0);
        if (event.target.name === "categories") {
          if (event.target.checked) {
            this.$store.commit("addCategory", formattedItem);
          } else {
            this.$store.commit("removeCategory", formattedItem);
          }
        } else if (event.target.name === "brands") {
          if (event.target.checked) {
            this.$store.commit("addBrand", formattedItem);
          } else {
            this.$store.commit("removeBrand", formattedItem);
          }
        }
      }
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

.filters__checkbox-square {
  cursor: pointer;
}

.filters__checkbox-label {
  cursor: pointer;
}
</style>
