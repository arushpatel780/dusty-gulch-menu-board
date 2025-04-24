
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Coffee } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-cafe-cream horseshoe-background p-4">
      <div className="max-w-md w-full text-center">
        <Coffee className="mx-auto h-16 w-16 text-cafe-brown mb-4" />
        <h1 className="text-5xl font-bold text-cafe-brown mb-6">404</h1>
        <p className="text-xl text-cafe-brown mb-8">
          Whoa there, partner! This trail leads nowhere.
        </p>
        <Link to="/">
          <Button className="bg-cafe-brown hover:bg-cafe-lightBrown text-cafe-cream">
            Back to the Ranch
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
