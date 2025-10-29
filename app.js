const clrMsg = document.getElementById("clear");
const amount = document.getElementById("amount");
const term = document.getElementById("term");
const rate = document.getElementById("rate");
const btn = document.getElementById("btn");
const showHere = document.getElementById("showHere");
const model = document.querySelector(".model-container");
const resultSection = document.getElementById("resultSection");
const dangerAlert = document.querySelectorAll(".danger");

const result = document.getElementById("result");
const total = document.getElementById("total");

clrMsg.addEventListener("click", (e) => {
  e.preventDefault();
  amount.value = "";
  term.value = "";
  rate.value = "";
});

const formatter = new Intl.NumberFormat("en-NG", {
  style: "currency",
  currency: "GBP",
  minimumFractionDigits: 2,
});

btn.addEventListener("click", (e) => {
  e.preventDefault();
  resultSection.classList.remove("hide");
  showHere.classList.add("hide");

  const type = document.querySelector('input[type="radio"]:checked').value;
  const amountValue = parseFloat(amount.value.trim());
  const termValue = parseFloat(term.value.trim());
  const rateValue = parseFloat(rate.value.trim()) / 100;

  if (
    isNaN(amountValue) ||
    isNaN(termValue) ||
    isNaN(rateValue) ||
    amountValue <= 0 ||
    termValue <= 0 ||
    rateValue < 0
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

  const months = termValue * 12;
  let monthlyPayment = 0;
  let totalRepayment = 0;

  if (type === "Repayment") {
    const monthlyRate = rateValue / 12;

    if (monthlyRate === 0) {
      monthlyPayment = amountValue / months;

      totalRepayment = amountValue;
    } else {
      monthlyPayment =
        (amountValue * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -months));
      totalRepayment = monthlyPayment * months;
    }
  } else if (type === "Interest only") {
    monthlyPayment = amountValue * (rateValue / 12);
    totalRepayment = monthlyPayment * months;
  }

  const formattedMonthly = formatter.format(monthlyPayment);
  const formattedTotal = formatter.format(totalRepayment);

  result.textContent = formattedMonthly;
  total.textContent = formattedTotal;
});
