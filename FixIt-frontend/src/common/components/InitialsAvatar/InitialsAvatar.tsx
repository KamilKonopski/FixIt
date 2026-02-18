import { Avatar } from "@mantine/core";

import { getColorFromName, getInitials } from "../../utils/avatar";

interface InitialsAvatarProps {
  fullName: string;
}

const InitialsAvatar = ({ fullName }: InitialsAvatarProps) => {
  return (
    <Avatar radius="xl" color={getColorFromName(fullName)} variant="light">
      {getInitials(fullName)}
    </Avatar>
  );
};

export default InitialsAvatar;
