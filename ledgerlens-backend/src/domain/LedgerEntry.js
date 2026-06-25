class LedgerEntry {
  constructor({
    accountId,
    transactionId,
    type,
    amount,
    createdAt = new Date(),
  }) {
    if (!["debit", "credit"].includes(type)) {
      throw new Error("type must be debit or credit");
    }
    this.accountId = accountId;
    this.transactionId = transactionId;
    this.type = type;
    this.amount = amount;
    this.createdAt = createdAt;
  }
}

module.exports = LedgerEntry;
