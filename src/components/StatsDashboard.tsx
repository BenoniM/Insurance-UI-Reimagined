import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { TrendingUp, Users, Shield, FileCheck, ArrowUpRight } from "lucide-react";
import SectionWrapper from "./SectionWrapper";
import ScrollReveal from "./ScrollReveal";

const AnimatedCounter = ({ target, suffix = "", prefix = "" }: { target: number; suffix?: string; prefix?: string }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const duration = 2000;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [isInView, target]);

  return (
    <span ref={ref}>
      {prefix}{count.toLocaleString()}{suffix}
    </span>
  );
};

const stats = [
  { icon: Users, label: "Active Policyholders", value: 52400, suffix: "+", trend: "+12%", trendLabel: "vs last year", gradient: "from-[hsl(201,78%,23%)] to-[hsl(205,65%,48%)]" },
  { icon: Shield, label: "Policies Issued", value: 78600, suffix: "+", trend: "+18%", trendLabel: "vs last year", gradient: "from-[hsl(160,55%,45%)] to-[hsl(160,50%,55%)]" },
  { icon: FileCheck, label: "Claims Settled", value: 14200, suffix: "+", trend: "+9%", trendLabel: "this quarter", gradient: "from-[hsl(201,78%,23%)] to-[hsl(160,55%,45%)]" },
  { icon: TrendingUp, label: "Satisfaction Rate", value: 97, suffix: "%", trend: "+2.4%", trendLabel: "improvement", gradient: "from-[hsl(205,65%,48%)] to-[hsl(201,78%,23%)]" },
];

const miniChart = [35, 42, 38, 55, 48, 62, 58, 72, 68, 85, 78, 92];

const StatsDashboard = () => {
  const chartRef = useRef<HTMLDivElement>(null);
  const chartInView = useInView(chartRef, { once: true });

  return (
    <SectionWrapper className="overflow-hidden">
      <div className="text-center mb-16">
        <ScrollReveal>
          <span className="section-badge mb-6 inline-block">PERFORMANCE</span>
          <h2 className="qupe-heading text-4xl md:text-5xl text-foreground mt-4">
            Protecting Ethiopia with <span className="text-primary">Proven Results</span>
          </h2>
          <p className="mt-5 text-muted-foreground max-w-xl mx-auto text-lg">
            Our numbers reflect over 15 years of dedication to safeguarding Ethiopian families, businesses, and communities.
          </p>
        </ScrollReveal>
      </div>

      {/* Stats grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
        {stats.map((stat, i) => (
          <ScrollReveal key={stat.label} delay={i * 0.08}>
            <motion.div
              whileHover={{ y: -6, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className={`rounded-3xl p-8 bg-gradient-to-br ${stat.gradient} text-white shadow-lg relative overflow-hidden cursor-default group`}
            >
              {/* Decorative circles */}
              <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full bg-white/10" />
              <div className="absolute -bottom-4 -left-4 w-16 h-16 rounded-full bg-white/5" />

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <motion.div
                    whileHover={{ rotate: 10, scale: 1.1 }}
                    className="w-11 h-11 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center"
                  >
                    <stat.icon className="w-5 h-5 text-white" />
                  </motion.div>
                  <span className="flex items-center gap-1 text-xs font-semibold text-white/90 bg-white/15 backdrop-blur-sm rounded-full px-2.5 py-1">
                    <ArrowUpRight className="w-3 h-3" />
                    {stat.trend}
                  </span>
                </div>
                <p className="font-heading text-3xl font-bold text-white">
                  <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                </p>
                <p className="text-sm text-white/80 mt-1">{stat.label}</p>
                <p className="text-xs text-white/50 mt-0.5">{stat.trendLabel}</p>
              </div>
            </motion.div>
          </ScrollReveal>
        ))}
      </div>

      {/* Mini chart section */}
      <ScrollReveal delay={0.3}>
        <motion.div
          whileHover={{ scale: 1.005 }}
          className="rounded-3xl p-8 relative overflow-hidden bg-gradient-to-br from-[hsl(201,78%,23%)] to-[hsl(201,78%,18%)] text-white shadow-xl"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h3 className="font-heading font-semibold text-lg text-white">Policy Growth Trajectory</h3>
              <p className="text-sm text-white/60 mt-1">Monthly new policies issued over the past 12 months</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="w-3 h-3 rounded-full bg-primary" />
              <span className="text-sm text-white/70">New Policies</span>
            </div>
          </div>

          <div ref={chartRef} className="mt-8 flex items-end gap-2 h-32">
            {miniChart.map((value, i) => (
              <motion.div
                key={i}
                className="flex-1 rounded-t-lg relative group cursor-pointer overflow-hidden"
                initial={{ height: 0 }}
                animate={chartInView ? { height: `${value}%` } : { height: 0 }}
                transition={{ duration: 0.6, delay: i * 0.06, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                <motion.div
                  className="absolute inset-0 rounded-t-lg bg-gradient-to-t from-primary to-primary/60 group-hover:from-primary group-hover:to-primary/80 transition-all"
                  initial={{ height: 0 }}
                  animate={chartInView ? { height: "100%" } : { height: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 + i * 0.06 }}
                />
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-white text-foreground text-xs px-2 py-1 rounded-lg whitespace-nowrap pointer-events-none font-semibold">
                  {Math.round(value * 8.6)}
                </div>
              </motion.div>
            ))}
          </div>
          <div className="flex justify-between mt-3">
            {["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"].map((m) => (
              <span key={m} className="text-[10px] text-white/40 flex-1 text-center">{m}</span>
            ))}
          </div>
        </motion.div>
      </ScrollReveal>
    </SectionWrapper>
  );
};

export default StatsDashboard;
