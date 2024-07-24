const letras =  (event, elemento) => {

    let regex = /^[A-Za-zAà-ÿ\s]+$/

    if (elemento.value === "") {
        elemento.classList.remove("correcto")
        elemento.classList.add("error")
    }else{
        if (!regex.test(event.key)) {
            event.preventDefault()
            elemento.classList.remove("correcto")
            elemento.classList.add("error")
        }
        else{
            elemento.classList.add("correcto")
            elemento.classList.remove("error")
        }
    }
}

export default  letras
