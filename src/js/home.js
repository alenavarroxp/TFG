function Home() {
  this.init = function () {
    $("#homeDiv").load("../html/home.html", function () {
      $("#homeDiv").show();
      $("#optionDiv").hide();
      $("#homeButton").click(function () {
        $("#homeDiv").removeClass("animate__slideInLeft");
        $("#homeDiv").addClass("animate__animated animate__slideOutLeft");
        setTimeout(() => {
          home.mostrarOption();
        }, 400);
      });
    });
  };

  this.mostrarOption = function () {
    $("#homeDiv").hide();

    $("#optionDiv").load("../html/option.html", function () {
      $("#optionDiv").show();
      $("#optionDiv").addClass("animate__animated animate__slideInRight");

      //Back button
      $("#backButton").click(function () {
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
        if (
          $("#usernameInput").val() == "" ||
          ($("#student").is(":checked") || $("#teacher").is(":checked")) ==
            false
        ) {
          return;
        }

        var userData = {
          userName: $("#usernameInput").val(),
          isProfessor: $("#teacher").is(":checked"),
        };
        console.log("userData", userData);

        $.ajax({
          type: "POST",
          url: "/babylon",
          data: JSON.stringify(userData),
          contentType: "application/json",
          success: function (response) {
            console.log("Datos enviados exitosamente al servidor", response);
            window.location.href = "/babylon";
          },
          error: function (error) {
            console.error("Error al enviar datos al servidor:", error);
          },
        });
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
