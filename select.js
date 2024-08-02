const listar = async () =>{
    const datos = await fetch("http://127.0.0.1:3000/docs");
    const respuesta = await datos.json();
    return respuesta;
}


export default listar