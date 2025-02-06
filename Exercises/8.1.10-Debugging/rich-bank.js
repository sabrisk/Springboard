const accounts = [
	{ id: 1, owner: "Alice", balance: 500 },
	{ id: 2, owner: "Bob", balance: 300 },
];

function getAccountById(id) {
	for (const account of accounts) {
		if (account.id === id) {
			return account;
		}
	}
}

function createAccount(newAccountId, newAccountOwner) {
	if (
		!Number.isFinite(newAccountId) ||
		newAccountId <= 0 ||
		!Number.isInteger(newAccountId)
	) {
		throw new Error(
			"Invalid value for account ID: The account ID must be a positive, finite integer."
		);
	}

	if (
		typeof newAccountOwner !== "string" ||
		newAccountOwner.trim().length === 0
	) {
		throw new Error(
			"Invalid value for account owner: The account owner must be a non-empty string"
		);
	}

	const account = getAccountById(newAccountId);

	if (account) {
		throw new Error("Account already exists");
	}

	accounts.push({
		id: newAccountId,
		owner: newAccountOwner,
		balance: 0,
	});
}

function depositMoney(accountId, amount) {
	const account = getAccountById(accountId);

	if (!account) {
		throw new Error("Account not found.");
	}

	if (!Number.isFinite(amount) || amount <= 0) {
		throw new Error(
			"Invalid value for deposit amount:  The amount must be a positive, finite number."
		);
	}

	account.balance += amount;
}

function withdrawMoney(accountId, amount) {
	const account = getAccountById(accountId);

	if (!account) {
		throw new Error("Account not found.");
	}

	if (!Number.isFinite(amount) || amount <= 0) {
		throw new Error(
			"Invalid value for withdrawal amount: The amount must be a positive, finite number."
		);
	}

	if (amount > account.balance) {
		throw new Error(
			"Invalid value for withdrawal amount: The withdrawal amount must be less than or equal to the account balance."
		);
	}

	account.balance -= amount;
}

function transferMoney(fromAccountId, toAccountId, amount) {
	const fromAccount = getAccountById(fromAccountId);
	const toAccount = getAccountById(toAccountId);

	if (!Number.isFinite(amount) || amount < 0) {
		throw new Error(
			"Invalid value for transfer amount: The amount must be a positive finite number."
		);
	}

	if (!fromAccount) {
		throw new Error("Source account not found.");
	}

	if (!toAccount) {
		throw new Error("Destination account not found.");
	}

	if (amount > fromAccount.balance) {
		throw new Error(
			"Invalid value for withdrawal amount: The withdrawal amount must be less than or equal to the account balance."
		);
	}

	toAccount.balance += amount;
	fromAccount.balance -= amount;
}

/*
Hints:

getAccountById("1");
createAccount(1, "Alice");
createAccount("3", "Charlie");
createAccount(-3, "Charlie");
createAccount(3, ["Charlie"]);
createAccount(3, "");
createAccount(3, "  ");
depositMoney(1, "300")
depositMoney(1, -300)
depositMoney(1, 0)
depositMoney(1, Infinity)
depositMoney(4, 100)
withdrawMoney(1, -100)
withdrawMoney(1, 0)
withdrawMoney(1, 501)
transferMoney(1, 4, 100)
transferMoney(1, 2, 501);
transferMoney(1, 2, 100);
*/
