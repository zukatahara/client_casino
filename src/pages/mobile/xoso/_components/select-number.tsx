import { cn } from "@/lib/utils";
import { OrderProps } from "@/types/order.type";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { NS } from "@/constants/ns";

interface SelectFormProps {
  order: OrderProps;
  setOrder: (order: Omit<OrderProps, "type">) => void;
  tiLe: number;
  soNhan: number;
  type?: string;
}

const SelectNumber = ({
  setOrder,
  soNhan,
  tiLe,
  type,
  order,
}: SelectFormProps) => {
  const { t } = useTranslation(NS.lottery);
  const [chuc, setChuc] = useState<number[]>([]);
  const [donvi, setDonvi] = useState<number[]>([]);
  const [tram, setTram] = useState<number[]>([]);
  const [nghin, setNghin] = useState<number[]>([]);
  const [typeTram, setTypeTram] = useState("");
  const [typeNghin, setTypeNghin] = useState("");
  const [typeChuc, setTypeChuc] = useState("");
  const [typeDonvi, setTypeDonvi] = useState("");
  useEffect(() => {
    let nullAll = 0;
    if (chuc.length === 0) {
      nullAll++;
    }
    if (donvi.length === 0) {
      nullAll++;
    }
    if (tram.length === 0) {
      nullAll++;
    }
    if (nghin.length === 0) {
      nullAll++;
    }
    if (["dau", "duoi"].includes(type as string)) {
      if (type === "dau" && chuc && chuc.length > 0) {
        setOrder({
          price: 1000,
          value: chuc.join(","),
          tiLe,
          soNhan,
        });
      }
      if (type === "duoi" && donvi && donvi.length > 0) {
        setOrder({
          price: 1000,
          value: donvi.join(","),
          tiLe,
          soNhan,
        });
      }
      return;
    }
    if (!["dau", "duoi"].includes(type as string) && nullAll !== 4) {
      // ["lo3so", "lo4so", "3cang", "cang4", "3cangg1"]
      const nghinFake =
        nghin.length > 0
          ? [...nghin]
          : !["lo4so", "cang4"].includes(type as string)
          ? [""]
          : ["?"];
      const tramFake =
        tram.length > 0
          ? [...tram]
          : !["lo3so", "lo4so", "3cang", "cang4", "3cangg1"].includes(
              type as string
            )
          ? [""]
          : ["?"];
      const chucFake = chuc.length > 0 ? [...chuc] : ["?"];
      const donviFake = donvi.length > 0 ? [...donvi] : ["?"];
      let number: string[] = [];
      // Lặp qua {t("tat ca")} các số từ mảng 1
      for (let i = 0; i < nghinFake.length; i++) {
        // Lặp qua {t("tat ca")} các số từ mảng 2
        for (let j = 0; j < tramFake.length; j++) {
          // Lặp qua {t("tat ca")} các số từ mảng 3
          for (let k = 0; k < chucFake.length; k++) {
            // Lặp qua {t("tat ca")} các số từ mảng 4
            for (let l = 0; l < donviFake.length; l++) {
              // Ghép các số từ các mảng lại để tạo chuỗi có 4 chữ số
              let num = `${nghinFake[i]}${tramFake[j]}${chucFake[k]}${donviFake[l]}`;
              number.push(num);
            }
          }
        }
      }
      let isValid = true;
      number.forEach((item) => {
        if (item.includes("?")) {
          isValid = false;
        }
      });
      const value = number.join(",");
      if (!isValid) {
        setOrder({
          price: 1000,
          value,
          tiLe: 0,
          soNhan: 0,
        });
      } else {
        setOrder({
          price: 1000,
          value,
          tiLe,
          soNhan,
        });
      }
      return;
    }
  }, [chuc, donvi, tram, nghin]);

  useEffect(() => {
    if (!order.type) {
      setChuc([]);
      setDonvi([]);
      setTram([]);
      setNghin([]);
      return;
    }
  }, [order]);

  const handleSetChuc = (value: number) => {
    const isExist = chuc.includes(value);
    if (isExist) {
      setChuc(chuc.filter((item) => item !== value));
    } else {
      setChuc((prev) => [...prev, value]);
    }
  };

  const handleSetTram = (value: number) => {
    const isExist = tram.includes(value);
    if (isExist) {
      setTram(tram.filter((item) => item !== value));
    } else {
      setTram((prev) => [...prev, value]);
    }
  };

  const handleSetNghin = (value: number) => {
    const isExist = nghin.includes(value);
    if (isExist) {
      setNghin(nghin.filter((item) => item !== value));
    } else {
      setNghin((prev) => [...prev, value]);
    }
  };

  const handleSetDonvi = (value: number) => {
    const isExist = donvi.includes(value);
    if (isExist) {
      setDonvi(donvi.filter((item) => item !== value));
    } else {
      setDonvi((prev) => [...prev, value]);
    }
  };

  useEffect(() => {
    if (typeChuc) {
      switch (typeChuc) {
        case "all":
          setChuc([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
          break;
        case "le":
          setChuc([1, 3, 5, 7, 9]);
          break;
        case "chan":
          setChuc([0, 2, 4, 6, 8]);
          break;
        case "xiu":
          setChuc([0, 1, 2, 3, 4]);
          break;
        case "tai":
          setChuc([5, 6, 7, 8, 9]);
          break;
        default:
          break;
      }
      setTypeChuc("");
    }
  }, [typeChuc]);

  useEffect(() => {
    if (typeTram) {
      switch (typeTram) {
        case "all":
          setTram([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
          break;
        case "le":
          setTram([1, 3, 5, 7, 9]);
          break;
        case "chan":
          setTram([0, 2, 4, 6, 8]);
          break;
        case "xiu":
          setTram([0, 1, 2, 3, 4]);
          break;
        case "tai":
          setTram([5, 6, 7, 8, 9]);
          break;
        default:
          break;
      }
      setTypeTram("");
    }
  }, [typeTram]);

  useEffect(() => {
    if (typeNghin) {
      switch (typeNghin) {
        case "all":
          setNghin([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
          break;
        case "le":
          setNghin([1, 3, 5, 7, 9]);
          break;
        case "chan":
          setNghin([0, 2, 4, 6, 8]);
          break;
        case "xiu":
          setNghin([0, 1, 2, 3, 4]);
          break;
        case "tai":
          setNghin([5, 6, 7, 8, 9]);
          break;
        default:
          break;
      }
      setTypeNghin("");
    }
  }, [typeNghin]);

  useEffect(() => {
    if (typeDonvi) {
      switch (typeDonvi) {
        case "all":
          setDonvi([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
          break;
        case "le":
          setDonvi([1, 3, 5, 7, 9]);
          break;
        case "chan":
          setDonvi([0, 2, 4, 6, 8]);
          break;
        case "xiu":
          setDonvi([0, 1, 2, 3, 4]);
          break;
        case "tai":
          setDonvi([5, 6, 7, 8, 9]);
          break;
        default:
          break;
      }
      setTypeDonvi("");
    }
  }, [typeDonvi]);

  return (
    <>
      <div className="closeBet">
        <div className="selectBox">
          {["lo4so", "cang4"].includes(type as string) && (
            <div className="betBox row-item">
              <div className="selectBetBox">
                <div className="titleBox">
                  <span className="title">{t("nghin")}</span>
                  <div className="dxqqo">
                    <button onClick={() => setTypeNghin("le")}>
                      {t("le")}
                    </button>
                    <button onClick={() => setTypeNghin("chan")}>
                      {t("chan")}
                    </button>
                    <button onClick={() => setTypeNghin("tai")}>
                      {t("tai")}
                    </button>
                    <button onClick={() => setTypeNghin("xiu")}>
                      {t("xiu")}
                    </button>
                    <button onClick={() => setTypeNghin("all")}>
                      {t("tat ca")}
                    </button>
                    <button onClick={() => setNghin([])}>{t("xoa")}</button>
                  </div>
                </div>
                <ul className="cloumn">
                  {Array(10)
                    .fill(0)
                    .map((_, index) => {
                      const isActive = nghin.includes(index);
                      return (
                        <li
                          key={index}
                          onClick={() => handleSetNghin(index)}
                          data-num={index}
                          className={cn("ball2", isActive && "active")}
                        ></li>
                      );
                    })}
                </ul>
              </div>
            </div>
          )}
          {["lo3so", "lo4so", "3cang", "cang4", "3cangg1"].includes(
            type as string
          ) && (
            <div className="betBox row-item">
              <div className="selectBetBox">
                <div className="titleBox">
                  <span className="title">{t("tram")}</span>
                  <div className="dxqqo">
                    <button onClick={() => setTypeTram("le")}>{t("le")}</button>
                    <button onClick={() => setTypeTram("chan")}>
                      {t("chan")}
                    </button>
                    <button onClick={() => setTypeTram("tai")}>
                      {t("tai")}
                    </button>
                    <button onClick={() => setTypeTram("xiu")}>
                      {t("xiu")}
                    </button>
                    <button onClick={() => setTypeTram("all")}>
                      {t("tat ca")}
                    </button>
                    <button onClick={() => setTram([])}>{t("xoa")}</button>
                  </div>
                </div>
                <ul className="cloumn">
                  {Array(10)
                    .fill(0)
                    .map((_, index) => {
                      const isActive = tram.includes(index);
                      return (
                        <li
                          key={index}
                          onClick={() => handleSetTram(index)}
                          data-num={index}
                          className={cn("ball2", isActive && "active")}
                        ></li>
                      );
                    })}
                </ul>
              </div>
            </div>
          )}
          <div className="betBox row-item">
            <div className="selectBetBox">
              <div className="titleBox">
                <span className="title">{t("chuc")}</span>
                <div className="dxqqo">
                  <button onClick={() => setTypeChuc("le")}>{t("le")}</button>
                  <button onClick={() => setTypeChuc("chan")}>
                    {t("chan")}
                  </button>
                  <button onClick={() => setTypeChuc("tai")}>{t("tai")}</button>
                  <button onClick={() => setTypeChuc("xiu")}>{t("xiu")}</button>
                  <button onClick={() => setTypeChuc("all")}>
                    {t("tat ca")}
                  </button>
                  <button onClick={() => setChuc([])}>{t("xoa")}</button>
                </div>
              </div>
              <ul className="cloumn">
                {Array(10)
                  .fill(0)
                  .map((_, index) => {
                    const isActive = chuc.includes(index);
                    return (
                      <li
                        key={index}
                        onClick={() => handleSetChuc(index)}
                        data-num={index}
                        className={cn("ball2", isActive && "active")}
                      ></li>
                    );
                  })}
              </ul>
            </div>
          </div>
          <div className="betBox row-item">
            <div className="selectBetBox">
              <div className="titleBox">
                <span className="title">{t("don vi")}</span>
                <div className="dxqqo">
                  <button onClick={() => setTypeDonvi("le")}>{t("le")}</button>
                  <button onClick={() => setTypeDonvi("chan")}>
                    {t("chan")}
                  </button>
                  <button onClick={() => setTypeDonvi("tai")}>
                    {t("tai")}
                  </button>
                  <button onClick={() => setTypeDonvi("xiu")}>
                    {t("xiu")}
                  </button>
                  <button onClick={() => setTypeDonvi("all")}>
                    {t("tat ca")}
                  </button>
                  <button onClick={() => setDonvi([])}>{t("xoa")}</button>
                </div>
              </div>
              <ul className="cloumn">
                {Array(10)
                  .fill(0)
                  .map((_, index) => {
                    const isActive = donvi.includes(index);
                    return (
                      <li
                        key={index}
                        onClick={() => handleSetDonvi(index)}
                        data-num={index}
                        className={cn("ball2", isActive && "active")}
                      ></li>
                    );
                  })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SelectNumber;
