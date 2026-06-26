const PaymentMethod = require("./PaymentMethod");

class UPIPayment extends PaymentMethod {
  constructor({ upiId }) {
    super();
    this.upiId = upiId;
  }

  process(amount) {
    // Simulated: UPI fails ~5% of the time (e.g. bank server timeout)
    const success = Math.random() > 0.05;
    return {
      success,
      reference: success ? `upi_${Date.now()}` : null,
      reason: success ? null : "UPI gateway timeout",
    };
  }
}

module.exports = UPIPayment;
