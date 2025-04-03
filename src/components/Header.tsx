
import { Brain, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="border-b border-border/40 bg-background/95 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Brain size={28} className="text-accent" />
          <span className="font-bold text-xl tracking-tight">MindAI Protocol</span>
        </div>
        
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
