const descInput = document.getElementById("descInput");
const amountInput = document.getElementById("amountInput");
const addBtn = document.getElementById("addBtn");
const transactionList = document.getElementById("transactionList");
const balanceDiv = document.getElementById("balance");
// Load transactions from localStorage
window.addEventListener("load", () => {
  const transactions = JSON.parse(localStorage.getItem("transactions")) || [];
  transactions.forEach(tx => addTransactionToDOM(tx));
  updateBalance(transactions);
});

addBtn.addEventListener("click", () => {
  const desc = descInput.value.trim();
  const amount = Number(amountInput.value);

  if (desc === "" || amount === 0) return;

  const transaction = { desc, amount };
  addTransactionToDOM(transaction);
  saveTransaction(transaction);

  descInput.value = "";
  amountInput.value = "";
});

function addTransactionToDOM(transaction) {
  const li = document.createElement("li");
  li.classList.add(transaction.amount > 0 ? "income" : "expense");
  li.innerHTML = `${transaction.desc} : ₹${transaction.amount}
    <span class="deleteBtn">❌</span>`;

  const deleteBtn = li.querySelector(".deleteBtn");
  deleteBtn.addEventListener("click", () => {
    transactionList.removeChild(li);
    deleteTransaction(transaction);
  });

  transactionList.appendChild(li);
}

function saveTransaction(transaction) {
  let transactions = JSON.parse(localStorage.getItem("transactions")) || [];
  transactions.push(transaction);
  localStorage.setItem("transactions", JSON.stringify(transactions));
  updateBalance(transactions);
}

function deleteTransaction(transaction) {
  let transactions = JSON.parse(localStorage.getItem("transactions")) || [];
  transactions = transactions.filter(tx => !(tx.desc === transaction.desc && tx.amount === transaction.amount));
  localStorage.setItem("transactions", JSON.stringify(transactions));
  updateBalance(transactions);
}

function updateBalance(transactions) {
  const balance = transactions.reduce((acc, tx) => acc + tx.amount, 0);
  balanceDiv.innerText = `Balance: ₹${balance}`;
}