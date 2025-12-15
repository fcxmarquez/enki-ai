"use client";

import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  Button,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AuthErrorPage() {
  const router = useRouter();
  const [errorDetails, setErrorDetails] = useState({
    error: "",
    errorCode: "",
    errorDescription: "",
  });

  useEffect(() => {
    // Parse error details from URL hash
    const hash = window.location.hash.substring(1);
    const params = new URLSearchParams(hash);

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setErrorDetails({
      error: params.get("error") || "Unknown error",
      errorCode: params.get("error_code") || "",
      errorDescription:
        params.get("error_description") ||
        "An unexpected error occurred during authentication.",
    });
  }, []);

  const handleRetry = () => {
    router.push("/auth/login");
  };

  const handleGoHome = () => {
    router.push("/");
  };

  return (
    <Container maxW="lg" py={{ base: "12", md: "24" }} px={{ base: "0", sm: "8" }}>
      <Box
        py={{ base: "0", sm: "8" }}
        px={{ base: "4", sm: "10" }}
        bg={{ base: "transparent", sm: "bg.surface" }}
        boxShadow={{ base: "none", sm: "md" }}
        borderRadius={{ base: "none", sm: "xl" }}
      >
        <VStack spacing="6" align="center">
          <VStack spacing="3" align="center">
            <Heading size="lg" color="red.500">
              Authentication Error
            </Heading>
            <Text color="fg.muted" textAlign="center">
              We encountered an issue while trying to sign you in.
            </Text>
          </VStack>

          <Alert status="error" borderRadius="md">
            <AlertIcon />
            <Box>
              <Text fontWeight="bold">Error: {errorDetails.error}</Text>
              {errorDetails.errorCode && (
                <Text fontSize="sm">Code: {errorDetails.errorCode}</Text>
              )}
              <Text fontSize="sm" mt={2}>
                {decodeURIComponent(errorDetails.errorDescription)}
              </Text>
            </Box>
          </Alert>

          <VStack spacing="3" w="full">
            <Button w="full" maxW="md" colorScheme="blue" onClick={handleRetry}>
              Try Again
            </Button>
            <Button w="full" maxW="md" variant="outline" onClick={handleGoHome}>
              Go to Home
            </Button>
          </VStack>
        </VStack>
      </Box>
    </Container>
  );
}
