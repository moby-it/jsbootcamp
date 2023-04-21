
const el = document.getElementById("heading");

el.style.cursor = "pointer";
el.addEventListener("mouseenter", () => {
  createTooltip();
});
el.addEventListener("mouseleave", () => {
  removeTooltip();
});


function createTooltip() {
  const tooltip = document.createElement('div');
  tooltip.className = "tooltip";
  tooltip.style.width = "150px";
  tooltip.style.minHeight = "30px";
  tooltip.innerHTML = "This is a tooltip";
  tooltip.style.position = "relative";
  tooltip.style.left = "15px";
  tooltip.style.bottom = "10px";
  tooltip.style.border = "2px solid gray";
  tooltip.style.borderRadius = "5px";
  tooltip.style.padding = "5px 7px";
  const body = document.getElementsByTagName("body")[0];
  body.appendChild(tooltip);
}
function removeTooltip() {
  const el = document.querySelector('.tooltip');
  if (el) {
    el.remove();
  }
}