
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useCafe } from "@/context/CafeContext";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import MenuCard from "@/components/MenuCard";
import OfferCard from "@/components/OfferCard";
import { ArrowRight, Coffee } from "lucide-react";

const Index = () => {
  const { menuItems, offers, lastRobotFetch, simulateRobotFetch } = useCafe();

  // Display featured menu items (limit to 3)
  const featuredMenuItems = menuItems.slice(0, 3);
  // Display active offers (limit to 2)
  const activeOffers = offers
    .filter(offer => new Date(offer.validUntil) >= new Date())
    .slice(0, 2);

  return (
    <Layout>
      <section className="py-12 text-center rope-pattern">
        <div className="max-w-4xl mx-auto px-4">
          <Coffee className="mx-auto h-16 w-16 text-cafe-brown mb-4" />
          <h1 className="text-5xl font-bold text-cafe-brown mb-6">
            Welcome to Nihal Café
          </h1>
          <p className="text-xl mb-8">
            Serving the finest meals with a touch of Western charm.
            Our robot-powered service brings efficiency without losing the homey feel.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/menu">
              <Button className="bg-cafe-brown hover:bg-cafe-lightBrown text-cafe-cream">
                Browse Menu
              </Button>
            </Link>
            <Link to="/offers">
              <Button variant="outline" className="border-cafe-brown text-cafe-brown hover:bg-cafe-brown hover:text-cafe-cream">
                See Offers
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {featuredMenuItems.length > 0 && (
        <section className="py-16 bg-cafe-cream bg-opacity-50">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-playfair font-bold text-cafe-brown">Featured Menu</h2>
              <Link to="/menu" className="text-cafe-red hover:underline flex items-center">
                View All <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredMenuItems.map((item) => (
                <MenuCard key={item.id} item={item} />
              ))}
            </div>
          </div>
        </section>
      )}

      {activeOffers.length > 0 && (
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-playfair font-bold text-cafe-brown">Current Offers</h2>
              <Link to="/offers" className="text-cafe-red hover:underline flex items-center">
                View All <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {activeOffers.map((offer) => (
                <OfferCard key={offer.id} offer={offer} />
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="py-12 bg-cafe-brown text-cafe-cream rounded-lg">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div>
              <h2 className="text-3xl font-playfair font-bold mb-4">Robot API Access</h2>
              <p className="mb-6">
                The Nihal Café Robot can access the latest menu and offers through our API.
                {lastRobotFetch && (
                  <span className="block mt-2">
                    Last robot fetch: {lastRobotFetch.toLocaleString()}
                  </span>
                )}
              </p>
            </div>
            <Button
              onClick={simulateRobotFetch}
              className="bg-cafe-cream text-cafe-brown hover:bg-cafe-tan"
            >
              Simulate Robot Fetch
            </Button>
          </div>
          <div className="mt-8 p-4 bg-cafe-brown bg-opacity-50 rounded border border-cafe-cream font-mono">
            <p>GET /api/latest</p>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
