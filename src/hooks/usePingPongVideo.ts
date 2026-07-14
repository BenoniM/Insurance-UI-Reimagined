import { useCallback, useEffect, useRef } from "react";

const usePingPongVideo = (playbackRate = 0.7) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const reverseTimerRef = useRef<number | null>(null);
  const isReversingRef = useRef(false);

  const stopReverse = useCallback(() => {
    if (reverseTimerRef.current !== null) {
      window.clearInterval(reverseTimerRef.current);
      reverseTimerRef.current = null;
    }
    isReversingRef.current = false;
  }, []);

  const playForward = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    stopReverse();
    video.loop = false;
    video.playbackRate = playbackRate;

    const playPromise = video.play();
    if (playPromise) {
      playPromise.catch(() => undefined);
    }
  }, [playbackRate, stopReverse]);

  const playReverse = useCallback(() => {
    const video = videoRef.current;
    if (!video || isReversingRef.current) return;

    video.pause();
    stopReverse();
    isReversingRef.current = true;

    if (Number.isFinite(video.duration) && video.currentTime >= video.duration) {
      video.currentTime = Math.max(0, video.duration - 0.05);
    }

    const reverseStep = (1 / 30) * playbackRate;

    reverseTimerRef.current = window.setInterval(() => {
      const activeVideo = videoRef.current;
      if (!activeVideo) return;

      if (activeVideo.currentTime <= reverseStep + 0.03) {
        stopReverse();
        activeVideo.currentTime = 0;
        playForward();
        return;
      }

      activeVideo.currentTime = Math.max(0, activeVideo.currentTime - reverseStep);
    }, 1000 / 30);
  }, [playForward, playbackRate, stopReverse]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoadedMetadata = () => {
      video.loop = false;
      video.playbackRate = playbackRate;
    };

    const handleEnded = () => {
      playReverse();
    };

    const handleTimeUpdate = () => {
      if (
        !isReversingRef.current &&
        Number.isFinite(video.duration) &&
        video.duration > 0 &&
        video.currentTime >= video.duration - 0.08
      ) {
        playReverse();
      }
    };

    video.addEventListener("loadedmetadata", handleLoadedMetadata);
    video.addEventListener("ended", handleEnded);
    video.addEventListener("timeupdate", handleTimeUpdate);

    if (video.readyState >= 1) {
      handleLoadedMetadata();
    }

    return () => {
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
      video.removeEventListener("ended", handleEnded);
      video.removeEventListener("timeupdate", handleTimeUpdate);
      stopReverse();
    };
  }, [playReverse, playbackRate, stopReverse]);

  return videoRef;
};

export default usePingPongVideo;
