import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import {
  WalletModalProvider
} from '@solana/wallet-adapter-react-ui';
import '@solana/wallet-adapter-react-ui/styles.css';
import { Home } from "./components/Home";
import { Toaster } from "@/components/ui/toaster"

export default function App() {
  return (
    <ConnectionProvider endpoint={"https://api.devnet.solana.com"}>
      <WalletProvider wallets={[]} autoConnect>
        <WalletModalProvider>
          <Toaster></Toaster>
          {/* <ModeToggle></ModeToggle> */}
          <Home></Home>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  )
}
