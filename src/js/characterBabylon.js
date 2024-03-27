/* eslint-disable no-undef */
import "babylonjs-loaders";
export class Character {
  constructor(id, position, rotation, user, scene, callback) {
    this.id = id;
    this.user = user;
    this.mesh = null;
    this.meshes = null;
    this.capsule = null;
    this.displayName = null;
    this.animations = {}; // Diccionario para almacenar animaciones
    this.mixer = null;
    this.isMoving = false;
    this.speed = 0;
    this.MAX_SPEED = 0.035;
    this.MIN_SPEED = 0.025;
    this.SPEED_CHANGE = 0.025;
    this.isJumping = false;
    this.jumpSpeed = 0;
    this.isColliding = false;
    this.oldPosition = new BABYLON.Vector3();

    console.log("USER en crear personaje", this.user);
    // Carga el modelo GLB utilizando SceneLoader.ImportMesh

    BABYLON.SceneLoader.ImportMesh(
      "",
      "models/",
      "character.glb",
      scene,
      (newMeshes) => {
        // El modelo GLB contiene varios meshes, pero solo queremos el primero
        this.meshes = newMeshes;
        this.mesh = newMeshes[0];

        scene.animationGroups.forEach((animation) => {
          this.animations[animation.name] = animation;
          animation.stop();
        });

        var animating = true;
        const idleAnimation = scene.getAnimationGroupByName(
          "CharacterArmature|Idle"
        );

        if (animating)
          idleAnimation.start(
            true,
            1.0,
            idleAnimation.from,
            idleAnimation.to,
            false
          );
        // Posición y rotación
        this.mesh.position.set(position.x, position.y, position.z);
        this.mesh.rotation.set(rotation.x, rotation.y, rotation.z);
        this.mesh.scaling.set(0.05, 0.05, 0.05);
        this.mesh.name = id;
        this.speed = this.SPEED_CHANGE;

        // Cambiar el color de las partes del personaje
        // eslint-disable-next-line no-undef
        const characterMaterial = new BABYLON.StandardMaterial(
          "characterMaterial",
          scene
        );
        // eslint-disable-next-line no-undef
        characterMaterial.diffuseColor = new BABYLON.Color3.FromHexString(
          this.user.isProfessor ? "#148A1A" : "#1481BA"
        );

        const partsToColor = [
          "Body_primitive0",
          "Body_primitive2",
          "Ears",
          "Arms_primitive0",
          "Head_primitive0",
        ];
        this.mesh.getChildMeshes().forEach((object) => {
          if (partsToColor.includes(object.name)) {
            object.material = characterMaterial;
          }
        });
        // this.mesh.checkCollisions = true;
        this.mesh.applyGravity = true;

        this.showBoundingCapsule(scene, this.mesh);

        this.createDisplayName(scene, this.mesh);

        if (callback) {
          callback(this);
        }
      }
    );
  }

  createDisplayName(scene, mesh) {
    // Crear un plano para mostrar el nombre del personaje
    this.displayName = BABYLON.MeshBuilder.CreatePlane(
      "plane",
      { size: 0.2 },
      scene
    );

    // Crear una textura dinámica
    var dynamicTexture = new BABYLON.DynamicTexture(
      "dynamic texture",
      512,
      scene,
      true
    );
    dynamicTexture.hasAlpha = true;

    // Crear un contexto 2D a partir de la textura dinámica
    var ctx = dynamicTexture.getContext();

    // Limpia el contexto
    ctx.clearRect(0, 0, 512, 512);

    // Configurar el estilo del texto
    ctx.font = "bold 50px Verdana"; // Reducir el tamaño del texto del nombre
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    // Dibujar el texto del nombre en el contexto
    ctx.fillText(this.user.userName, 256, 240); // Ajustar la posición del texto del nombre

    // Configurar el estilo del texto del rol
    ctx.font = "italic 40px Arial";
    ctx.fillStyle = "white";

    // Dibujar el texto del rol en el contexto
    var role = this.user.isProfessor ? "Profesor" : "Estudiante";
    ctx.fillText(role, 256, 285); // Ajustar la posición del texto del rol

    // Actualizar la textura
    dynamicTexture.update();

    // Crear un material a partir de la textura
    var planeMaterial = new BABYLON.StandardMaterial("plane material", scene);
    planeMaterial.diffuseTexture = dynamicTexture;
    planeMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
    planeMaterial.emissiveColor = new BABYLON.Color3(1, 1, 1);
    planeMaterial.backFaceCulling = false;
    planeMaterial.diffuseTexture.hasAlpha = true;

    // Aplicar el material al plano
    this.displayName.material = planeMaterial;

    // Mantener el plano enfocado hacia la cámara
    scene.registerBeforeRender(() => {
      this.displayName.position = new BABYLON.Vector3(
        mesh.position.x,
        mesh.position.y + 0.2,
        mesh.position.z
      );

      var camera = scene.activeCamera;
      if (camera) {
        this.displayName.billboardMode = BABYLON.Mesh.BILLBOARDMODE_ALL;
        this.displayName.rotation.y = camera.rotation.y;
        this.displayName.rotation.x = camera.rotation.x;
        this.displayName.rotation.z = camera.rotation.z;
      }
    });
  }

  showBoundingCapsule(scene, mesh) {
    //Construir una capsula alrededor del personaje
    this.capsule = new BABYLON.MeshBuilder.CreateCapsule(
      "ellipsoid",
      {
        capSubdivisions: 5,
        subdivisions: 5,
        radius: 0.06,
        height: 0.15,
      },
      scene
    );
    var ellipsoidMaterial = new BABYLON.StandardMaterial(
      "ellipsoidMaterial",
      scene
    );
    ellipsoidMaterial.wireframe = true;
    this.capsule.material = ellipsoidMaterial;
    this.capsule.checkCollisions = true;

    scene.registerBeforeRender(() => {
      this.capsule.position = new BABYLON.Vector3(
        mesh.position.x,
        mesh.position.y + 0.075,
        mesh.position.z
      );
    });
  }

  playAnimation(animationName) {
    if (this.animations[animationName]) {
      const action = this.animations[animationName];
      if (this.currentAction == action) return;

      // Detener la animación actual antes de reproducir la nueva
      if (this.currentAction) {
        this.currentAction.stop();
      }

      action.start(true, 1.0, action.from, action.to, false);
      this.animationName = animationName;
      this.currentAction = action; // Guardar la referencia a la acción actual
    }
  }

  move(keys, characters, escenario, scene, activities) {
    let computedRotation = this.mesh.rotation.z;
    let computedMovement = new BABYLON.Vector3();

    if (keys["A"]) {
      computedRotation -= this.SPEED_CHANGE;
    } else if (keys["D"]) {
      computedRotation += this.SPEED_CHANGE;
    }

    this.smoothRotate(computedRotation, scene);

    const fullCircle = 2 * Math.PI;
    if (computedRotation > fullCircle) {
      computedRotation = fullCircle - computedRotation;
    } else if (computedRotation < 0) {
      computedRotation = fullCircle + computedRotation;
    }

    const movementSpeedFactor = 0.3; // Reduce este valor para hacer el movimiento más lento
    const zMovement =
      this.speed * Math.cos(this.mesh.rotation.z) * movementSpeedFactor;
    const xMovement =
      this.speed * Math.sin(this.mesh.rotation.z) * movementSpeedFactor;

    if (keys["W"]) {
      computedMovement = new BABYLON.Vector3(-xMovement, 0, -zMovement);
    } else if (keys["S"]) {
      computedMovement = new BABYLON.Vector3(xMovement, 0, zMovement);
    }

    const newPosition = this.mesh.position.add(computedMovement);
    const collisionResult = this.checkCollisions(
      scene,
      newPosition,
      this.oldPosition,
      characters,
      escenario,
      activities
    );

    if (!collisionResult) {
      // No hay colisión, el personaje puede moverse libremente
      this.oldPosition = this.mesh.position.clone(); // Actualizamos la posición anterior
      this.mesh.position = newPosition;
    } else if (collisionResult === "scenary_collision") {
      const avoidancePosition = BABYLON.Vector3.Lerp(
        newPosition,
        this.oldPosition,
        0.5
      );

      // Mover el personaje hacia la nueva posición evitando la colisión
      this.mesh.position = avoidancePosition;
    }else if(collisionResult === "activity_collision"){
      console.log("Colisión con actividad");
      this.oldPosition = this.mesh.position.clone(); // Actualizamos la posición anterior
      this.mesh.position = newPosition;
    }
  }

  // eslint-disable-next-line no-unused-vars
  smoothRotate(targetRotation, scene) {
    this.meshes.forEach((mesh) => {
      const currentRotation = mesh.rotation.z;
      const shortestDistance = this.shortestAngleDistance(
        currentRotation,
        targetRotation
      );
      const lerpedRotation = this.lerpAngle(
        currentRotation,
        currentRotation + shortestDistance,
        1
      );

      mesh.rotation.z = lerpedRotation;
    });
  }
  shortestAngleDistance(a, b) {
    const maxAngle = 360; // El máximo valor para ángulos en grados
    const angleDiff = (b - a + maxAngle) % maxAngle;
    return angleDiff > 180 ? angleDiff - maxAngle : angleDiff;
  }

  lerpAngle(a, b, t) {
    const angleDiff = b - a;

    // Ajustar el ángulo a un rango [-PI, PI]
    if (angleDiff > Math.PI) {
      b -= 2 * Math.PI;
    } else if (angleDiff < -Math.PI) {
      b += 2 * Math.PI;
    }

    // Realizar la interpolación lineal
    return a + t * (b - a);
  }

  checkCollisions(
    scene,
    newPosition,
    oldPosition,
    characters,
    escenario,
    activities
  ) {
    // Verificar colisiones con otras cápsulas de personajes
    for (const character of characters) {
      if (character.id !== this.id && character.capsule.position) {
        const distanceVector = newPosition.subtract(character.capsule.position);
        const distance = distanceVector.length();
        // Detener el movimiento si hay colisión con otro personaje
        if (distance < 0.12) {
          return true;
        }
      }
    }

    for (const activity of activities) {
      if(activity.element.pointer.intersectsMesh(this.capsule, true)){
        return "activity_collision";
      }
    }
    // Verificar colisiones con el escenario pero solo si el personaje se está moviendo. No quiero que me lo deje atrapado en el intersectsMesh
    for (const mesh of escenario.elements) {
      if (mesh.intersectsMesh(this.capsule, true)) {
        return "scenary_collision";
      }
    }
    return false; // No hay colisiones
  }

  moveCamera(scene, camera, keys, escenario) {
    const lerpFactor = 0.3;
    const distanceFromPlayer = 0.35; // Ajusta esto para cambiar la distancia de la cámara al jugador

    if (keys["W"] || keys["A"] || keys["S"] || keys["D"]) {
      const cameraOffset = new BABYLON.Vector3(
        -distanceFromPlayer * Math.sin(this.mesh.rotation.z + Math.PI),
        0.175,
        -distanceFromPlayer * Math.cos(this.mesh.rotation.z + Math.PI)
      );
      const targetPosition = this.mesh.position.add(cameraOffset);

      // Aplica la interpolación (lerp) para suavizar el seguimiento del jugador
      // eslint-disable-next-line no-undef

      camera.position = BABYLON.Vector3.Lerp(
        camera.position,
        targetPosition,
        lerpFactor
      );
    }
    // Mira al jugador
    if (this.checkCollisionsCamera(scene, camera, escenario)) {
      console.log("Colisión con el escenario");
    }
    camera.position = BABYLON.Vector3.Lerp(
      camera.position,
      this.mesh.position,
      lerpFactor
    );

    camera.setTarget(this.mesh.position);
  }

  checkCollisionsCamera(scene, camera, escenario) {
    const direction = this.mesh.position.subtract(camera.position).normalize();
    const maxDistance = this.mesh.position.subtract(camera.position).length();
    const ray = new BABYLON.Ray(camera.position, direction, maxDistance);

    const intersectedMeshes = ray.intersectsMeshes(escenario.elements);

    if (intersectedMeshes.length > 0) {
      return true;
    } else {
      return false;
    }
  }

  increaseSpeed() {
    if (this.speed < this.MAX_SPEED) this.speed += this.SPEED_CHANGE;
  }

  decreaseSpeed() {
    if (this.speed > this.MIN_SPEED) this.speed -= this.SPEED_CHANGE;
  }

  jump() {
    if (!this.isJumping) {
      // Evitar que el personaje salte mientras ya está en el aire
      this.isJumping = true;

      var jumpImpulse = new CANNON.Vec3(0, 25, 0); // Ajusta este valor según sea necesario
      this.mesh.physicsImpostor.physicsBody.applyImpulse(
        jumpImpulse,
        this.mesh.physicsImpostor.physicsBody.position
      );

      // Restablecer el estado del salto después de un tiempo (ajusta según la duración del salto)
      setTimeout(() => {
        this.isJumping = false;
      }, 500); // Restablecer después de 1 segundo (ajusta según sea necesario)
    }
  }

  eliminarMeshes() {
    this.meshes.forEach((mesh) => {
      mesh.dispose();
    });
    this.capsule.dispose();
    this.displayName.dispose();
  }
}
