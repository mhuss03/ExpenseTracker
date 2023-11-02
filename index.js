const form = document.getElementById("expense-container");
const formType = form["type"];
const formDesc = form["desc"];
const formAmount = form["amount"];

const transactionContainer = document.querySelector(".transaction-container");

const expenseData = JSON.parse(localStorage.getItem("expense")) || [];

const ch = document.querySelector(".chart");

const color = ["d11149ff", "2b4162ff", "ff8811ff", "ff84e8ff", "48bf84ff"];

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
  const expenseType = document.createElement("td");
  const expenseDesc = document.createElement("td");
  const expenseAmount = document.createElement("td");

  expenseType.innerText = type;
  expenseDesc.innerText = desc;
  expenseAmount.innerText = ` £ ${amount}`;

  div.append(expenseType, expenseDesc, expenseAmount);
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

  summaryIncome.innerHTML = `<p style="color:#2d68d3">£ ${income}</p><br><h4>Income</h4>`;
  summaryExpense.innerHTML = `<p style="color:#ad1119 ">£ ${expense}</p><br><h4>Expenses</h4>`;
  summarysumSave.innerHTML = `<p style="color:#${
    save < 0 ? "DF2E38" : "5D9C59"
  } ">£ ${save}</p><br><h4>Savings</h4>`;
}

summaryReport();

/*      *** Chart ***      */

function chart() {
  const num = expenseData
    .map((element) => Number(element.amount))
    .sort((a, b) => a - b);

  const sum = num.reduce((acc, current) => acc + current, 0);

  let str = ``;

  for (let i = 0; i < num.length; i++) {
    const ratioPrev =
      i === 0 ? 0 : Math.round((num[i - 1] / sum) * 10000) / 100;
    const ratioCurrent = Math.round((num[i] / sum) * 10000) / 100 + ratioPrev;
    str += `#${color[i]} ${ratioPrev}% ${ratioCurrent}%${
      i !== num.length - 1 ? ", " : " "
    }`;
  }
  ch.style.background = `conic-gradient(${str})`;
  console.log(str);
  console.log(num);
}

chart();
