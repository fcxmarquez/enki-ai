import { Input } from "@chakra-ui/react";
import { FC } from "react";

type InputConfigProps = {
  label: string;
  id: string;
  placeholder: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const InputConfig: FC<InputConfigProps> = ({
  label,
  id,
  placeholder,
  value,
  onChange,
}) => {
  return (
    <div className="flex items-center gap-2">
      <label htmlFor={id} className="w-24 whitespace-nowrap">
        {label}
      </label>
      <Input
        id={id}
        type="text"
        placeholder={placeholder}
        className="flex-1"
        maxWidth="14rem"
        size="sm"
        variant="flushed"
        value={value}
        onChange={onChange}
      />
    </div>
  );
};
