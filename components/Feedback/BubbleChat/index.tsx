import { Box } from "@chakra-ui/react";
import Image from "next/image";

export type BubbleChatProps = {
  profileImg: string;
  name: string;
  message: string;
} & React.HTMLAttributes<HTMLDivElement>;

export const BubbleChat = (props: BubbleChatProps) => {
  const { profileImg, name, message, ...rest } = props;

  return (
    <Box className="flex gap-4" {...rest}>
      <div className="relative h-10 w-10 shrink-0 tablet:h-12 tablet:w-12">
        <Image src={profileImg} alt={name} className="rounded-full" fill />
      </div>
      <div className="flex w-full grow flex-col px-1">
        <p className="font-semibold">{name}</p>
        <p>{message}</p>
      </div>
    </Box>
  );
};
