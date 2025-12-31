You are an autonomous coding agent working on an existing Laravel backend project.

IMPORTANT RULES:
- DO NOT modify, refactor, or delete any existing code, routes, controllers, models, or migrations.
- You are ONLY allowed to ADD new files or ADD new code in a non-breaking way.
- Follow Laravel best practices (Controller, Request Validation, Eloquent, DB Transaction).
- Assume authentication already exists and `auth()->user()` is available.
- Do NOT implement frontend code (React, UI, etc).
- Focus ONLY on backend API.

---

## FEATURE TO ADD: ORDER & CHECKOUT API

We want to add a checkout system where:
- User can checkout multiple products at once
- 1 checkout = 1 order
- Admin manages order status from dashboard
- Product stock is ONLY reduced when order status becomes "Dikemas"

---

## DATABASE STRUCTURE (ALREADY EXISTS)

### Table: `orders`
- id
- user_id (buyer)
- total_harga
- status (ENUM or STRING):
  - "Belum Bayar"
  - "Dikemas"
  - "Dikirim"
  - "Selesai"
  - "Batal"
- created_at
- updated_at

### Table: `order_items`
- id
- order_id
- produk_id
- qty
- harga
- subtotal
- created_at
- updated_at

### Existing table:
- `produk` with at least: id, harga, stok

---

## BUSINESS LOGIC (VERY IMPORTANT)

### CART HANDLING
- Cart data comes from frontend (request body)
- Cart is NOT stored in database
- Cart items contain:
  - produk_id
  - qty

---

### USER CHECKOUT FLOW
1. User sends checkout request with cart items
2. Backend validates:
   - product exists
   - qty > 0
   - stock is sufficient (stok >= qty)
3. Create a new record in `orders`:
   - user_id = authenticated user
   - total_harga = sum of all subtotals
   - status = "Belum Bayar"
4. Create related records in `order_items`
5. DO NOT reduce product stock at this stage
6. Wrap checkout process in a database transaction

---

### ADMIN ORDER STATUS UPDATE FLOW
- Admin can update order status

RULES:
- When status changes FROM ANY STATUS TO "Dikemas":
  - Reduce product stock based on `order_items.qty`
  - Stock reduction must happen ONLY ONCE
  - Validate stock again before reducing
- When status changes to:
  - "Dikirim"
  - "Selesai"
  - "Batal"
  → DO NOT modify any product stock or other tables

---

## API ENDPOINTS TO ADD

### User APIs
- POST `/api/checkout`
  - Create order + order_items
  - Status default: "Belum Bayar"

- GET `/api/orders`
  - Get authenticated user's order history
  - Include order_items & product data

---

### Admin APIs
- GET `/api/admin/orders`
  - List all orders
  - Include user info & total items

- GET `/api/admin/orders/{id}`
  - Get order detail
  - Include order_items & product info

- PUT `/api/admin/orders/{id}/status`
  - Update order status
  - Trigger stock reduction ONLY when status becomes "Dikemas"

---

## TECHNICAL REQUIREMENTS
- Use Eloquent relationships
- Use Form Request validation
- Use DB::transaction where needed
- Prevent double stock deduction
- Return JSON responses with clear success & error messages
- Follow REST API standards

---

## OUTPUT EXPECTATION
- New Controllers
- New Request classes
- New API routes
- Any required Models (if missing)
- Clean, readable, production-ready code

DO NOT add explanations.
DO NOT include frontend code.
ONLY output the code changes needed.
