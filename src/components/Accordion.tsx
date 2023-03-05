import { useRef, useState } from "react";

type AccordionProps = {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
};

export const Accordion = ({ title, icon, children }: AccordionProps) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState(0);

  const handleOpen = () => {
    if (contentHeight == 0) {
      setContentHeight(contentRef.current?.scrollHeight || 0);
    } else {
      setContentHeight(0);
    }
  };

  return (
    <section className="flex flex-col">
      <button className="text-lg flex justify-between" onClick={handleOpen}>
        <span>{title}</span>
        {icon}
      </button>
      <div
        ref={contentRef}
        className={`text-sm overflow-hidden transition-all duration-500`}
        style={{ height: contentHeight }}
      >
        {children}
      </div>
      <hr className={`h-1 bg-black`} />
    </section>
  );
};
