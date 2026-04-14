"use client";

import Image from "next/image";
import { useState } from "react";

import { trackEvent } from "@/lib/analytics";

import styles from "./youtube-video-preview.module.css";

type YouTubeVideoPreviewProps = {
  analyticsSurface?: string;
  className?: string;
  posterSrc: string;
  startSeconds?: number;
  title: string;
  videoId: string;
};

function joinClasses(...values: Array<string | undefined>) {
  return values.filter(Boolean).join(" ");
}

export function YouTubeVideoPreview({
  analyticsSurface = "unknown",
  className,
  posterSrc,
  startSeconds = 0,
  title,
  videoId,
}: YouTubeVideoPreviewProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  const searchParams = new URLSearchParams({
    autoplay: "1",
    rel: "0",
    start: String(startSeconds),
    playsinline: "1",
  });
  const embedSrc = `https://www.youtube.com/embed/${videoId}?${searchParams.toString()}`;

  return (
    <div className={joinClasses(styles.root, className)}>
      {isPlaying ? (
        <div className={styles.surface}>
          <iframe
            className={styles.iframe}
            src={embedSrc}
            title={title}
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            referrerPolicy="strict-origin-when-cross-origin"
          />
        </div>
      ) : (
        <button
          type="button"
          className={styles.surface}
          aria-label={`Play ${title}`}
          onClick={() => {
            trackEvent("youtube_video_play", {
              start_seconds: startSeconds,
              surface: analyticsSurface,
              video_id: videoId,
            });
            setIsPlaying(true);
          }}
        >
          <Image src={posterSrc} alt="" fill sizes="100vw" className={styles.poster} />
          <span className={styles.playBadge} aria-hidden="true">
            <svg viewBox="0 0 24 24" className={styles.playIcon}>
              <path d="M8 6.5v11l9-5.5-9-5.5z" />
            </svg>
          </span>
          <span className={styles.srOnly}>Play video</span>
        </button>
      )}
    </div>
  );
}
