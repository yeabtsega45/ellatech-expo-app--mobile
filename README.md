# Ella Tech Inventory & Product Management App

This is an [Expo](https://expo.dev) + [Expo Router](https://docs.expo.dev/router/introduction/) + [NativeWind](https://www.nativewind.dev/) app that simulates user and product management using local state only (no backend).

The app lets you:

- Register a user (email + full name)
- Register products (SKU, name, price, quantity)
- Adjust stock (add / remove, never below zero)
- View product status (SKU, quantity, last updated)
- See a paginated transaction history

---

## Requirements

- **Node.js** (recommended via `nvm` or `nvm-windows`)
- **npm** (comes with Node)
- **Expo Go** installed on your phone:
  - Android: from Google Play
  - iOS: from the App Store
- **Recommended shell on Windows**: **PowerShell**

---

## Setup (run these in PowerShell)

From the project root (`ellatech-expo-app`):

```powershell
npm install
```

This installs all dependencies (Expo, Expo Router, NativeWind, etc.).

---

## Running the app (scan QR code with Expo Go)

In **PowerShell**, from the project root:

```powershell
npx expo start
```

This will:

- Start the Metro bundler
- Open the Expo developer UI in your terminal and/or browser
- Show a **QR code**

To run the app on your phone using the **“Scan QR code”** method:

- **On Android**
  - Open the **Expo Go** app
  - Tap **“Scan QR code”**
  - Scan the QR code shown in your terminal or browser

- **On iOS**
  - Open the **Camera** app and point it at the QR code
  - Tap the notification to open in **Expo Go**

The app will bundle and then open on your device.

---

## Project behavior overview

- When the app starts and **no user is registered**:
  - You see the **Register User** screen
  - The bottom tabs are **hidden**
- After you register a user:
  - You are automatically navigated to the **Home** screen
  - The bottom tab bar appears with:
    - Home
    - Register Product
    - Adjust Stock
    - Product Status
    - Transactions

State is kept in memory only; restarting Metro / the app will clear it.

---

## Resetting the starter example (optional)

This project started from the Expo Router template. If you ever want a clean `app` directory again:

```powershell
npm run reset-project
```

This will move the current `app` folder to `app-example` and create a fresh, blank `app` directory.
