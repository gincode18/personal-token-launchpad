import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { MINT_SIZE, TOKEN_2022_PROGRAM_ID, createInitializeMint2Instruction, getMinimumBalanceForRentExemptMint } from "@solana/spl-token"
import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import { Keypair, SystemProgram, Transaction } from "@solana/web3.js"
import { CoinsIcon as Coin, Image, Loader2, Package } from 'lucide-react'
import { useState } from 'react'
import { HoverButton } from './ui/hover-button'
import ConfettiSideCannons from "@/lib/ConfettiSideCannons"
import { useToast } from "@/hooks/use-toast"

export function TokenLaunchpad() {
  const { toast } = useToast()
  const [name, setName] = useState('')
  const [symbol, setSymbol] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [initialSupply, setInitialSupply] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const { connection } = useConnection();
  const wallet = useWallet();

  async function createToken() {
    const mintKeypair = Keypair.generate();
    const lamports = await getMinimumBalanceForRentExemptMint(connection);
    if (wallet.publicKey) {
      const transaction = new Transaction().add(
        SystemProgram.createAccount({
          fromPubkey: wallet.publicKey,
          newAccountPubkey: mintKeypair.publicKey,
          space: MINT_SIZE,
          lamports,
          programId: TOKEN_2022_PROGRAM_ID,
        }),
        createInitializeMint2Instruction(mintKeypair.publicKey, 9, wallet.publicKey, wallet.publicKey, TOKEN_2022_PROGRAM_ID)
      );

      transaction.feePayer = wallet.publicKey;
      transaction.recentBlockhash = (await connection.getLatestBlockhash()).blockhash;
      transaction.partialSign(mintKeypair);

      await wallet.sendTransaction(transaction, connection);
      console.log(`Token mint created at ${mintKeypair.publicKey.toBase58()}`);
      ConfettiSideCannons()
      toast({
        title: "Token mint Created 🎉",
        description: `Token mint created at ${mintKeypair.publicKey.toBase58()}`,
      })
    }
  }


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate token creation
    await createToken();

    setIsLoading(false)
    setName('')
    setSymbol('')
    setImageUrl('')
    setInitialSupply('')
  }

  const isFormValid = name && symbol && imageUrl && initialSupply

  return (
    <Card className="w-full max-w-md bg-purple-700/30 backdrop-blur-sm">
      <CardHeader>
        <CardTitle>Launch Your Token</CardTitle>
        <CardDescription>Fill in the details to create your Solana token</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4 ">
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium">Token Name</label>
            <div className="relative">
              <Coin className="absolute left-3 top-1/2 transform -translate-y-1/2 " size={18} />
              <Input
                id="name"
                type="text"
                placeholder="e.g. My Awesome Token"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="pl-10 border border-white"
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <label htmlFor="symbol" className="text-sm font-medium ">Token Symbol</label>
            <div className="relative">
              <Package className="absolute left-3 top-1/2 transform -translate-y-1/2 " size={18} />
              <Input
                id="symbol"
                type="text"
                placeholder="e.g. MAT"
                value={symbol}
                onChange={(e) => setSymbol(e.target.value)}
                className="pl-10 border border-white"
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <label htmlFor="imageUrl" className="text-sm font-medium ">Image URL</label>
            <div className="relative">
              <Image className="absolute left-3 top-1/2 transform -translate-y-1/2 " size={18} />
              <Input
                id="imageUrl"
                type="url"
                placeholder="https://example.com/token-image.png"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                className="pl-10 border border-white"
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <label htmlFor="initialSupply" className="text-sm font-medium ">Initial Supply</label>
            <Input
              id="initialSupply"
              type="number"
              placeholder="1000000"
              value={initialSupply}
              onChange={(e) => setInitialSupply(e.target.value)}
              required
              min="1"
              className='border border-white'
            />
          </div>
        </CardContent>
        <CardFooter>
          <HoverButton
            type="submit"
            className="w-full"
            disabled={!isFormValid || isLoading}

          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating Token...
              </>
            ) : (
              'Create Token'
            )}
          </HoverButton>
        </CardFooter>
      </form>
    </Card>
  )
}

