const clrMsg = document.getElementById("clear");
const amount = document.getElementById("amount");
const term = document.getElementById("term");
const rate = document.getElementById("rate");
const btn = document.getElementById("btn");
const showHere = document.getElementById("showHere");
const model = document.querySelector(".model-container");
const resultSection = document.getElementById("resultSection");
const signs = document.querySelectorAll(".sign");
const inputContainers = document.querySelectorAll(".input-container");
const errMsgs = document.querySelectorAll(".err");
const result = document.getElementById("result");
const total = document.getElementById("total");

clrMsg.addEventListener("click", (e) => {
  e.preventDefault();
  amount.value = "";
  term.value = "";
  rate.value = "";
});

const formatter = new Intl.NumberFormat("en-GB", {
  style: "currency",
  currency: "GBP",
  minimumFractionDigits: 2,
});

btn.addEventListener("click", (e) => {
  e.preventDefault();
  resultSection.classList.remove("show");
  showHere.classList.add("show");

  const type = document.querySelector('input[type="radio"]:checked').value;
  const amountValue = parseFloat(amount.value.trim());
  const termValue = parseFloat(term.value.trim());
  const rateValue = parseFloat(rate.value.trim()) / 100;

  if (
    isNaN(amountValue) ||
    isNaN(termValue) ||
    isNaN(rateValue) ||
    amountValue.length == 0 ||
    termValue.length == 0 ||
    rateValue.length == 0
  ) {
    resultSection.classList.add("show");
    showHere.classList.remove("show");
    signs.forEach((sign) => {
      sign.classList.add("red-bg");
    });
    inputContainers.forEach((inputContainer) => {
      inputContainer.classList.add("red-border");
    });
    errMsgs.forEach((errMsg) => {
      errMsg.classList.add("active");
      errMsg.textContent = "This field is required";
    });
    setTimeout(() => {
      signs.forEach((sign) => {
        sign.classList.remove("red-bg");
      });
      inputContainers.forEach((inputContainer) => {
        inputContainer.classList.remove("red-border");
      });
      errMsgs.forEach((errMsg) => {
        errMsg.classList.remove("active");
        errMsg.textContent = "This field is required";
      });
    }, 4000);
    return;
  }
   else if (
      isNaN(amountValue) ||
      isNaN(termValue) ||
      isNaN(rateValue) ||
      amountValue <= 0 ||
      termValue <= 0 ||
      rateValue < 0
    ) {
      resultSection.classList.add("show");
      showHere.classList.remove("show");
      signs.forEach((sign) => {
        sign.classList.add("red-bg");
      });
      inputContainers.forEach((inputContainer) => {
        inputContainer.classList.add("red-border");
      });
      errMsgs.forEach((errMsg) => {
        errMsg.classList.add("active");
        errMsg.textContent = "Use a positive number";
      });
      setTimeout(() => {
        signs.forEach((sign) => {
          sign.classList.remove("red-bg");
        });
        inputContainers.forEach((inputContainer) => {
          inputContainer.classList.remove("red-border");
        });
        errMsgs.forEach((errMsg) => {
          errMsg.classList.remove("active");
          errMsg.textContent = "Use a positive number";
        });
      }, 4000);
      return;
    }

  const months = termValue * 12;
  let monthlyPayment = 0;
  let totalRepayment = 0;

  if (type === "repayment") {
    const monthlyRate = rateValue / 12;

    if (monthlyRate === 0) {
      monthlyPayment = amountValue / months;
      totalRepayment = amountValue;
    } else {
      monthlyPayment =
        (amountValue * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -months));
      totalRepayment = monthlyPayment * months;
    }
  } else if (type === "interest only") {
    const monthlyRate = rateValue / 12;
    if (monthlyRate === 0) {
      monthlyPayment = 0;
      totalRepayment = amountValue;
    } else {
      monthlyPayment = amountValue * (rateValue / 12);
      totalRepayment = amountValue + monthlyPayment * months;
    }
  }

  const formattedMonthly = formatter.format(monthlyPayment);
  const formattedTotal = formatter.format(totalRepayment);

  result.textContent = formattedMonthly;
  total.textContent = formattedTotal;
});
