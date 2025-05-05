import { Button } from "@chakra-ui/react";
import { FcGoogle } from "react-icons/fc";
import { createClient } from "@/utils/supabase/client";
import { usePathname } from "next/navigation";

export function GoogleAuthButton() {
  const pathname = usePathname();

  const handleGoogleSignIn = async () => {
    const supabase = createClient();
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${
          typeof window !== "undefined" ? window.location.origin : ""
        }/auth/callback?next=${pathname}`,
      },
    });
  };

  return (
    <Button
      w="full"
      maxW="md"
      variant="outline"
      leftIcon={<FcGoogle />}
      onClick={handleGoogleSignIn}
    >
      Continue with Google
    </Button>
  );
}
