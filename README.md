# 🛒 MiniShop — React E-Commerce App

A minimal, fast, and modern e-commerce web app built with **React**, **Vite**, **TailwindCSS**, and **Firebase**.

---

## 🚀 Features

- 🧱 Product grid fetched from a live API  
- 🛍️ Add, remove, and clear items in the cart (Zustand store)  
- 🔐 Firebase authentication (Signup / Login / Logout)  
- 👤 Protected profile route (React Router)  
- 💳 Persistent state with localStorage  
- ⚡ Built with Vite + React + TailwindCSS  
- ☁️ Deployed on Vercel / Netlify  

---

## 🧰 Tech Stack

| Category | Tools |
|-----------|-------|
| Framework | React 18 (Vite) |
| Styling | TailwindCSS + SCSS Modules |
| State Management | Zustand |
| Routing | React Router v6 |
| Auth & Backend | Firebase |
| API | FakeStoreAPI / Escuelajs API |

---

## ⚙️ Installation

```bash
# 1. Clone the repo
git clone https://github.com/mounaimMoussaoui/mini-shop.git

# 2. Go into the project
cd mini-shop

# 3. Install dependencies
npm install

# 4. Create your .env file
cp .env.example .env

# 5. Start the dev server
npm run dev
________________________________________
🔐 Environment Variables

[//]: # (Create a .env file at the root:)

[//]: # (VITE_APP_API_KEY_FIREBASE=your-firebase-api-key)

[//]: # (VITE_APP_AUTH_DOMAIN_FIREBASE=your-firebase-auth-domain)

[//]: # (VITE_APP_PROJECT_ID_FIREBASE=your-firebase-project-id)

[//]: # (VITE_APP_STORAGE_BUCKET_FIREBASE=your-firebase-storage)

[//]: # (VITE_APP_MESSAGING_SENDER_ID=your-sender-id)

[//]: # (VITE_APP_APP_ID=your-app-id)

[//]: # (VITE_APP_MEASUREMENT_ID=your-measurement-id)

[//]: # (VITE_APP_API_BASEURL="https://api.escuelajs.co/api/v1")
________________________________________
🚢 Deployment
Deploy to Vercel
1.	Push your project to GitHub.
2.	Go to vercel.com, import your repo.
3.	Add the environment variables under Project Settings → Environment Variables.
4.	Deploy 🚀
Deploy to Netlify
1.	Link your repo in Netlify dashboard.
2.	Build command: npm run build
3.	Publish directory: dist/
________________________________________
🧑‍💻 Author
Built by Moussaoui_Abdennaim — Frontend Developer
Portfolio: ********.com 
GitHub: github.com/mounaimMoussaoui
________________________________________
📝 License
This project is open-source under the MIT License.

---