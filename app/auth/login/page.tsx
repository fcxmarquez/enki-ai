"use client";

import { GoogleAuthButton } from "@/components/auth/AuthButton";
import { Box, Container, Heading, Text, VStack } from "@chakra-ui/react";

export default function LoginPage() {
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
            <Heading size="lg">Welcome back</Heading>
            <Text color="fg.muted">Sign in to continue to EnkiAI</Text>
          </VStack>
          <GoogleAuthButton />
        </VStack>
      </Box>
    </Container>
  );
}
