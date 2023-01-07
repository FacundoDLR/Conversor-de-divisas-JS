const dropList = document.querySelectorAll("form select");
const fromCurr = document.querySelector("#fromBtn");
const toCurr = document.querySelector("#toBtn");
const getBtn = document.querySelector("#convertBtn");

const API_KEY = process.env.SUPABASE_KEY;

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

const exchangeIcon = document.querySelector("#arrowIcon");
exchangeIcon.addEventListener("click", () => {
    
    let tempCode = fromCurr.value;
    fromCurr.value = toCurr.value;
    toCurr.value = tempCode;
    loadFlag(fromCurr); // carga de bandera input from
    loadFlag(toCurr); // carga de bandera input to
    getExchangeResult();

})

function getExchangeResult() {
    const amount = document.querySelector("#amount");
    const exchangeResultTxt = document.querySelector("#exchangeResult");
    let amountVal = amount.value;

    if(amountVal < 0) return exchangeResultTxt.innerText = "Intenta con valores mayores a 0";

    if(amountVal == "" || amountVal == 0){
        amount.value = 0;
        amountVal = 0;
    }
    exchangeResultTxt.innerText = "Obteniendo resultado...";

    let url = `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/${fromCurr.value}`;

    fetch(url)
    .then(response => response.json())
    .then(result => {
        let exchangeResult = result.conversion_rates[toCurr.value];

        let totalExResult = (amountVal * exchangeResult).toFixed(2);

        exchangeResultTxt.innerText = `${amountVal} ${fromCurr.value} = ${totalExResult} ${toCurr.value}`
    }).catch(() => {
        exchangeResultTxt.innerText = "Ocurrio un error...";
    })
};

getBtn.addEventListener("click", e => {
    e.preventDefault();
    getExchangeResult();
});

window.addEventListener("load", () => {
    loadFlag(fromCurr);
    loadFlag(toCurr)
    getExchangeResult();
})
