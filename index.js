const form = document.getElementById("expense-container");
const formType = form["type"];
const formDesc = form["desc"];
const formAmount = form["amount"];

const transactionContainer = document.querySelector(".transaction-container");

const expenseData = JSON.parse(localStorage.getItem("expense")) || [];

const ch = document.querySelector(".chart");

/*      *** Adding Data to Local Storage ***      */

function storeData(type, desc, amount) {
  expenseData.push({ type, desc, amount });

  localStorage.setItem("expense", JSON.stringify(expenseData));
}

/*      *** Transactions ***      */

function addTransaction(type, desc, amount) {
  const div = document.createElement("div");
  const expenseType = document.createElement("h2");
  const expenseDesc = document.createElement("h2");
  const expenseAmount = document.createElement("h2");

  expenseType.innerText = type;
  expenseDesc.innerText = desc;
  expenseAmount.innerText = amount;

  div.append(expenseType, expenseDesc, amount);
  transactionContainer.appendChild(div);
}

expenseData.forEach((e) => {
  addTransaction(e.type, e.desc, e.amount);
});

form.onsubmit = (e) => {
  e.preventDefault();

  type = formType.value;
  desc = formDesc.value;
  amount = formAmount.value;

  storeData(type, desc, amount);

  addTransaction(type, desc, amount);

  summaryReport();

  formDesc.innerText = "";
  formAmount.innerText = "";
};

/*      *** Summary ***      */

const summary = document.querySelector(".summary-container");
const summaryIncome = document.querySelector(".summary-income");
const summaryExpense = document.querySelector(".summary-expense");
const summarysumSave = document.querySelector(".summary-saving");

function summaryReport() {
  let income = 0;
  let expense = 0;

  expenseData.forEach((element) => {
    element.type === "income"
      ? (income += Number(element.amount))
      : (expense += Number(element.amount));
  });

  const sumIncome = document.createElement("h3");
  sumIncome.innerText = income;

  const sumExpense = document.createElement("h3");
  sumExpense.innerText = expense;

  let save = income - expense;
  const sumSave = document.createElement("h3");
  sumSave.innerText = save;

  summary.append(sumIncome, sumExpense, sumSave);
}

summaryReport();

/*      *** Chart ***      */

// create a string that has a color, begin ratio end ratio

const color = ["ff8811ff", "2b4162ff", "d11149ff", "ff84e8ff", "48bf84ff"];

// background: conic-gradient(
//   red 0% 10%
//   blue 10 50
//   green 50 100
// )

function chart() {
  let num = [];
  expenseData.forEach((element) => {
    num.push(Number(element.amount));
  });
  num.sort(function (a, b) {
    return a - b;
  });

  let str = ``;
  let sum = num.reduce((p, c) => {
    return p + c;
  }, 0);

  for (let i = 0; i < num.length; i++) {
    if (i !== 0) {
      let ratioPrev = Math.round((num[i - 1] / sum) * 10000) / 100;
      let ratioCurrent = Math.round((num[i] / sum) * 10000) / 100 + ratioPrev;

      i != num.length - 1
        ? (str += `#${color[i]} ${ratioPrev}% ${ratioCurrent}%, `)
        : (str += `#${color[i]} ${ratioPrev}% ${ratioCurrent}%`);
    } else {
      let ratioCurrent = Math.round((num[i] / sum) * 10000) / 100;
      str += `#${color[i]} 0% ${ratioCurrent}%, `;
    }
  }
  ch.style.background = `conic-gradient(${str})`;

  console.log(str);
  console.log(num);
}

chart();
