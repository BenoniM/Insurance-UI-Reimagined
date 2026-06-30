import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionWrapperProps {
  children: ReactNode;
  className?: string;
  id?: string;
  dark?: boolean;
}

const SectionWrapper = ({ children, className, id, dark = false }: SectionWrapperProps) => {
  return (
    <section
      id={id}
      className={cn(
        "py-8 md:py-12",
        dark ? "section-dark" : "",
        className
      )}
    >
      <div className="container mx-auto px-4 lg:px-8">
        {children}
      </div>
    </section>
  );
};

export default SectionWrapper;
