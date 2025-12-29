import { useState } from "react";
import { Brain, TrendingUp, Briefcase, Repeat, Coins, Shield, Megaphone, DollarSign } from "lucide-react";
import DashboardHeader from "@/components/DashboardHeader";
import DashboardAgentCard, { DashboardAgentData } from "@/components/DashboardAgentCard";
import FilterTabs from "@/components/FilterTabs";
import SortMenu from "@/components/SortMenu";
import { Input } from "@/components/ui/input";
import DashboardLogo from "@/components/DashboardLogo";

const DASHBOARD_AGENTS_DATA: DashboardAgentData[] = [
  {
    id: "d1",
    name: "Crypto Trading AI Agent",
    description: "Advanced AI agent for automated cryptocurrency trading with real-time market analysis and execution.",
    isBeta: false,
    transactionVolume: "$2,450,000",
    usageFee: "0.005 EP",
    volume24h: "$312K",
    change24h: 8.5,
    tokenPrice: "$0.045",
    users: "12,450",
    exchanges: ["binance", "huobi", "okx", "kucoin"],
    icon: <TrendingUp size={20} />
  },
  {
    id: "d2",
    name: "Crypto Consultant AI Agent",
    description: "Expert AI consultant providing insights on crypto investments, market trends, and portfolio strategies.",
    isBeta: false,
    transactionVolume: "$890,000",
    usageFee: "0.002 EP",
    volume24h: "$95K",
    change24h: 3.2,
    tokenPrice: "$0.032",
    users: "8,920",
    icon: <Brain size={20} />
  },
  {
    id: "d3",
    name: "Portfolio Management AI Agent",
    description: "Intelligent portfolio manager that balances and optimizes your crypto holdings for maximum returns.",
    isBeta: true,
    transactionVolume: "$1,780,000",
    usageFee: "0.008 EP",
    volume24h: "$189K",
    change24h: -1.8,
    tokenPrice: "$0.028",
    users: "6,340",
    exchanges: ["binance", "okx"],
    icon: <Briefcase size={20} />
  },
  {
    id: "d4",
    name: "Arbitrage Agent",
    description: "Detects and executes cross-exchange arbitrage opportunities for risk-free profits.",
    isBeta: false,
    transactionVolume: "$4,120,000",
    usageFee: "0.015 EP",
    volume24h: "$456K",
    change24h: 12.3,
    tokenPrice: "$0.067",
    users: "4,890",
    exchanges: ["binance", "huobi", "kucoin"],
    icon: <Repeat size={20} />
  },
  {
    id: "d5",
    name: "DEX Trading Agent",
    description: "Specialized agent for decentralized exchange trading with optimal gas management and slippage control.",
    isBeta: true,
    transactionVolume: "$1,230,000",
    usageFee: "0.01 EP",
    volume24h: "$178K",
    change24h: 5.7,
    tokenPrice: "$0.041",
    users: "7,560",
    exchanges: ["uniswap", "pancakeswap", "quickswap"],
    icon: <Coins size={20} />
  },
  {
    id: "d6",
    name: "KOL Genuinity Validator Agent",
    description: "Validates the authenticity and track record of crypto Key Opinion Leaders to protect against scams.",
    isBeta: true,
    transactionVolume: "$320,000",
    usageFee: "0.001 EP",
    volume24h: "$28K",
    change24h: -4.2,
    tokenPrice: "$0.012",
    users: "15,230",
    icon: <Shield size={20} />
  },
  {
    id: "d7",
    name: "Crypto Marketing Agent",
    description: "AI-powered marketing assistant for crypto projects, handling social media, community, and campaigns.",
    isBeta: false,
    transactionVolume: "$560,000",
    usageFee: "0.003 EP",
    volume24h: "$67K",
    change24h: 2.1,
    tokenPrice: "$0.019",
    users: "3,450",
    icon: <Megaphone size={20} />
  },
  {
    id: "d8",
    name: "FX Trading AI Agent",
    description: "Forex trading AI that applies crypto-inspired strategies to traditional currency markets.",
    isBeta: false,
    transactionVolume: "$3,450,000",
    usageFee: "0.02 EP",
    volume24h: "$398K",
    change24h: 6.8,
    tokenPrice: "$0.054",
    users: "5,120",
    exchanges: ["binance", "okx"],
    icon: <DollarSign size={20} />
  }
];

const FILTER_TABS = [
  { label: "Most Popular", value: "popular" },
  { label: "Most Recent", value: "recent" },
  { label: "Most Used", value: "used" }
];

const SORT_OPTIONS = [
  { label: "Highest First", value: "desc" },
  { label: "Lowest First", value: "asc" }
];

const STATUS_OPTIONS = [
  { label: "All", value: "all" },
  { label: "Beta", value: "beta" },
  { label: "Stable", value: "stable" }
];

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState<string>("popular");
  const [sortOrder, setSortOrder] = useState<string>("desc");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const filteredAgents = DASHBOARD_AGENTS_DATA
    .filter(agent => {
      const statusMatch = statusFilter === "all" || 
        (statusFilter === "beta" && agent.isBeta) ||
        (statusFilter === "stable" && !agent.isBeta);
      
      const searchMatch = searchQuery === "" || 
        agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        agent.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      return statusMatch && searchMatch;
    })
    .sort((a, b) => {
      if (activeTab === "popular") {
        const aValue = parseInt(a.users.replace(/[^0-9]/g, ''));
        const bValue = parseInt(b.users.replace(/[^0-9]/g, ''));
        return sortOrder === "desc" ? bValue - aValue : aValue - bValue;
      }
      if (activeTab === "used") {
        const aValue = parseInt(a.transactionVolume.replace(/[^0-9]/g, ''));
        const bValue = parseInt(b.transactionVolume.replace(/[^0-9]/g, ''));
        return sortOrder === "desc" ? bValue - aValue : aValue - bValue;
      }
      return sortOrder === "desc" 
        ? b.name.localeCompare(a.name) 
        : a.name.localeCompare(b.name);
    });

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <DashboardHeader />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">AI Agents Powered by the MIND Token</h1>
          <p className="text-muted-foreground">
            Discover and interact with specialized AI agents for various tasks
          </p>
        </div>
        
        <div className="mb-6 flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <Input
              placeholder="Search agents..."
              className="w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex gap-3 flex-wrap">
            <FilterTabs
              tabs={FILTER_TABS}
              activeTab={activeTab}
              onTabChange={setActiveTab}
              className="flex-1 min-w-[270px]"
            />
            
            <SortMenu
              options={SORT_OPTIONS}
              selectedOption={sortOrder}
              onSelect={setSortOrder}
              label="Sort"
            />
            
            <SortMenu
              options={STATUS_OPTIONS}
              selectedOption={statusFilter}
              onSelect={setStatusFilter}
              label="Status"
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredAgents.map(agent => (
            <DashboardAgentCard key={agent.id} agent={agent} />
          ))}
        </div>
        
        {filteredAgents.length === 0 && (
          <div className="text-center py-16">
            <p className="text-muted-foreground text-lg">No agents found matching your criteria</p>
          </div>
        )}
      </main>
      
      <footer className="bg-background border-t border-border/40 py-6">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <div className="flex items-center justify-center mb-2">
            <DashboardLogo size={18} className="!text-sm !mr-0" />
          </div>
          <p>© 2025 MIND Agents Dashboard. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;
