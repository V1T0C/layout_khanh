// slider
$("#slider").roundSlider({
  radius: 180,
  width: 8,
  handleSize: "+16",
  handleShape: "dot",
  sliderType: "min-range",
  value: 16,
  circleShape: "pie",
  startAngle: 315,
  min: 16,
  max: 30,
  start: "traceEvent",
  valueChange: "traceEvent",
});
function traceEvent(e) {
  console.log(e.type);
  document.getElementById("airconValue").innerHTML = e.value;
}
// Toggle active class
$(document).ready(function () {
  $(".device-switch").click(function () {
    this.classList.toggle("active");
  });
});