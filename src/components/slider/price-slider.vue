<template>
  <Slider
    v-model="value"
    :min="setMinMax()[0]"
    :max="setMinMax()[1]"
    @change="$emit('set-price', setPriceRange())"
  />
</template>

<script>
import Slider from "@vueform/slider";
import { findMinMax } from "../helper-functions/findMinMax";
export default {
  name: "PriceSlider",
  components: {
    Slider,
  },
  props: {
    cards: {
      type: Array,
      default: Function,
    },
  },
  data: function () {
    return {
      value: findMinMax(this.cards),
    };
  },
  methods: {
    setPriceRange() {
      const values = document.querySelectorAll(".slider-tooltip");
      return [values[0].textContent, values[1].textContent];
    },
    setMinMax() {
      return findMinMax(this.cards);
    },
  },
};
</script>

<style src="@vueform/slider/themes/default.css"></style>
