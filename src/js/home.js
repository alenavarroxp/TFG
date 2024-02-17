function Home() {
  this.init = function () {
    $("#homeDiv").load("./html/home.html", function () {
      $("#homeDiv").show();
      $("#optionDiv").hide();
      $("#homeButton").click(function () {
        console.log("Home button click");
        home.mostrarOption();
      });
    });
  };

  this.mostrarOption = function () {
    console.log("mostrarOption");
    $("#optionDiv").show();
    $("#homeDiv").hide();
    $("#optionDiv").load("./html/option.html", function () {});
  };
}
