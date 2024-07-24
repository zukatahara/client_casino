import Background from "@/assets/images/bg-title.png";

const SectionTitle = ({ title }: { title: string }) => {
  return (
    <div
      style={{
        background: `url(${Background}) 50% no-repeat`,
        backgroundSize: "contain",
      }}
      className="dark:text-slate-100 text-second block text-[40px] leading-extra font-bold h-auto text-center relative scale-[.55] section-title "
    >
      {title}
    </div>
  );
};

export default SectionTitle;
