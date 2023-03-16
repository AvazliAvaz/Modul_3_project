// index.html elements
const btn = document.getElementById("sumbit-btn");
const fromInput = document.getElementById("from-input-number");
const toInput = document.getElementById("to-input-number");
const pFrom = document.querySelector(".from-exchange");
const pTo = document.querySelector(".to-exchange");
let liFrom = document.querySelectorAll(".from-list li");
let liTo = document.querySelectorAll(".to-list li");
let url = `https://api.exchangerate.host/latest?base=`;
let dataTypeFrom = "RUB";
let dataTypeTo = "USD";
let isclick = false;

// Function that selects the currency to be converted
function currencyChooseFrom(currency) {
  for (let li of liFrom) {
    if (li.classList.contains("choose")) li.classList.remove("choose");
  }
  currency.classList.add("choose");
  dataTypeFrom = currency.getAttribute("data-currency-type");
  fromInputConvert();
  console.log(toInput.value + "to");
}
//Function that selects the currency to be converted
function currencyChooseTo(currency) {
  for (let li of liTo) {
    if (li.classList.contains("choose")) li.classList.remove("choose");
  }
  currency.classList.add("choose");
  dataTypeTo = currency.getAttribute("data-currency-type");

  fromInputConvert();
}

//The function that converts the entered value in the input, working on an event
fromInput.addEventListener("input", fromInputConvert);

//Function that converts the entered value
function fromInputConvert() {
  fetch(`${url}${dataTypeFrom}&symbols=${dataTypeTo}`)
    .then((res) => res.json())
    .then((data) => {
      toInput.value = (fromInput.value * Object.values(data.rates)[0]).toFixed(4);
      pFrom.innerHTML = `1 ${dataTypeFrom} = ${Object.values(
        data.rates
      )[0].toFixed(4)} ${dataTypeTo}`;
      pTo.innerHTML = `1 ${dataTypeTo} =${(1 / Object.values(data.rates)[0]).toFixed(4)} ${dataTypeFrom}`;
      if (fromInput.value === "") toInput.value = "";     
    });
}
toInput.addEventListener("input", toInputConvert);
//Function that converts the entered value
function toInputConvert() {
  if (fromInput.value === "") {
    toInput.value = "";
  }
  fetch(`${url}${dataTypeTo}&symbols=${dataTypeFrom}`)
    .then((res) => res.json())
    .then((data) => {
      fromInput.value = (toInput.value * Object.values(data.rates)[0]).toFixed(
        4
      );
    });
}