
import { useCallback, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { createWeb3Modal, defaultWagmiConfig } from "@web3modal/wagmi/react";
import { WagmiConfig, useAccount, useConnect, useDisconnect } from "wagmi";
import { mainnet, polygon, optimism, arbitrum } from "wagmi/chains";

// Replace with your WalletConnect projectId from https://cloud.walletconnect.com/
const projectId = "1b515928173a0e5eeba0234cd4556063"; // Example; you should use your own in production

const chains = [mainnet, polygon, optimism, arbitrum];
const wagmiConfig = defaultWagmiConfig({ chains, projectId, appName: "MindAI Protocol" });

// set up web3modal (do this once at top-level)
createWeb3Modal({ wagmiConfig, projectId, chains });

export const WalletProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <WagmiConfig config={wagmiConfig}>{children}</WagmiConfig>
);

export function useWallet() {
  const { address, isConnected } = useAccount();
  const { connect, connectors, error: connectError, isLoading: isConnecting } = useConnect();
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
    isConnecting: connecting || isConnecting,
    address,
  };
}
