class PaymentMethod {
  process(amount) {
    throw new Error("process() must be implemented by a subclass");
  }
}

module.exports = PaymentMethod;
