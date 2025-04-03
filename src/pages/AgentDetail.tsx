
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ArrowLeft, Brain, ExternalLink, FileText, Info, TrendingDown, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import { Link } from "react-router-dom";
import { AgentData } from "@/components/AgentCard";
import StatusBadge from "@/components/StatusBadge";

// Import mock data to find the agent
import { AGENTS_DATA } from "./Index";

const AgentDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [agent, setAgent] = useState<AgentData | null>(null);
  
  useEffect(() => {
    // Find the agent with the matching ID
    const foundAgent = AGENTS_DATA.find(agent => agent.id === id);
    setAgent(foundAgent || null);
  }, [id]);

  if (!agent) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <div className="container mx-auto px-4 py-16 text-center">
          <h2 className="text-2xl font-bold">Agent not found</h2>
          <Button asChild className="mt-4">
            <Link to="/">
              <ArrowLeft size={16} className="mr-2" />
              Back to Marketplace
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-6">
        <div className="mb-6">
          <Button variant="ghost" asChild className="mb-4 -ml-2 text-muted-foreground">
            <Link to="/">
              <ArrowLeft size={16} className="mr-2" />
              Back to Marketplace
            </Link>
          </Button>
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-full bg-accent/10 flex items-center justify-center text-accent">
                {agent.icon || <Brain size={24} />}
              </div>
              <div>
                <div className="flex items-center gap-3">
                  <h1 className="text-3xl font-bold">{agent.name}</h1>
                  <StatusBadge status={agent.status} className="text-sm" />
                </div>
                <p className="text-muted-foreground">{agent.description}</p>
              </div>
            </div>
            
            <div className="flex gap-2">
              <Button className="bg-accent hover:bg-accent/90">
                Use Agent
              </Button>
              <Button variant="outline" className="border-accent/50 text-accent hover:bg-accent/10 hover:text-accent">
                Connect Wallet
              </Button>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="glass-card p-4 rounded-xl mb-6">
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-3">
                  <h3 className="text-lg font-medium">{agent.name} Price Chart</h3>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className={`flex items-center gap-1 ${agent.change24h >= 0 ? 'text-emerald-500' : 'text-red-500'}`}>
                    {agent.change24h >= 0 ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                    <span className="font-medium">{agent.change24h >= 0 ? '+' : ''}{agent.change24h}%</span>
                  </span>
                  <span className="text-muted-foreground">24h</span>
                </div>
              </div>
              
              <div className="relative">
                <img 
                  src="/lovable-uploads/86eecc40-b2fb-41e1-9e1d-24febab914d5.png" 
                  alt="Trading Chart" 
                  className="w-full h-auto rounded-md"
                />
                <div className="absolute bottom-4 right-4 text-xs text-white/70 flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
                  Live Data
                </div>
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4">
                <div className="bg-secondary/50 rounded-lg p-3">
                  <span className="text-xs text-muted-foreground">Current Price</span>
                  <p className="font-mono text-lg font-medium">{agent.tokenPrice}</p>
                </div>
                <div className="bg-secondary/50 rounded-lg p-3">
                  <span className="text-xs text-muted-foreground">24h Volume</span>
                  <p className="font-mono text-lg font-medium">{agent.volume24h}</p>
                </div>
                <div className="bg-secondary/50 rounded-lg p-3">
                  <span className="text-xs text-muted-foreground">Market Cap</span>
                  <p className="font-mono text-lg font-medium">{agent.marketCap}</p>
                </div>
                <div className="bg-secondary/50 rounded-lg p-3">
                  <span className="text-xs text-muted-foreground">Total Holders</span>
                  <p className="font-mono text-lg font-medium">{agent.holders}</p>
                </div>
              </div>
            </div>
            
            <div className="glass-card p-5 rounded-xl">
              <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
                <Info size={18} />
                Agent Information
              </h3>
              <div className="prose prose-sm max-w-none">
                <p className="text-muted-foreground">
                  {agent.name} is an advanced AI agent designed to help users with tasks related to {agent.name.toLowerCase().includes('chef') ? 'cooking and meal planning' : 
                  agent.name.toLowerCase().includes('web3') ? 'blockchain and cryptocurrency' : 
                  agent.name.toLowerCase().includes('bdr') ? 'business development and lead generation' : 
                  agent.name.toLowerCase().includes('kol') ? 'social media and content strategy' : 
                  agent.name.toLowerCase().includes('copywriter') ? 'content creation and copywriting' : 
                  agent.name.toLowerCase().includes('design') ? 'graphic design and visual content' :
                  agent.name.toLowerCase().includes('commerce') ? 'e-commerce and online retail' : 
                  'various specialized tasks'}.
                </p>
                <p className="text-muted-foreground mt-2">
                  With advanced capabilities and continuous learning, {agent.name} represents the future of AI-powered assistance. The token economics ensure sustainable growth and fair distribution of value among all participants in the ecosystem.
                </p>
              </div>
              <div className="mt-6 border-t border-border/40 pt-4">
                <h4 className="font-medium mb-2">Agent Metrics</h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  <div>
                    <span className="text-xs text-muted-foreground">TVL</span>
                    <p className="font-medium">{agent.tvl}</p>
                  </div>
                  <div>
                    <span className="text-xs text-muted-foreground">Created</span>
                    <p className="font-medium">4 months ago</p>
                  </div>
                  <div>
                    <span className="text-xs text-muted-foreground">Status</span>
                    <p className="font-medium">{agent.status}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-1">
            <div className="glass-card p-5 rounded-xl mb-6">
              <h3 className="text-lg font-medium mb-4">Trade {agent.name.split(' ')[0]} Token</h3>
              <div className="bg-secondary/40 rounded-lg p-4 mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-muted-foreground">You Pay</span>
                  <span className="text-xs text-accent">Balance: 0 ETH</span>
                </div>
                <div className="flex items-center justify-between bg-background/60 rounded-md p-2">
                  <input 
                    type="text" 
                    className="bg-transparent border-none outline-none text-lg w-full" 
                    placeholder="0.0" 
                  />
                  <Button variant="secondary" size="sm" className="ml-2">
                    ETH
                  </Button>
                </div>
              </div>
              
              <div className="bg-secondary/40 rounded-lg p-4 mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-muted-foreground">You Receive</span>
                  <span className="text-xs text-accent">Balance: 0 {agent.name.split(' ')[0]}</span>
                </div>
                <div className="flex items-center justify-between bg-background/60 rounded-md p-2">
                  <input 
                    type="text" 
                    className="bg-transparent border-none outline-none text-lg w-full" 
                    placeholder="0.0" 
                  />
                  <Button variant="secondary" size="sm" className="ml-2">
                    {agent.name.split(' ')[0].substring(0, 5).toUpperCase()}
                  </Button>
                </div>
              </div>
              
              <div className="text-xs text-muted-foreground mb-4 flex justify-between">
                <span>Exchange Rate</span>
                <span>1 ETH = 12,450 {agent.name.split(' ')[0].substring(0, 5).toUpperCase()}</span>
              </div>
              
              <Button className="w-full bg-accent hover:bg-accent/90 mb-2">
                Connect Wallet to Trade
              </Button>
            </div>
            
            <div className="glass-card p-5 rounded-xl">
              <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
                <FileText size={18} />
                Token Details
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Token Address</span>
                  <span className="font-mono text-sm truncate max-w-[150px]">0xac18...31b2d4</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total Supply</span>
                  <span>100,000,000</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Circulating Supply</span>
                  <span>42,500,000</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Holders</span>
                  <span>{agent.holders}</span>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-border/40">
                <Button variant="outline" size="sm" className="w-full flex items-center gap-2">
                  <ExternalLink size={14} />
                  View on Explorer
                </Button>
              </div>
            </div>
          </div>
        </div>
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

export default AgentDetail;
