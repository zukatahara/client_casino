import { cn } from "@/lib/utils";
import { OrderMegaProps } from "@/types/order.type";
import { useEffect, useState } from "react";

interface SelectFormProps {
  setOrder: (order: Omit<OrderMegaProps, "type">) => void;
  max: number;
}

const SelectQuickly = ({ setOrder, max }: SelectFormProps) => {
  const [numbers, setNumbers] = useState<string[]>([]);
  const handleSelectNumber = (number: string) => {
    if (numbers.includes(number)) {
      setNumbers(numbers.filter((item) => item !== number));
    } else {
      if (max && max > 0 && numbers.length >= max) {
        return;
      }
      setNumbers([...numbers, number]);
    }
  };

  useEffect(() => {
    if (numbers.length > 0) {
      setOrder({
        so: numbers.join(","),
        sodiem: 1000,
      });
    } else {
      setOrder({
        so: "",
        sodiem: 0,
      });
    }
  }, [numbers]);

  return (
    <div className="w-full p-4 rounded-md grid grid-cols-4 gap-2">
      {Array(45)
        .fill(0)
        .map((_, index) => {
          const number = index.toString().length === 1 ? "0" + index : index;
          const isActve = numbers.includes(number.toString());
          const isMax = max && max > 0 && numbers.length >= max;
          return (
            <div
              key={index}
              className={cn(
                "h-10 rounded-md flex justify-center  items-center text-center text-slate-900 bg-white dark:bg-slate-500 border-4",
                isActve
                  ? "border-main border-solid"
                  : "border-slate-200 dark:border-slate-700",
                isMax && !isActve ? "bg-slate-200" : ""
              )}
              onClick={() => {
                handleSelectNumber(number.toString());
              }}
            >
              {(index + 1).toString().length === 1
                ? "0" + (index + 1)
                : index + 1}
            </div>
          );
        })}
    </div>
  );
};

export default SelectQuickly;
