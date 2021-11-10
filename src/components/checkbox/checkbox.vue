<template>
  <div class="filters__checkbox">
    <input
      :id="itemName"
      type="checkbox"
      :name="name"
      class="filters__checkbox-square"
      :checked="checked"
      @change="$emit('set-filter', itemName, name)"
    >
    <label
      class="filters__checkbox-label"
      :for="itemName"
    >
      {{
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
    },
    checked: {
      type: Boolean,
      default: false,
    }
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
