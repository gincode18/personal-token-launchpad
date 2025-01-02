import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import {
  WalletModalProvider
} from '@solana/wallet-adapter-react-ui';
import '@solana/wallet-adapter-react-ui/styles.css';
import { Home } from "./components/Home";

export default function App() {
  return (
    <ConnectionProvider endpoint={"https://api.devnet.solana.com"}>
      <WalletProvider wallets={[]} autoConnect>
        <WalletModalProvider>
          {/* <ModeToggle></ModeToggle> */}
          <Home></Home>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  )
}
