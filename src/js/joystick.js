import nipplejs from "nipplejs";
/* eslint-disable no-undef */
export class JoyStick {
  constructor(container, canvas, keys) {
    this.container = container;
    this.canvas = canvas;
    this.joystick = null;
    this.joystickManager = null;
    this.joystickOptions = {
      zone: this.container,
      mode: "static",
      position: { left: "50%", top: "50%" },
      color: "white",
      size: 100, // Cambiar el tamaño del joystick
      fadeTime: 250, // Cambiar el tiempo de desvanecimiento
      restOpacity: 0.5, // Cambiar la opacidad de reposo
    };

    this.enabled = false; // Inicialmente deshabilitado
    this.enable(keys, container); // Llamar a enable en el constructor para crear la instancia inicial
  }

  handleMove = (keys) => {
    this.joystickManager.on("move", (evt, data) => {
      this.resetKeys(keys);

      if (data.force > 2.25) {
        keys.SHIFT = true;
      } else {
        keys.SHIFT = false;
      }
      if (data.angle) {
        const { radian } = data.angle;
        const angle = (radian * 180) / Math.PI; // Convertir radianes a grados

        if (angle >= 315 || angle < 45) {
          keys.D = true; // Derecha
        } else if (angle >= 45 && angle < 135) {
          keys.W = true; // Arriba
        } else if (angle >= 135 && angle < 225) {
          keys.A = true; // Izquierda
        } else if (angle >= 225 && angle < 315) {
          keys.S = true; // Abajo
        }
      }

      //   if (data.direction) {
      //     const { x, y } = data.direction;

      //     console.log("Dirección:", x, y);

      //     this.resetKeys(keys);

      //     if (y === "up") {
      //       keys.W = true; // Arriba
      //     } else if (y === "down") {
      //       keys.S = true; // Abajo
      //     }

      //     if (x === "left") {
      //       keys.A = true; // Izquierda
      //     } else if (x === "right") {
      //       keys.D = true; // Derecha
      //     }
      //   }
    });

    this.joystickManager.on("end", () => {
      console.log("Joystick ended");
      this.resetKeys(keys);
    });
  };

  resetKeys = (keys) => {
    keys.W = false;
    keys.A = false;
    keys.S = false;
    keys.D = false;
    keys.SHIFT = false;
  };

  disable = () => {
    if (this.joystickManager) {
      this.joystickManager.destroy();
      this.joystickManager = null;
      this.enabled = false;
    }
    console.log("Joystick disabled");
  };

  enable = (keys, container) => {
    if (!this.enabled) {
      console.log("Joystick enabled");
      this.container = container;
      this.joystickManager = nipplejs.create({
        ...this.joystickOptions,
        zone: container,
      }); // Crear un nuevo joystick
      this.enabled = true;
      this.handleMove(keys); // Suponiendo que `keys` es un parámetro válido
    }
  };
}
