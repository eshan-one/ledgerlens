# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

LedgerLens is a mini payment orchestration platform being built incrementally (day-by-day). It features a double-entry ledger, idempotent transactions, multiple payment methods, and planned AI spending insights. Only the backend exists so far.

## Running the backend

All commands run from `ledgerlens-backend/`:

```bash
npm run dev       # Start with nodemon (auto-reload)
node src/server.js  # Start without auto-reload
```

Requires a `.env` file at `ledgerlens-backend/.env` with:
- `MONGO_URI` — MongoDB Atlas connection string
- `JWT_SECRET` — secret for signing JWTs
- `PORT` — defaults to 5000 if omitted

No test runner is configured yet (`npm test` exits with an error).

## Architecture

### Two-layer domain design

The codebase intentionally separates **domain logic** from **persistence**:

- `src/domain/` — Plain JS classes encoding business rules (no Mongoose). These are the source of truth for what entities *do*.
- `src/models/` — Mongoose schemas for MongoDB persistence. These only define shape and indexes.

When adding behavior (e.g. validating a transaction, computing a balance), put it in `src/domain/`. Mongoose models are for reading/writing to the DB only.

### Core domain concepts

- **`Transaction`** (`src/domain/Transaction.js`) — Has an explicit state machine. Valid transitions: `pending → completed`, `pending → failed`. Terminal states reject further transitions. Carries an `idempotencyKey` for deduplication.
- **`LedgerEntry`** (`src/domain/LedgerEntry.js`) — Each entry is either `debit` or `credit`. Account balance is *always* derived by summing entries — `Account` has no stored balance field (enforced by design; see `src/models/Account.js`).
- **`PaymentMethod`** (`src/domain/PaymentMethod.js`) — Abstract base class. Subclasses (`UPIPayment`, `CardPayment`, `WalletPayment`) implement `process(amount)` returning `{ success, reference, reason }`. A Factory pattern for instantiating these is planned for Day 3.

### Auth flow

`POST /auth/signup` → creates User + auto-provisions one Account → returns JWT + accountId.
`POST /auth/login` → returns JWT.
Protected routes use `src/middleware/authenticate.js`, which validates `Authorization: Bearer <token>` and sets `req.user.id`.

### Route → Service → Model pattern

Routes (`src/routes/`) are thin: they call service functions and handle HTTP responses. Business logic lives in `src/services/`. Direct DB access from routes is acceptable only for simple reads (see `accountRoutes.js`).

## Key invariants to preserve

- **Never add a `balance` field to the `Account` model.** Balance must always be computed from `LedgerEntry` records. This is a deliberate double-entry ledger constraint.
- **`Transaction` status transitions are strictly enforced** via the private `#transitionTo` method. Don't bypass it with direct assignment.
- **`idempotencyKey` must be unique per transaction** — the persistence layer needs a unique index on this field when the Transaction model is added.
