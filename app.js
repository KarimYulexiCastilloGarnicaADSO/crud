import letras from "./nombre.js";
import numeros from "./telefono.js";
import email from "./correo.js";
import valid from "./validar.js";
import listar from "./select.js";

async function consultar() {
    listar()
    .then(data => {
        data.forEach(r => {
            // console.log(r.nombre)
            let option = document.createElement('option')
            $slect.appendChild(option)
            option.innerText = r.nombre
        })
    })
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
const busqueda = document.querySelectorAll('#fo [required]')
// console.log(busqueda)
/**
 * Valida los campos
*/

nombre.addEventListener("keypress", (event) => {
    letras(event, nombre)
})
nombre.addEventListener("blur", (event) => {
    letras(event, nombre)
})
apellido.addEventListener("keypress", (event) => {
    letras(event, apellido)
})
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
correo.addEventListener("keypress", (event) => {
    email(event, correo)
})
correo.addEventListener("blur", (event) => {
    email(event, correo)
})
direccion.addEventListener("blur", (event) => {
    crr(event, direccion)
})

const crr =  (event, elemento) => {

    if (elemento.value === "") {
        direccion.classList.remove("correcto")
        direccion.classList.add("error")
    }else{
        if(event.key) {
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

$form.addEventListener("submit", (event) => {
    event.preventDefault();
    let validar = valid(event, '#fo [required]')
    // alert(validar)
    if (validar) {
        console.log(nombre.value);
        const datos = {
            nombre: nombre.value,
            apellido: apellido.value,
            telefono: telefono.value,
            documento: doc.value,
            correo: correo.value,
            direccion: direccion.value,
            tipo: tipo.value
        }
        // console.log(datos)
        enviar(datos)
        alert("bien")
    }
    else{
        alert("mal")
    }
})

/**s
 * Captura los inputs para colocarles los datos
 */
// const capturar = (event) =>{
//     event.preventDefault()
    
// }

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
        .then((json) => {
            nombre.value = "";
            apellido.value = "";
            telefono.value = "";
            doc.value = "";
            $slect.value = "";
            correo.value = "";
            direccion.value = "";
        });
}

// $form.addEventListener("submit" , capturar)


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
