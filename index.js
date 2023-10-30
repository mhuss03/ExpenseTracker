const btn = document.querySelector(".btn");
const log = document.querySelector(".log");
const clr = document.querySelector(".clr");
const table = document.querySelector(".table");

o0nload = localStorage.clear();
let count = 0;

btn.addEventListener("click", () => {
  count++;
  localStorage.setItem(count, `item has been clicked ${count}`);
});

log.addEventListener("click", () => {
  if (count === 0) {
    console.log("Button has not been Clicked");
  } else {
    for (let key in localStorage) {
      if (localStorage.hasOwnProperty(key)) {
        console.log(key + ": " + localStorage[key]);
      }
    }
  }
});

clr.addEventListener("click", () => {
  localStorage.clear();
  count = 0;
  console.clear();
});
