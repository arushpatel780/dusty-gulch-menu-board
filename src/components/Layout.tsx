
import { useAuth } from "@/context/AuthContext";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LogOut, Horse } from "lucide-react";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen flex flex-col bg-cafe-cream horseshoe-background">
      <header className="bg-cafe-brown text-cafe-cream py-4 px-6 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2">
            <Horse className="h-8 w-8" />
            <h1 className="text-2xl font-bold font-playfair">Nihal Café</h1>
          </Link>
          
          <nav className="hidden md:flex gap-6 items-center">
            <Link to="/" className="hover:text-cafe-tan transition">Home</Link>
            <Link to="/menu" className="hover:text-cafe-tan transition">Menu</Link>
            <Link to="/offers" className="hover:text-cafe-tan transition">Offers</Link>
            {user?.isAdmin && (
              <Link to="/admin" className="hover:text-cafe-tan transition">Admin Dashboard</Link>
            )}
            {user ? (
              <Button 
                variant="outline" 
                onClick={logout} 
                className="border-cafe-cream text-cafe-cream hover:bg-cafe-cream hover:text-cafe-brown"
              >
                <LogOut className="mr-2 h-4 w-4" /> Logout
              </Button>
            ) : (
              <Link to="/login">
                <Button 
                  variant="outline" 
                  className="border-cafe-cream text-cafe-cream hover:bg-cafe-cream hover:text-cafe-brown"
                >
                  Login
                </Button>
              </Link>
            )}
          </nav>

          {/* Mobile menu button would go here */}
        </div>
      </header>
      
      <main className="flex-grow container mx-auto px-4 py-8">
        {children}
      </main>
      
      <footer className="bg-cafe-brown text-cafe-cream py-6 mt-auto">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p>&copy; {new Date().getFullYear()} Nihal Café Robot System</p>
            <div className="flex gap-4 mt-4 md:mt-0">
              <Link to="/" className="hover:text-cafe-tan transition">Home</Link>
              <Link to="/menu" className="hover:text-cafe-tan transition">Menu</Link>
              <Link to="/offers" className="hover:text-cafe-tan transition">Offers</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
