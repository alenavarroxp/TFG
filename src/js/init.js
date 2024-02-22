var home;

function Init() {
  home = new Home();
  home.init();
}

document.addEventListener("DOMContentLoaded", function () {
  Init();
});
