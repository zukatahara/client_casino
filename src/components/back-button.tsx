import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const BackButton = ({back}: {back?: string}) => {
  const navigate = useNavigate();
  return (
    <ArrowLeft
      onClick={() => {
        if(back) {
          navigate(back);
        }else{
          navigate(-1)
        }
      }}
      className="w-5 h-5 cursor-pointer text-slate-300"
    />
  );
};

export default BackButton;
