
// ------------------ URL SV ----------------
const url = "http://localhost:3000/anuncios";
// ------------------------------------------

const xhr = new XMLHttpRequest();

xhr.addEventListener("readystatechange", () =>
{
    if (xhr.readyState == 4) 
    {
        if (xhr.status >= 200 && xhr.status < 300) 
        {
            let dataObtenida = JSON.parse(xhr.responseText);

            console.log("Imprimiendo objetos:")
            console.log(dataObtenida);

            //Simulacion de carga de tabla con el loader
            setTimeout(() => 
            {
                const divSpinner = document.getElementById("divSpinner");
                divSpinner.setAttribute("Hidden", true);

                const divPrincipal = document.getElementById("table-containerAnuncios");
                divPrincipal.removeAttribute("Hidden");

                const footer = document.getElementById("footer");
                footer.removeAttribute("Hidden");
            },5000);

            dataObtenida.forEach(element => 
            {  
                //Creo una tabla por cada elemento del localstorage
                const tablaCreada = document.createElement("table");
                tablaCreada.setAttribute("class","anuncioDisponible");

                ///-----------------------CABECERA DEL ANUNCIO--------------------
                //Le agrego la cabecera
                const cabeceraCreada = document.createElement("thead");
                cabeceraCreada.setAttribute("class","cabeceraAnuncioDisponible");
                
                //Creo el nodo de texto con todos los distintos datos.
                const textNodeTituloValue =  document.createTextNode(element["Titulo"]);

                //Creo el elemento html "tr" (fila de tabla)
                const filaCabeceraTabla = document.createElement("tr");
                filaCabeceraTabla.setAttribute("class","filaAnuncioDisponible");
                filaCabeceraTabla.appendChild(textNodeTituloValue);

                ///-----------------------CUERPO DEL ANUNCIO--------------------
                const textNodeTipoValue =  document.createTextNode("Tipo: "+element["Tipo"]);
                const textNodePrecioValue =  document.createTextNode("Precio: "+element["Precio"]);
                const textNodeDescripcionValue =  document.createTextNode("Descripcion: "+element["Descripcion"]);
                const textNodePuertasValue =  document.createTextNode("Puertas: "+element["Puertas"]);
                const textNodeKilometrosValue =  document.createTextNode("Km: "+element["Kilometros"]);
                const textNodePotenciaValue =  document.createTextNode("Hp: "+element["Potencia"]);

                //Creo el elemento html "tr" (fila de tabla)
                const filaCuerpoTabla = document.createElement("tr");
                filaCuerpoTabla.setAttribute("class","filaAnuncioDisponible");

                const celda1CuerpoTabla = document.createElement("td");
                const celda2CuerpoTabla = document.createElement("td");
                const celda3CuerpoTabla = document.createElement("td");
                const celda4CuerpoTabla = document.createElement("td");
                const celda5CuerpoTabla = document.createElement("td");
                const celda6CuerpoTabla = document.createElement("td");

                celda1CuerpoTabla.appendChild(textNodeTipoValue);
                celda2CuerpoTabla.appendChild(textNodePrecioValue);
                celda3CuerpoTabla.appendChild(textNodeDescripcionValue);
                celda4CuerpoTabla.appendChild(textNodePuertasValue);
                celda5CuerpoTabla.appendChild(textNodeKilometrosValue);
                celda6CuerpoTabla.appendChild(textNodePotenciaValue);

                filaCuerpoTabla.appendChild(celda1CuerpoTabla);
                filaCuerpoTabla.appendChild(celda2CuerpoTabla);
                filaCuerpoTabla.appendChild(celda3CuerpoTabla);
                filaCuerpoTabla.appendChild(celda4CuerpoTabla);
                filaCuerpoTabla.appendChild(celda5CuerpoTabla);
                filaCuerpoTabla.appendChild(celda6CuerpoTabla);

                //A la tabla le agrego la fila
                tablaCreada.appendChild(filaCabeceraTabla);
                tablaCreada.appendChild(filaCuerpoTabla);
                ///----------------------------------------------------------------------

                //Finalmente se lo agrego al objeto contenedor
                const parrafoContenedor = document.getElementById("table-containerAnuncios");
                tablaCreada.setAttribute("id","tablaAnuncios");
                parrafoContenedor.appendChild(tablaCreada);

            }); 
        }
    }
});
    
xhr.open("GET", url, true);
console.log('OBTENIENDO DATA-SV');
xhr.setRequestHeader('Content-type','application/json;charset=utf8');
xhr.send(); 
