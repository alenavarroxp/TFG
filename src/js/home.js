function Home() {
  this.init = function () {
    console.log("Home init");
    $("#homeDiv").load("../html/home.html", function () {
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

    $("#optionDiv").load("../html/option.html", function () {
      $("#optionDiv").show();
      $("#optionDiv").addClass("animate__animated animate__slideInRight");

      //Back button
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
        }, 700);
      });

      $("#student").change(function () {
        console.log("student change");
        if ($(this).is(":checked")) {
          $("#teacher").prop("disabled", true);
          $("#teacherDiv").addClass("opacity-50 pointer-events-none");
          $("#studentDiv").addClass("active");
        } else {
          $("#teacher").prop("disabled", false);
          $("#teacherDiv").removeClass("opacity-50 pointer-events-none");
          $("#studentDiv").removeClass("active");
        }
      });

      $("#teacher").change(function () {
        if ($(this).is(":checked")) {
          $("#student").prop("disabled", true);
          $("#studentDiv").addClass("opacity-50 pointer-events-none");
          $("#teacherDiv").addClass("active");
        } else {
          $("#student").prop("disabled", false);
          $("#studentDiv").removeClass("opacity-50 pointer-events-none");
          $("#teacherDiv").removeClass("active");
        }
      });

      // Evento de cambio para las opciones
      $("#student, #teacher").change(function () {
        if ($("#student").is(":checked") || $("#teacher").is(":checked")) {
          // Comprobar si se ha ingresado un nombre de usuario
          var username = $("#usernameInput").val();
          if (username.trim() !== "") {
            home.unlockLoginButton();
          } else {
            home.lockLoginButton();
          }
        } else {
          home.lockLoginButton();
        }
      });

      // Evento de cambio para el campo de entrada del nombre de usuario
      $("#usernameInput").on("input", function () {
        console.log("Username input change");
        var username = $(this).val();
        // Si se ha ingresado un nombre de usuario y una opción está seleccionada
        if (
          username.trim() !== "" &&
          ($("#student").is(":checked") || $("#teacher").is(":checked"))
        ) {
          home.unlockLoginButton();
        } else {
          home.lockLoginButton();
        }
      });

      $("#loginButton").click(function () {
        // IR A /babylon
        window.location.href = "/babylon";
      });
    });
  };

  this.unlockLoginButton = function () {
    // Activar el botón de inicio de sesión
    $("#loginButton").removeClass("disabled pointer-events-none bg-gray-300");
    $("#loginButton").addClass("cursor-pointer pointer-events-auto");
    // Habilitar el botón
    $("#loginButton").removeAttr("disabled");
    // Cambiar el texto del botón
    $("#loginButton").html(
      '<i class="fas fa-lock-open right-5 absolute" style="transform: rotateY(180deg); transition: transform 0.3s;""></i> Entrar al mundo'
    );
  };

  this.lockLoginButton = function () {
    // Desactivar el botón de inicio de sesión
    $("#loginButton").addClass("disabled pointer-events-none bg-gray-300");
    $("#loginButton").removeClass("cursor-pointer pointer-events-auto");
    // Deshabilitar el botón
    $("#loginButton").attr("disabled", "disabled");
    // Cambiar el texto del botón
    $("#loginButton").html(
      '<i class="fas fa-lock right-5 absolute" style="transform: rotateY(0deg); transition: transform 0.3s;""></i> Entrar al mundo'
    );
  };
}

var home;
document.addEventListener("DOMContentLoaded", () => {
  home = new Home();
  home.init();
});
