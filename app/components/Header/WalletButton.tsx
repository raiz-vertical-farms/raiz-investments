import { useState, useEffect } from "react";
import { Button } from "@mantine/core";
import { useCelo } from "@celo/react-celo";

interface ConnectWalletButtonProps {
  walletConnected?: boolean;
  toggleWallet?: () => void;
}

export default function ConnectWalletButton({
  walletConnected,
  toggleWallet,
}: ConnectWalletButtonProps) {
  let [componentInitialized, setComponentInitialized] = useState(false);
  let { initialised, address, connect, disconnect } = useCelo();
  useEffect(() => {
    if (initialised) {
      setComponentInitialized(true);
    }
  }, [initialised]);

  return componentInitialized && address ? (
    <Button radius={30} h={30} w={160} onClick={disconnect}>
      Disconnect Wallet
    </Button>
  ) : (
    <Button
      radius={30}
      h={30}
      w={160}
      onClick={() => connect().catch((e) => console.log((e as Error).message))}
    >
      Connect Wallet
    </Button>
  );
}
