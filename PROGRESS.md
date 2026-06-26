## Day 1 — 2026-06-25

- Built:
  - Core domain models: User, Account, Transaction, LedgerEntry, PaymentMethod
  - Backend project scaffolding with Node.js (package.json, dependencies)
  - Foundation for double-entry ledger system
- Key decision:
  - JavaScript/Node.js for backend implementation
  - Domain model-first architecture to ensure correct ledger logic
- Stuck on / next:
  - Set up database layer and persistence
  - Implement service/business logic for transactions and balance calculations

## Day 2 — June 26, 2026

- Built: signup/login routes, JWT middleware, bcrypt password hashing, Account auto-provisioned on signup.
- Key decision: `Account` has no stored `balance` field — balance will always be derived from ledger entries (Day 5), never cached as a raw number on the model.
- Stuck on / next: none major — auth flow tested end-to-end via Postman (signup → login → authenticated /accounts/me). Next: Factory pattern for payment methods (Day 3).

## Day 3 — June 26, 2026

- Built:
  - `UPIPayment` concrete subclass of `PaymentMethod` — simulates 95% success rate, returns `{ success, reference, reason }`
  - `CardPayment` and `WalletPayment` stubbed (empty, ready to implement)
- Key decision: Locked in the `process(amount)` return contract: `{ success, reference, reason }` — all three subclasses must conform to this shape so the transaction service can handle them uniformly.
- Stuck on / next: Factory pattern for instantiating payment methods by type (Day 4); flesh out `CardPayment` and `WalletPayment` implementations.
