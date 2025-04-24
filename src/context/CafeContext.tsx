
import React, { createContext, useContext, useState, useEffect } from "react";
import { MenuItem, Offer, MenuUpload, OfferUpload } from "@/types";
import { toast } from "sonner";

interface CafeContextType {
  menuItems: MenuItem[];
  offers: Offer[];
  menuUploads: MenuUpload[];
  offerUploads: OfferUpload[];
  isLoading: boolean;
  addMenuItem: (item: Omit<MenuItem, "id" | "createdAt">) => void;
  addOffer: (offer: Omit<Offer, "id" | "createdAt">) => void;
  uploadMenu: (items: MenuItem[], createdBy: string) => void;
  uploadOffers: (offers: Offer[], createdBy: string) => void;
  lastRobotFetch: Date | null;
  simulateRobotFetch: () => void;
}

const CafeContext = createContext<CafeContextType | undefined>(undefined);

// Mock initial data
const INITIAL_MENU_ITEMS: MenuItem[] = [
  {
    id: "1",
    name: "Classic Horseshoe Burger",
    description: "Juicy beef patty with special sauce and fresh toppings",
    price: 12.99,
    category: "Main",
    createdAt: new Date().toISOString(),
  },
  {
    id: "2",
    name: "Trail Rider Salad",
    description: "Fresh greens with grilled chicken and ranch dressing",
    price: 9.99,
    category: "Salads",
    createdAt: new Date().toISOString(),
  },
  {
    id: "3",
    name: "Cowboy Coffee",
    description: "Strong black coffee, brewed the traditional way",
    price: 3.99,
    category: "Drinks",
    createdAt: new Date().toISOString(),
  },
];

const INITIAL_OFFERS: Offer[] = [
  {
    id: "1",
    title: "Happy Hour",
    description: "50% off all drinks between 4pm and 6pm",
    discount: "50%",
    validUntil: new Date(new Date().setDate(new Date().getDate() + 30)).toISOString(),
    createdAt: new Date().toISOString(),
  },
];

export const CafeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [offers, setOffers] = useState<Offer[]>([]);
  const [menuUploads, setMenuUploads] = useState<MenuUpload[]>([]);
  const [offerUploads, setOfferUploads] = useState<OfferUpload[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [lastRobotFetch, setLastRobotFetch] = useState<Date | null>(null);

  useEffect(() => {
    // Load data from localStorage or use initial data
    const storedMenuItems = localStorage.getItem("menuItems");
    const storedOffers = localStorage.getItem("offers");
    const storedMenuUploads = localStorage.getItem("menuUploads");
    const storedOfferUploads = localStorage.getItem("offerUploads");
    
    setMenuItems(storedMenuItems ? JSON.parse(storedMenuItems) : INITIAL_MENU_ITEMS);
    setOffers(storedOffers ? JSON.parse(storedOffers) : INITIAL_OFFERS);
    setMenuUploads(storedMenuUploads ? JSON.parse(storedMenuUploads) : []);
    setOfferUploads(storedOfferUploads ? JSON.parse(storedOfferUploads) : []);
    
    setIsLoading(false);
  }, []);

  // Save to localStorage whenever data changes
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem("menuItems", JSON.stringify(menuItems));
      localStorage.setItem("offers", JSON.stringify(offers));
      localStorage.setItem("menuUploads", JSON.stringify(menuUploads));
      localStorage.setItem("offerUploads", JSON.stringify(offerUploads));
    }
  }, [menuItems, offers, menuUploads, offerUploads, isLoading]);

  const addMenuItem = (item: Omit<MenuItem, "id" | "createdAt">) => {
    const newItem = {
      ...item,
      id: `menu_${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    setMenuItems((prev) => [...prev, newItem]);
    toast.success(`Added ${newItem.name} to menu`);
  };

  const addOffer = (offer: Omit<Offer, "id" | "createdAt">) => {
    const newOffer = {
      ...offer,
      id: `offer_${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    setOffers((prev) => [...prev, newOffer]);
    toast.success(`Added ${newOffer.title} offer`);
  };

  const uploadMenu = (items: MenuItem[], createdBy: string) => {
    const newUpload = {
      items,
      date: new Date().toISOString(),
      createdBy,
    };
    setMenuUploads((prev) => [newUpload, ...prev]);
    setMenuItems(items);
    toast.success("Menu uploaded successfully!");
  };

  const uploadOffers = (items: Offer[], createdBy: string) => {
    const newUpload = {
      offers: items,
      date: new Date().toISOString(),
      createdBy,
    };
    setOfferUploads((prev) => [newUpload, ...prev]);
    setOffers(items);
    toast.success("Offers uploaded successfully!");
  };

  const simulateRobotFetch = () => {
    const now = new Date();
    setLastRobotFetch(now);
    toast.success("Robot fetched the latest data");
  };

  return (
    <CafeContext.Provider
      value={{
        menuItems,
        offers,
        menuUploads,
        offerUploads,
        isLoading,
        addMenuItem,
        addOffer,
        uploadMenu,
        uploadOffers,
        lastRobotFetch,
        simulateRobotFetch
      }}
    >
      {children}
    </CafeContext.Provider>
  );
};

export const useCafe = () => {
  const context = useContext(CafeContext);
  if (context === undefined) {
    throw new Error("useCafe must be used within a CafeProvider");
  }
  return context;
};
