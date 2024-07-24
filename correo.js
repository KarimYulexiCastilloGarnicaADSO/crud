const email = (event,elemento) => {

    let regex = /^[\w-._]+@[\w.-_]+(\.[a-zA-Z]{2,4}){1,2}$/

    if (elemento.value === "") {
        elemento.classList.remove("correcto")
        elemento.classList.add("error")
    }else{
        if (regex.test(elemento.value)) {
            event.preventDefault()
            elemento.classList.add("correcto")
            elemento.classList.remove("error")
        }
        else{
            elemento.classList.add("error")
            elemento.classList.remove("correcto")
        }
    }
}

export default email