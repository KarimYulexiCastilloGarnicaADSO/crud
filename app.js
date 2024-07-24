import letras from "./nombre.js";
// import letras2 from "./apellido.js";
import numeros from "./telefono.js";
// import numeros2 from "./documento.js";
import email from "./correo.js";

async function consultar() {
    const data = await fetch("http://127.0.0.1:3000/docs")
    const tpos = await data.json()

    tpos.forEach(element => {
        let option = document.createElement('option')
        $slect.appendChild(option)
        option.innerText = element.nombre
    });
}
consultar()

/**
 * Busca por id en el HTML
 */
const $slect = document.querySelector('form > select')
const $form = document.querySelector(".formulario");
const id = document.querySelector('#id')
const nombre = document.querySelector('#nombre')
const apellido = document.querySelector('#apellido')
const doc = document.querySelector('#documento')
const correo = document.querySelector('#correo')
const direccion = document.querySelector('#direccion')
const tipo = document.querySelector('#tipo')
const telefono = document.querySelector('#telefono')

/**
 * Valida los campos
*/

// nombre.addEventListener("keypress", (event) => {
//     letras(event, nombre)
// })
nombre.addEventListener("blur", (event) => {
    letras(event, nombre)
})
// apellido.addEventListener("keypress", (event) => {
//     letras(event, apellido)
// })
apellido.addEventListener("blur", (event) => {
    letras(event, apellido)
})
telefono.addEventListener("keypress", (event) => {
    numeros(event, telefono)
})
telefono.addEventListener("blur", (event) => {
    numeros(event, telefono)
})
doc.addEventListener("keypress", (event) => {
    numeros(event,doc)
})
doc.addEventListener("blur", (event) => {
    numeros(event,doc)
})
// correo.addEventListener("keypress", (event) => {
//     email(event, correo)
// })
correo.addEventListener("blur", (event) => {
    email(event, correo)
})

const crr =  (event, elemento) => {

    if (elemento.value === "") {
        direccion.classList.remove("correcto")
        direccion.classList.add("error")
    }else{
        if(!regex.test(event.key)) {
            event.preventDefault()
            direccion.classList.remove("correcto")
            direccion.classList.add("error")
        }
        else{
            direccion.classList.add("correcto")
            direccion.classList.remove("error")
        }
    }
}

direccion.addEventListener("blur", (event) => {
    crr(event, direccion)
})
/**
 * Captura los inputs para colocarles los datos
 */
const capturar = (event) =>{
    event.preventDefault()
    const datos = {
        nombre: nombre.value,
        apellido: apellido.value,
        telefono: telefono.value,
        documento: doc.value,
        correo: correo.value,
        direccion: direccion.value,
        tipo: tipo.value
    }
    enviar(datos)
}

/**
 * Envia los datos 
 */
async function enviar(datos) {
    fetch('http://localhost:3000/users', {
        method: 'POST',
        body: JSON.stringify(datos),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
        .then((response) => response.json())
        .then((json) => console.log(json));
}

$form.addEventListener("submit" , capturar)


/**
 * Lista los usuarios
 */
// Función para obtener y listar los datos
async function obtener() {
    try {
        const response = await fetch('http://localhost:3000/users');
        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }
        const datos = await response.json();

        // Obtener el elemento tbody donde se mostrarán los usuarios
        const $tbody = document.querySelector('#table_usuarios tbody');

        // Limpiar cualquier contenido previo en el tbody
        $tbody.innerHTML = '';

        // Iterar sobre cada usuario y crear elementos tr y td
        datos.forEach(usuario => {
            const $tr = document.createElement('tr');
            $tr.innerHTML = `
                <td>${usuario.id}</td>
                <td>${usuario.nombre}</td>
                <td>${usuario.apellido}</td>
                <td>${usuario.documento}</td>
                <td>${usuario.tipo}</td>
                <td>${usuario.correo}</td>
                <td>${usuario.direccion}</td>
                <td><button class="boton_eliminar">Eliminar</button></td>
            `;

            // Añadir un event listener al botón de eliminar
            $tr.querySelector('.boton_eliminar').addEventListener('click', () => {
                eliminarUsuario(usuario.id, $tr);
            });

            $tbody.appendChild($tr);
        });
    } catch (error) {
        console.log('Error al obtener los datos', error);
    }
}

// Función para eliminar un usuario
async function eliminarUsuario(id, fila) {
    try {
        const response = await fetch(`http://localhost:3000/users/${id}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            // Eliminar la fila del DOM si la solicitud fue exitosa
            fila.remove();
            console.log(`Usuario con id ${id} eliminado exitosamente.`);
        } else {
            console.error("Error al eliminar usuario");
        }
    } catch (error) {
        console.error("Error al eliminar el usuario", error);
    }
}

document.addEventListener('DOMContentLoaded', obtener);
