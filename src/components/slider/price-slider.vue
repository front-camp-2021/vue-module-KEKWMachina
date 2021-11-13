<template>
  <slider
    v-model="range"
    :min="priceRange[0]"
    :max="priceRange[1]"
    @change="$emit('set-price', setPriceRange())"
  />
</template>
<script>
import Slider from "@vueform/slider";
import { ref } from '@vue/reactivity';
export default {
  name: "PriceSlider",
  components: {
    Slider,
  },
  props: {
    cards: {
      type: Array,
      default: () => [],
    },
    priceRange: {
      type: Array,
      default: () => [],
    },
  },
  setup(props) {
    const range = ref(props.priceRange);
    const setPriceRange = function() {
      const values = document.querySelectorAll(".slider-tooltip");
      return [values[0].textContent, values[1].textContent];
    }
    return {
      range,
      setPriceRange,
    }
  },
};
</script>

<style src="@vueform/slider/themes/default.css"></style>
