import { Button } from "@chakra-ui/react";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="bg-red-500">Hi</div>
      <Button>Hi Im a button</Button>
    </div>
  );
}
