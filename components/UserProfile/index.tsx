import { useUI, useUIMutation } from "@/store/ui";
import { Flex } from "@chakra-ui/react";
import { FC } from "react";
import { IoSettingsOutline } from "react-icons/io5";
import { ModalConfig } from "@/components/Modals/ChakraModals/Config";

export type UserProfileProps = {
  profileImg?: string;
  username: string;
};

export const UserProfile: FC<UserProfileProps> = ({ username }) => {
  const { app } = useUI();
  const { modal } = app;
  const { showModal, hideModal } = useUIMutation();

  const onSettingsClick = () => {
    if (modal.isOpen) return hideModal();
    showModal(<ModalConfig />);
  };

  return (
    <Flex className="center items-center p-4 pb-6">
      <div className="flex grow">
        <div className="h-8 w-8 rounded-lg bg-red-500"></div>
        <div className="ml-4 flex items-center justify-center">
          <div className="text-white">{username}</div>
        </div>
      </div>
      <IoSettingsOutline
        className={"cursor-pointer"}
        size={"1.5rem"}
        onClick={onSettingsClick}
      />
    </Flex>
  );
};
