
import { useCallback, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { createWeb3Modal } from "@web3modal/wagmi/react";
import { defaultWagmiConfig } from "@web3modal/wagmi/react/config";
import { WagmiProvider, useAccount, useConnect, useDisconnect } from "wagmi";
import { mainnet, polygon, optimism, arbitrum } from "wagmi/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

// Replace with your WalletConnect projectId from https://cloud.walletconnect.com/
const projectId = "1b515928173a0e5eeba0234cd4556063";

const metadata = {
  name: "MindAI Protocol",
  description: "Decentralized Network for AI Agents",
  url: "https://mindai.app",
  icons: ["https://mindai.app/icon.png"]
};

const chains = [mainnet, polygon, optimism, arbitrum] as const;
const config = defaultWagmiConfig({
  chains,
  projectId,
  metadata,
});

// set up web3modal (do this once at top-level)
createWeb3Modal({
  wagmiConfig: config,
  projectId,
  enableAnalytics: true
});

export const WalletProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <WagmiProvider config={config}>
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  </WagmiProvider>
);

export function useWallet() {
  const { address, isConnected } = useAccount();
  const { connect, connectors, isPending } = useConnect();
  const { disconnect } = useDisconnect();
  const [connecting, setConnecting] = useState(false);
  const toast = useToast();

  const connectWallet = useCallback(async () => {
    setConnecting(true);
    try {
      // Try first connector (WalletConnect modal will prompt)
      await connect({ connector: connectors[0] });
      toast.toast({ title: "Wallet Connected!", description: `Connected to ${address}` });
    } catch (err: any) {
      toast.toast({
        title: "Connection Failed",
        description: err?.message || "Unable to connect wallet.",
        variant: "destructive"
      });
    } finally {
      setConnecting(false);
    }
  }, [connect, connectors, address]);

  const disconnectWallet = useCallback(() => {
    disconnect();
    toast.toast({ title: "Wallet Disconnected" });
  }, [disconnect]);

  return {
    connectWallet,
    disconnectWallet,
    isConnected,
    isConnecting: connecting || isPending,
    address,
  };
}
