
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useCafe } from "@/context/CafeContext";
import Layout from "@/components/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { formatCurrency } from "@/lib/utils";
import { toast } from "sonner";
import ImageUploader from "@/components/ImageUploader";
import { MenuItem, Offer } from "@/types";
import MenuCard from "@/components/MenuCard";
import OfferCard from "@/components/OfferCard";
import { Plus, Trash } from "lucide-react";

const Admin = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { 
    menuItems, 
    offers, 
    addMenuItem, 
    addOffer, 
    uploadMenu, 
    uploadOffers
  } = useCafe();

  // State for menu item form
  const [menuItem, setMenuItem] = useState<Partial<MenuItem>>({
    name: "",
    description: "",
    price: 0,
    category: "",
    image: "",
  });

  // State for offer form
  const [offer, setOffer] = useState<Partial<Offer>>({
    title: "",
    description: "",
    discount: "",
    validUntil: new Date(new Date().setMonth(new Date().getMonth() + 1)).toISOString().split("T")[0],
    image: "",
  });

  // State for managing temporary menu items and offers
  const [tempMenuItems, setTempMenuItems] = useState<MenuItem[]>([]);
  const [tempOffers, setTempOffers] = useState<Offer[]>([]);

  // Initialize temp items from context on mount
  useEffect(() => {
    setTempMenuItems([...menuItems]);
    setTempOffers([...offers]);
  }, [menuItems, offers]);

  // Redirect if not admin
  useEffect(() => {
    if (!user) {
      navigate("/login");
    } else if (!user.isAdmin) {
      navigate("/");
      toast.error("You don't have admin privileges");
    }
  }, [user, navigate]);

  // Menu item handlers
  const handleMenuItemChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const parsedValue = name === "price" ? parseFloat(value) || 0 : value;
    
    setMenuItem({
      ...menuItem,
      [name]: parsedValue,
    });
  };

  const handleMenuItemImageUpload = (imageUrl: string) => {
    setMenuItem({
      ...menuItem,
      image: imageUrl,
    });
  };

  const addTempMenuItem = () => {
    // Validate form
    if (!menuItem.name || !menuItem.description || !menuItem.category) {
      toast.error("Please fill out all required fields");
      return;
    }

    const newMenuItem = {
      ...menuItem,
      id: `temp_${Date.now()}`,
      createdAt: new Date().toISOString(),
    } as MenuItem;

    setTempMenuItems([...tempMenuItems, newMenuItem]);
    
    // Clear form
    setMenuItem({
      name: "",
      description: "",
      price: 0,
      category: "",
      image: "",
    });

    toast.success(`${newMenuItem.name} added to menu draft`);
  };

  const removeTempMenuItem = (id: string) => {
    setTempMenuItems(tempMenuItems.filter(item => item.id !== id));
  };

  // Offer handlers
  const handleOfferChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setOffer({
      ...offer,
      [name]: value,
    });
  };

  const handleOfferImageUpload = (imageUrl: string) => {
    setOffer({
      ...offer,
      image: imageUrl,
    });
  };

  const addTempOffer = () => {
    // Validate form
    if (!offer.title || !offer.description || !offer.discount || !offer.validUntil) {
      toast.error("Please fill out all required fields");
      return;
    }

    const newOffer = {
      ...offer,
      id: `temp_${Date.now()}`,
      createdAt: new Date().toISOString(),
    } as Offer;

    setTempOffers([...tempOffers, newOffer]);
    
    // Clear form
    setOffer({
      title: "",
      description: "",
      discount: "",
      validUntil: new Date(new Date().setMonth(new Date().getMonth() + 1)).toISOString().split("T")[0],
      image: "",
    });

    toast.success(`${newOffer.title} added to offers draft`);
  };

  const removeTempOffer = (id: string) => {
    setTempOffers(tempOffers.filter(item => item.id !== id));
  };

  // Publish handlers
  const publishMenu = () => {
    if (tempMenuItems.length === 0) {
      toast.error("Add at least one menu item before publishing");
      return;
    }

    uploadMenu(tempMenuItems, user?.email || "admin");
  };

  const publishOffers = () => {
    if (tempOffers.length === 0) {
      toast.error("Add at least one offer before publishing");
      return;
    }

    uploadOffers(tempOffers, user?.email || "admin");
  };

  if (!user) {
    return null; // Will redirect in useEffect
  }

  return (
    <Layout>
      <div className="container mx-auto py-8">
        <Card>
          <CardHeader>
            <CardTitle>Admin Dashboard</CardTitle>
            <CardDescription>Manage menu items and offers for Nihal Café</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="menu">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="menu">Menu Management</TabsTrigger>
                <TabsTrigger value="offers">Offers Management</TabsTrigger>
              </TabsList>
              
              {/* Menu Management */}
              <TabsContent value="menu" className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="font-playfair text-xl font-semibold mb-4">Add Menu Item</h3>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Item Name *</Label>
                        <Input
                          id="name"
                          name="name"
                          value={menuItem.name}
                          onChange={handleMenuItemChange}
                          placeholder="Trail Rider Burger"
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="description">Description *</Label>
                        <Textarea
                          id="description"
                          name="description"
                          value={menuItem.description}
                          onChange={handleMenuItemChange}
                          placeholder="A juicy burger with fresh toppings"
                          required
                        />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="price">Price ($) *</Label>
                          <Input
                            id="price"
                            name="price"
                            type="number"
                            min="0"
                            step="0.01"
                            value={menuItem.price}
                            onChange={handleMenuItemChange}
                            placeholder="12.99"
                            required
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="category">Category *</Label>
                          <Input
                            id="category"
                            name="category"
                            value={menuItem.category}
                            onChange={handleMenuItemChange}
                            placeholder="Main, Dessert, Drinks, etc."
                            required
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="menu-image">Image</Label>
                        <ImageUploader onImageUpload={handleMenuItemImageUpload} />
                      </div>
                      
                      <Button 
                        onClick={addTempMenuItem} 
                        className="bg-cafe-brown hover:bg-cafe-lightBrown text-cafe-cream"
                      >
                        <Plus className="mr-2 h-4 w-4" /> Add to Menu Draft
                      </Button>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="font-playfair text-xl font-semibold">Menu Draft</h3>
                      <Button 
                        onClick={publishMenu} 
                        className="bg-cafe-red hover:bg-red-700 text-white"
                      >
                        Publish Menu
                      </Button>
                    </div>
                    
                    <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
                      {tempMenuItems.length > 0 ? (
                        tempMenuItems.map((item) => (
                          <div key={item.id} className="relative">
                            <div className="p-4 border rounded-md bg-white">
                              <div className="flex justify-between mb-2">
                                <div>
                                  <h4 className="font-semibold">{item.name}</h4>
                                  <p className="text-sm text-muted-foreground">{item.category}</p>
                                </div>
                                <span className="font-bold">{formatCurrency(item.price)}</span>
                              </div>
                              <p className="text-sm mb-2">{item.description}</p>
                              {item.image && (
                                <img 
                                  src={item.image} 
                                  alt={item.name} 
                                  className="h-20 w-auto object-cover rounded"
                                />
                              )}
                              
                              <Button
                                variant="outline"
                                size="icon"
                                onClick={() => removeTempMenuItem(item.id)}
                                className="absolute top-2 right-2 text-red-500 hover:text-red-700 hover:bg-red-50"
                              >
                                <Trash className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="text-center py-8 bg-muted rounded-md">
                          <p className="text-muted-foreground">No menu items added yet</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              {/* Offers Management */}
              <TabsContent value="offers" className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="font-playfair text-xl font-semibold mb-4">Add Offer</h3>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="title">Offer Title *</Label>
                        <Input
                          id="title"
                          name="title"
                          value={offer.title}
                          onChange={handleOfferChange}
                          placeholder="Weekend Special"
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="offerDescription">Description *</Label>
                        <Textarea
                          id="offerDescription"
                          name="description"
                          value={offer.description}
                          onChange={handleOfferChange}
                          placeholder="Get 20% off on all main courses during weekends"
                          required
                        />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="discount">Discount *</Label>
                          <Input
                            id="discount"
                            name="discount"
                            value={offer.discount}
                            onChange={handleOfferChange}
                            placeholder="20%"
                            required
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="validUntil">Valid Until *</Label>
                          <Input
                            id="validUntil"
                            name="validUntil"
                            type="date"
                            value={offer.validUntil}
                            onChange={handleOfferChange}
                            required
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="offer-image">Image</Label>
                        <ImageUploader onImageUpload={handleOfferImageUpload} />
                      </div>
                      
                      <Button 
                        onClick={addTempOffer} 
                        className="bg-cafe-brown hover:bg-cafe-lightBrown text-cafe-cream"
                      >
                        <Plus className="mr-2 h-4 w-4" /> Add to Offers Draft
                      </Button>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="font-playfair text-xl font-semibold">Offers Draft</h3>
                      <Button 
                        onClick={publishOffers} 
                        className="bg-cafe-red hover:bg-red-700 text-white"
                      >
                        Publish Offers
                      </Button>
                    </div>
                    
                    <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
                      {tempOffers.length > 0 ? (
                        tempOffers.map((item) => (
                          <div key={item.id} className="relative">
                            <div className="p-4 border rounded-md bg-white">
                              <div className="flex justify-between mb-2">
                                <div>
                                  <h4 className="font-semibold">{item.title}</h4>
                                  <p className="text-sm text-muted-foreground">
                                    Valid until: {new Date(item.validUntil).toLocaleDateString()}
                                  </p>
                                </div>
                                <span className="font-bold text-cafe-red">{item.discount} OFF</span>
                              </div>
                              <p className="text-sm mb-2">{item.description}</p>
                              {item.image && (
                                <img 
                                  src={item.image} 
                                  alt={item.title} 
                                  className="h-20 w-auto object-cover rounded"
                                />
                              )}
                              
                              <Button
                                variant="outline"
                                size="icon"
                                onClick={() => removeTempOffer(item.id)}
                                className="absolute top-2 right-2 text-red-500 hover:text-red-700 hover:bg-red-50"
                              >
                                <Trash className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="text-center py-8 bg-muted rounded-md">
                          <p className="text-muted-foreground">No offers added yet</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
        
        {/* API Information */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>API Information</CardTitle>
            <CardDescription>
              Use these endpoints to access the menu and offers data for the robot system
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Get Latest Menu and Offers</h3>
                <div className="p-4 bg-muted rounded-md font-mono">
                  GET /api/latest
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">Sample Response</h3>
                <div className="p-4 bg-muted rounded-md font-mono text-xs overflow-auto max-h-48">
                  {JSON.stringify({
                    menu: menuItems.slice(0, 2),
                    offers: offers.slice(0, 1),
                    timestamp: new Date().toISOString()
                  }, null, 2)}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Admin;
