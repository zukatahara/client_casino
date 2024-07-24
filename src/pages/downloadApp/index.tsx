// import React from "react";
// import "./downloadApp.css";
// import {
//   logo,
//   android,
//   ios,
//   title,
//   iosMobile,
//   androidMobile,
// } from "@/assets/downloadApp";
// import { useNavigate } from "react-router-dom";

// const DownloadApp: React.FC = () => {
//   const navigate = useNavigate();
//   return (
//     <div className="downloadApp-bg">
//       <div className="h-[100vh] w-full md:max-w-[768px] pt-[20px] flex flex-col mx-auto max-w-[720px] xs:max-w-[540px]">
//         <div className="md:h-[200px] md:w-[400px] h-[65px] w-[130px] mx-auto mb-[20px]">
//           <img src={logo} className="w-full h-full" />
//         </div>
//         <div className="w-full md:max-w-[600px] max-w-[400px] xs:max-w-[300px] mx-auto text-center">
//           <img src={title} className="w-full" />
//         </div>
//         <div className="flex w-[280px] md:hidden flex-col mx-auto">
//           <img
//             onClick={() => navigate("/instruction-Download")}
//             src={iosMobile}
//             className="w-full my-4 cursor-pointer"
//           />
//           <img src={androidMobile} className="w-full cursor-pointer" />
//         </div>
//         <div className="flex-grow relative w-full md:block hidden">
//           <img
//             onClick={() => navigate("/instruction-Download")}
//             src={ios}
//             className="absolute top-[15%] lg:left-[-50px] lg:w-[200px] md:left-0 md:w-[150px] cursor-pointer"
//           />
//           <img
//             src={android}
//             className="absolute top-[15%] lg:right-[-50px] lg:w-[200px] md:right-0 md:w-[150px] cursor-pointer"
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DownloadApp;
