import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

const services = [
  {
    name: "Nạp thẻ cào",
  },
  {
    name: "Nạp tiền bằng thẻ cào điện thoại",
  },
];

const moneyList = [
  {
    label: "50k",
    value: 50000,
  },
  {
    label: "100k",
    value: 100000,
  },
  {
    label: "500k",
    value: 500000,
  },
  {
    label: "1M",
    value: 1000000,
  },
  {
    label: "5M",
    value: 5000000,
  },
  {
    label: "10M",
    value: 10000000,
  },
  {
    label: "50M",
    value: 50000000,
  },
  {
    label: "100M",
    value: 100000000,
  },
  {
    label: "500M",
    value: 500000000,
  },
];

const CardForm = () => {
  const [serviceSelected, setServiceSelected] = useState(services[0]);

  return (
    <div className="mt-4">
      <div className="flex flex-wrap gap-4">
        {services.map((service) => (
          <Button
            onClick={() => setServiceSelected(service)}
            variant={
              serviceSelected.name === service.name ? "default" : "outline"
            }
            key={service.name}
          >
            {service.name}
          </Button>
        ))}
      </div>
      <div className="mt-8 text-xs text-slate-500 dark:text-slate-200">
        <div className="mb-3">Lời nhắc thanh toán</div>
        <p>1. Nạp tiền tối thiểu là 50,000 VND,</p>
        <p>Tối đa là 99,999,999 VND.</p>
        <p>2.Vui lòng làm theo nội dung thanh toán để thanh toán,</p>
        <p>
          cần có nội dung tin! Để không ảnh hưởng đến thời gian khi nạp .vào tài
          khoản!
        </p>
        <p>3.Nạp tiền quá 3 phút vẫn chưa đến tài khoản,</p>
        <p>xin liên hệ với chăm sóc khách hàng để xử lý</p>
      </div>
      <div className="grid w-full max-w-sm items-center gap-1.5 mt-8">
        <Label htmlFor="email">Số tiền:</Label>
        <Input type="number" placeholder="50.000-99.999.999" />
      </div>
      <div className="mt-4">
        <p className="text-xs text-slate-500 dark:text-slate-200">
          Chọn nhanh tiền nạp
        </p>
        <div className="flex flex-wrap gap-4 mt-4">
          {moneyList.map((item) => (
            <Button variant={"outline"} key={item.value}>
              {item.label}
            </Button>
          ))}
        </div>
      </div>
      <div className="mt-4">
        <Button>Nạp ngay</Button>
      </div>
    </div>
  );
};

export default CardForm;
