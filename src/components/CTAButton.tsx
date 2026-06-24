import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface CTAButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "default" | "lg";
  className?: string;
  icon?: boolean;
}

const CTAButton = ({
  children,
  href,
  onClick,
  variant = "primary",
  size = "default",
  className,
  icon = true,
}: CTAButtonProps) => {
  const base =
    "inline-flex items-center justify-center gap-2 font-heading font-semibold rounded-xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]";

  const variants = {
    primary: "bg-gradient-to-r from-[hsl(201,78%,23%)] to-[hsl(205,65%,48%)] text-white hover:opacity-90 shadow-lg shadow-[hsl(201,78%,23%)/0.2]",
    secondary: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/20",
    outline: "border-2 border-foreground/15 text-foreground hover:border-foreground/30 hover:bg-accent/50",
    ghost: "text-foreground/70 hover:text-foreground hover:bg-accent/50",
  };

  const sizes = {
    default: "px-6 py-2.5 text-sm",
    lg: "px-8 py-3.5 text-base",
  };

  const classes = cn(base, variants[variant], sizes[size], className);

  if (href) {
    return (
      <a href={href} className={classes}>
        {children}
        {icon && <ArrowRight className="w-4 h-4" />}
      </a>
    );
  }

  return (
    <button onClick={onClick} className={classes}>
      {children}
      {icon && <ArrowRight className="w-4 h-4" />}
    </button>
  );
};

export default CTAButton;
