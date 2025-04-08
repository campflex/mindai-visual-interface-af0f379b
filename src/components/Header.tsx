
import { Menu, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import Logo from "./Logo";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="border-b border-border/40 bg-background/95 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Logo />
        
        <div className="hidden md:flex items-center gap-4">
          <nav className="flex gap-6 items-center">
            <a href="#" className="text-foreground/80 hover:text-accent transition-colors">
              All Agents
            </a>
            <a href="#" className="text-foreground/80 hover:text-accent transition-colors">
              My Agents
            </a>
            <a href="#" className="text-foreground/80 hover:text-accent transition-colors">
              Documentation
            </a>
          </nav>
          
          <Button className="bg-accent hover:bg-accent/90 mr-2">
            <Plus size={18} className="mr-1" />
            Create New Agent
          </Button>
          
          <Button variant="outline" className="border-accent/50 text-accent hover:bg-accent/10 hover:text-accent">
            Connect Wallet
          </Button>
        </div>
        
        <Button 
          variant="ghost" 
          size="icon" 
          className="md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <Menu />
        </Button>
        
        {mobileMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-background border-b border-border/40 py-4 px-4 flex flex-col gap-4 md:hidden animate-fade-in">
            <a href="#" className="text-foreground/80 hover:text-accent transition-colors py-2">
              All Agents
            </a>
            <a href="#" className="text-foreground/80 hover:text-accent transition-colors py-2">
              My Agents
            </a>
            <a href="#" className="text-foreground/80 hover:text-accent transition-colors py-2">
              Documentation
            </a>
            <Button className="bg-accent hover:bg-accent/90 mb-2">
              <Plus size={18} className="mr-1" />
              Create New Agent
            </Button>
            <Button variant="outline" className="border-accent/50 text-accent hover:bg-accent/10 hover:text-accent">
              Connect Wallet
            </Button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
