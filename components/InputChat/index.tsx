import { Input, InputGroup, InputRightElement, Button } from "@chakra-ui/react";
import { IoMdSend } from "react-icons/io";
import styles from "./styles.module.css";

export const InputChat = () => {
  return (
    <InputGroup size="md">
      <Input className="h-12" placeholder="Let's to chat" />
      <InputRightElement className="absolute top-1/2 mr-4 h-8 w-8 -translate-y-1/2">
        <Button
          rightIcon={<IoMdSend />}
          className={`${styles.button} aspect-square h-8 rounded-md`}
          size="sm"
        ></Button>
      </InputRightElement>
    </InputGroup>
  );
};
