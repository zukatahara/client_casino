import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { OrderProps } from "@/types/order.type";
import { useEffect, useState } from "react";

interface SelectFormProps {
  setOrder: (order: Omit<OrderProps, "type">) => void;
  tiLe: number;
  soNhan: number;
  max?: number;
  order: OrderProps;
  type?: string;
}

const listType = [
  {
    min: 0,
    max: 99,
  },
  {
    min: 100,
    max: 199,
  },
  {
    min: 200,
    max: 299,
  },
  {
    min: 300,
    max: 399,
  },
  {
    min: 400,
    max: 499,
  },
  {
    min: 500,
    max: 599,
  },
  {
    min: 600,
    max: 699,
  },
  {
    min: 700,
    max: 799,
  },
  {
    min: 800,
    max: 899,
  },
  {
    min: 900,
    max: 999,
  },
];

const SelectQuickly = ({
  setOrder,
  tiLe,
  soNhan,
  max,
  order,
  type,
}: SelectFormProps) => {
  const [numbers, setNumbers] = useState<string[]>([]);
  const [typeSelect, setTypeSelect] = useState(listType[0]);
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
        price: 1000,
        value: numbers.join(","),
        tiLe,
        soNhan,
      });
    } else {
      setOrder({
        price: 0,
        value: "",
        tiLe,
        soNhan,
      });
    }
  }, [numbers]);

  useEffect(() => {
    if (!order.type) {
      setNumbers([]);
      return;
    }
  }, [order]);

  return (
    <>
      <div className="w-full flex flex-wrap justify-end gap-2 mt-4">
        {listType.map((item, index) => {
          if (index > 0 && !["3cang"].includes(type as string)) {
            return;
          }
          return (
            <Button
              key={index}
              variant={typeSelect.min === item.min ? "default" : "outline"}
              size={"sm"}
              className={cn(
                "text-main",
                typeSelect.min === item.min ? "text-slate-200" : ""
              )}
              onClick={() => {
                setTypeSelect(item);
              }}
            >
              {item.min} - {item.max}
            </Button>
          );
        })}
      </div>
      <div className="w-full p-4 rounded-md grid grid-cols-4 gap-2">
        {Array(100)
          .fill(0)
          .map((_, index) => {
            const newNumber = typeSelect.min + index;
            const number =
              newNumber.toString().length === 1 ? "0" + newNumber : newNumber;
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
                {newNumber.toString().length === 1
                  ? "0" + newNumber
                  : newNumber}
              </div>
            );
          })}
      </div>
    </>
  );
};

export default SelectQuickly;
