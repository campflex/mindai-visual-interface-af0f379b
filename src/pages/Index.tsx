
import { useState } from "react";
import { Brain, Cog, FileText, Search, ShoppingCart, User, Wrench } from "lucide-react";
import Header from "@/components/Header";
import AgentCard, { AgentData } from "@/components/AgentCard";
import FilterTabs from "@/components/FilterTabs";
import SortMenu from "@/components/SortMenu";
import { Input } from "@/components/ui/input";

const AGENTS_DATA: AgentData[] = [
  {
    id: "1",
    name: "ChefAI",
    description: "A sophisticated AI chef assistant that can create recipes, meal plans, and cooking guidance.",
    status: "Operational",
    tvl: "$542,120",
    icon: <Cog size={20} />
  },
  {
    id: "2",
    name: "Web3 Expert",
    description: "Blockchain specialist AI that provides guidance on web3 technologies, smart contracts, and DeFi.",
    status: "Operational",
    tvl: "$1,287,045",
    icon: <FileText size={20} />
  },
  {
    id: "3",
    name: "BDR AI",
    description: "Business Development Representative AI that can qualify leads and set up meetings with prospects.",
    status: "Emerging",
    tvl: "$356,780",
    icon: <User size={20} />
  },
  {
    id: "4",
    name: "KOL AI",
    description: "Key Opinion Leader AI that can analyze social media trends and create content strategies.",
    status: "Emerging",
    tvl: "$189,650",
    icon: <Brain size={20} />
  },
  {
    id: "5",
    name: "CopywriterGPT",
    description: "AI copywriter that generates compelling marketing copy, blog posts, and ad content.",
    status: "Operational",
    tvl: "$721,390",
    icon: <Search size={20} />
  },
  {
    id: "6",
    name: "DesignGenius",
    description: "Creative AI assistant for generating design concepts, color schemes, and layout ideas.",
    status: "Operational",
    tvl: "$498,340",
    icon: <Wrench size={20} />
  },
  {
    id: "7",
    name: "EcommerceGPT",
    description: "AI specialized in e-commerce strategies, product descriptions, and conversion optimization.",
    status: "Emerging",
    tvl: "$247,890",
    icon: <ShoppingCart size={20} />
  },
  {
    id: "8",
    name: "CodeMaster",
    description: "Programming assistant that helps with code generation, debugging, and technical documentation.",
    status: "Operational",
    tvl: "$875,420",
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
      // For simplicity, other sorts will use alphabetical order
      return sortOrder === "desc" 
        ? b.name.localeCompare(a.name) 
        : a.name.localeCompare(b.name);
    });

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">AI Agent Marketplace</h1>
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
          <div className="flex items-center justify-center gap-2 mb-2">
            <Brain size={18} />
            <span className="font-medium">MindAI Protocol</span>
          </div>
          <p>© 2023 MindAI Protocol. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
