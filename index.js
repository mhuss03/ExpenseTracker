const form = document.getElementById("expense-container");
const formType = form["type"];
const formDesc = form["desc"];
const formAmount = form["amount"];

const transactionContainer = document.querySelector(".transaction-container");

const expenseData = JSON.parse(localStorage.getItem("expense")) || [];

const ch = document.querySelector(".chart");

const color = [
  "004358",
  "1f8a70",
  "bedb39",
  "ffe11a",
  "fd7400",
  "dc3522",
  "d9cb9e",
  "374140",
  "bd4932",
  "ea2e49",
  "4c1b1b",
  "2f2933",
];

/*      *** Adding Data to Local Storage ***      */
function storeData(type, desc, amount) {
  expenseData.push({ type, desc, amount });

  localStorage.setItem("expense", JSON.stringify(expenseData));
}

form.onsubmit = (e) => {
  e.preventDefault();

  type = formType.value;
  desc = formDesc.value;
  amount = formAmount.value;

  storeData(type, desc, amount);

  addTransaction(type, desc, amount);

  summaryReport();

  chart();

  formType.value = "";
  formDesc.value = "";
  formAmount.value = "";
};

/*      *** Transactions ***      */
function addTransaction(type, desc, amount) {
  const div = document.createElement("tr");
  const des = document.createElement("td");
  const expenseType = document.createElement("td");
  const expenseDesc = document.createElement("td");
  const expenseAmount = document.createElement("td");

  expenseType.innerText = type;
  expenseDesc.innerText = desc;
  expenseAmount.innerText = ` £ ${amount}`;

  des.classList.add("legend");

  div.append(des, expenseType, expenseDesc, expenseAmount);
  transactionContainer.appendChild(div);
}

expenseData.forEach((e) => {
  addTransaction(e.type, e.desc, e.amount);
});

/*      *** Summary ***      */

const summary = document.querySelector(".summary-container");
const summaryIncome = document.querySelector(".summary-income");
const summaryExpense = document.querySelector(".summary-expense");
const summarysumSave = document.querySelector(".summary-saving");

function summaryReport() {
  let income = 0;
  let expense = 0;

  expenseData.forEach((element) => {
    element.type === "Income"
      ? (income += Number(element.amount))
      : (expense += Number(element.amount));
  });

  let save = income - expense;

  summaryIncome.innerHTML = `<p style="color:#6B8EAF">£ ${income}</p><br><h4>Income</h4>`;
  summaryExpense.innerHTML = `<p style="color:#973e5d">£ ${expense}</p><br><h4>Expenses</h4>`;
  summarysumSave.innerHTML = `<p style="color:#${
    save < 0 ? "DF2E38" : "5D9C59"
  } ">£ ${save}</p><br><h4>Savings</h4>`;
}

summaryReport();

/*      *** Chart ***      */

function chart() {
  const num = expenseData
    .map((element) => Number(element.amount))
    .sort((a, b) => b - a);

  const sum = num.reduce((acc, current) => acc + current, 0);

  let str = ``;
  const type = document.querySelectorAll(".legend");
  let ratiosum = 0;

  for (let i = 0; i < num.length; i++) {
    const ratioPrev =
      i === 0 ? 0 : Math.round((num[i - 1] / sum) * 10000) / 100;
    ratiosum += ratioPrev;
    const ratioCurrent = Math.round((num[i] / sum) * 10000) / 100;
    str += `#${color[i]} ${ratiosum}% ${ratioCurrent + ratiosum}%${
      i !== num.length - 1 ? ", " : " "
    }`;
    type.forEach((element, i) => {
      element.style.backgroundColor = `#${color[i]}`;
    });
  }
  ch.style.background = `conic-gradient(${str})`;
  console.log(str);
  console.log(num);
  console.log(sum);
}

chart();
