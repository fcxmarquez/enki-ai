import { Input } from "@chakra-ui/react";
import { BubbleChat } from "@/components/Feedback/BubbleChat";

export default function Home() {
  return (
    <div className="relative flex grow flex-col gap-4 overflow-y-hidden p-4">
      <div className="flex grow flex-col gap-8 overflow-y-auto">
        <BubbleChat
          profileImg="https://source.unsplash.com/random"
          message="Hi, im a message"
          name="EnkiGPT"
        />
        <BubbleChat
          profileImg="https://source.unsplash.com/random"
          message="Hi, im a really really really very really loooong message multiplied by 3. Hi, im a really really really very really loooong message multiplied by 3. Hi, im a really really really very really loooong message multiplied by 3. Hi, im a really really really very really loooong message multiplied by 3. Hi, im a really really really very really loooong message multiplied by 3. Hi, im a really really really very really loooong message multiplied by 3. Hi, im a really really really very really loooong message multiplied by 3. Hi, im a really really really very really loooong message multiplied by 3. Hi, im a really really really very really loooong message multiplied by 3. Hi, im a really really really very really loooong message multiplied by 3. Hi, im a really really really very really loooong message multiplied by 3. Hi, im a really really really very really loooong message multiplied by 3. Hi, im a really really really very really loooong message multiplied by 3. Hi, im a really really really very really loooong message multiplied by 3. Hi, im a really really really very really loooong message multiplied by 3. Hi, im a really really really very really loooong message multiplied by 3. Hi, im a really really really very really loooong message multiplied by 3. Hi, im a really really really very really loooong message multiplied by 3."
          name="EnkiGPT"
        />
        <BubbleChat
          profileImg="https://source.unsplash.com/random"
          message="Hi, im a really really really very really loooong message multiplied by 3. Hi, im a really really really very really loooong message multiplied by 3. Hi, im a really really really very really loooong message multiplied by 3. Hi, im a really really really very really loooong message multiplied by 3. Hi, im a really really really very really loooong message multiplied by 3. Hi, im a really really really very really loooong message multiplied by 3. Hi, im a really really really very really loooong message multiplied by 3. Hi, im a really really really very really loooong message multiplied by 3. Hi, im a really really really very really loooong message multiplied by 3. Hi, im a really really really very really loooong message multiplied by 3. Hi, im a really really really very really loooong message multiplied by 3. Hi, im a really really really very really loooong message multiplied by 3. Hi, im a really really really very really loooong message multiplied by 3. Hi, im a really really really very really loooong message multiplied by 3. Hi, im a really really really very really loooong message multiplied by 3. Hi, im a really really really very really loooong message multiplied by 3. Hi, im a really really really very really loooong message multiplied by 3. Hi, im a really really really very really loooong message multiplied by 3."
          name="EnkiGPT"
        />
        <BubbleChat
          profileImg="https://source.unsplash.com/random"
          message="Hi, im a really really really very really loooong message multiplied by 3. Hi, im a really really really very really loooong message multiplied by 3. Hi, im a really really really very really loooong message multiplied by 3. Hi, im a really really really very really loooong message multiplied by 3. Hi, im a really really really very really loooong message multiplied by 3. Hi, im a really really really very really loooong message multiplied by 3. Hi, im a really really really very really loooong message multiplied by 3. Hi, im a really really really very really loooong message multiplied by 3. Hi, im a really really really very really loooong message multiplied by 3. Hi, im a really really really very really loooong message multiplied by 3. Hi, im a really really really very really loooong message multiplied by 3. Hi, im a really really really very really loooong message multiplied by 3. Hi, im a really really really very really loooong message multiplied by 3. Hi, im a really really really very really loooong message multiplied by 3. Hi, im a really really really very really loooong message multiplied by 3. Hi, im a really really really very really loooong message multiplied by 3. Hi, im a really really really very really loooong message multiplied by 3. Hi, im a really really really very really loooong message multiplied by 3."
          name="EnkiGPT"
        />
        <BubbleChat
          profileImg="https://source.unsplash.com/random"
          message="Hi, im a really really really very really loooong message multiplied by 3. Hi, im a really really really very really loooong message multiplied by 3. Hi, im a really really really very really loooong message multiplied by 3. Hi, im a really really really very really loooong message multiplied by 3. Hi, im a really really really very really loooong message multiplied by 3. Hi, im a really really really very really loooong message multiplied by 3. Hi, im a really really really very really loooong message multiplied by 3. Hi, im a really really really very really loooong message multiplied by 3. Hi, im a really really really very really loooong message multiplied by 3. Hi, im a really really really very really loooong message multiplied by 3. Hi, im a really really really very really loooong message multiplied by 3. Hi, im a really really really very really loooong message multiplied by 3. Hi, im a really really really very really loooong message multiplied by 3. Hi, im a really really really very really loooong message multiplied by 3. Hi, im a really really really very really loooong message multiplied by 3. Hi, im a really really really very really loooong message multiplied by 3. Hi, im a really really really very really loooong message multiplied by 3. Hi, im a really really really very really loooong message multiplied by 3."
          name="EnkiGPT"
        />
      </div>
      <div className="sticky bottom-0 flex w-full flex-col items-center justify-center border-t bg-background-default p-6">
        <Input className="w-3/4 " placeholder="Let's to chat" />
      </div>
    </div>
  );
}
