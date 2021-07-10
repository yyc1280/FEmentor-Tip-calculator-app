const billInput = document.getElementById("bill")
const customInput = document.getElementById("custom")
const peopleInput = document.getElementById("people")
const percentButton = document.querySelectorAll("[data-percent]")
const resetButton = document.querySelector(".reset")
const warning = document.querySelector(".warn")
const tip = document.getElementById("tipAmount")
const totalAmount = document.getElementById("total")

let percent = 0
let bill = 0
let people = 0
let tipAmount = 0
let total = 0

function calculate() {
  if (Number.isNaN(bill) || !people || Number.isNaN(percent)) return
  tipAmount = Math.floor(((bill * percent * 0.01) / people) * 100) / 100
  total = ((bill * (100 + percent) * 0.01) / people).toFixed(2)

  tip.textContent = "$" + tipAmount
  totalAmount.textContent = "$" + total
}

function activeReset() {
  resetButton.disabled = false
}

percentButton.forEach(p =>
  p.addEventListener("click", function () {
    percent = parseInt(this.dataset.percent)
    calculate()
    activeReset()
  })
)

billInput.addEventListener("input", function () {
  bill = parseFloat(this.value)
  calculate()
  activeReset()
})
customInput.addEventListener("input", function () {
  percent = parseInt(this.value)
  calculate()
  activeReset()
})

peopleInput.addEventListener("input", function () {
  people = parseInt(this.value)
  calculate()
  activeReset()
  people === 0
    ? warning.classList.add("active")
    : warning.classList.remove("active")
  people === 0
    ? peopleInput.classList.add("zero")
    : peopleInput.classList.remove("zero")
})

resetButton.addEventListener("click", function () {
  billInput.value = ""
  customInput.value = ""
  peopleInput.value = ""
  bill = 0
  tipAmount = 0
  total = 0
  percent = 0
  people = 0
  tip.textContent = "$0.00"
  totalAmount.textContent = "$0.00"
  warning.classList.remove("active")
  peopleInput.classList.remove("zero")
  resetButton.disabled = true
})
