import React, { useEffect, useState } from "react";
import { createThirdwebClient, defineChain } from "thirdweb";
import {
  ConnectButton,
  useWalletInfo,
  useDisconnect,
  useActiveWalletChain,
  useActiveAccount,
  darkTheme,
} from "thirdweb/react";
import { createWallet } from "thirdweb/wallets";
import { ToastContainer, toast } from "react-toastify";

const client = createThirdwebClient({
  clientId: "c4917b86730652d8197cc695ca2b38eb",
});

const BACKGROUND_COLOR = "#272487";
const TEXT_COLOR = "#E8FE61";

const BSC_CHAIN_ID = 56; // Binance Smart Chain Mainnet Chain ID

const wallets = [
  createWallet("io.metamask"),
  // createWallet("com.coinbase.wallet"),
  // createWallet("com.trustwallet.app"),
  // createWallet("org.uniswap"),
  createWallet("com.safepal"),
];

const TrustWalletConnect = ({ transparent, label }) => {
  const chainId = useActiveWalletChain();
  const activeAccount = useActiveAccount();
  const { isConnected } = useWalletInfo(client);
  const disconnect = useDisconnect(); // Sử dụng hook useDisconnect
  const [isLocalConnected, setIsLocalConnected] = useState(
    localStorage.getItem("walletAddress")?.length > 0
  );

  const bscChain = defineChain({
    id: 56, // BSC Mainnet chain ID
    rpc: "https://bsc-dataseed.binance.org/", // BSC RPC endpoint
  });

  useEffect(() => {
    if (activeAccount?.address) {
      if (localStorage.getItem("walletAddress") !== activeAccount.address) {
        toast.success("Connect wallet success", {
          position: "top-right",
          autoClose: 1200,
          className: "connect-toast",
          onClose: (() => {
            window.location.reload();
          })
        });
      }
      localStorage.setItem("walletAddress", activeAccount.address);
      localStorage.setItem("publicKey", activeAccount.address);
      localStorage.setItem("walletStateInit", activeAccount.address);
      if (chainId.id !== BSC_CHAIN_ID) {
        toast.warning("Please switch your network to Binance Smart Chain", {
          position: "top-right",
          autoClose: 1500,
          className: "connect-toast",
        });
      }
    }
  }, [activeAccount]);

  const handleConnect = async () => {
    if (activeAccount?.address) {
      if (chainId.id !== BSC_CHAIN_ID) {
        toast.warning("Please switch your network to Binance Smart Chain", {
          position: "top-right",
          autoClose: 1500,
          className: "connect-toast",
        });
      }
    }
  };

  // Handle wallet disconnection
  const disconnectWallet = () => {
    localStorage.removeItem("walletAddress");
    localStorage.removeItem("publicKey");
    localStorage.removeItem("walletStateInit");
    localStorage.removeItem("is_in_tree");
    localStorage.removeItem("is_lock");
    localStorage.removeItem("access_token");
    localStorage.removeItem("bep20");
    localStorage.removeItem("management");
    window.location.href = "/";
  };

  return (
    <div>
      <ConnectButton
        connectButton={{ label }}
        chain={bscChain}
        client={client}
        wallets={wallets}
        showAllWallets={false}
        isEmbed={true}
        connectModal={{
          size: "compact",
          title: "Kaspool",
          showThirdwebBranding: false,
        }}
        onConnect={() => handleConnect()}
        onDisconnect={() => disconnectWallet()}
      />
      
    </div>
  );
};

export default TrustWalletConnect;
