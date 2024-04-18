"use client";
import { Appbar } from "@repo/ui";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
function AppbarClient() {
  const session = useSession();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) return <></>;
  return (
    <Appbar
      user={session.data?.user}
      onSignin={async () => {
        await signIn("Credentials", {
          callbackUrl: "http://localhost:3001",
        });
      }}
      onSignout={async () => {
        await signOut();
        router.push("/api/auth/signin");
      }}
    />
  );
}

export default AppbarClient;
