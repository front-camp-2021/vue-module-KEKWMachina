export const ellipsis = {
  mounted(el, bindings) {

    if(bindings.value.length > 40) {
        const tooltip = document.createElement("p");
        tooltip.className = "merchandise-cards__tooltip";
        tooltip.innerText = bindings.value;
        el.textContent = bindings.value.slice(0, 35) + "...";
        el.appendChild(tooltip);
    }
  },
};
