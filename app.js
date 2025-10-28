const clrMsg = document.getElementById("clear");
const mortAmount = document.getElementById("mortAmount");
const mortTerms = document.getElementById("mortTerms");
const mortRate = document.getElementById("mortRate");
const btn = document.getElementById("btn");
const resultSection = document.getElementById("resultSection");
const showHere = document.getElementById("showHere");
const dangerAlert = document.querySelectorAll(".danger");
const model = document.querySelector(".model-container");
console.log(dangerAlert);

clrMsg.addEventListener("click", (e) => {
  e.preventDefault();
  mortAmount.value = "";
  mortTerms.value = "";
  mortRate.value = "";
});
btn.addEventListener("click", (e) => {
  e.preventDefault();
  resultSection.classList.remove("hide");
  showHere.classList.add("hide");

  const mtAmtValue = mortAmount.value.trim();
  const mtTermsValue = mortTerms.value.trim();
  const mtRateValue = mortRate.value.trim();

  if (
    Number(mtAmtValue) <= 0 ||
    Number(mtTermsValue) <= 0 ||
    Number(mtRateValue) <= 0
  ) {
    resultSection.classList.add("hide");
    showHere.classList.remove("hide");

    dangerAlert.forEach((danger) => {
      danger.classList.add("red-bg");
    });
    model.textContent = "Please enter valid positive numbers.";
    model.classList.add("active");
    setTimeout(() => {
      model.classList.remove("active");
    }, 3000);
    setTimeout(() => {
      dangerAlert.forEach((danger) => {
        danger.classList.remove("red-bg");
      });
    }, 4000);
    return;
  }

});
