import Link from "next/link";
import Image from "next/image";
import { ReactNode } from "react";
import { redirect } from "next/navigation";

import { isAuthenticated, getCurrentUser } from "@/lib/actions/auth.action";
import UserMenu from "@/components/UserMenu";

const Layout = async ({ children }: { children: ReactNode }) => {
  const isUserAuthenticated = await isAuthenticated();
  if (!isUserAuthenticated) redirect("/sign-in");
  
  const user = await getCurrentUser();

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)' }}>
      {/* Navigation Bar */}
      <nav className="sticky top-0 z-50 backdrop-blur-md bg-white/10 border-b border-white/20 shadow-2xl">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 hover:scale-105 transition-transform">
            <div className="bg-white/20 backdrop-blur-sm p-2 rounded-xl border border-white/30 shadow-lg">
              <Image src="/logo.svg" alt="MockSy Logo" width={32} height={32} />
            </div>
            <h2 className="text-2xl font-black text-white drop-shadow-lg">
              MockSy
            </h2>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center gap-4">
            <Link 
              href="/" 
              className="px-4 py-2 text-white font-bold hover:bg-white/20 rounded-xl transition-all backdrop-blur-sm border border-transparent hover:border-white/30"
            >
              🏠 Home
            </Link>
            <Link 
              href="/interview" 
              className="px-5 py-2.5 bg-white text-purple-700 rounded-xl font-black hover:shadow-2xl hover:scale-105 transition-all"
            >
              ✨ Create Interview
            </Link>
            
            {/* User Menu */}
            <UserMenu user={user} />
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        {children}
      </main>
    </div>
  );
};

export default Layout;
