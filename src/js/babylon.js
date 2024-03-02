import { socket } from "../utils/socket.js";
import * as BABYLON from "babylonjs";
import { Character } from "./characterBabylon.js";
import { Escenario } from "./escenario.js";
import * as CANNON from "cannon";

export function initScene(canvas) {
  console.log("inicializando escena...");
  socket.emit("init");
  window.CANNON = CANNON;
  // Crear el motor de Babylon.js
  const engine = new BABYLON.Engine(canvas, true);

  // Crear una escena
  const scene = new BABYLON.Scene(engine);
  // scene.debugLayer.show();
  scene.collisionsEnabled = true;

  const gravityVector = new BABYLON.Vector3(0, -9.81, 0);
  const physicsPlugin = new BABYLON.CannonJSPlugin();
  scene.enablePhysics(gravityVector, physicsPlugin);

  // Crear una cámara
  const camera = new BABYLON.ArcRotateCamera(
    "camera",
    -Math.PI / 2,
    Math.PI / 4,
    7,
    BABYLON.Vector3.Zero(),
    scene
  );
  camera.minZ = 0.1;
  camera.maxZ = 100;
  camera.lowerRadiusLimit = 1;
  camera.upperRadiusLimit = 22.5;
  camera.attachControl(canvas, true);
  camera.upperBetaLimit = Math.PI / 2.15; // Límite superior

  camera.collisionRadius = new BABYLON.Vector3(0.1, 0.1, 0.1);
  const cameraInitialPosition = camera.position.clone();

  // Crear una luz
  // eslint-disable-next-line no-unused-vars
  const light = new BABYLON.HemisphericLight(
    "light",
    new BABYLON.Vector3(0, 1, 0),
    scene
  );

  // ...

  const escenario = new Escenario();
  escenario.initMap(scene, 1);

  // Create a ground mesh
  var ground = BABYLON.MeshBuilder.CreateBox(
    "ground",
    { width: 20, height: 20, depth: 1 },
    scene
  );
  ground.position.y = -0.5;
  ground.rotate(BABYLON.Axis.X, Math.PI / 2, BABYLON.Space.WORLD);
  ground.visibility = 0;
  // Enable collisions for the ground
  ground.checkCollisions = true;

  // Add a physics impostor to the ground
  ground.physicsImpostor = new BABYLON.PhysicsImpostor(
    ground,
    BABYLON.PhysicsImpostor.BoxImpostor,
    { mass: 0, restitution: 0 },
    scene
  );

  const characters = [];
  let character;

  // Control de teclado
  const keys = {
    W: false,
    A: false,
    S: false,
    D: false,
    SPACE: false,
    SHIFT: false,
  };

  document.addEventListener("keydown", (event) => {
    handleKeyDown(event);
  });

  document.addEventListener("keyup", (event) => {
    handleKeyUp(event);
  });

  function handleKeyDown(event) {
    const key = event.key.toUpperCase();
    if (key === " ") {
      // No es necesario convertir a mayúsculas
      keys.SPACE = true;
    }
    if (Object.prototype.hasOwnProperty.call(keys, key)) {
      keys[key] = true;
    }
  }

  function handleKeyUp(event) {
    const key = event.key.toUpperCase();
    if (key === " ") {
      // No es necesario convertir a mayúsculas
      keys.SPACE = false;
    }
    if (Object.prototype.hasOwnProperty.call(keys, key)) {
      keys[key] = false;
    }
  }

  let cameraMode = "default"; // Modo de la cámara por defecto

  // Función para cambiar el modo de la cámara
  function changeCameraMode() {
    if (cameraMode === "default") {
      cameraMode = "followPlayer";
    } else {
      cameraMode = "default";
      // Ajustar las propiedades de la cámara para volver a la posición inicial
      camera.position = cameraInitialPosition;
      camera.radius = 7;
      camera.alpha = -Math.PI / 2;
      camera.beta = Math.PI / 4;

      // Mira hacia el objetivo (ajusta según sea necesario)
      camera.setTarget(BABYLON.Vector3.Zero());
    }
  }

  // Asignar la función al evento de clic del botón
  const changeCameraBtn = document.getElementById("changeCameraBtn");
  changeCameraBtn.addEventListener("click", changeCameraMode);

  // Iniciar la renderización de la escena
  engine.runRenderLoop(() => {
    // Mover el personaje según las teclas presionadas
    if (!scene) {
      console.error("La escena no está definida correctamente.");
      return;
    }

    if (keys.W) character.move(keys, characters, scene);
    if (keys.A) character.move(keys, characters, scene);
    if (keys.S) character.move(keys, characters, scene);
    if (keys.D) character.move(keys, characters, scene);

    if (character) {
      if (keys.SPACE) {
        character.playAnimation("CharacterArmature|Jump");
        character.jump();
      }

      if (!character.isJumping) {
        if (keys.SHIFT) {
          character.increaseSpeed();
          character.playAnimation("CharacterArmature|Run");
        } else if (keys.W || keys.A || keys.S || keys.D) {
          // Si se presiona alguna tecla de movimiento, reproducir la animación de caminar
          character.playAnimation("CharacterArmature|Walk");
          character.decreaseSpeed();
        } else {
          // Si no se presiona ninguna tecla, reproducir la animación Idle
          character.playAnimation("CharacterArmature|Idle");
          character.decreaseSpeed();
        }
      }

      try {
        socket.emit("moveCharacter", {
          id: socket.id,
          position: character.mesh.position,
          rotation: character.mesh.rotation,
          animation: character.animationName,
        });
      } catch (err) {
        // console.log(err);
      }
    }

    if (cameraMode === "followPlayer") {
      character.moveCamera(camera,keys);
    }

    scene.render();
  });

  // Redimensionar la escena cuando se cambie el tamaño de la ventana
  window.addEventListener("resize", () => {
    engine.resize();
  });

  function eliminarPersonaje(id) {
    const character = characters.find((character) => character.id === id);
    if (character) {
      character.mesh.dispose();
      const index = characters.indexOf(character);
      characters.splice(index, 1);
    }
  }

  socket.on("init", () => {
    console.log("Conectado al servidor", socket.id);
    character = new Character(
      socket.id,
      new BABYLON.Vector3(
        Math.random() * (10 - -10) + -10,
        10,
        Math.random() * (10 - -10) + -10
      ),
      new BABYLON.Vector3(0, 0, 0),
      "#ff0000",
      scene,
      (character) => {
        characters.push(character);
        socket.emit("newCharacter", {
          id: socket.id,
          position: character.mesh.position,
          rotation: character.mesh.rotation,
          color: "#00ff00",
        });

        socket.emit("recuperarPersonajes", socket.id);

        // Ajusta el radio de la esfera según las dimensiones de tu personaje
        const sphereRadius = 0.5;

        character.mesh.physicsImpostor = new BABYLON.PhysicsImpostor(
          character.mesh,
          BABYLON.PhysicsImpostor.SphereImpostor,
          { mass: 10, radius: sphereRadius },
          scene
        );
      }
    );
  });

  socket.on("disconnected", (id) => {
    console.log("Desconectado del servidor", id);
    eliminarPersonaje(id);
  });

  socket.on("newCharacter", (obj) => {
    const object = characters.find((character) => character.id === obj.id);
    if (!object) {
      const character = new Character(
        obj.id,
        obj.position,
        obj.rotation,
        obj.color,
        scene
      );
      console.log("Se ha creado el personaje: ", character);
      characters.push(character);
    }
  });

  socket.on("moveCharacter", (obj) => {
    const character = characters.find((character) => character.id === obj.id);
    if (character) {
      try {
        character.mesh.position.copyFrom(obj.position);
        character.meshes.forEach((mesh) => {
          mesh.rotation.copyFrom(obj.rotation);
        });
        character.playAnimation(obj.animation);
      } catch (err) {
        // console.log(err);
      }
    }
  });

  socket.on("recuperarPersonajes", () => {
    console.log("Recuperando personajes...");
    for (const character of characters) {
      try {
        socket.emit("newCharacter", {
          id: character.id,
          position: character.mesh.position,
          rotation: character.mesh.rotation,
          color: "#00ff00",
        });
      } catch (err) {
        // console.log(err);
      }
    }
  });
}
