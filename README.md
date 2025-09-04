# VrinMO (Half-Baked Version)

**Status:** 🚧 Work in Progress  
**Stack:** Next.js (User, Merchant apps & Faked HDFC banking app), Express (Webhook server), Postgres, TurboRepo  

---

## Overview

VrinMO is a multi-app project including:

- **User App** – Next.js frontend for end users.
- **Merchant App** – Next.js frontend for merchants.
- **Onramping Service** – Currently half-baked TurboRepo setup, faked out HDFC bank API (no auth yet).
- **Webhook Server** – Express server handling incoming webhooks.
- **Database** – PostgreSQL storing users, merchants, transactions.

⚠️ Most features are **half-baked**. Onramping, bank integration, and auth are placeholders.

---

## Features (Currently Working)

- Basic onramping flow (faked HDFC API)  
- User & merchant app skeletons (semi-functional) 
- Postgres DB setup & basic models
- NextAuth for authentication
- Webhook server listening to events  
- TurboRepo monorepo structure  

---

## Features In Progress / Missing

- Bank API authentication & proper integration  
- Full onramping management & validations
- Full oframping and payment within users 
- Production-ready deployment setup  
- Comprehensive testing

---

## Getting Started

### Prerequisites

- Node.js >= 18  
- PostgreSQL running locally or via Docker  
- npm  

### Setup

1. Clone the repo:

```bash
git clone https://github.com/bhavitmishra/VrinMO.git
cd VrinMO
