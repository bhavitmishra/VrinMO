# VrinMO

**Status:** 🚧 Actively in Development  
**Stack:** Next.js (User & Merchant apps + Faked HDFC banking app), Express (Webhook server), PostgreSQL, TurboRepo

## 📖 Overview

VrinMO is a **multi-app payments ecosystem** built as a **TurboRepo monorepo**. It mimics UPI-style payments with **onramping (add funds), P2P transfers, merchant payments, and offramping (withdraw funds)**.

### Apps & Services

* **User App** – Next.js frontend for end users.
* **Merchant App** – Next.js frontend for merchants.
* **Onramping Service** – Simulated HDFC bank API for adding money to wallet.
* **Offramping Service** – (WIP) Withdraw money from wallet back to bank.
* **Webhook Server** – Express service validating transactions & syncing DB.
* **Database** – PostgreSQL storing users, balances, merchants, and transaction history.

## 🚀 Features

### ✅ Currently Working

* **Authentication** – Secure login with NextAuth.
* **P2P Transactions** – Send & receive money between users with balance validation.
* **Onramping** – Fake HDFC API to load wallet with funds.
* **UI Enhancements** – Cleaner, modern, responsive design.
* **Security Updates** – Stricter checks on transaction execution.
* **Webhook Flow** – Express server handling callbacks & updating DB.
* **Database Models** – Postgres schema for users, merchants, balances, transactions.

### 🚧 In Progress

* **Offramping** – Withdraw wallet balance to linked bank account.
* **Merchant Payments** – Pay merchants directly from wallet.
* **Bank API Authentication** – Stronger integration for onramp/offramp flows.
* **Deployment Setup** – Docker configs, environment handling, production build.
* **Testing Suite** – Unit + integration tests for all flows.

## ⚙️ Getting Started

### Prerequisites

* Node.js >= 18
* PostgreSQL (local or via Docker)
* npm / pnpm / yarn

### Setup

1. Clone the repo:

```bash
git clone https://github.com/bhavitmishra/VrinMO.git
cd VrinMO
```

2. Install dependencies:

```bash
npm install
# or
pnpm install
```

3. Configure `.env` files inside each app (User, Merchant, Webhook, etc.).
   * Database URL
   * NextAuth config
   * Fake HDFC API config

4. Run the dev servers:

```bash
npm run dev
```

## 🔗 API Reference

### P2P Transaction Example

**Endpoint**:
```
POST /api/transactions/p2p
```

**Request Body**:
```json
{
  "to": "user_id_receiver",
  "amount": 500
}
```

**Response**:
```json
{
  "status": "success",
  "transactionId": "txn_123456",
  "from": "user_id_sender",
  "to": "user_id_receiver",
  "amount": 500,
  "balanceAfter": 1500
}
```

## 🛣️ Roadmap

- [x] Authentication (NextAuth)
- [x] Onramping (fake HDFC API)
- [x] P2P Transactions
- [ ] Offramping (bank withdrawal)
- [ ] Merchant Payments
- [ ] Bank API auth & stronger integration
- [ ] Deployment (Docker + CI/CD)
- [ ] Testing & monitoring

## 📂 Repo Structure

```
/apps
  /user-app        # Next.js user frontend
  /merchant-app    # Next.js merchant frontend
  /webhook-server  # Express webhook handler
  /fake-hdfc       # Fake bank API for onramping/offramping

/packages
  /db              # Prisma schema + migrations
  /ui              # Shared UI components
  /config          # Shared configs
```

## 🧑‍💻 Author

Built by **Bhavit Mishra** 🚀
