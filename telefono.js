const numeros = (event, elemento) => {

    let rege = /^[0-9]$/;

    if(elemento.value.length >= 10){
        event.preventDefault();
    }
    else if (!rege.test(event.key)){
        elemento.classList.add("error");
        elemento.classList.remove("correcto");
    }
    else{
        elemento.classList.add("correcto");
        elemento.classList.remove("error");
    }
}

export default numeros