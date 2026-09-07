# 1Fi Marketplace — SDE Intern Assignment

A responsive mobile-first web app implementing the **1Fi Marketplace** section within the **Shop** tab for the 1Fi SDE Intern Assignment.

---

## 🚀 Overview

Built with React 19, TypeScript, and Tailwind CSS, this project integrates the **1Fi Marketplace** seamlessly into the existing Shop experience of the 1Fi app, matching its UI design, purple brand theme (`#6C2BD9`), and mobile layout.

---

## ✨ Features

- **Shop Tab Navigation**: Top Brands (blank), Nearby Stores (blank), and Marketplace (fully implemented).
- **Product Search & Filtering**: Instant search bar and category chips (*All*, *Electronics*, *Fashion*, *Home Appliances*).
- **Product Card Grid**: 2-column card layout with pricing, discount badges, ratings, and starting EMI teasers.
- **Product Details & Variants**: Color swatches, storage pills, and size chips with real-time price updates.
- **Dynamic EMI Calculator**: 3, 6, 9, and 12-month EMI plans with No-Cost EMI badges and total interest breakdown.
- **Checkout Flow**: Sticky bottom action bar with EMI plan selection and confirmation toast.
- **Unit Testing**: 42 unit tests covering components, pages, and API logic.

---

## 🛠️ Tech Stack

- **Framework**: React 19 + TypeScript
- **Styling**: Tailwind CSS v4
- **Routing**: React Router v7
- **Testing**: Vitest + React Testing Library
- **Build Tool**: Vite 8

---

## 📁 Project Structure

```
src/
├── api/
│   ├── api.ts              # Mock async API handlers (products, categories, EMI plans)
│   └── mockData.ts         # Mock database and EMI calculation formulas
├── components/
│   ├── common/             # Reusable UI components (SearchBar, LoadingSkeleton, ErrorState)
│   ├── marketplace/        # Marketplace components (ProductCard, EMIPlanCard, VariantSelector, StickyFooter, etc.)
│   ├── BottomNav.tsx       # Bottom navigation bar
│   ├── HeroBanner.tsx      # Shop page hero banner
│   ├── TabSwitcher.tsx     # Shop section tab switcher
│   ├── TopBrands.tsx       # Top Brands tab view
│   └── NearbyStores.tsx    # Nearby Stores tab view
├── layouts/
│   └── AppLayout.tsx       # Mobile frame container layout
├── pages/
│   ├── ShopPage.tsx        # Main Shop page with 3 tabs
│   └── ProductDetailPage.tsx # Dedicated product detail page with EMI selection
├── test/
│   ├── api/                # API tests
│   ├── components/         # Component unit tests
│   ├── layouts/            # Layout tests
│   ├── pages/              # Page integration tests
│   └── setup.ts            # Vitest environment setup
├── types/
│   └── index.ts            # TypeScript interfaces and domain types
├── App.tsx                 # App entry point with router setup
└── index.css               # Global Tailwind CSS and design design tokens
```

---

## 🏃 Getting Started

### 1. Prerequisites
Ensure you have **Node.js** (v18.0.0 or higher) installed.

### 2. Installation
Clone the repository and install dependencies:
```bash
npm install
```

### 3. Development Server
Start the Vite local development server:
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser to view the application.

### 4. Running Unit Tests
Execute unit tests in watch/run mode:
```bash
npm test
```

To run tests with coverage report:
```bash
npx vitest run --coverage
```
