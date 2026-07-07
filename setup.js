const fs = require("fs");
const path = require("path");

const files = {
  "package.json": `{
  "name": "project",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "clsx": "^2.1.1",
    "lucide-react": "^0.473.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "tailwind-merge": "^2.6.0"
  },
  "devDependencies": {
    "@tailwindcss/vite": "^4.0.0",
    "@types/node": "^22.10.2",
    "@types/react": "^19.0.8",
    "@types/react-dom": "^19.0.3",
    "@vitejs/plugin-react": "^4.3.4",
    "tailwindcss": "^4.0.0",
    "typescript": "^5.7.2",
    "vite": "^6.0.7"
  }
}`,
  "vite.config.ts": `import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
})`,
  "tsconfig.json": `{
  "files": [],
  "references": [
    { "path": "./tsconfig.app.json" },
    { "path": "./tsconfig.node.json" }
  ]
}`,
  "tsconfig.app.json": `{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "isolatedModules": true,
    "moduleDetection": "force",
    "noEmit": true,
    "jsx": "react-jsx",
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    },
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["src"]
}`,
  "tsconfig.node.json": `{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["ES2023"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "isolatedModules": true,
    "moduleDetection": "force",
    "noEmit": true,
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["vite.config.ts"]
}`,
  "index.html": `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Stitch Hub x Rikkei Edu</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>`,
  "src/main.tsx": `import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './styles/index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)`,
  "src/styles/index.css": `@import "tailwindcss";

@theme {
  --font-sans: "Inter", "sans-serif";
  --color-primary: #3b82f6; 
  --color-primary-foreground: #ffffff;
}

@layer base {
  :root {
    --background: #ffffff;
    --foreground: #020817;
  }
}

html {
  font-family: var(--font-sans);
  scroll-behavior: smooth;
  @apply antialiased;
}

body {
  background-color: var(--background);
  color: var(--foreground);
}`,
  "src/utils/cn.ts": `import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}`,
  "src/App.tsx": `import { useState } from 'react'
import { LayoutDashboard, Users, Settings, LogOut, Search, Bell } from 'lucide-react'
import { cn } from '@/utils/cn'

function Sidebar() {
  const menus = [
    { name: 'Dashboard', icon: <LayoutDashboard size={20} />, active: true },
    { name: 'Khách hàng', icon: <Users size={20} />, active: false },
    { name: 'Cài đặt', icon: <Settings size={20} />, active: false },
  ];

  return (
    <aside className="w-64 h-full bg-white border-r border-slate-200 hidden md:flex flex-col">
      <div className="h-16 flex items-center px-6 border-b border-slate-200">
        <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Minigame Hub</h1>
      </div>
      
      <nav className="flex-1 p-4 space-y-2">
        {menus.map(menu => (
          <button
            key={menu.name}
            className={cn(
               "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium transition-all duration-200",
               menu.active 
                 ? "bg-blue-50 text-blue-600" 
                 : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
            )}
          >
            {menu.icon}
            {menu.name}
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-slate-200">
        <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium text-red-600 hover:bg-red-50 transition-all">
          <LogOut size={20} />
          Đăng xuất
        </button>
      </div>
    </aside>
  );
}

function Header() {
  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 sticky top-0 z-10">
      <div className="flex items-center gap-4 flex-1">
        <div className="relative w-full max-w-md hidden sm:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Tìm kiếm..." 
            className="w-full pl-10 pr-4 py-2 bg-slate-100 border-transparent rounded-full focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none text-sm"
          />
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        <button className="p-2 text-slate-600 hover:bg-slate-100 rounded-full transition-colors relative">
          <Bell size={20} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
        </button>
        
        <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
          <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-500 shadow-sm"></div>
          <div className="hidden sm:block text-sm">
            <p className="font-semibold text-slate-900">Admin User</p>
            <p className="text-slate-500 text-xs">admin@rikkei.edu.vn</p>
          </div>
        </div>
      </div>
    </header>
  );
}

export default function App() {
  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden font-sans">
      <Sidebar />
      <main className="flex-1 flex flex-col h-full overflow-hidden">
        <Header />
        <div className="flex-1 overflow-y-auto p-6 scroll-smooth">
          <div className="max-w-6xl mx-auto space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">Tổng quan hệ thống</h2>
                <p className="text-slate-500 mt-1">Chào mừng bạn trở lại, xem qua các chỉ số mới nhất.</p>
              </div>
              <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-sm transition-all active:scale-95">
                Tạo chiến dịch mới
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map(i => (
                <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow cursor-default">
                  <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-4">
                    <Users size={24} />
                  </div>
                  <h3 className="text-slate-500 font-medium">Lượt chơi hôm nay</h3>
                  <div className="flex items-baseline gap-2 mt-2">
                    <p className="text-3xl font-bold text-slate-900">1,248</p>
                    <span className="text-sm font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">+12%</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 min-h-[400px]">
              <h3 className="text-lg font-bold text-slate-900 mb-6">Biểu đồ người chơi</h3>
              <div className="h-full w-full flex items-center justify-center text-slate-400 bg-slate-50/50 rounded-xl border border-dashed border-slate-200 min-h-[300px]">
                Khu vực chứa Biểu đồ (Recharts / Chart.js)
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}`,
};

[
  "src/components/ui",
  "src/features/dashboard",
  "src/hooks",
  "src/styles",
  "src/utils",
  "src/types",
].forEach((dir) => {
  fs.mkdirSync(dir, { recursive: true });
});

for (const [filepath, content] of Object.entries(files)) {
  fs.writeFileSync(filepath, content, "utf8");
}
console.log("Files generated successfully directly in Node in UTF-8");
