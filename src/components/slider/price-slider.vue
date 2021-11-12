<template>
  <Slider
    v-model="value"
    :min="setMinMax()[0]"
    :max="setMinMax()[1]"
    @change="setPriceRange()"
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
  data: function () {
    return {
      value: this.setMinMax(),
    };
  },
  methods: {
    setPriceRange() {
      const values = document.querySelectorAll(".slider-tooltip");
      this.$store.commit("filterByPrice", values);
      this.$store.commit("setPage", 0);
    },
    setMinMax() {
      return findMinMax(this.$store.state.cardData[0]);
    },
  },
};
</script>

<style src="@vueform/slider/themes/default.css"></style>
