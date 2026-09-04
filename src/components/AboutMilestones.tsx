import { useRef, useState, type CSSProperties } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const milestones = [
  {
    label: "2023",
    description:
      "WASS Insurance was formally established, its founding committee constituted, and the groundwork laid for what would become a new force in Ethiopian insurance.",
    color: "#15586A",
  },
  {
    label: "2026",
    description:
      "Preparations complete, WASS Insurance stands ready to commence full operations and open its doors to the Ethiopian market.",
    color: "#288A69",
  },
  {
    label: "More to come",
    description:
      "More milestones are still ahead. The next chapter of WASS Insurance is coming soon.",
    color: "#75BFA7",
  },
];

const AboutMilestones = () => {
  const timelineRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(-1);

  useGSAP(
    () => {
      if (!timelineRef.current || !stageRef.current) return;

      ScrollTrigger.create({
        trigger: timelineRef.current,
        start: "top top",
        end: () => `+=${window.innerHeight * 1.8}`,
        pin: stageRef.current,
        pinSpacing: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onEnter: () => setActiveIndex(0),
        onEnterBack: () => setActiveIndex(2),
        onLeave: () => setActiveIndex(2),
        onLeaveBack: () => setActiveIndex(-1),
        onUpdate: ({ progress, isActive }) => {
          if (!isActive) return;

          const nextIndex = progress < 0.34 ? 0 : progress < 0.68 ? 1 : 2;
          setActiveIndex((currentIndex) =>
            currentIndex === nextIndex ? currentIndex : nextIndex,
          );
        },
      });
    },
    { scope: timelineRef },
  );

  return (
    <section ref={timelineRef} className="relative bg-[#F5F3F4]">
      <div ref={stageRef} className="flex min-h-screen w-full items-center overflow-hidden py-6 md:py-8">
        <div className="mx-auto w-full max-w-[1800px] px-6 md:px-8 lg:px-12">
          <header className="mx-auto max-w-2xl text-center">
            <span className="section-badge mb-4 inline-block uppercase">
              Milestones
            </span>
            <h2 className="section-title text-foreground">
              Our <span className="text-primary">Journey</span>
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground md:text-base">
              Take a look at how far we've come. We continue to grow, innovate, and lead the way in Ethiopian insurance.
            </p>
          </header>

          <ol className="journey-steps" aria-label="WASS Insurance milestones">
            {milestones.map((milestone, index) => {
              const isActive = activeIndex === index;
              const isPast = activeIndex >= 0 && index < activeIndex;
              const state = isActive ? "active" : isPast ? "past" : "upcoming";

              return (
                <li
                  key={milestone.label}
                  className={`journey-step journey-step--${state}`}
                  style={{ "--journey-color": milestone.color } as CSSProperties}
                  aria-current={isActive ? "step" : undefined}
                >
                  <div className="journey-copy">
                    <span className="journey-index">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h3 className="journey-year">{milestone.label}</h3>
                    <p className="journey-description">{milestone.description}</p>
                  </div>

                  <div className="journey-connector" aria-hidden="true">
                    <span className="journey-connector-line" />
                    <span className="journey-connector-dot" />
                  </div>

                  <div className="journey-arrow" aria-hidden="true">
                    <span>{index === milestones.length - 1 ? "Onward" : milestone.label}</span>
                  </div>

                  <span className="sr-only">
                    {isActive ? "Current milestone" : isPast ? "Past milestone" : "Upcoming milestone"}
                  </span>
                </li>
              );
            })}
          </ol>

          <div className="journey-progress-labels">
            <span>2023</span>
            <span className="journey-progress-count">
              {String(Math.max(activeIndex + 1, 0)).padStart(2, "0")} / {String(milestones.length).padStart(2, "0")}
            </span>
            <span>Onward</span>
          </div>
        </div>
      </div>

      <style>{`
        .journey-steps {
          display: grid;
          grid-template-columns: 1fr;
          width: 100%;
          max-width: 36rem;
          margin: 1.5rem auto 0;
        }

        .journey-step {
          display: grid;
          grid-template-columns: 2.75rem minmax(0, 1fr);
          grid-template-areas: "arrow copy";
          column-gap: 1rem;
          min-width: 0;
          padding: 0.8rem 0;
          border-top: 1px solid #d6dbd8;
        }

        .journey-step--active {
          border-color: hsl(var(--primary));
        }

        .journey-copy {
          grid-area: copy;
          min-width: 0;
          text-align: left;
        }

        .journey-index {
          display: block;
          margin-bottom: 0.2rem;
          color: hsl(var(--primary));
          font-size: 0.56rem;
          font-weight: 700;
          letter-spacing: 0.17em;
        }

        .journey-year {
          margin: 0;
          color: hsl(var(--foreground));
          font-family: var(--font-heading, inherit);
          font-size: 1.05rem;
          font-weight: 700;
          line-height: 1.2;
          letter-spacing: -0.025em;
          transition: color 0.35s ease, opacity 0.35s ease;
        }

        .journey-description {
          max-width: 32rem;
          margin: 0.32rem 0 0;
          color: hsl(var(--muted-foreground));
          font-size: 0.68rem;
          line-height: 1.48;
          transition: opacity 0.35s ease;
        }

        .journey-step--past .journey-year,
        .journey-step--past .journey-description {
          opacity: 0.62;
        }

        .journey-step--upcoming .journey-year,
        .journey-step--upcoming .journey-description,
        .journey-step--upcoming .journey-index {
          opacity: 0.38;
        }

        .journey-connector {
          display: none;
        }

        .journey-arrow {
          grid-area: arrow;
          position: relative;
          width: 1.3rem;
          min-height: 4.8rem;
          justify-self: center;
          display: flex;
          align-items: flex-start;
          justify-content: center;
          padding-top: 0.55rem;
          background: var(--journey-color);
          color: #fff;
          clip-path: polygon(0 0, 100% 0, 100% 72%, 50% 100%, 0 72%);
          transition: opacity 0.35s ease;
        }

        .journey-arrow span {
          font-size: 0.46rem;
          font-weight: 700;
          letter-spacing: 0.05em;
          writing-mode: vertical-rl;
          text-transform: uppercase;
        }

        .journey-step--past .journey-arrow { opacity: 0.68; }
        .journey-step--upcoming .journey-arrow { opacity: 0.25; }

        .journey-progress-labels {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          max-width: 73.75rem;
          margin: 1.25rem auto 0;
          padding-top: 0.7rem;
          border-top: 1px solid #d6dbd8;
          color: hsl(var(--muted-foreground) / 0.58);
          font-size: 0.56rem;
          font-weight: 700;
          letter-spacing: 0.16em;
          text-transform: uppercase;
        }

        .journey-progress-count {
          color: hsl(var(--primary));
          font-size: 0.62rem;
          font-variant-numeric: tabular-nums;
        }

        @media (min-width: 1024px) {
          .journey-steps {
            grid-template-columns: repeat(3, minmax(0, 1fr));
            gap: 0.5rem;
            max-width: none;
            margin-top: 2.75rem;
          }

          .journey-step {
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 0;
            border-top: 0;
          }

          .journey-copy {
            display: flex;
            height: 10.5rem;
            flex-direction: column;
            align-items: center;
            padding: 0 2rem;
            text-align: center;
          }

          .journey-index {
            margin-bottom: 0.35rem;
            font-size: 0.6rem;
          }

          .journey-year {
            font-size: clamp(1.35rem, 1.7vw, 1.7rem);
          }

          .journey-description {
            max-width: 19rem;
            margin-top: 0.65rem;
            font-size: clamp(0.7rem, 0.72vw, 0.8rem);
            line-height: 1.55;
          }

          .journey-connector {
            position: relative;
            display: flex;
            width: 100%;
            height: 3.25rem;
            justify-content: center;
          }

          .journey-connector-line {
            width: 1px;
            height: 100%;
            background: #c7ceca;
          }

          .journey-connector-dot {
            position: absolute;
            bottom: -0.42rem;
            width: 0.85rem;
            height: 0.85rem;
            border: 2px solid #b6bfbb;
            border-radius: 50%;
            background: #f5f3f4;
            z-index: 2;
          }

          .journey-step--active .journey-connector-line {
            background: hsl(var(--primary));
          }

          .journey-step--active .journey-connector-dot {
            border-color: hsl(var(--primary));
            transform: scale(1.22);
          }

          .journey-step--past .journey-connector-dot {
            border-color: hsl(var(--primary));
          }

          .journey-arrow {
            grid-area: auto;
            width: 100%;
            min-height: 3.75rem;
            align-items: center;
            padding: 0;
            clip-path: polygon(0 0, calc(100% - 27px) 0, 100% 50%, calc(100% - 27px) 100%, 0 100%, 27px 50%);
            transition: opacity 0.35s ease, transform 0.35s ease;
          }

          .journey-step:first-child .journey-arrow {
            clip-path: polygon(0 0, calc(100% - 27px) 0, 100% 50%, calc(100% - 27px) 100%, 0 100%);
          }

          .journey-step--active .journey-arrow {
            transform: translateY(-0.2rem);
          }

          .journey-arrow span {
            font-size: 0.6rem;
            letter-spacing: 0.2em;
            writing-mode: horizontal-tb;
          }

          .journey-progress-labels {
            max-width: none;
            margin-top: 2rem;
            font-size: 0.58rem;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .journey-year,
          .journey-description,
          .journey-arrow {
            transition: none;
          }
        }
      `}</style>
    </section>
  );
};

export default AboutMilestones;
