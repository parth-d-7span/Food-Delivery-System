# 🍔 Food Delivery System — REST API

A Node.js REST API for a food delivery platform built with Express and MongoDB.

---

## 🛠 Tech Stack

Node.js · Express · MongoDB · Mongoose · JWT · bcryptjs · Joi · Winston · Multer · ESLint · Prettier

---

## ⚙️ Environment Setup

Create a `.env` file in the root directory:

```env
PORT=
NODE_ENV=
MONGO_URI=mongodb://localhost:27017/<db_name>
JWT_SECRET=
JWT_EXPIRES_IN=
API_PREFIX=
```

---

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Start production server
npm start

# Lint and format
npm run lint
npm run format
```

---

## 🏪 Admin Flow

```
1. Register / Login as admin
2. Add restaurant           → POST /api/v1/restaurants
3. Add menu items           → POST /api/v1/menu (form-data with restaurantId)
4. View all orders          → GET /api/v1/orders
5. Confirm order            → PATCH /api/v1/orders/:id/status { "status": "confirmed" }
6. Mark delivered           → PATCH /api/v1/orders/:id/status { "status": "delivered" }
7. Update/Delete restaurant → PUT or DELETE /api/v1/restaurants/:id
8. Update/Delete menu item  → PUT or DELETE /api/v1/menu/:menuId
```

---

## 🔄 Order Flow

```
1. Register / Login as customer
2. Browse restaurants       → GET /api/v1/restaurants
3. Browse menu              → GET /api/v1/menu/restaurant/:id
4. Add items to cart        → POST /api/v1/cart/items
5. Place order              → POST /api/v1/orders (cart auto-cleared)
6. View order history       → GET /api/v1/orders/my
7. Admin confirms order     → PATCH /api/v1/orders/:id/status { "status": "confirmed" }
8. Admin marks delivered    → PATCH /api/v1/orders/:id/status { "status": "delivered" }
```

**Valid status transitions:**

```
pending → confirmed → delivered
pending → cancelled
```

---

## 🧪 Postman Testing

Import `Food-Delivery-System.postman_collection.json` into Postman and run requests in this order:

```
1. Register Customer → Login Customer
2. Register Admin   → Login Admin
3. Add Restaurant   → Add Menu Item
4. Add Item to Cart → Place Order
5. Update Status (confirmed → delivered)
```
