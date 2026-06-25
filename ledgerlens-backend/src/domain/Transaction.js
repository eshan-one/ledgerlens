const VALID_TRANSITIONS = {
  pending: ["completed", "failed"],
  completed: [],
  failed: [],
};

class Transaction {
  constructor({ id, accountId, paymentMethod, amount, idempotencyKey }) {
    this.id = id;
    this.accountId = accountId;
    this.paymentMethod = paymentMethod;
    this.amount = amount;
    this.idempotencyKey = idempotencyKey;
    this.status = "pending";
  }

  #transitionTo(newStatus) {
    if (!VALID_TRANSITIONS[this.status].includes(newStatus)) {
      throw new Error(`Cannot transition from ${this.status} to ${newStatus}`);
    }
    this.status = newStatus;
  }

  markCompleted() {
    this.#transitionTo("completed");
  }

  markFailed() {
    this.#transitionTo("failed");
  }
}

module.exports = Transaction;
