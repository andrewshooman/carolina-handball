const container = document.getElementById("modal1");
const container2 = document.getElementById("modal2");

const modal = new bootstrap.Modal(container);
const modal2 = new bootstrap.Modal(container2);


document.getElementById("btnShow").addEventListener("click", function () {
  modal.show();
});
document.getElementById("btnSave").addEventListener("click", function () {
  modal.hide();
});
document.getElementById("btn-close").addEventListener("click", function () {
  modal.hide();
});


document.getElementById("btnShow2").addEventListener("click", function () {
  modal2.show();
});
document.getElementById("btnSave2").addEventListener("click", function () {
  modal2.hide();
});

document.getElementById("btnShow3").addEventListener("click", function () {
  modal.show();
});
document.getElementById("btnSave3").addEventListener("click", function () {
  modal.hide();
});

document.getElementById("btnShow4").addEventListener("click", function () {
  modal.show();
});
document.getElementById("btnSave4").addEventListener("click", function () {
  modal.hide();
});