# 📝 [iLuxe Shop Frontend](https://iluxe-shop-frontend.vercel.app/)

## 📌 Overview
**iLuxe Shop** is a modern, user-friendly e-commerce platform designed for purchasing stationery products. The frontend ensures a seamless, responsive, and visually appealing shopping experience. It includes role-based access for users and admins, allowing efficient product and order management.

## 🚀 Features
- **User Authentication & Authorization**: Secure login, registration, and role-based access.
- **Public Pages**:
  - Home Page: Navigation, banners, and featured products.
  - Products Page: Search, filters, and dynamic product listings.
  - Product Details: Detailed product view with add-to-cart functionality.
  - About Page: Information about iLuxe Shop.
- **Private Pages**:
  - Cart Page: View and manage cart, place orders.
  - User Dashboard: Order history, profile management.
  - Admin Dashboard: Manage products, orders, and users.
- **Payment Integration**: Supports SurjoPay and Stripe for secure transactions.
- **Responsive Design**: Mobile-friendly layout.
- **Error Handling & Feedback**: Toast notifications, loading states, and error alerts.

## 🛠️ Tech Stack
- **Frontend**: React, TypeScript
- **Styling**: CSS/SCSS
- **State Management**: Redux
- **Authentication**: JWT
- **API Handling**: RTK Query
- **Routing**: React Router
- **UI Components**: Ant Design, custom reusable components

### 📌 Routes Structure

The application follows a well-structured routing system, using `react-router-dom` for navigation. It includes **public routes**, **protected routes**, and **role-based dashboard routes**.

#### **1️⃣ Public Routes**
| Path             | Description                                     | Access  |
|-----------------|-------------------------------------------------|---------|
| `/`            | Home Page                                       | Public  |
| `/login`       | User Login Page                                 | Public  |
| `/register`    | User Registration Page                          | Public  |
| `/about`       | About Page                                      | Public  |

#### **2️⃣ Protected Routes (Requires Authentication)**
| Path               | Description                                      | Access   |
|-------------------|------------------------------------------------|---------|
| `/products`      | View all products with filters and search       | Users   |
| `/product/:id`   | View product details                            | Users   |
| `/verify-order`  | Verify order before purchase                    | Users   |

#### **3️⃣ Admin Dashboard Routes (`/admin/dashboard`)**
| Path               | Description                                     | Access   |
|-------------------|-------------------------------------------------|---------|
| `/admin/dashboard` | Admin Dashboard Home (Manage Users)            | Admin    |
| `manage-users`    | Manage registered users                         | Admin    |
| `manage-products` | Manage product listings (CRUD operations)       | Admin    |
| `manage-orders`   | Manage customer orders                          | Admin    |
| `add-product`     | Add a new product                               | Admin    |

#### **4️⃣ User Dashboard Routes (`/user/dashboard`)**
| Path              | Description                                     | Access   |
|------------------|-------------------------------------------------|---------|
| `/user/dashboard` | User Dashboard Home (View Orders)              | Users    |
| `view-orders`    | View past and current orders                    | Users    |
| `manage-profile` | Update user profile information                 | Users    |

## 📂 Project Structure
```
iluxe-shop-frontend/
├── public/ (Static assets)
├── src/
│   ├── components/ (UI components)
│   ├── pages/ (Page-level components)
│   ├── redux/ (State management)
│   ├── routes/ (Navigation setup)
│   ├── styles/ (Global styles)
│   ├── utils/ (Helper functions)
│   ├── main.tsx
│   ├── index.tsx
│   ├── vite-env.d.ts
├── .env.local
├── .gitignore
├── eslint.config.js
├── index.html
├── package.json
├── README.md
├── tsconfig.json
├── yarn.lock
```

## 🏗️ Setup & Installation

### 1️⃣ Clone the Repository
```sh
git clone https://github.com/iluxe-shop-frontend.git
cd iluxe-shop-frontend
```

### 2️⃣ Install Dependencies
```sh
yarn install
```

### 3️⃣ Configure Environment Variables
Create a `.env` file in the root directory with:
```env
VITE_API_URL=backend_url
```

### 4️⃣ Run the Development Server
```sh
yarn dev
```
App runs at `http://localhost:5173`

## 📌 Pages & Routes

### Public Routes
- **Home**: Displays homepage content.
- **Products**: Search and filter stationery products.
- **Product Details**: Detailed product page with add-to-cart.
- **About**: Platform information.

### Private Routes
- **Cart**: Order placement and checkout.
- **User Dashboard**: Manage orders and profile.
- **Admin Dashboard**: CRUD operations on products and orders.

## 🔐 Security & Authentication
- **JWT Authentication**: Secure token-based authentication.
- **Role-Based Access Control**: Admin/User roles.

## 🛒 Payment Integration
- **SurjoPay** or **Stripe** for secure payments.

## 💡 UI/UX Enhancements
- **Responsive Layout**: Mobile-friendly design.
- **Error Handling**: User-friendly error messages.
- **Loading States**: Spinners and loaders.
- **Toasts**: Notifications for key actions.

## 🛠️ Scripts

| Command           | Description |
|------------------|-------------|
| `yarn start`    | Run development server. |
| `yarn build`    | Build for production. |
| `yarn lint`     | Check for code issues. |
| `yarn lint:fix` | Auto-fix linting errors. |
| `yarn prettier` | Format code. |
| `yarn prettier:fix` | Auto-format code. |

## 🚀 Deployment
1. Ensure the backend is deployed.
2. Set environment variables.
3. Deploy using **Vercel**, **Netlify**, or **Heroku**.

## 💡 Contributing
1. Fork the repo.
2. Create a branch: `git checkout -b feature-branch`
3. Commit changes: `git commit -m 'Add feature'`
4. Push branch: `git push origin feature-branch`
5. Open a pull request.

---
Let me know if you'd like additional modifications! 🚀

