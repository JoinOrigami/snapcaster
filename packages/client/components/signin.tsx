"use client";

import { useEffect, useState } from "react";
import { 
  AuthKitProvider,
  SignInButton,
  UseSignInData
} from "@farcaster/auth-kit";
import '@farcaster/auth-kit/styles.css';
import toast from "react-hot-toast";

import api from "@snapcaster/client/api";

const config = {
  domain: "localhost:3000",
  siweUri: "http://localhost:3000",
  rpcUrl: "https://optimism-rpc.publicnode.com",
  relay: 'https://relay.farcaster.xyz',
};

function SignIn() {
  const [nonce, setNonce] = useState("");

  const fetchNonce = () => api<{ nonce: string }>("POST", "/auth/nonce")
    .then((data) => setNonce(data.nonce));

  useEffect(() => {
    fetchNonce();    
  }, []);

  const handleSuccess = (data: UseSignInData) => {
    api("POST", "/auth/verify", data)
      .then(console.log)
      .catch(() => toast.error("Account verification failed"));

    fetchNonce();
  };

  return (
    <AuthKitProvider config={config}>
      <div className="signin-button">
        <SignInButton
          nonce={nonce}
          onSuccess={handleSuccess}
        />
      </div>
    </AuthKitProvider>
  );
}

export default SignIn;
