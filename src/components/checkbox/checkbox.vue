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
@import "/src/assets/styles/varibles.scss";

.filters__checkbox-square {
  cursor: pointer;
}

.filters__checkbox-label {
  cursor: pointer;
}
</style>
