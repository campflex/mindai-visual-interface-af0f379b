import { Menu, Coins } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Link } from "react-router-dom";
import DashboardLogo from "./DashboardLogo";
import { useWallet } from "@/hooks/useWallet";

const DashboardHeader = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { connectWallet, disconnectWallet, isConnected, address, isConnecting } = useWallet();

  const shortAddress = address
    ? address.slice(0, 5) + "..." + address.slice(-4)
    : "";

  return (
    <header className="border-b border-border/40 bg-background/95 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/dashboard">
          <DashboardLogo />
        </Link>
        
        <div className="hidden md:flex items-center gap-4">
          <nav className="flex gap-6 items-center">
            <Link to="/dashboard" className="text-foreground/90 hover:text-accent transition-colors">
              All Agents
            </Link>
            <Link to="/dashboard" className="text-foreground/90 hover:text-accent transition-colors">
              Favourites
            </Link>
            <a href="#" className="text-foreground/80 hover:text-accent transition-colors">
              Documentation
            </a>
          </nav>

          <Button className="flex items-center bg-accent hover:bg-accent/50 glow text-black font-semibold whitespace-nowrap">
            <Coins size={18} className="mr-1" />
            10,000.00 EP
          </Button>

          <Button
            variant="outline"
            className="flex items-center border-accent/50 text-accent hover:bg-accent/10 hover:text-accent whitespace-nowrap min-w-[120px]"
            disabled={isConnecting}
            onClick={isConnected ? disconnectWallet : connectWallet}
          >
            {isConnected 
              ? `Disconnect (${shortAddress})`
              : isConnecting
                ? "Connecting..."
                : "Connect Wallet"
            }
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
            <Link to="/dashboard" className="text-foreground/80 hover:text-accent transition-colors py-2">
              All Agents
            </Link>
            <Link to="/dashboard" className="text-foreground/80 hover:text-accent transition-colors py-2">
              Favourites
            </Link>
            <a href="#" className="text-foreground/80 hover:text-accent transition-colors py-2">
              Documentation
            </a>
            <Button className="bg-accent hover:bg-accent/90 mb-2">
              <Coins size={18} className="mr-1" />
              10,000.00 EP
            </Button>
            <Button
              variant="outline"
              className="border-accent/50 text-accent hover:bg-accent/10 hover:text-accent min-w-[120px]"
              disabled={isConnecting}
              onClick={isConnected ? disconnectWallet : connectWallet}
            >
              {isConnected 
                ? `Disconnect (${shortAddress})`
                : isConnecting
                  ? "Connecting..."
                  : "Connect Wallet"
              }
            </Button>
          </div>
        )}
      </div>
    </header>
  );
};

export default DashboardHeader;
