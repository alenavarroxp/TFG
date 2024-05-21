# Trabajo de Fin de Grado - Alejandro Navarro de la Cruz 
## Desarrollo de un Entorno Gráfico Interactivo aplicado a la Educación

Este repositorio contiene el código fuente y los recursos asociados con un entorno gráfico interactivo desarrollado con Babylon.js. El objetivo principal de este proyecto es proporcionar una herramienta educativa dónde profesores y estudiantes puedan crear y realizar actividades en este mundo virtual.

### Contexto del sistema
El sistema se enmarca en el contexto educativo de los alumnos de infantil y primaria del Colegio Rural Agrupado Sierra de Alcaraz, con el objetivo de enriquecer visualmente el [entorno actual de TecnoCRA](https://tecnocra.i3a.uclm.es/intecra/electron#)
 se pretende crear un prototipo de un entorno gráfico en 3D interactivo.

### Tecnologías Utilizadas
Para el desarrollo de este proyecto, se han utilizado una variedad de tecnologías que permiten construir una aplicación web robusta y eficiente. A continuación se presenta una lista de las principales tecnologías utilizadas:

<div align="center">
<p align="center">
    <table style="margin: 0 auto; border-collapse: collapse;">
        <tr>
            <td style="text-align:center; padding: 20px;">
                <img src="https://raw.githubusercontent.com/github/explore/main/topics/html/html.png" alt="HTML" width="50" height="50"/>
                <p style="margin-top: 10px;">HTML</p>
                <p style="margin-top: 10px;"><a href="https://www.w3.org/html/" target="_blank"><img src="https://img.shields.io/badge/-HTML-orange" alt="HTML Badge"/></a></p>
            </td>
            <td style="text-align:center; padding: 20px;">
                <img src="https://raw.githubusercontent.com/github/explore/main/topics/css/css.png" alt="CSS" width="50" height="50"/>
                <p style="margin-top: 10px;">CSS</p>
                <p style="margin-top: 10px;"><a href="https://www.w3.org/Style/CSS/" target="_blank"><img src="https://img.shields.io/badge/-CSS-blue" alt="CSS Badge"/></a></p>
            </td>
            <td style="text-align:center; padding: 20px;">
                <img src="https://raw.githubusercontent.com/github/explore/main/topics/javascript/javascript.png" alt="JavaScript" width="50" height="50"/>
                <p style="margin-top: 10px;">JavaScript</p>
                <p style="margin-top: 10px;"><a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank"><img src="https://img.shields.io/badge/-JavaScript-yellow" alt="JavaScript Badge"/></a></p>
            </td>
            <td style="text-align:center; padding: 20px;">
                <img src="https://raw.githubusercontent.com/github/explore/main/topics/socket-io/socket-io.png" alt="Socket.io" width="50" height="50"/>
                <p style="margin-top: 10px;">Socket.io</p>
                <p style="margin-top: 10px;"><a href="https://socket.io/" target="_blank"><img src="https://img.shields.io/badge/-Socket.io-lightgrey" alt="Socket.io Badge"/></a></p>
            </td>
            <td style="text-align:center; padding: 20px;">
                <img src="https://raw.githubusercontent.com/github/explore/main/topics/react/react.png" alt="React" width="50" height="50"/>
                <p style="margin-top: 10px;">React</p>
                <p style="margin-top: 10px;"><a href="https://reactjs.org/" target="_blank"><img src="https://img.shields.io/badge/-React-blue" alt="React Badge"/></a></p>
            </td>
        </tr>
        <tr>
            <td style="text-align:center; padding: 20px;">
                <img src="https://avatars.githubusercontent.com/u/4855800?s=200&v=4" alt="BabylonJS" width="50" height="50"/>
                <p style="margin-top: 10px;">BabylonJS</p>
                <p style="margin-top: 10px;"><a href="https://www.babylonjs.com/" target="_blank"><img src="https://img.shields.io/badge/-BabylonJS-blueviolet" alt="BabylonJS Badge"/></a></p>
            </td>
            <td style="text-align:center; padding: 20px;">
                <img src="https://raw.githubusercontent.com/github/explore/main/topics/nodejs/nodejs.png" alt="NodeJS" width="50" height="50"/>
                <p style="margin-top: 10px;">NodeJS</p>
                <p style="margin-top: 10px;"><a href="https://nodejs.org/" target="_blank"><img src="https://img.shields.io/badge/-NodeJS-green" alt="NodeJS Badge"/></a></p>
            </td>
            <td style="text-align:center; padding: 20px;">
                <img src="https://raw.githubusercontent.com/github/explore/main/topics/express/express.png" alt="ExpressJS" width="50" height="50"/>
                <p style="margin-top: 10px;">ExpressJS</p>
                <p style="margin-top: 10px;"><a href="https://expressjs.com/" target="_blank"><img src="https://img.shields.io/badge/-ExpressJS-lightgrey" alt="ExpressJS Badge"/></a></p>
            </td>
            <td style="text-align:center; padding: 20px;">
                <img src="https://raw.githubusercontent.com/github/explore/main/topics/mongoose/mongoose.png" alt="MongooseJS" width="50" height="50"/>
                <p style="margin-top: 10px;">MongooseJS</p>
                <p style="margin-top: 10px;"><a href="https://mongoosejs.com/" target="_blank"><img src="https://img.shields.io/badge/-MongooseJS-success" alt="MongooseJS Badge"/></a></p>
            </td>
            <td style="text-align:center; padding: 20px;">
                <img src="https://raw.githubusercontent.com/github/explore/main/topics/mongodb/mongodb.png" alt="MongoDB" width="50" height="50"/>
                <p style="margin-top: 10px;">MongoDB</p>
                <p style="margin-top: 10px;"><a href="https://www.mongodb.com/" target="_blank"><img src="https://img.shields.io/badge/-MongoDB-green" alt="MongoDB Badge"/></a></p>
            </td>
        </tr>
    </table>
</p>
</div>

## Capturas de pantalla

![Home](public/readme/home.png)
![Mundo](public/readme/mundo.png)
![Actividad](public/readme/actividad.png)
![Personalizar](public/readme/personalizar.png)

## Funcionalidades del sistema
A continuación se presentan algunas de las principales funcionalidades del sistema:

1. 👨‍🏫 Gestión de roles (Profesor / Estudiante).
2. 🌐 Exploración del mundo virtual interactivo.
3. 💥 Colisión con los elementos del entorno 3D.
4. 🎮 Movimiento virtual con teclado y joystick.
5. 📷 Control del movimiento de la cámara.
6. 🛠️ Creación y modificación de actividades en el mundo virtual.
7. ✏️ Realización de las actividades en el mundo virtual.
8. 🎨 Personalización de la apariencia del avatar en el mundo virtual.
9. 📫 Comunicación privada entre usuarios.

## Instalación [![npm version](https://img.shields.io/npm/v/npm.svg)](https://www.npmjs.com/package/npm) 


Para utilizar este proyecto, sigue los siguientes pasos:

1. **Clona el repositorio en tu máquina local:**
    ```
    git clone https://github.com/username/repo.git
    ```

2. **Instala las dependencias del proyecto:**
    ```
    npm install
    ```
    
3. **Inicia el servidor de desarrollo:**
    ```
    npm run devS 
    ```

4. **Ejecuta el servidor de desarrollo de Vite en otra terminal:**
    ```
    npm run devC  
    ```

5. **Abre tu navegador y accede a** `http://localhost:5172` **para ver la aplicación en funcionamiento.**

# 

<p align="center">
  <img src="/public/readme/logo.png" alt="Logo" width="250" height="250"/>
</p>
