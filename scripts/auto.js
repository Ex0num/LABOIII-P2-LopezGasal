    
    class Auto
    {    
        constructor(idRecibido,tituloRecibido,tipoRecibido,descripcionRecibida,precioRecibido,cantPuertasRecibida,cantKilometrosRecibida,cantPotenciaRecibida)
        {
            this.id = idRecibido;
            this.Titulo = tituloRecibido;
            this.Tipo = tipoRecibido;
            this.Descripcion = descripcionRecibida;
            this.Precio = parseFloat(precioRecibido);
            this.Puertas =  parseInt(cantPuertasRecibida);
            this.Kilometros = parseInt(cantKilometrosRecibida);
            this.Potencia = parseInt(cantPotenciaRecibida);
        }
    }

    export default Auto;