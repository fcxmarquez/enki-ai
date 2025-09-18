/* eslint-disable jsx-a11y/aria-role */
"use client";

// TEMP: Disabled for rebuild - FCX-30
// import { ModalLogin } from "@/components/Modals/ChakraModals/Login";
// import { hasActiveSession } from "@/utils/supabase/session";
import { ChatArea } from "@/components/chat/ChatArea";

export default function Home() {
  // const { setSettingsModalOpen } = useUIActions();
  // TEMP: Disabled for rebuild - FCX-30
  // const [hasSession, setHasSession] = useState<boolean | null>(null);

  // TEMP: Disabled for rebuild - FCX-30
  // Session checking temporarily disabled to allow access without authentication
  // To reactivate: uncomment the block below
  /*
  // Check for active session
  useEffect(() => {
    const checkSession = async () => {
      const sessionExists = await hasActiveSession();
      setHasSession(sessionExists);

      // If no session, show login modal
      if (!sessionExists) {
        showModal(<ModalLogin />);
      }
    };

    if (isMounted) {
      checkSession();
    }
  }, [isMounted, showModal]);
  */

  // TEMP: Disabled for rebuild - FCX-30
  // Authentication loading check temporarily disabled
  /*
  if (hasSession === null) {
    return (
      <div className="flex h-full items-center justify-center p-4">
        <Alert
          status="info"
          variant="subtle"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          textAlign="center"
          height="auto"
          className="max-w-md rounded-lg"
        >
          <AlertIcon boxSize="40px" mr={0} />
          <AlertTitle mt={4} mb={1} fontSize="lg">
            Loading...
          </AlertTitle>
          <AlertDescription maxWidth="sm" mb={4}>
            Checking authentication status...
          </AlertDescription>
        </Alert>
      </div>
    );
  }
  */

  return <ChatArea />;
}
