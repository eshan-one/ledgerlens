class Account {
  constructor({ id, userId }) {
    this.id = id;
    this.userId = userId;
  }

  getBalance() {
    // Day 5: sum ledger entries instead of a stored field
    throw new Error("Not implemented yet");
  }

  canWithdraw(amount) {
    return this.getBalance() >= amount;
  }

  recordDebit(amount, transactionId) {
    // Day 5: create a LedgerEntry of type 'debit'
    throw new Error("Not implemented yet");
  }

  recordCredit(amount, transactionId) {
    // Day 5: create a LedgerEntry of type 'credit'
    throw new Error("Not implemented yet");
  }
}

module.exports = Account;
