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
const $slect = document.querySelector('form > select')

const nombre = document.querySelector('#nombre')
const apellido = document.querySelector('#apellido')
const doc = document.querySelector('#documento')
const correo = document.querySelector('#correo')

function validar() {
    nombre.setAttribute("onkeypress", "return ((event.charCode >= 65 && event.charCode <= 90) || (event.charCode >= 97 && event.charCode <= 122))")
    apellido.setAttribute("onkeypress", "return ((event.charCode >= 65 && event.charCode <= 90) || (event.charCode >= 97 && event.charCode <= 122))")
    doc.setAttribute("onkeypress", "return ((event.charCode >= 48 && event.charCode <= 57 && this.value.length < 10))")
    correo.setAttribute("onkeypress", "return ((event.charCode >= 65 && event.charCode <= 90) || (event.charCode >= 97 && event.charCode <= 122) || (event.charCode >= 48 && event.charCode <= 57) || (event.charCode == 64 || event.charCode == 46))")

}
nombre.addEventListener('keydown',validar)
apellido.addEventListener('keydown', validar)
doc.addEventListener('keydown', validar)
