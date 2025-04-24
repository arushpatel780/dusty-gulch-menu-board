
export interface User {
  id: string;
  email: string;
  isAdmin: boolean;
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image?: string;
  createdAt: string;
}

export interface Offer {
  id: string;
  title: string;
  description: string;
  discount: string;
  validUntil: string;
  image?: string;
  createdAt: string;
}

export interface MenuUpload {
  items: MenuItem[];
  date: string;
  createdBy: string;
}

export interface OfferUpload {
  offers: Offer[];
  date: string;
  createdBy: string;
}
