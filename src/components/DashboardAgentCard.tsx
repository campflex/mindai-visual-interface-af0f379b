import { ArrowUpRight, Brain, Sparkles, TrendingDown, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import BetaBadge from "./BetaBadge";
import ExchangeIcons from "./ExchangeIcons";
import { Link } from "react-router-dom";

export type DashboardAgentData = {
  id: string;
  name: string;
  description: string;
  isBeta: boolean;
  transactionVolume?: string;
  usageFee: string;
  volume24h: string;
  change24h: number;
  users: string;
  exchanges?: ("binance" | "huobi" | "okx" | "kucoin" | "uniswap" | "pancakeswap" | "quickswap")[];
  icon?: React.ReactNode;
  customMetric?: {
    label: string;
    value: string;
  };
};

const DashboardAgentCard = ({ agent }: { agent: DashboardAgentData }) => {
  const primaryMetricLabel = agent.customMetric?.label || "Transaction Volume";
  const primaryMetricValue = agent.customMetric?.value || agent.transactionVolume || "-";
  
  const progressValue = agent.transactionVolume 
    ? Math.min(parseInt(agent.transactionVolume.replace(/[^0-9]/g, '')) / 10000 * 100, 100)
    : agent.customMetric 
      ? Math.min(parseInt(agent.customMetric.value.replace(/[^0-9]/g, '')) / 200 * 100, 100)
      : 50;

  return (
    <Link to={`/agent/${agent.id}`} className="block h-full">
      <div className="glass-card gradient-border rounded-xl overflow-hidden hover-scale h-full flex flex-col">
        <div className="p-6 flex-1 flex flex-col">
          <div className="flex justify-between items-start mb-4">
            <div className="flex gap-3 items-center">
              <div className="h-10 w-10 rounded-full bg-accent/20 flex items-center justify-center text-accent glow">
                {agent.icon || <Brain size={20} />}
              </div>
              <div>
                <h3 className="font-medium text-lg gradient-text">{agent.name}</h3>
                <div className="flex items-center gap-2">
                  <BetaBadge isBeta={agent.isBeta} />
                  {agent.exchanges && agent.exchanges.length > 0 && (
                    <ExchangeIcons exchanges={agent.exchanges} />
                  )}
                </div>
              </div>
            </div>
            <Button variant="ghost" size="icon" className="text-accent hover:text-accent/80" onClick={(e) => e.preventDefault()}>
              <ArrowUpRight size={18} />
            </Button>
          </div>
          
          <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
            {agent.description}
          </p>
          
          <div className="grid grid-cols-2 gap-x-4 gap-y-3 mb-4 flex-1">
            <div>
              <span className="text-xs text-muted-foreground">{primaryMetricLabel}</span>
              <p className="font-medium">{primaryMetricValue}</p>
            </div>
            <div>
              <span className="text-xs text-muted-foreground">Usage Fee</span>
              <p className="font-medium">{agent.usageFee}</p>
            </div>
            <div>
              <span className="text-xs text-muted-foreground">24h Vol</span>
              <p className="font-medium">{agent.volume24h}</p>
            </div>
            <div>
              <span className="text-xs text-muted-foreground">Users</span>
              <p className="font-medium">{agent.users}</p>
            </div>
            <div className="col-span-2">
              <span className="text-xs text-muted-foreground">24h Chg</span>
              <div className={`flex items-center gap-1 ${agent.change24h >= 0 ? 'text-accent' : 'text-red-500'}`}>
                {agent.change24h >= 0 ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                <span className="font-medium">{agent.change24h >= 0 ? '+' : ''}{agent.change24h}%</span>
              </div>
            </div>
          </div>

          <div className="h-1 w-full bg-secondary rounded-full overflow-hidden mt-auto">
            <div 
              className="h-full bg-accent" 
              style={{ width: `${progressValue}%` }}
            />
          </div>
        </div>
        
        <div className="border-t border-border/40 p-4 bg-secondary/50 mt-auto">
          <Button className="w-full bg-accent hover:bg-accent/90 glow text-black font-semibold" onClick={(e) => e.preventDefault()}>
            <Sparkles size={16} className="mr-2" />
            Use Agent
          </Button>
        </div>
      </div>
    </Link>
  );
};

export default DashboardAgentCard;
