import { BubbleChat } from "@/components/Feedback/BubbleChat";
import { InputChat } from "@/components/inputs/InputChat";

const messageExample = `
Certainly! Here's a sonnet for you:

Upon the canvas of the quiet night,
The stars above in silent watch do glow,
Each twinkle a verse in the endless flight,
A story whispered soft and low.

The moon, a gentle bard, in silver dressed,
Casts forth her beams, a melody so bright,
In every ray, a line of love confessed,
A sonnet scribed in the embrace of night.

Yet as the dawn with rosy fingers creeps,
And shadows flee the coming of the day,
The sonnet of the night softly retreats,
In the light's truth, it cannot stay.

But fear not, for as dusk returns anew,
The night's sweet sonnet shall begin once more, true.
`;

export default function Home() {
  return (
    <div className="relative flex grow flex-col gap-4 overflow-y-hidden p-4">
      <div className="flex grow flex-col gap-8 overflow-y-auto">
        <BubbleChat
          profileImg="https://randomuser.me/api/portraits/men/42.jpg"
          message="Hi, write a sonnet for me"
          name="John Doe"
        />
        <BubbleChat
          profileImg="https://freelogopng.com/images/all_img/1681038887chatgpt-logo%20black-and-white.png"
          message={messageExample}
          name="GPT 4"
        />
        {/* <BubbleChat
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
        /> */}
      </div>
      <div className="sticky bottom-0 flex w-full flex-col items-center justify-center border-t bg-background-default p-6">
        <InputChat />
      </div>
    </div>
  );
}
