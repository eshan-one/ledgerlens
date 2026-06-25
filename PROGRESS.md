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
