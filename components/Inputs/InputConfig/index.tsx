import { IconButton, Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import { Eye, EyeOff } from "lucide-react";
import { type FC, useState } from "react";

type InputConfigProps = {
  label: string;
  id: string;
  placeholder: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: "text" | "password";
};

export const InputConfig: FC<InputConfigProps> = ({
  label,
  id,
  placeholder,
  value,
  onChange,
  type = "text",
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="w-24 whitespace-nowrap">
        {label}
      </label>
      <InputGroup size="sm" maxWidth="24rem">
        <Input
          id={id}
          type={type === "password" && !showPassword ? "password" : "text"}
          placeholder={placeholder}
          className="flex-1"
          variant="flushed"
          value={value}
          onChange={onChange}
        />
        {type === "password" && (
          <InputRightElement>
            <IconButton
              aria-label={showPassword ? "Hide password" : "Show password"}
              h="1.5rem"
              size="sm"
              variant="ghost"
              onClick={() => setShowPassword(!showPassword)}
              icon={showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            />
          </InputRightElement>
        )}
      </InputGroup>
    </div>
  );
};
