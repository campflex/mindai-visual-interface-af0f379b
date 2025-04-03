import { ArrowUpRight, Brain, Sparkles, TrendingDown, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import StatusBadge from "./StatusBadge";
import { Link } from "react-router-dom";

export type AgentData = {
  id: string;
  name: string;
  description: string;
  status: "Emerging" | "Operational";
  tvl: string;
  marketCap: string;
  volume24h: string;
  change24h: number;
  tokenPrice: string;
  holders: string;
  icon?: React.ReactNode;
};

const AgentCard = ({ agent }: { agent: AgentData }) => {
  return (
    <Link to={`/agent/${agent.id}`} className="block">
      <div className="glass-card rounded-xl overflow-hidden hover-scale">
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div className="flex gap-3 items-center">
              <div className="h-10 w-10 rounded-full bg-accent/10 flex items-center justify-center text-accent">
                {agent.icon || <Brain size={20} />}
              </div>
              <div>
                <h3 className="font-medium text-lg">{agent.name}</h3>
                <StatusBadge status={agent.status} />
              </div>
            </div>
            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-accent" onClick={(e) => e.preventDefault()}>
              <ArrowUpRight size={18} />
            </Button>
          </div>
          
          <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
            {agent.description}
          </p>
          
          <div className="grid grid-cols-2 gap-x-4 gap-y-3 mb-4">
            <div>
              <span className="text-xs text-muted-foreground">TVL</span>
              <p className="font-medium">{agent.tvl}</p>
            </div>
            <div>
              <span className="text-xs text-muted-foreground">Market Cap</span>
              <p className="font-medium">{agent.marketCap}</p>
            </div>
            <div>
              <span className="text-xs text-muted-foreground">Token Price</span>
              <p className="font-medium">{agent.tokenPrice}</p>
            </div>
            <div>
              <span className="text-xs text-muted-foreground">24h Vol</span>
              <p className="font-medium">{agent.volume24h}</p>
            </div>
            <div>
              <span className="text-xs text-muted-foreground">Holders</span>
              <p className="font-medium">{agent.holders}</p>
            </div>
            <div>
              <span className="text-xs text-muted-foreground">24h Chg</span>
              <div className={`flex items-center gap-1 ${agent.change24h >= 0 ? 'text-emerald-500' : 'text-red-500'}`}>
                {agent.change24h >= 0 ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                <span className="font-medium">{agent.change24h >= 0 ? '+' : ''}{agent.change24h}%</span>
              </div>
            </div>
          </div>

          <div className="h-1 w-full bg-secondary rounded-full overflow-hidden">
            <div 
              className="h-full bg-accent animate-pulse-light" 
              style={{ 
                width: `${Math.min(parseInt(agent.tvl.replace(/[^0-9]/g, '')) / 1000 * 100, 100)}%` 
              }}
            />
          </div>
        </div>
        
        <div className="border-t border-border/40 p-4 bg-secondary/50">
          <Button className="w-full bg-accent hover:bg-accent/90" onClick={(e) => e.preventDefault()}>
            <Sparkles size={16} className="mr-2" />
            Use Agent
          </Button>
        </div>
      </div>
    </Link>
  );
};

export default AgentCard;
