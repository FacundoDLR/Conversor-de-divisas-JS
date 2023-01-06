const dropList = document.querySelectorAll("form select");
const fromCurr = document.querySelector("#fromBtn");
const toCurr = document.querySelector("#toBtn");
const getBtn = document.querySelector("#convertBtn");

for(let i=0; i<dropList.length; i++){
    for(let currencyCode in countryList){
        // Seleccion de mondeas por default
        let selected = i == 0 
        ? currencyCode == "ARS" 
        ? "selected"
        : ""
        :currencyCode == "USD" 
        ? "selected"
        : "";

        // Creacion opciones con codigo de moneda como texto y valor
        let optionTag = `<option value="${currencyCode}" ${selected}>${currencyCode}</option>`

        // Instertamos las opciones dentro de la etiqueta seleccion
        dropList[i].insertAdjacentHTML("beforeend", optionTag);
    }
    dropList[i].addEventListener("change", e => {
        loadFlag(e.target);
    });
}

function loadFlag (element) {
    for(let code in countryList){
        if(code == element.value){
            let imgTag = element.parentElement.querySelector("img");
            // Pasando el codigo de moneda/pais seleccionado en atributo src a la etiqueta img
            imgTag.src = `https://flagcdn.com/48x36/${countryList[code].toLowerCase()}.png`
        }
    }
}