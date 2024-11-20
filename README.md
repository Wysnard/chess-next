# Online Chess Game

Welcome to the Online Chess Game, a modern and sleek platform to play chess with friends or other players online. This project is built using cutting-edge technologies, ensuring a smooth and responsive gaming experience.

## 🚀 Features

Real-time Chess Gameplay: Play against other players online with real-time updates.
Authentication: Secure and seamless user login and account management with Clerk.
Drag-and-Drop Interface: Intuitive chess piece movement using React DnD.
Responsive Design: Optimized for all devices using Tailwind CSS.
Serverless Backend: Powered by Convex for real-time data synchronization.
Modern Frontend: Built with Next.js and TypeScript for performance and maintainability.

## 🛠️ Tech Stack

- Frontend: Next.js, React, TypeScript, Tailwind CSS, React DnD
- Backend: Convex for serverless backend logic and real-time updates
- Authentication: Clerk for secure user authentication and management

## 📦 Installation

Clone the repository:

```bash
Copy code
git clone https://github.com/your-username/online-chess-game.git
cd online-chess-game
```

Install dependencies:

```bash
bun install
```

Configure environment variables:
Create a .env.local file in the root directory and add your API keys and configurations for Clerk and Convex.

```bash
CONVEX_DEPLOYMENT=your_convex_deployment_name
NEXT_PUBLIC_CONVEX_URL=your_convex_url
CLERK_SECRET_KEY=your_clerk_api_key
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
```

Start the development server:

```bash
bun dev
```

Open your browser and visit http://localhost:3000 to play the game!

## 🧩 Usage

Sign Up / Log In: Use Clerk's secure authentication to create an account.
Start a Game: Match with an opponent or invite a friend to play.
Drag and Drop: Move chess pieces intuitively using the drag-and-drop interface.
Real-Time Updates: Watch moves update instantly, thanks to Convex's real-time data syncing.

## 🎨 Screenshots

<!-- Add screenshots of the gameplay, lobby, or login page -->

## 🧑‍💻 Author

Vincent LAY
