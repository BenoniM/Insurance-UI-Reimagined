import { motion } from "framer-motion";

interface AnimatedBackgroundProps {
  variant?: "default" | "hero" | "dark" | "subtle";
}

const AnimatedBackground = ({ variant = "default" }: AnimatedBackgroundProps) => {
  const isDark = variant === "dark";
  const isHero = variant === "hero";

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Qupe-style soft gradient blobs */}
      {isHero && (
        <>
          <motion.div
            className="absolute -top-32 -right-32 w-[700px] h-[700px] rounded-full"
            style={{ background: "radial-gradient(circle, hsl(var(--primary) / 0.08) 0%, transparent 70%)" }}
            animate={{ scale: [1, 1.05, 1], x: [0, 20, 0], y: [0, -15, 0] }}
            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute -bottom-48 -left-32 w-[600px] h-[600px] rounded-full"
            style={{ background: "radial-gradient(circle, hsl(var(--teal-light) / 0.06) 0%, transparent 70%)" }}
            animate={{ scale: [1, 1.08, 1], x: [0, -15, 0], y: [0, 20, 0] }}
            transition={{ duration: 25, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          />
          <motion.div
            className="absolute top-1/3 left-1/3 w-[400px] h-[400px] rounded-full"
            style={{ background: "radial-gradient(circle, hsl(var(--secondary) / 0.04) 0%, transparent 70%)" }}
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 4 }}
          />
        </>
      )}

      {isDark && (
        <>
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />
          <div className="absolute top-0 right-1/4 w-[500px] h-[500px] rounded-full" style={{ background: "radial-gradient(circle, hsl(var(--primary) / 0.06) 0%, transparent 70%)" }} />
        </>
      )}

      {variant === "subtle" && (
        <>
          <motion.div
            className="absolute -top-20 -right-20 w-[500px] h-[500px] rounded-full"
            style={{ background: "radial-gradient(circle, hsl(var(--primary) / 0.05) 0%, transparent 70%)" }}
            animate={{ scale: [1, 1.04, 1] }}
            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          />
        </>
      )}

      {variant === "default" && (
        <motion.div
          className="absolute top-1/4 right-1/4 w-[500px] h-[500px] rounded-full"
          style={{ background: "radial-gradient(circle, hsl(var(--primary) / 0.04) 0%, transparent 70%)" }}
          animate={{ scale: [1, 1.06, 1] }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        />
      )}

      {/* Qupe dot pattern */}
      <div className="absolute inset-0 qupe-dots opacity-40" />
    </div>
  );
};

export default AnimatedBackground;
