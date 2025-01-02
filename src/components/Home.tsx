import { Vortex } from "@/components/ui/vortex";
import { WalletDisconnectButton, WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { HoverButton } from "./ui/hover-button";
import { TokenLaunchpad } from "./TokenLaunchpad";
import { SparklesText } from "./ui/sparkles-text";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";
import { AnimatedGradientText } from "./ui/animated-gradient-text";

function Section() {
  return (
    <div className="w-[calc(100%-4rem)] mx-auto rounded-md  h-[30rem] overflow-hidden">
      <Vortex
        backgroundColor="black"
        className="flex items-center flex-col justify-center px-2 md:px-10 py-4 w-full h-full"
      >
        <h2 className="text-white text-2xl md:text-6xl font-bold text-center">
          The hell is this?
        </h2>
        <p className="text-white text-sm md:text-2xl max-w-xl mt-6 text-center">
          This is chemical burn. It&apos;ll hurt more than you&apos;ve ever been
          burned and you&apos;ll have a scar.
        </p>
        <div className="flex flex-col sm:flex-row items-center gap-4 mt-6">
          <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 transition duration-200 rounded-lg text-white shadow-[0px_2px_0px_0px_#FFFFFF40_inset]">
            Order now
          </button>
          <button className="px-4 py-2  text-white ">Watch trailer</button>
        </div>
      </Vortex>
    </div>
  );
}

function Home() {
  return (
    <div className="w-full mx-auto rounded-md  h-screen overflow-hidden">
      <Vortex
        backgroundColor="black"
        rangeY={800}
        particleCount={1000}
        // baseHue={20}
        className="flex items-center flex-col justify-center px-2 md:px-10  py-4 w-full h-full"
      >
        <div className=" flex justify-center items-center gap-4 my-4">
          <WalletMultiButton />
          <WalletDisconnectButton />
        </div>
        <SparklesText text="Solana Token Launchpad"></SparklesText>
        <div className="z-10 flex m-6 items-center justify-center">
          <AnimatedGradientText>
            🎉 <hr className="mx-2 h-4 w-px shrink-0 bg-gray-300" />{" "}
            <span
              className={cn(
                `inline animate-gradient bg-gradient-to-r from-[#ffaa40] via-[#9c40ff] to-[#ffaa40] bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent`,
              )}
            >
              Create your own Solana token in minutes
            </span>
          </AnimatedGradientText>
        </div>
        <TokenLaunchpad></TokenLaunchpad>
      </Vortex>
    </div>
  );
}

export { Home, Section };
