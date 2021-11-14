export const discount = {
  mounted(el, bindings) {
    if (bindings.value.discount) {
      const oldPrice = document.createElement("del");
      oldPrice.textContent = bindings.value.price;
      el.textContent = `₴${Math.ceil(
        bindings.value.price - (bindings.value.price / 100) * bindings.value.discount
      )}/`;
      el.appendChild(oldPrice);
    } else {
      el.textContent = `₴${bindings.value.price}`;
    }
  },
};
