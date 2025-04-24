
import Layout from "@/components/Layout";
import { useCafe } from "@/context/CafeContext";
import MenuCard from "@/components/MenuCard";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

const Menu = () => {
  const { menuItems } = useCafe();
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("");
  
  // Extract unique categories
  const categories = Array.from(
    new Set(menuItems.map((item) => item.category))
  );
  
  // Filter menu items based on search and category
  const filteredMenuItems = menuItems.filter((item) => {
    const matchesSearch = 
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase());
      
    const matchesCategory = 
      categoryFilter === "" || item.category === categoryFilter;
      
    return matchesSearch && matchesCategory;
  });

  return (
    <Layout>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-cafe-brown mb-4">Our Menu</h1>
          <p className="text-lg text-muted-foreground">
            Discover our delicious offerings, prepared with care and tradition
          </p>
        </div>
        
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-grow">
              <Input
                type="text"
                placeholder="Search menu..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            </div>
            
            <div className="flex gap-2 flex-wrap">
              <Button
                variant={categoryFilter === "" ? "default" : "outline"}
                onClick={() => setCategoryFilter("")}
                className={categoryFilter === "" ? "bg-cafe-brown text-cafe-cream" : ""}
              >
                All
              </Button>
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={categoryFilter === category ? "default" : "outline"}
                  onClick={() => setCategoryFilter(category)}
                  className={categoryFilter === category ? "bg-cafe-brown text-cafe-cream" : ""}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </div>
        
        {filteredMenuItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {filteredMenuItems.map((item) => (
              <MenuCard key={item.id} item={item} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <h3 className="text-xl text-muted-foreground">No menu items found.</h3>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Menu;
