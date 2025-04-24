
import { MenuItem } from "@/types";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";

interface MenuCardProps {
  item: MenuItem;
}

export default function MenuCard({ item }: MenuCardProps) {
  return (
    <Card className="overflow-hidden western-border bg-cafe-cream animate-fade-in hover:shadow-lg transition-shadow">
      <div className="relative">
        {item.image ? (
          <img 
            src={item.image} 
            alt={item.name}
            className="w-full h-48 object-cover"
          />
        ) : (
          <div className="w-full h-48 bg-cafe-lightBrown bg-opacity-30 flex items-center justify-center">
            <span className="text-cafe-brown font-playfair text-xl">Nihal Café</span>
          </div>
        )}
        <div className="absolute top-2 right-2 bg-cafe-brown text-cafe-cream px-3 py-1 rounded-full text-sm">
          {item.category}
        </div>
      </div>
      
      <CardHeader>
        <CardTitle className="text-cafe-brown">{item.name}</CardTitle>
        <CardDescription>{item.description}</CardDescription>
      </CardHeader>
      
      <CardFooter className="flex justify-between items-center">
        <span className="text-lg font-bold text-cafe-red">{formatCurrency(item.price)}</span>
      </CardFooter>
    </Card>
  );
}
