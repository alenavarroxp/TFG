function Home() {
  this.init = function () {
    $("#homeDiv").load("./html/home.html", function () {
      $("#homeDiv").show();
      $("#optionDiv").hide();
      $("#homeButton").click(function () {
        console.log("Home button click");
        $("#homeDiv").removeClass("animate__slideInLeft");
        $("#homeDiv").addClass("animate__animated animate__slideOutLeft");
        setTimeout(() => {
          home.mostrarOption();
        }, 400);
      });
    });
  };

  this.mostrarOption = function () {
    console.log("mostrarOption");
    $("#homeDiv").hide();

    $("#optionDiv").load("./html/option.html", function () {
      $("#optionDiv").show();
      $("#optionDiv").addClass("animate__animated animate__slideInRight");
      $("#backButton").click(function () {
        console.log("Back button click");
        $("#optionDiv").removeClass("animate__slideInRight");
        $("#optionDiv").addClass("animate__slideOutRight");
        setTimeout(() => {
          $("#homeDiv").removeClass("animate__slideOutLeft");
          $("#optionDiv").hide();
          $("#homeDiv").show();
          $("#homeDiv").addClass("animate__slideInLeft");
          $("#optionDiv").removeClass("animate__slideOutRight");
        }, 400);
      });
    });
  };
}
