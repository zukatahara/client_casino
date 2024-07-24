import React, { useEffect, useRef } from "react";
import chuong from "@/assets/images/chuong.png";
import dechuong from "@/assets/images/dechuong.png";
import bell from "@/assets/images/bell.png";

const BellMobile = ({
  result,
  time,
  setIsLoading,
  maxTime = 60
}: {
  result?: {
    img3D: string;
    img: string;
    value: string;
  }[];
  time: number;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  maxTime: number;
}) => {
  const canvasRef = useRef(null);
  useEffect(() => {
    if(!result) return
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const canvas = canvasRef.current as any;
    const context = canvas.getContext("2d");

    const dechuongImage = new Image();
    dechuongImage.src = dechuong;
    dechuongImage.width = 278;
    dechuongImage.height = 214;
    const dechuongX = (canvas.width - dechuongImage.width) / 2;
    const dechuongY = 240;

    const chuongImage = new Image();
    chuongImage.src = chuong;
    chuongImage.width = 279;
    chuongImage.height = 278;
    const chuongX = (canvas.width - chuongImage.width) / 2 + 205;
    const chuongY = 120;

    const dice1 = new Image();
    const dice2 = new Image();
    const dice3 = new Image();

    dice1.src = result[0].img3D;
    dice2.src = result[1].img3D;
    dice3.src = result[2].img3D;

    dice1.width = 62;
    dice1.height = 63;
    dice2.width = 62;
    dice2.height = 63;
    dice3.width = 62;
    dice3.height = 63;

    const dice1X = canvas.width / 2 - 75;
    const dice1Y = 270;
    const dice2X = canvas.width / 2 + 15;
    const dice2Y = 270;
    const dice3X = canvas.width / 2 - 30;
    const dice3Y = 325;
    context.clearRect(0, 0, canvas.width, canvas.height);

    dechuongImage.onload = () => {
      context.drawImage(
        dechuongImage,
        dechuongX,
        dechuongY,
        dechuongImage.width,
        dechuongImage.height
      );
    };

    chuongImage.onload = () => {
      context.drawImage(
        chuongImage,
        chuongX,
        chuongY,
        chuongImage.width,
        chuongImage.height
      );
    };

    dice1.onload = () => {
      context.drawImage(dice1, dice1X, dice1Y, dice1.width, dice1.height);
    };

    dice2.onload = () => {
      context.drawImage(dice2, dice2X, dice2Y, dice2.width, dice2.height);
    };

    dice3.onload = () => {
      context.drawImage(dice3, dice3X, dice3Y, dice3.width, dice3.height);
    };
  }, []);

  useEffect(() => {
    if(!result) return
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const canvas = canvasRef.current as any;
    const context = canvas.getContext("2d");

    const dechuongImage = new Image();
    dechuongImage.src = dechuong;
    dechuongImage.width = 278;
    dechuongImage.height = 214;
    const dechuongX = (canvas.width - dechuongImage.width) / 2;
    const dechuongY = 260;

    const chuongImage = new Image();
    chuongImage.src = chuong;
    chuongImage.width = 279;
    chuongImage.height = 278;
    let chuongX = (canvas.width - chuongImage.width) / 2 + 205;
    let chuongY = 140;

    const dice1 = new Image();
    const dice2 = new Image();
    const dice3 = new Image();

    dice1.src = result[0].img3D;
    dice2.src = result[1].img3D;
    dice3.src = result[2].img3D;

    dice1.width = 62;
    dice1.height = 63;
    dice2.width = 62;
    dice2.height = 63;
    dice3.width = 62;
    dice3.height = 63;

    const dice1X = canvas.width / 2 - 75;
    const dice1Y = 290;
    const dice2X = canvas.width / 2 + 15;
    const dice2Y = 290;
    const dice3X = canvas.width / 2 - 30;
    const dice3Y = 345;
    // Bắt đầu chuyển động
    const startTime = Date.now();
    const duration = 10000; // Thời gian tổng cộng là 10 giây

    const animate = () => {
      const currentTime = Date.now() - startTime;
      // Xóa toàn bộ canvas để vẽ lại các hình ảnh mới
      context.clearRect(0, 0, canvas.width, canvas.height);

      // Chuyển động 1: chuong di chuyển lên trên dechuong trong 2 giây
      if (currentTime < 2000) {
        const radius = 2.5;
        const centerX = chuongX;
        const centerY = chuongY;
        const angle = -Math.PI / 2 + (Math.PI * currentTime) / 2000;

        chuongX = centerX - radius * Math.cos(angle) - canvas.width / 4000;
        chuongY = centerY + radius * Math.sin(angle) + 3 / 41;
      }

      /// Chuyển động 2: Hình ảnh kết hợp từ 2 ảnh rung lắc nhún nhẩy qua lại
      if (currentTime > 2000 && currentTime <= 8000) {
        // Vẽ ảnh bell
        const bellImage = new Image();
        bellImage.src = bell;
        bellImage.width = 295;
        bellImage.height = 341;
        const bellX = (canvas.width - bellImage.width) / 2;
        const bellY = (canvas.width - bellImage.height) / 2;

        // Tạo các giá trị ngẫu nhiên để thay đổi vị trí của hình ảnh chuong
        const offsetX = Math.random() * 20 - 5;
        const offsetY = Math.random() * 20 - 5;

        // Vẽ hình ảnh chuong với vị trí đã thay đổi
        context.drawImage(
          bellImage,
          chuongX + offsetX,
          chuongY + offsetY,
          bellImage.width,
          bellImage.height
        );

        // Vẽ hình ảnh bell
        bellImage.onload = () => {
          context.drawImage(
            bellImage,
            bellX,
            bellY,
            bellImage.width,
            bellImage.height
          );
        };
      }

      //   Chuyển động 3: chuong di chuyển từ vị trí cuối của chuyển động 1 về vị trí ban đầu trong 2 giây
      if (currentTime > 8000) {
        context.drawImage(dice1, dice1X, dice1Y, dice1.width, dice1.height);
        context.drawImage(dice2, dice2X, dice2Y, dice2.width, dice2.height);
        context.drawImage(dice3, dice3X, dice3Y, dice3.width, dice3.height);

        const radius = 2.5;
        const centerX = chuongX;
        const centerY = chuongY;
        const angle = -Math.PI / 2 + (Math.PI * (currentTime - 8000)) / 2000;

        chuongX = centerX + radius * Math.cos(angle) + canvas.width / 4000;
        chuongY = centerY + radius * Math.sin(angle) - 3 / 41;
      }

      // Vẽ lại hình ảnh chuong và dechuong
      if (currentTime <= 2000) {
        // context.clearRect(0, 0, canvas.width, canvas.height);

        context.drawImage(
          dechuongImage,
          dechuongX,
          dechuongY,
          dechuongImage.width,
          dechuongImage.height
        );

        context.drawImage(
          chuongImage,
          chuongX,
          chuongY,
          chuongImage.width,
          chuongImage.height
        );
      }

      if (currentTime > 8000) {
        context.drawImage(
          dechuongImage,
          dechuongX,
          dechuongY,
          dechuongImage.width,
          dechuongImage.height
        );

        context.drawImage(dice1, dice1X, dice1Y, dice1.width, dice1.height);
        context.drawImage(dice2, dice2X, dice2Y, dice2.width, dice2.height);
        context.drawImage(dice3, dice3X, dice3Y, dice3.width, dice3.height);

        context.drawImage(
          chuongImage,
          chuongX,
          chuongY,
          chuongImage.width,
          chuongImage.height
        );
        // setIsLoading(false)
      }

      // Kiểm tra nếu chưa kết thúc, tiếp tục chuyển động
      if (currentTime < duration) {
        requestAnimationFrame(animate);
        // setIsLoading(true)
      }
    };

    if (time === maxTime) {
      animate();
      setIsLoading(true)
    }
  }, [time, result]);

  return (
    <canvas
      ref={canvasRef}
      width={750}
      height={520}
      style={{
        transform: "matrix(1.5, 0, 0, 0.76, -50, 0)",
        backgroundColor: "transparent",
        width: 550,
        height: 370,
      }}
      className="absolute border-0"
    />
  );
};

export default BellMobile;
