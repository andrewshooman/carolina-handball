const container = document.getElementById("testModal");
const modal = new bootstrap.Modal(container);

document.getElementById("btnShow").addEventListener("click", function () {
  modal.show();
});
document.getElementById("btnSave").addEventListener("click", function () {
  modal.hide();
});