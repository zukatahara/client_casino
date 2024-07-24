import authApi from "@/apis/auth.api";
import { cn } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import { useContext, useState } from "react";
import { motion } from "framer-motion";
import { AppContext } from "@/contexts/app.context";

const RefreshMoney = ({
  className,
  onClick,
}: {
  className?: string;
  onClick?: any;
}) => {
  const { profile, setProfile } = useContext(AppContext);
  const [isRotated, setIsRotated] = useState(false);

  const handleRotate = () => {
    setIsRotated(!isRotated);
  };
  const refreshMutation = useMutation({
    mutationFn: () => authApi.refresh(),
    onSuccess: (data) => {
      if(!profile) return
      setProfile({
        ...profile,
        money: data?.data?.money as number,
      });
    },
  });
  return (
    <>
      <div className={cn("inline-block", className)}>
        <motion.i
          // animate={{ rotate: isRotated ? 360 : 0 }} // Hiệu ứng quay 1 vòng
          transition={{ duration: 1 }} // Thời gian của hiệu ứng
          onClick={() => {
            handleRotate();
            if (onClick) {
              onClick();
            } else {
              refreshMutation.mutate();
            }
          }}
          style={{
            width: 20,
            height: 20,
            color: "#90a2dc",
            fontSize: 20,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
          }}
          className={cn(
            "iconfont icon-icon_refresh_gold_12",
            refreshMutation.isLoading && "animate-spin"
          )}
        ></motion.i>
      </div>
    </>
  );
};

export default RefreshMoney;
