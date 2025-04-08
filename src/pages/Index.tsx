
import { useState } from "react";
import { Brain, Cog, FileText, Search, ShoppingCart, User, Wrench } from "lucide-react";
import Header from "@/components/Header";
import AgentCard, { AgentData } from "@/components/AgentCard";
import FilterTabs from "@/components/FilterTabs";
import SortMenu from "@/components/SortMenu";
import { Input } from "@/components/ui/input";
import Logo from "@/components/Logo";

export const AGENTS_DATA: AgentData[] = [
  {
    id: "3",
    name: "BDR AI",
    description: "Business Development Representative AI that can qualify leads and set up meetings with prospects.",
    status: "Emerging",
    tvl: "$356,780",
    marketCap: "$1.2M",
    volume24h: "$82K",
    change24h: 12.5,
    tokenPrice: "$0.015",
    holders: "1,230",
    tokenSymbol: "BDRAI",
    icon: <User size={20} />
  },
  {
    id: "1",
    name: "ChefAI",
    description: "A sophisticated AI chef assistant that can create recipes, meal plans, and cooking guidance.",
    status: "Operational",
    tvl: "$542,120",
    marketCap: "$2.5M",
    volume24h: "$134K",
    change24h: 5.8,
    tokenPrice: "$0.023",
    holders: "2,456",
    tokenSymbol: "CHEF",
    icon: <Cog size={20} />
  },
  {
    id: "2",
    name: "Web3 Expert",
    description: "Blockchain specialist AI that provides guidance on web3 technologies, smart contracts, and DeFi.",
    status: "Operational",
    tvl: "$1,287,045",
    marketCap: "$5.8M",
    volume24h: "$290K",
    change24h: -2.3,
    tokenPrice: "$0.058",
    holders: "6,782",
    tokenSymbol: "W3X",
    icon: <FileText size={20} />
  },
  {
    id: "4",
    name: "KOL AI",
    description: "Key Opinion Leader AI that can analyze social media trends and create content strategies.",
    status: "Emerging",
    tvl: "$189,650",
    marketCap: "$780K",
    volume24h: "$45K",
    change24h: -1.7,
    tokenPrice: "$0.008",
    holders: "892",
    tokenSymbol: "KOL",
    icon: <Brain size={20} />
  },
  {
    id: "5",
    name: "CopywriterGPT",
    description: "AI copywriter that generates compelling marketing copy, blog posts, and ad content.",
    status: "Operational",
    tvl: "$721,390",
    marketCap: "$3.2M",
    volume24h: "$189K",
    change24h: 7.2,
    tokenPrice: "$0.032",
    holders: "3,541",
    tokenSymbol: "COPY",
    icon: <Search size={20} />
  },
  {
    id: "6",
    name: "DesignGenius",
    description: "Creative AI assistant for generating design concepts, color schemes, and layout ideas.",
    status: "Operational",
    tvl: "$498,340",
    marketCap: "$2.1M",
    volume24h: "$123K",
    change24h: 3.5,
    tokenPrice: "$0.021",
    holders: "2,780",
    tokenSymbol: "DGN",
    icon: <Wrench size={20} />
  },
  {
    id: "7",
    name: "EcommerceGPT",
    description: "AI specialized in e-commerce strategies, product descriptions, and conversion optimization.",
    status: "Emerging",
    tvl: "$247,890",
    marketCap: "$950K",
    volume24h: "$67K",
    change24h: -5.3,
    tokenPrice: "$0.012",
    holders: "1,456",
    tokenSymbol: "ECMR",
    icon: <ShoppingCart size={20} />
  },
  {
    id: "8",
    name: "CodeMaster",
    description: "Programming assistant that helps with code generation, debugging, and technical documentation.",
    status: "Operational",
    tvl: "$875,420",
    marketCap: "$4.1M",
    volume24h: "$215K",
    change24h: 9.8,
    tokenPrice: "$0.045",
    holders: "4,890",
    tokenSymbol: "CODE",
    icon: <Brain size={20} />
  }
];

const FILTER_TABS = [
  { label: "Total Value Locked", value: "tvl" },
  { label: "Most Recent", value: "recent" },
  { label: "Most Used", value: "used" }
];

const SORT_OPTIONS = [
  { label: "Highest First", value: "desc" },
  { label: "Lowest First", value: "asc" }
];

const STATUS_OPTIONS = [
  { label: "All", value: "all" },
  { label: "Operational", value: "Operational" },
  { label: "Emerging", value: "Emerging" }
];

const Index = () => {
  const [activeTab, setActiveTab] = useState<string>("tvl");
  const [sortOrder, setSortOrder] = useState<string>("desc");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const filteredAgents = AGENTS_DATA
    .filter(agent => 
      (statusFilter === "all" || agent.status === statusFilter) &&
      (searchQuery === "" || agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
       agent.description.toLowerCase().includes(searchQuery.toLowerCase()))
    )
    .sort((a, b) => {
      if (activeTab === "tvl") {
        const aValue = parseInt(a.tvl.replace(/[^0-9]/g, ''));
        const bValue = parseInt(b.tvl.replace(/[^0-9]/g, ''));
        return sortOrder === "desc" ? bValue - aValue : aValue - bValue;
      }
      return sortOrder === "desc" 
        ? b.name.localeCompare(a.name) 
        : a.name.localeCompare(b.name);
    });

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Decentralized Network for AI Agents</h1>
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
            <AgentCard key={agent.id} agent={agent} />
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
            <Logo size={18} className="!text-sm !mr-0" />
          </div>
          <p>© 2023 MindAI Protocol. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
