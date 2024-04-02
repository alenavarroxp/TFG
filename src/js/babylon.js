import { socket } from "../utils/socket.js";
import * as BABYLON from "babylonjs";
import { Character } from "./characterBabylon.js";
import { Escenario } from "./escenario.js";
import * as CANNON from "cannon";
import { Pointer } from "./pointer.js";
import { JoyStick } from "./joystick.js";
import { Stand } from "./stand.js";

export function initScene(canvas, user) {
  console.log("Iniciando escena...");
  socket.emit("init");
  window.CANNON = CANNON;
  // Crear el motor de Babylon.js
  let move = false;
  const engine = new BABYLON.Engine(canvas, true);
  engine.displayLoadingUI();
  engine.setHardwareScalingLevel(1 / window.devicePixelRatio);

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
  camera.inputs.attached.keyboard.detachControl();
  camera.attachControl(canvas, true);
  camera.upperBetaLimit = Math.PI / 2.15; // Límite superior

  const cameraInitialPosition = camera.position.clone();

  camera.onCollide = function (collidedMesh) {
    console.log("Colisión con: ", collidedMesh);
  };
  // Crear una luz
  // eslint-disable-next-line no-unused-vars
  const light = new BABYLON.HemisphericLight(
    "light",
    new BABYLON.Vector3(0, 10, 0),
    scene
  );

  const escenario = new Escenario();
  // engine.hideLoadingUI();
  escenario.initMap(scene, camera, function () {
    console.log("Escenario cargado");
    engine.hideLoadingUI();
  });

  const infoStand = new Stand(scene);
  infoStand.createStand(
    new BABYLON.Vector3(-0.85, 0, 0),
    "info_stand",
    escenario.elements
  );

  // Create a ground mesh
  var ground = BABYLON.MeshBuilder.CreateBox(
    "ground",
    { width: 30, height: 30, depth: 1 },
    scene
  );
  ground.position.y = -0.5;
  ground.rotate(BABYLON.Axis.X, Math.PI / 2, BABYLON.Space.WORLD);
  ground.visibility = 0;
  // Enable collisions for the ground
  // ground.checkCollisions = true;

  // Add a physics impostor to the ground
  ground.physicsImpostor = new BABYLON.PhysicsImpostor(
    ground,
    BABYLON.PhysicsImpostor.BoxImpostor,
    { mass: 0, restitution: 0 },
    scene
  );
  //Crear caja en -5,0,-5 con colisiones
  // Crear la caja
  // var box = BABYLON.MeshBuilder.CreateBox("box", {size: 2}, scene);
  // box.position = new BABYLON.Vector3(-2, 0, -2);
  // box.checkCollisions = true;

  // // Aplicar un material a la caja
  // var material = new BABYLON.StandardMaterial("material", scene);
  // material.diffuseColor = new BABYLON.Color3(1, 0, 0); // Color rojo
  // box.material = material;

  const characters = [];
  let character;

  const activities = [];

  // Control de teclado
  const keys = {
    W: false,
    A: false,
    S: false,
    D: false,
    SPACE: false,
    SHIFT: false,
  };

  let joystickContainer = document.getElementById("joystickContainer");
  let joystick;

  const createJoyStick = (container, canvas) => {
    joystick = new JoyStick(container, canvas, keys);
  };

  if (joystickContainer) {
    createJoyStick(joystickContainer, canvas);
  }

  let meshes = [];
  let show = true;

  document.addEventListener("keydown", (event) => {
    if (event.key.toUpperCase() === "K") {
      show = !show;

      scene.meshes.forEach((mesh) => {
        if (meshes.includes(mesh.name)) {
          mesh.showBoundingBox = show;
        }
      });

      if (show && meshes.length === 0) {
        scene.meshes.forEach((mesh) => {
          if (mesh.showBoundingBox) {
            meshes.push(mesh.name);
          }
        });
      }
    }
    if (move) handleKeyDown(event);
  });

  document.addEventListener("keyup", (event) => {
    if (move) handleKeyUp(event);
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
  // eslint-disable-next-line no-unused-vars
  function animateCameraProperty(propertyName, endValue) {
    BABYLON.Animation.CreateAndStartAnimation(
      "camera" + propertyName + "Animation",
      camera,
      propertyName,
      60,
      60,
      camera[propertyName],
      endValue,
      BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT
    );
  }

  function changeCameraMode() {
    console.log("change camera");
    if (cameraMode === "default") {
      cameraMode = "followPlayer";
    } else {
      cameraMode = "default";

      // Llamar a animateCameraProperty para cada propiedad que quieres animar
      // animateCameraProperty("position", cameraInitialPosition);
      // animateCameraProperty("radius", 7);
      // animateCameraProperty("alpha", -Math.PI / 2);
      // animateCameraProperty("beta", Math.PI / 4);

      // Sin animacion
      camera.position = cameraInitialPosition;
      camera.radius = 7;
      camera.alpha = -Math.PI / 2;
      camera.beta = Math.PI / 4;

      // Mira hacia el objetivo (ajusta según sea necesario)
      camera.setTarget(BABYLON.Vector3.Zero());
    }
  }

  // Iniciar la renderización de la escena
  engine.runRenderLoop(() => {
    // Mover el personaje según las teclas presionadas
    if (!scene) {
      console.error("La escena no está definida correctamente.");
      return;
    }

    if (keys.W || keys.A || keys.S || keys.D) {
      character.move(keys, characters, escenario, scene, activities, socket);
    }

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
      character.moveCamera(scene, camera, keys, escenario);
    }

    scene.render();
  });

  // Redimensionar la escena cuando se cambie el tamaño de la ventana
  window.addEventListener("resize", () => {
    engine.resize();
  });

  function eliminarPersonaje(id) {
    let character = characters.find((character) => character.id === id);
    if (character) {
      character.eliminarMeshes();
      const index = characters.indexOf(character);
      //Eliminar el jugador por completo
      characters.splice(index, 1);
    }
  }

  socket.on("init", () => {
    console.log("Conectado al servidor con ID: ", socket.id);
    setTimeout(() => {
      character = new Character(
        socket.id,
        new BABYLON.Vector3(
          Math.random() * (0.25 - -0.25) + -0.25,
          10,
          Math.random() * (0.25 - -0.25) + -0.25
        ),
        new BABYLON.Vector3(0, 0, 0),
        user,
        scene,
        (character) => {
          characters.push(character);
          socket.emit("newCharacter", {
            id: socket.id,
            position: character.mesh.position,
            rotation: character.mesh.rotation,
            user: user,
          });

          socket.emit("recuperarPersonajes", socket.id);
          socket.emit("recuperarActividades");

          // Ajusta el radio de la esfera según las dimensiones de tu personaje
          const sphereRadius = 0.5;

          character.mesh.physicsImpostor = new BABYLON.PhysicsImpostor(
            character.mesh,
            BABYLON.PhysicsImpostor.SphereImpostor,
            { mass: 10, radius: sphereRadius },
            scene
          );

          move = true;
        }
      );
    }, 500);
  });

  socket.on("disconnected", (id) => {
    console.log("Desconectado del servidor", id);
    eliminarPersonaje(id);
  });

  socket.on("newCharacter", (obj) => {
    const object = characters.find((character) => character.id === obj.id);
    console.log("CHARACTER EN NEW CHARACTER", object);
    if (!object) {
      const character = new Character(
        obj.id,
        obj.position,
        obj.rotation,
        obj.user,
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
          user: character.user,
        });
      } catch (err) {
        // console.log(err);
      }
    }
  });

  socket.on("recuperarActividades", () => {
    console.log("Recuperando actividades...");
    for (const activity of activities) {
      try {
        console.log("activity", activity);
        socket.emit("newActivity", {
          id: activity.id,
          location: activity.element.pointer._position,
        });
      } catch (err) {
        // console.log(err);
      }
    }
  });

  socket.on("getCurrentLocation", (socketId) => {
    const character = characters.find((character) => character.id === socketId);
    if (character) {
      socket.emit("getCurrentLocation", character.mesh.position);
    }
  });

  let pointer = null;
  const pointerDownListener = (eventData) => {
    if (eventData.type === BABYLON.PointerEventTypes.POINTERDOWN) {
      const pickResult = scene.pick(scene.pointerX, scene.pointerY);
      if (pickResult && pickResult.pickedPoint) {
        if (pointer) {
          pointer.dispose();
          pointer = null;
        }
        pointer = new Pointer(scene);
        pickResult.pickedPoint._y += 0.15;
        pointer.createPointer(pickResult.pickedPoint, "pointer");
        socket.emit("returnChooseLocation", pickResult.pickedPoint);
      }
    }
  };

  socket.on("chooseLocation", () => {
    scene.onPointerObservable.add(pointerDownListener);
  });

  socket.on("clearPointer", () => {
    if (pointer) {
      pointer.dispose();
      pointer = null;
    }
    scene.onPointerObservable.removeCallback(pointerDownListener);
  });

  socket.on("returnPointer", (obj) => {
    const character = characters.find((character) => character.id === obj.id);

    if (
      character.mesh.position._x === obj.position._x &&
      character.mesh.position._z === obj.position._z
    ) {
      obj.position._y += 0.3;
    } else {
      if (obj.position_y < 0.15) obj.position._y += 0.15;
    }

    if (pointer) {
      pointer.dispose();
      pointer = null;
    }

    pointer = new Pointer(scene);
    pointer.createPointer(obj.position, "pointer");
  });

  const createExclamation = () => {
    infoStand.createExclamation();
  };

  const updateInfoStand = () => {
    const activityCount = activities.length;
    const activityText =
      activityCount === 1 ? "actividad pendiente" : "actividades pendientes";
    infoStand.createDisplayInfo(
      "¡Descubre y completa " +
        activityCount +
        " " +
        activityText +
        " en el mundo!"
    );
  };

  const createPointer = (obj) => {
    Object.keys(obj).forEach((key) => {
      if (!activities.map((activity) => activity.id).includes(key)) {
        try {
          let element = new Pointer(scene);
          element.createPointer(obj[key].location, "book");

          let activity = {
            id: key,
            element: element,
          };
          activities.push(activity);
          createExclamation();
          updateInfoStand();
        } catch (err) {
          console.log(err);
        }
      }
    });
  };

  socket.on("createPointer", (obj) => {
    move = true;
    createPointer(obj);
  });

  socket.on("newActivity", (obj) => {
    console.log("Nueva actividad en babylonJS", obj);
    createPointer(obj);
  });

  socket.on("NoMove", () => {
    move = false;
    keys.W = false;
    keys.A = false;
    keys.S = false;
    keys.D = false;
    keys.SPACE = false;
    keys.SHIFT = false;

    // Deshabilitar el joystick
    if (joystick) {
      joystick.disable();
    }
  });

  socket.on("move", () => {
    move = true;
    // Habilitar el joystick
    if (joystick) {
      joystickContainer = document.getElementById("joystickContainer");
      joystick = new JoyStick(joystickContainer, canvas, keys);
    }
  });

  socket.on("changeCamera", () => {
    changeCameraMode();
  });

  socket.on("jump", () => {
    if (character) {
      character.playAnimation("CharacterArmature|Jump");
      character.jump();
    }
  });

  socket.on("updatePointer", (obj) => {
    const activity = activities.find((activity) => activity.id === obj.id);
    if (activity) {
      console.log("ACTIVITY", activity);
      activity.element.updatePosition(obj.location);
    }
  });
}
