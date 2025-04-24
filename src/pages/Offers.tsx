
import Layout from "@/components/Layout";
import { useCafe } from "@/context/CafeContext";
import OfferCard from "@/components/OfferCard";
import { useState } from "react";

const Offers = () => {
  const { offers } = useCafe();
  const [showExpired, setShowExpired] = useState(false);
  
  const currentDate = new Date();
  
  const activeOffers = offers.filter(
    (offer) => new Date(offer.validUntil) >= currentDate
  );
  
  const expiredOffers = offers.filter(
    (offer) => new Date(offer.validUntil) < currentDate
  );
  
  const displayedOffers = showExpired ? offers : activeOffers;

  return (
    <Layout>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-cafe-brown mb-4">Special Offers</h1>
          <p className="text-lg text-muted-foreground">
            Take advantage of our limited-time deals and promotions
          </p>
        </div>
        
        <div className="mb-8 flex justify-end">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={showExpired}
              onChange={() => setShowExpired(!showExpired)}
              className="rounded border-cafe-brown text-cafe-red focus:ring-cafe-red"
            />
            <span>Show expired offers</span>
          </label>
        </div>
        
        {displayedOffers.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {displayedOffers.map((offer) => (
              <OfferCard key={offer.id} offer={offer} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <h3 className="text-xl text-muted-foreground">No offers available at this time.</h3>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Offers;
