
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
            //Simulacion de carga de tabla con el loader
            setTimeout(() => 
            {
                console.log("geetin here boi");

                const divSpinner = document.getElementById("divSpinner");
                divSpinner.setAttribute("hidden", true);

                const footer = document.getElementById("footer");
                footer.removeAttribute("Hidden");

                console.log(divSpinner);

                let dataObtenida = JSON.parse(xhr.responseText);

                dataObtenida.forEach(element => 
                {  
                    AgregarAnuncio(element);
                });

            },3000);

            const divPrincipal = document.getElementById("container");
            divPrincipal.removeAttribute("hidden");
            //----------------------------------------------------------------
        }
    }
});

xhr.open("GET", url, true);
console.log('OBTENIENDO DATA-SV');
xhr.setRequestHeader('Content-type','application/json;charset=utf8');
xhr.send();

function AgregarAnuncio(anuncio)
{
    //Consigo el contenedor
    let container = document.getElementById("container");

    //Creo un contenedor de la card.
    let card = document.createElement("div");
    card.classList.add("card");

    //Creo el titulo
    var card_title = document.createElement("h3");
    card_title.classList.add("card-item");
    card_title.classList.add("card-title");
    card_title.appendChild(document.createTextNode(" '"+ anuncio.Titulo + "'"));
    
    //Creo la descripcion
    var card_desc = document.createElement("p");
    card_desc.classList.add("card-item");
    card_desc.classList.add("card-descript");
    card_desc.appendChild(document.createTextNode(anuncio.Descripcion));
    
    //Creo el precio
    var card_precio = document.createElement("p");
    card_precio.classList.add("card-item");
    card_precio.classList.add("card-price");
    card_precio.appendChild(document.createTextNode("Valor: $" + anuncio.Precio));

    //Creo el contenedor de iconos/imagenes
    var card_images = document.createElement("div");
    card_images.classList.add("icon-container");
    
    var icon_puertas = document.createElement("img");
    icon_puertas.classList.add("icon");
    //icon_puertas.setAttribute('src', '.././imgs/puerta-del-auto.png');
    var text_puertas = document.createElement("p");
    text_puertas.classList.add("icon_text");
    text_puertas.appendChild(document.createTextNode("Puertas: " + anuncio.Puertas));
    
    var icon_kms = document.createElement("img");
    icon_kms.classList.add("icon");
    //icon_kms.setAttribute('src', '.././imgs/velocidad-de-descarga.png');
    var text_kms = document.createElement("p");
    text_kms.classList.add("icon_text");
    text_kms.appendChild(document.createTextNode("Km: " + anuncio.Kilometros));
    
    var icon_potencia = document.createElement("img");
    icon_potencia.classList.add("icon");
    //icon_potencia.setAttribute('src', '.././imgs/potenciar.png');
    var text_potencia = document.createElement("p");
    text_potencia.classList.add("icon_text");
    text_potencia.appendChild(document.createTextNode("Hp: " + anuncio.Potencia));

    card_images.appendChild(icon_puertas);
    card_images.appendChild(text_puertas);
    card_images.appendChild(icon_kms);
    card_images.appendChild(text_kms);
    card_images.appendChild(icon_potencia);
    card_images.appendChild(text_potencia);

    var card_btn = document.createElement("button");
    card_btn.classList.add("card-item");
    card_btn.classList.add("ver-vehiculo-btn");
    var text_btn = document.createElement("p").appendChild(document.createTextNode("Ver Anuncio"));
    card_btn.classList.add("btn-font");
    card_btn.appendChild(text_btn);

    card.appendChild(card_title);
    card.appendChild(card_desc);
    card.appendChild(card_precio);
    card.appendChild(card_images);
    card.appendChild(card_btn);

    container.appendChild(card);

    return container;
}
