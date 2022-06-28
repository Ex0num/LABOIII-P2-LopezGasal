

//Funcion de creacion total de la tabla
function crearTabla(array)
{
    console.log("Creando tabla...");

    //Si el array recibido tiene minimamente un elemento, sigo
    if (array.length > 0)
    {
        //Creo el elemento tabla
        const tablaCreada = document.createElement("table");
    
        //Le agrego la cabecera
        tablaCreada.appendChild(crearCabecera(array[0]));

        //Le agrego el cuerpo
        tablaCreada.appendChild(crearCuerpo(array));

        tablaCreada.setAttribute("id","tabla-creada");

        //Retorno finalmente la tabla ya trabajada
        return tablaCreada;
    }
    else
    {
        return document.createElement("table");
    }
}

//Funcion de creacion de la cabecera de la tabla
function crearCabecera(elemento)
{
    //Me fijo si mi elemento para crear la cabecera no es nulo
    if (elemento != null)
    {
        //Creo el elemento html "thead" (Cabecera de tabla)
        const cabeceraTabla = document.createElement("thead"),

        //Creo el elemento html "tr" (fila de tabla)
        filaTabla = document.createElement("tr");

        //Asigna la clase "cabecera" a "filaTabla" (tr)"
        filaTabla.setAttribute("class","cabecera");

        //Recorro el "elemento" y me voy fijando cada "key"
        for (const key in elemento) 
        {
            //Si la key NO es el ID
            if(key !== "id")
            {
                console.log(key);

                //Creo la celda cabecera y el nodo de texto que le voy a posteriormente agregar como campo
                const celdaCabecera = document.createElement("th");
                const textNode = document.createTextNode(key);
                
                //Agrego el nodo de texto que representa el campo, (valor de la key)
                celdaCabecera.appendChild(textNode);

                //A la fila creada anteriormente (tr) le appendeo una celdaCabecera (th)
                filaTabla.appendChild(celdaCabecera);
            }
        }

        //No me tengo que olvidar de appendear al thead (que es la cabecera entera de la tabla), el tr que es toda la fila cabecera.
        cabeceraTabla.appendChild(filaTabla); 

        //Retorno finalmente la cabecera ya trabajada
        return cabeceraTabla;
    }
    else
    {
       return null;
    }
}

//Funcion de creacion del cuerpo de la tabla
function crearCuerpo(array)
{
    //Si el array recibido tiene minimamente un elemento, sigo
    if (array.length > 0)
    {
        //Creo el elemento html "tbody" (Cuerpo de tabla)
        const cuerpoTabla = document.createElement("tbody");

        //Recorro el array. Por cada elemento en el indice que corresponda.
        array.forEach((objeto, index) => 
        {
            //Por cada objeto creo una fila
            const filaTabla = document.createElement("tr");

            // ---- Agrego clases a las row body  ----
            //Si el indice es par le asigno la clase 'Color par' y si no, la clase 'ColorImpar'
            filaTabla.classList.add(index % 2 ? "colorImpar" : "colorPar");

            // ---- Agregar datos a la row ----
            //Analizo cada llave de cada objeto
            for (const key in objeto) 
            {

                if(key === "id")
                {
                    //Setea a la fila el atributo 'data-id = (valor id)' del objeto.
                    filaTabla.setAttribute("data-"+key, objeto[key]);
                }
                else
                {
                    //Creo normalmente la celda perteneciente al cuerpo de la tabla  y el nodo de texto que le voy a posteriormente agregar como campo
                    const celdaCuerpo = document.createElement("td");
                    const textNodeDato = document.createTextNode(objeto[key]);

                    //Agrego el nodo de texto que representa el campo, (valor de la key)
                    celdaCuerpo.appendChild(textNodeDato);

                    //A la fila creada anteriormente (tr) le appendeo una celdaCuerpo (td)
                    filaTabla.appendChild(celdaCuerpo);
                }
            }

            //No me tengo que olvidar de appendear al cuerpo de tabla ('tbody') (que es el cuerpo entero de la tabla), el tr 
            //que es toda una fila perteneciente al cuerpo.
            cuerpoTabla.appendChild(filaTabla);
        });

        //Retorno finalmente el cuerpo ya trabajado
        return cuerpoTabla;
    }
    else
    {
        return null;
    } 
}

export default crearTabla;
