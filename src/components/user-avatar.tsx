import { AvatarProps } from "@radix-ui/react-avatar";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import SelectAvatarModal from "@/pages/settings/_components/select-avatar";
import { useContext, useState } from "react";
import { AppContext } from "@/contexts/app.context";
import { URL } from "@/constants/url";

export function UserAvatar({ ...props }: AvatarProps) {
  const [open, setOpen] = useState(false);
  const { profile } = useContext(AppContext);

  return (
    <Avatar {...props}>
      <SelectAvatarModal open={open} setOpen={setOpen} />
      <AvatarFallback onClick={() => setOpen(true)} className="cursor-pointer">
        <img
          src={`${URL.baseUrl}${profile?.avatar}`}
          alt="avatar"
          className="object-contain"
        />
      </AvatarFallback>
    </Avatar>
  );
}
