import { useRef, useState } from "react";

type AccordionProps = {
  title: string;
  subTitle: string;
  icon: React.ReactNode;
  description: React.ReactNode;
  children: React.ReactNode;
};

export const Accordion = ({
  title,
  subTitle,
  icon,
  description,
  children,
}: AccordionProps) => {
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
      <button
        className={`text-lg flex self-end justify-between duration-500 ease-in-out w-full ${
          contentHeight ? "md:w-1/3 md:sticky md:top-0" : ""
        }`}
        onClick={handleOpen}
      >
        <span>{title}</span>
        {icon}
      </button>

      {/* collapsing wrap */}
      <div
        ref={contentRef}
        className="text-sm duration-500 h-0 ease-in-out md:flex md:flex-row-reverse"
        style={
          contentHeight ? { height: contentHeight } : { overflow: "hidden" }
        }
      >
        {/* text content */}
        <div className="w-full md:w-1/3 md:sticky md:top-0 md:self-start">
          <div>{subTitle}</div>
          <div>{description}</div>
        </div>

        {/* image content */}
        <div className="w-full md:w-2/3 [&>img]:w-full">{children}</div>
      </div>

      <hr className={`h-1 bg-black`} />
    </section>
  );
};
