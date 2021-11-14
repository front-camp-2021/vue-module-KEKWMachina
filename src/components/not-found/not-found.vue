<template>
  <div>
    <div class="not-found-wrapper">
      Ooops, wrong page 404.
    </div>
    <div class="back-btn-container">
      <router-link to="/">      
        <button class="back-btn">
          BACK TO MAIN PAGE
        </button>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "NotFound",
};
</script>

<style lang="scss">
@import "/src/assets/styles/varibles.scss";

.not-found-wrapper {
  background-color: $elements-main-color;
  filter: drop-shadow(-0.4px 0.5px 0.05rem $shadow-color);
  text-align: center;
  line-height: 50px;
  font-size: 36px;
  color: $main-text-color;
  margin: 40px;
  height: 60px;
  border-radius: 6px;
}
.back-btn-container {
  display: flex;
  justify-content: center;

  .back-btn {
    background-color: $button-primary-color;
    text-align: center;
    border-radius: 4px;
    border: none;
    height: 40px;
    cursor: pointer;
  }
}
</style>
