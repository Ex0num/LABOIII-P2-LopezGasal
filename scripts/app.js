// ------------------ URL SV ----------------
const url = "http://localhost:3000/anuncios";
// ------------------------------------------

//Importo la clase con la que voy a trabajar y la funcionalidad de 'crearTabla' (que ya adentro menciona a las demas funciones necesarias)
import Auto from "./auto.js";
import crearTabla from "./tablaDinamica.js";

function MostrarTabla_EliminarLoader()
{
    console.log("Eliminando loader");

    const divSpinner = document.getElementById("divSpinner");
    const labelLoader = document.getElementById("labelForm-spinner");
    const loader = document.getElementById("loader");

    divSpinner.removeChild(labelLoader);
    divSpinner.removeChild(loader);

    const divPrincipal = document.getElementById("table-container");
    divPrincipal.removeAttribute("Hidden");

    return;
}

const mostrarDatos = () => 
{
    return new Promise((resolve,reject) => 
    {
        setTimeout(() => {resolve(MostrarTabla_EliminarLoader())}, 1500)
    });
}

mostrarDatos().then(() => 
{
    actualizarTabla();
})

//-----------------------------------Captura del objeto formulario y desarrollo de su evento 'submit'----------------------
const frmAuto = document.forms[0];
frmAuto.addEventListener("submit", (e) =>
{
    const formAlta = e.target;

    console.log(e);

    // --- Cancela el evento ---
    e.preventDefault();

    // ------ Leo sus campos -----
    console.log("Imprimiendo valores leidos:");

    console.log(formAlta.Titulo.value);
    console.log(formAlta.Tipo.value);
    console.log(formAlta.Descripcion.value);
    console.log(formAlta.Precio.value);
    console.log(formAlta.Puertas.value);
    console.log(formAlta.Kilometros.value);
    console.log(formAlta.Potencia.value);

    let id = Date.now();
    let Titulo = formAlta.Titulo.value;
    let Tipo = formAlta.Tipo.value;
    let Descripcion = formAlta.Descripcion.value;
    let Precio = formAlta.Precio.value;
    let Puertas = formAlta.Puertas.value;
    let Kilometros = formAlta.Kilometros.value;
    let Potencia = formAlta.Potencia.value;

    let resultadoValidacion = validarParametros(id, Titulo, Tipo, Descripcion, parseFloat(Precio), parseInt(Puertas), parseInt(Kilometros),Potencia)

    if (resultadoValidacion == 0)
    {
        const newAnuncio = new Auto(id, Titulo, Tipo, Descripcion, parseFloat(Precio), parseInt(Puertas), parseInt(Kilometros), Potencia);
    
        const xhr = new XMLHttpRequest();
        xhr.addEventListener("readystatechange", () => 
        {
            if (xhr.readyState == 4) 
            {
                if (xhr.status >= 200 && xhr.status < 300) 
                {
                    alert("El anuncio fue subido correctamente.");     
                }
                else 
                {
                    console.error(xhr.status, xhr.statusText);
                    alert("Hubo un error en la subida del anuncio.");
                }
            }
        });

        xhr.open("POST", url, true);
        console.log('SUBIENDO DATA-SV');
        xhr.setRequestHeader('Content-type','application/json;charset=utf8');
        xhr.send(JSON.stringify(newAnuncio));
    }
    else
    {
        alert("No se pudieron validar todos los campos del formulario.");
    }
});

//----------------------------------------Captura del boton eliminar y desarrollo de su evento 'click'---------------------
const botonEliminar = document.getElementById("BtnEliminar");
botonEliminar.addEventListener("click", (e) =>
{
    console.log("TENGO ID FILA CLICKEADA : " + idFilaClickeada);

    if (!parseInt(idFilaClickeada) > 0)
    {
        alert("No se puede eliminar algo sin seleccionarlo.");
        return;
    }

    const xhr = new XMLHttpRequest();

    xhr.addEventListener("readystatechange", () => 
    {
        if (xhr.readyState == 4) 
        {
            if (xhr.status >= 200 && xhr.status < 300) 
            {
                alert("Eliminacion salio bien");     
            } 
            else 
            {
                console.error(xhr.status, xhr.statusText);
                alert("ASDDDD");
            }
        }
    });

    console.log('A borrar:' + idFilaClickeada);
    xhr.open("DELETE", url + "/" + idFilaClickeada, true);
    console.log('BORRANDO DATA-SV');
    xhr.setRequestHeader('Content-type','application/json;charset=utf8');
    xhr.send(null); 
});

//-------------------------------------Captura del boton modificar y desarrollo de su evento 'click'---------------------
const botonModificar = document.getElementById("BtnModificar");
botonModificar.addEventListener("click", (e) =>
{
    if (!parseInt(idFilaClickeada) > 0)
    {
        alert("No se puede modificar algo sin seleccionarlo.");
        return;
    }

    const xhr = new XMLHttpRequest();
    xhr.addEventListener("readystatechange", () => 
    {
        if (xhr.readyState == 4) 
        {
            if (xhr.status >= 200 && xhr.status < 300) 
            {
                let dataObtenida = JSON.parse(xhr.responseText);

                //Si encuentro el elemento que quiero eliminar (coincidente con el ID)
                if (dataObtenida.id == idFilaClickeada) 
                {
                    modificarAnuncio(dataObtenida).then(() => {alert("Anuncio modificado")}).catch(() => {alert("Error en la modificacion")});

                    //Dejo de tener en cuenta ese objeto ya modificado.
                    if (flagFilaSeleccionada == true)
                    {
                        //Despinto la ultima fila seleccionada y seteo el ultimo valor id como nulo (asi si toco modificar o eliminar tampoco
                        //tengo riesgo de modificar nada).
                        idFilaClickeada = null;
                        ultimaFilaSeleccionada.style.backgroundColor = "rgb(233, 227, 227)";
                    }
                }
                else 
                {
                    console.error(xhr.status, xhr.statusText);
                }  
            } 
            else 
            {
                console.error(xhr.status, xhr.statusText);
            }
        }
    });   
    
    xhr.open("GET", url + "/" + idFilaClickeada, true);
    console.log('OBTENIENDO DATA-SV');
    xhr.setRequestHeader('Content-type','application/json;charset=utf8');
    xhr.send(); 
});

function modificarAnuncio(anuncioRecibido) 
{
    return new Promise((resolve, reject) => 
    {
        //Lo modifico del array pisando todos los valores de sus campos con los cargados en los controles
        let TituloAux = document.getElementById("txtBoxTitulo").value;
        let PrecioAux = document.getElementById("txtBoxPrecio").value;
        let DescripcionAux = document.getElementById("txtAreaDescripcion").value;
        let PuertasAux = document.getElementById("txtBoxPuertas").value;
        let KilometrosAux = document.getElementById("txtBoxKilometros").value;
        let PotenciaAux =  document.getElementById("txtBoxPotencia").value;

        let TipoAux;

        //Modificacion del valor que tenga el radiobutton.
        if (document.getElementById("radioBtnTipoVenta").checked == true)
        {  
            TipoAux = "Venta";
        }
        else if (document.getElementById("radioBtnTipoAlquiler").checked == true)
        {
            TipoAux = "Alquiler";
        }

        //VALIDAR DATOS INGRESADOS
        let resultadoValidacion = validarParametros(1, TituloAux, TipoAux, DescripcionAux, parseFloat(PrecioAux), parseInt(PuertasAux), parseInt(KilometrosAux), PotenciaAux)

        if (resultadoValidacion == 0)
        {
            const xhr = new XMLHttpRequest();

            xhr.addEventListener("readystatechange", () => 
            {
                if (xhr.readyState == 4) 
                {
                    if (xhr.status >= 200 && xhr.status < 300) 
                    {

                    } 
                    else 
                    {
                        console.error(xhr.status, xhr.statusText);
                    }
                } 
            });

            anuncioRecibido.Titulo = TituloAux;
            anuncioRecibido.Tipo = TipoAux;
            anuncioRecibido.Descripcion = DescripcionAux;
            anuncioRecibido.Precio = PrecioAux;
            anuncioRecibido.Puertas = PuertasAux;
            anuncioRecibido.Kilometros = KilometrosAux;
            anuncioRecibido.Potencia = PotenciaAux;

            xhr.open("PUT", url + '/' + anuncioRecibido.id, true);
            xhr.setRequestHeader('Content-type','application/json;charset=utf8');
            xhr.send(JSON.stringify(anuncioRecibido));

            resolve(true);
        }

        reject(false);
    });
}

//---------------------------Captura del boton cancelar y desarrollo de su evento 'click'--------------------------------
const botonCancelar = document.getElementById("BtnCancelar");
botonCancelar.addEventListener("click",(e) =>
{
    if(flagFilaSeleccionada == true)
    {
        //Despinto la ultima fila seleccionada y seteo el ultimo valor id como nulo (asi si toco modificar o eliminar tampoco
        //tengo riesgo de modificar nada).
        idFilaClickeada = null;
        ultimaFilaSeleccionada.style.backgroundColor = "rgb(233, 227, 227)";
    }

    setearControlesValoresDefault();
});

//--------------- Captura del contenedor de la tabla y desarrollo de su evento 'click' en una fila ----------------------
let flagFilaSeleccionada = false;
let ultimaFilaSeleccionada;
let idFilaClickeada;

const contenedorTabla = document.getElementById("table-container");
contenedorTabla.addEventListener("click", (e) => 
{
    //Me guardo la ubicacion clickeada y me fijo si es una fila y celda al mismo tiempo
    const ubicacionClickeada = e.target; 
    idFilaClickeada = e.target.parentElement.dataset.id;

    if (ubicacionClickeada.matches("tr td") == true)
    {
        console.log("El ID del Auto seleccionado: "+idFilaClickeada);
        //Me agarro el elemento padre (fila)
        const fila = ubicacionClickeada.parentElement;

        //Si no hay una fila seleccionada, la pinto sin drama.
        if (fila.matches("tr") == true && flagFilaSeleccionada == false && fila != null && fila != undefined)
        { 
            mostrarEnControlesFilaSeleccionada(idFilaClickeada);

            fila.style.backgroundColor = 'antiquewhite';
            flagFilaSeleccionada = true;
            ultimaFilaSeleccionada = fila;
        }
        else if (fila.matches("tr") == true && flagFilaSeleccionada == true && fila != null && fila != undefined) //Si hay una fila seleccionada, la desppinto y pinto la nueva.
        {
            mostrarEnControlesFilaSeleccionada(idFilaClickeada);

            ultimaFilaSeleccionada.style.backgroundColor = "rgb(233, 227, 227)";

            fila.style.backgroundColor = 'antiquewhite';
            ultimaFilaSeleccionada = fila;
            flagFilaSeleccionada = true;
        }
    }
});

function mostrarEnControlesFilaSeleccionada(idRecibido) 
{
    const xhr = new XMLHttpRequest();

    xhr.addEventListener("readystatechange", () => 
    {
        if (xhr.readyState == 4) 
        {
            if (xhr.status >= 200 && xhr.status < 300) 
            {
                let dataParseada = JSON.parse(xhr.responseText);
                
                dataParseada.forEach((element) => 
                {
                    if (element.id == idRecibido) 
                    {
                        document.getElementById("txtBoxTitulo").value = element.Titulo;
                        document.getElementById("txtAreaDescripcion").value = element.Descripcion;
                        document.getElementById("txtBoxPrecio").value = element.Precio;
                        document.getElementById("txtBoxPuertas").value = element.Puertas;
                        document.getElementById("txtBoxKilometros").value = element.Kilometros;
                        document.getElementById("txtBoxPotencia").value = element.Potencia;
                
                        //Si (en el formulario) venta esta tildado y el tipo del elemento es alquiler
                        if (frmAuto.Tipo[0].checked == true && element.Tipo == "Alquiler") 
                        {
                            //Tildo alquiler
                            frmAuto.Tipo[1].checked = true;
                        }
                        else if (frmAuto.Tipo[1].checked == true && element.Tipo == "Venta") 
                        {
                            //Tildo venta
                            frmAuto.Tipo[0].checked = true;
                        }
                    }
                });    
            } 
            else 
            {
                console.error(xhr.status, xhr.statusText);
            }
        }
    });
  
    xhr.open("GET", url, true);
    console.log('OBTENIENDO DATA-SV');
    xhr.setRequestHeader('Content-type','application/json;charset=utf8');
    xhr.send();
}

//------------------------------------------- Mostrar campos especificos de la tabla -----------------------------------

//Me traigo todas las checkboxes de la pagina
let cajasCheck = document.querySelectorAll(".checkbox-table");
const tablaCreadaDinamicamente = document.getElementById("table-container");

//A todas las checkboxes que me traje le voy a agregar el manejador
//del Click (el cual va a hiddear o no dependiendo del campo presionado)
cajasCheck.forEach(checkbox => 
{
    checkbox.addEventListener("click",(e) => 
    {
        //HUBO UN CLICK EN ALGUNO DE LOS CHECKBOXES.
        
        console.log(tablaCreadaDinamicamente);

        if(tablaCreadaDinamicamente != null)
        {
            let arrayCheckboxes = document.querySelector(".container-checkbox-campos-tabla").querySelectorAll("input");
            
            console.log(arrayCheckboxes);

            let valueRecibido;
            let estaChequeado;

            for (let i = 0; i < 7; i++) 
            {
                estaChequeado = arrayCheckboxes[i].checked;
                valueRecibido =  arrayCheckboxes[i].value;
                mostrar_esconder_columnas(valueRecibido,estaChequeado);
            }       
        }        
    });
});

//------------------------------------------- Filtrado de datos -----------------------------------

//Captura del boton filtrar
const botonFiltrar = document.getElementById("BtnFiltrar");
botonFiltrar.addEventListener("click", (e) =>
{
    const xhr = new XMLHttpRequest();

    xhr.addEventListener("readystatechange", () => 
    {
        if (xhr.readyState == 4) 
        {
            if (xhr.status >= 200 && xhr.status < 300) 
            {
                let dataParseada = JSON.parse(xhr.responseText);

                //Obtengo el valor seleccionado
                let comboBox = document.getElementById("combobox-campos-filtrador");

                let tipoSeleccionado = comboBox.value;

                let anunciosFiltrados;

                if (tipoSeleccionado != "Todos")
                {
                    //Me creo un nuevo array (filtrado) con solo el tipo seleccionado
                    anunciosFiltrados = dataParseada.filter(anuncio => anuncio.Tipo == tipoSeleccionado);
                }
                else
                {
                    anunciosFiltrados = dataParseada;
                }

                //Calculo el valor promedio
                let valorPromedioCalculado = calcularPromedio(anunciosFiltrados);

                //Muestro en el textBox el valor promedio
                let textBoxFiltraciones = document.getElementById("info-filtrada");
                textBoxFiltraciones.value = valorPromedioCalculado;
            }
            else 
            {
                console.error(xhr.status, xhr.statusText);
            }
        }
    });

    xhr.open("GET", url, true);
    console.log('OBTENIENDO DATA-SV');
    xhr.setRequestHeader('Content-type','application/json;charset=utf8');
    xhr.send();
});

function calcularPromedio(arrayRecibido)
{
    if (arrayRecibido != null)
    {
        let cantidadTotal = arrayRecibido.length;
        let acumulador = 0;

        arrayRecibido.forEach(element => 
        {
            acumulador =  parseInt(acumulador) +  parseInt(element.Precio);
        });
    
        let valorCalculado = acumulador / cantidadTotal;

        if (isNaN(valorCalculado) == true)    
        {
            valorCalculado = "No hay elementos";
        }

        return valorCalculado;
    }
}

//------------------------------------------- FUNCIONES Y VALIDACIONES -----------------------------------
function mostrar_esconder_columnas(valueRecibido, estaChequeado)
{
    //-------------------------------------- TITULO --------------------------------------------//
    //Si x checkbox del titulo esta tildado remuevo el atributo hidden, sino lo seteo. 
    
    //-------------HEADER------------//
    
    let trsHeader = tablaCreadaDinamicamente.querySelector("thead").querySelectorAll("tr");

    if (estaChequeado == true)
    {
        trsHeader[0].querySelectorAll("th")[valueRecibido].removeAttribute("Hidden");
    }
    else
    {
        trsHeader[0].querySelectorAll("th")[valueRecibido].setAttribute("Hidden", true);
    }

    //El valor 0 es el TITULO y su celda con el valor cargado
    //camposHeader[valueRecibido].removeAttribute("Hidden");
    //--------------------------------//
    
    let trs = tablaCreadaDinamicamente.querySelector("tbody").querySelectorAll("tr"); 
    
    for (let i = 0; i < trs.length; i++) 
    {  
        if (estaChequeado == true)
        {
            trs[i].querySelectorAll("td")[valueRecibido].removeAttribute("Hidden");
        }
        else
        {
            trs[i].querySelectorAll("td")[valueRecibido].setAttribute("Hidden", true);
        }
    }
}

//Funcion actualizadora de tabla.
//(Desde su contenedor final, elimina a todos los hijos (tr,td,th) y 
//escribe desde 0 con los datos obtenidos del localStorage [puede ser tambien]
//Definido para recibir los datos por param desde un array.)
function actualizarTabla()
{
    console.log("Actualizando tabla");

    const xhr = new XMLHttpRequest();

    xhr.addEventListener("readystatechange", () => 
    {
        if (xhr.readyState == 4) 
        {
            if (xhr.status >= 200 && xhr.status < 300) 
            {
                let dataParseada = JSON.parse(xhr.responseText);
                const container = document.querySelector(".table-container");

                while(container.children.length > 0) // si tiene elementos hijos, los borra
                { 
                    container.removeChild(container.firstElementChild);
                }
            
                if (dataParseada.length > 0)
                {
                    container.appendChild(crearTabla(dataParseada));
                }
            } 
            else 
            {
                console.error(xhr.status, xhr.statusText);
            }
        }
    });
  
    xhr.open("GET", url, true);
    console.log('ACTUALIZANDO DATA-SV');
    xhr.setRequestHeader('Content-type','application/json;charset=utf8');
    xhr.send(); 
}
//------------------------------------------------------------------------------------------------------------------------

//Setea los valores vacios en los controles
function setearControlesValoresDefault()
{
    //Seteo los valores default
    document.getElementById("txtBoxTitulo").value = "";
    document.getElementById("txtAreaDescripcion").value = "";
    document.getElementById("txtBoxPrecio").value = "";
    document.getElementById("txtBoxPuertas").value = "";
    document.getElementById("txtBoxKilometros").value = "";
    document.getElementById("txtBoxPotencia").value = ""; 
    frmAuto.Tipo[0].checked = true;
}

//Valida todos los campos del formulario
function validarParametros(idRecibido,tituloRecibido,tipoRecibido,descripcionRecibida,precioRecibido,cantPuertasRecibida,cantidadKilometros,cantPotenciaRecibida) 
{
    let retorno;

    if (idRecibido == null || idRecibido == undefined || 
        tituloRecibido == null || tituloRecibido == undefined || tituloRecibido.length > 32 || tituloRecibido == "" ||
        tipoRecibido == null || tipoRecibido == undefined || tipoRecibido == "" || 
        descripcionRecibida == null || descripcionRecibida == undefined || descripcionRecibida.length > 100 || descripcionRecibida == "" ||
        isNaN(precioRecibido) == true || precioRecibido.length > 18 || precioRecibido == null || precioRecibido == undefined ||
        isNaN(cantPuertasRecibida) == true || cantPuertasRecibida.length > 2 || cantPuertasRecibida == null || cantPuertasRecibida == undefined || 
        isNaN(cantidadKilometros) == true || cantidadKilometros.length > 2 || cantidadKilometros == null || cantidadKilometros == undefined || 
        cantPotenciaRecibida.length > 4 || cantPotenciaRecibida == null || cantPotenciaRecibida == undefined) 
    {
        retorno = -1;
    }
    else
    {
        retorno = 0;
    }

    return retorno;
}
