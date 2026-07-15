import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';

interface CrossfadeVideoProps extends React.VideoHTMLAttributes<HTMLVideoElement> {
  src: string;
  crossfadeDuration?: number;
  playbackRate?: number;
}

const CrossfadeVideo = React.forwardRef<HTMLVideoElement, CrossfadeVideoProps>(
  ({ src, crossfadeDuration = 0.8, playbackRate = 1, className, style, ...props }, forwardedRef) => {
    const video1Ref = useRef<HTMLVideoElement>(null);
    const video2Ref = useRef<HTMLVideoElement>(null);

    useEffect(() => {
      const v1 = video1Ref.current;
      const v2 = video2Ref.current;
      if (!v1 || !v2) return;

      v1.playbackRate = playbackRate;
      v2.playbackRate = playbackRate;

      let animationFrameId: number;
      let activeVideo = 1;

      v1.style.opacity = '1';
      v2.style.opacity = '0';
      v1.play().catch(() => {});

      const checkCrossfade = () => {
        const current = activeVideo === 1 ? v1 : v2;
        const next = activeVideo === 1 ? v2 : v1;

        if (current.duration) {
          const timeRemaining = current.duration - current.currentTime;
          
          if (timeRemaining <= crossfadeDuration) {
            if (next.paused) {
              next.currentTime = 0;
              next.play().catch(() => {});
              
              gsap.to(current, { opacity: 0, duration: crossfadeDuration, ease: "power1.inOut" });
              gsap.to(next, { opacity: 1, duration: crossfadeDuration, ease: "power1.inOut" });
              
              activeVideo = activeVideo === 1 ? 2 : 1;
            }
          }
        }
        animationFrameId = requestAnimationFrame(checkCrossfade);
      };

      animationFrameId = requestAnimationFrame(checkCrossfade);

      return () => {
        cancelAnimationFrame(animationFrameId);
      };
    }, [crossfadeDuration, playbackRate, src]);

    return (
      <div className={`relative ${className}`} style={style}>
        <video
          ref={(el) => {
            video1Ref.current = el;
            if (typeof forwardedRef === 'function') forwardedRef(el);
            else if (forwardedRef) forwardedRef.current = el;
          }}
          src={src}
          className="absolute inset-0 w-full h-full object-cover object-center"
          muted
          playsInline
          {...props}
        />
        <video
          ref={video2Ref}
          src={src}
          className="absolute inset-0 w-full h-full object-cover object-center"
          muted
          playsInline
          {...props}
        />
      </div>
    );
  }
);

CrossfadeVideo.displayName = 'CrossfadeVideo';

export default CrossfadeVideo;
