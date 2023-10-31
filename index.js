const form = document.getElementById("expense-container");
const amount = form["amount"];

const btn = document.querySelector(".a");

btn.addEventListener("click", () => {
  console.log(amount.value);
});
