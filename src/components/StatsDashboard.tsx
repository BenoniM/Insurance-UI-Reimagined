import { useRef, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionWrapper from "./SectionWrapper";
import ScrollReveal from "./ScrollReveal";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const AnimatedCounter = ({ target, suffix = "", prefix = "" }: { target: number; suffix?: string; prefix?: string }) => {
  const ref = useRef<HTMLSpanElement>(null);

  useGSAP(() => {
    if (!ref.current) return;
    const obj = { val: 0 };
    gsap.to(obj, {
      val: target,
      duration: 2.5,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ref.current,
        start: "top 85%",
        once: true
      },
      onUpdate: () => {
        if (ref.current) {
          const formatted = Math.floor(obj.val).toLocaleString();
          ref.current.innerHTML = `${prefix}${formatted}${suffix}`;
        }
      }
    });
  }, [target]);

  return <span ref={ref}>0</span>;
};

const stats = [
  { label: "Active Policyholders", value: 52400, suffix: "+", prefix: "" },
  { label: "Policies Issued", value: 78600, suffix: "+", prefix: "" },
  { label: "Claims Settled", value: 14200, suffix: "+", prefix: "" },
  { label: "Satisfaction Rate", value: 97, suffix: "%", prefix: "" },
];

const miniChart = [35, 42, 38, 55, 48, 62, 58, 72, 68, 85, 78, 92];

const StatsDashboard = () => {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);

  // Chart bar animation
  useGSAP(() => {
    if (chartContainerRef.current) {
      gsap.fromTo(".chart-bar-fill",
        { height: 0 },
        {
          height: "100%",
          duration: 0.8,
          stagger: 0.06,
          ease: "power3.out",
          scrollTrigger: {
            trigger: chartContainerRef.current,
            start: "top 80%",
            toggleActions: "restart none none reset"
          }
        }
      );
    }
  }, []);

  // Parallax scroll for stat columns
  useEffect(() => {
    if (!leftColRef.current || !rightColRef.current || !sectionRef.current) return;

    const leftAnim = gsap.fromTo(leftColRef.current,
      { y: 40 },
      {
        y: -40,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1
        }
      }
    );

    const rightAnim = gsap.fromTo(rightColRef.current,
      { y: 100 },
      {
        y: -100,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1
        }
      }
    );

    return () => {
      leftAnim.kill();
      rightAnim.kill();
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <div ref={sectionRef}>
      <SectionWrapper className="bg-white py-24">
        <div className="container mx-auto max-w-[1400px] px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-stretch">
            
            {/* Left Column: Text & Graph */}
            <div className="flex flex-col justify-between py-4">
              <ScrollReveal>
                <span className="section-badge mb-6 inline-block">PERFORMANCE</span>
                <h2 className="qupe-heading text-4xl md:text-5xl text-foreground leading-tight tracking-tight mt-2">
                  Protecting Ethiopia<br className="hidden md:block"/><span className="text-primary"> With Proven Results</span>
                </h2>
                <p className="mt-8 text-slate-500 text-lg leading-relaxed max-w-lg font-medium">
                  Our numbers reflect over 15 years of dedication to safeguarding Ethiopian families, businesses, and communities.
                </p>
              </ScrollReveal>
              
              <ScrollReveal delay={0.2} className="mt-16 lg:mt-32 w-full">
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Policy Growth Trajectory</span>
                </div>
                
                <div ref={chartContainerRef} className="w-full">
                  <div className="mt-8 flex items-end gap-2 sm:gap-3 h-40 md:h-56 border-b border-slate-200 pb-2">
                    {miniChart.map((value, i) => (
                      <div
                        key={i}
                        className="flex-1 rounded-t-md relative group cursor-pointer overflow-hidden flex items-end"
                        style={{ height: `${value}%` }}
                      >
                        <div
                          className="chart-bar-fill w-full rounded-t-md bg-emerald-500/70 group-hover:bg-emerald-500 transition-colors"
                        />
                        <div className="absolute top-2 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-800 text-white text-[10px] px-1.5 py-0.5 rounded whitespace-nowrap pointer-events-none font-semibold z-20">
                          {Math.round(value * 8.6)}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between mt-3">
                    {["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"].map((m) => (
                      <span key={m} className="text-[10px] sm:text-xs text-slate-400 font-bold uppercase tracking-wider flex-1 text-center">{m}</span>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            </div>

            {/* Right Column: Stat Boxes Grid */}
            <div className="flex flex-col sm:flex-row items-start mt-10 lg:mt-0">
              
              {/* Left Box Column */}
              <div ref={leftColRef} className="flex flex-col flex-1 w-full">
                {stats.slice(0, 2).map((stat, i) => (
                  <ScrollReveal key={stat.label} delay={i * 0.1} animation="fadeUp" className={`flex w-full ${i > 0 ? '-mt-[1px]' : ''}`}>
                    <div className="border border-slate-200 py-10 sm:py-12 pl-4 sm:pl-5 pr-6 flex flex-col justify-between bg-white group hover:border-emerald-500/50 hover:shadow-xl hover:z-10 relative transition-all duration-500 min-h-[300px] sm:min-h-[380px] w-full text-left">
                      <p className="text-5xl sm:text-6xl font-hero font-light text-primary tracking-tighter transition-transform duration-500 group-hover:translate-x-2 origin-left">
                        <AnimatedCounter target={stat.value} suffix={stat.suffix} prefix={stat.prefix} />
                      </p>
                      <p className="text-sm md:text-base text-slate-500 font-medium tracking-wide mt-12">
                        {stat.label}
                      </p>
                    </div>
                  </ScrollReveal>
                ))}
              </div>

              {/* Right Box Column (Skewed lower) */}
              <div ref={rightColRef} className="flex flex-col flex-1 w-full mt-[-1px] sm:mt-24 sm:-ml-[1px]">
                {stats.slice(2, 4).map((stat, i) => (
                  <ScrollReveal key={stat.label} delay={i * 0.1 + 0.2} animation="fadeUp" className={`flex w-full ${i > 0 ? '-mt-[1px]' : ''}`}>
                    <div className="border border-slate-200 py-10 sm:py-12 pl-4 sm:pl-5 pr-6 flex flex-col justify-between bg-white group hover:border-emerald-500/50 hover:shadow-xl hover:z-10 relative transition-all duration-500 min-h-[300px] sm:min-h-[380px] w-full text-left">
                      <p className="text-5xl sm:text-6xl font-hero font-light text-primary tracking-tighter transition-transform duration-500 group-hover:translate-x-2 origin-left">
                        <AnimatedCounter target={stat.value} suffix={stat.suffix} prefix={stat.prefix} />
                      </p>
                      <p className="text-sm md:text-base text-slate-500 font-medium tracking-wide mt-12">
                        {stat.label}
                      </p>
                    </div>
                  </ScrollReveal>
                ))}
              </div>

            </div>

          </div>
        </div>
      </SectionWrapper>
    </div>
  );
};

export default StatsDashboard;
