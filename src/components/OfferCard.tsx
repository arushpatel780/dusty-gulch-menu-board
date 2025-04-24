
import { Offer } from "@/types";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

interface OfferCardProps {
  offer: Offer;
}

export default function OfferCard({ offer }: OfferCardProps) {
  const isExpired = new Date(offer.validUntil) < new Date();
  
  return (
    <Card className="overflow-hidden western-border bg-cafe-cream animate-fade-in hover:shadow-lg transition-shadow">
      <div className="relative">
        {offer.image ? (
          <img 
            src={offer.image} 
            alt={offer.title}
            className="w-full h-48 object-cover"
          />
        ) : (
          <div className="w-full h-48 bg-cafe-red bg-opacity-20 flex items-center justify-center">
            <span className="text-cafe-brown font-playfair text-xl">Special Offer</span>
          </div>
        )}
        <div className="absolute top-2 right-2 bg-cafe-red text-cafe-cream px-3 py-1 rounded-full text-sm">
          {offer.discount} OFF
        </div>
        {isExpired && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <span className="text-white text-2xl font-bold transform rotate-[-15deg]">EXPIRED</span>
          </div>
        )}
      </div>
      
      <CardHeader>
        <CardTitle className="text-cafe-brown">{offer.title}</CardTitle>
        <CardDescription>{offer.description}</CardDescription>
      </CardHeader>
      
      <CardFooter className="flex justify-between items-center">
        <div>
          <span className="text-sm text-muted-foreground">
            Valid until: {new Date(offer.validUntil).toLocaleDateString()}
          </span>
        </div>
      </CardFooter>
    </Card>
  );
}
