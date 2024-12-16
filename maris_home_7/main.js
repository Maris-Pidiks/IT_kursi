// ex-1

let balance = -20;

if (balance > 0) {
  console.log("You have a positive balance");
} else if (balance == 0) {
  console.log("You have a zero balance");
} else if (balance < 0) {
  console.log("You have a negative balance");
}

// ex-2

let spendScore = 100;

if (spendScore >= 90) {
  console.log("You are the economy master");
} else if (spendScore >= 70) {
  console.log("Good level of cost control");
} else if (spendScore >= 50) {
  console.log("Mid level of cost control");
} else {
  console.log("You must improve your financial management skills");
}

// ex-3

let viewMode = "detailed";

let viewDescription = viewMode === "detailed" ? "View detailed" : "View compact";

// ex-5

const transactions = [
  { description: "Зарплата", amount: 50000 },
  { description: "Продукты", amount: -3000 },
  { description: "Кафе", amount: -500 },
];

for (let i = 0; i < transactions.length; i++) {
  const transaction = transactions[i];
  console.log(
    `Транзакция N ${i + 1}: ${transaction.description}, сумма: ${transaction.amount}`
  );
}

// ex-6

const categories = ["Еда", "Транспорт", "Развлечения"];

for (const categorie of categories) {
  console.log(categorie);
}

// ex-7

const transactions2 = [
  { description: "Зарплата", amount: 50000 },
  { description: "Аренда жилья", amount: -15000 },
  { description: "Продукты", amount: -3000 },
  { description: "Продажа старой мебели", amount: 2000 },
];

transactions2.forEach((transaction) => {
  if (transaction.amount > 0) {
    console.log(`Доход: ${transaction.description}, сумма: ${transaction.amount}`);
  } else if (transaction.amount < 0) {
    console.log(`Расход: ${transaction.description}, сумма: ${transaction.amount}`);
  }
});

// ex-8

function greetUser(name) {
  console.log(
    "Здравствуйте, " + name + "!" + " " + "Добро пожаловать в ваш финансовый кабинет."
  );
}

greetUser("John");

// ex-9

const calculateFee = function (amount) {
  return amount * 0.02;
};

calculateFee(1000);

const calculateFee2 = (amount) => {
  return amount * 0.02;
};

calculateFee2(1000);

// ex-10  // Codeium risinajums

const expenses = [-500, -2000, -100];

const getMinMaxExpense = (expenses) => {
  let min = Infinity;
  let max = -Infinity;
  for (const expense of expenses) {
    if (expense < min) {
      min = expense;
    }
    if (expense > max) {
      max = expense;
    }
  }
  return { min, max };
};

const { min, max } = getMinMaxExpense(expenses);
console.log(`Min: ${min}, Max: ${max}`);

// ex-11

let currentCurrency1 = "EUR";

changeCurrency = (newCurrency) => {
  let currentCurrency2 = "USD";
  console.log(`Current currency: ${currentCurrency2}`);
};

changeCurrency();
console.log(`Current currency: ${currentCurrency1}`);

// ex-12

const outer = () => {
  let exchangeRate = 73.5;
  const inner = () => console.log(`Exchange rate: ${exchangeRate}`);
  inner();
};

outer();

// ex-13

const calculatePrice = (price, hasPVN) => {
  if (hasPVN) {
    return price * (1 + 0.21);
  } else {
    return price / (1 + 0.21);
  }
};

console.log(calculatePrice(121, false));
console.log(calculatePrice(100, true));
