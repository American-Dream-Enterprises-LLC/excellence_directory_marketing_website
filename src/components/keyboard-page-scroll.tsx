"use client";

import { useEffect, useRef } from "react";

const scrollSpeedPxPerSecond = 760;
const scrollKeys = new Set(["j", "k"]);

function isEditableTarget(target: EventTarget | null) {
  if (!(target instanceof HTMLElement)) {
    return false;
  }

  return (
    target instanceof HTMLInputElement ||
    target instanceof HTMLTextAreaElement ||
    target instanceof HTMLSelectElement ||
    target.isContentEditable
  );
}

function hasOpenDialog() {
  return document.querySelector('[role="dialog"], dialog[open]') !== null;
}

export function KeyboardPageScroll() {
  const activeKeysRef = useRef(new Set<string>());
  const animationFrameRef = useRef<number | null>(null);
  const lastTimestampRef = useRef<number | null>(null);
  const previousScrollBehaviorRef = useRef<string | null>(null);

  useEffect(() => {
    const getDirection = () => {
      if (activeKeysRef.current.has("j")) {
        return 1;
      }

      if (activeKeysRef.current.has("k")) {
        return -1;
      }

      return 0;
    };

    const stopScrollLoop = () => {
      if (animationFrameRef.current !== null) {
        window.cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }

      lastTimestampRef.current = null;

      if (previousScrollBehaviorRef.current !== null) {
        document.documentElement.style.scrollBehavior = previousScrollBehaviorRef.current;
        previousScrollBehaviorRef.current = null;
      }
    };

    const scrollLoop = (timestamp: number) => {
      if (hasOpenDialog()) {
        activeKeysRef.current.clear();
        stopScrollLoop();
        return;
      }

      const direction = getDirection();

      if (direction === 0) {
        stopScrollLoop();
        return;
      }

      const previousTimestamp = lastTimestampRef.current ?? timestamp;
      const deltaSeconds = Math.min(timestamp - previousTimestamp, 32) / 1000;
      lastTimestampRef.current = timestamp;

      window.scrollBy(0, direction * scrollSpeedPxPerSecond * deltaSeconds);

      animationFrameRef.current = window.requestAnimationFrame(scrollLoop);
    };

    const startScrollLoop = () => {
      if (animationFrameRef.current !== null) {
        return;
      }

      previousScrollBehaviorRef.current = document.documentElement.style.scrollBehavior;
      document.documentElement.style.scrollBehavior = "auto";
      animationFrameRef.current = window.requestAnimationFrame(scrollLoop);
    };

    const onKeyDown = (event: KeyboardEvent) => {
      const key = event.key.toLowerCase();

      if (
        event.defaultPrevented ||
        !scrollKeys.has(key) ||
        event.metaKey ||
        event.ctrlKey ||
        event.altKey ||
        isEditableTarget(event.target) ||
        hasOpenDialog()
      ) {
        return;
      }

      event.preventDefault();
      activeKeysRef.current.add(key);
      startScrollLoop();
    };

    const onKeyUp = (event: KeyboardEvent) => {
      const key = event.key.toLowerCase();

      if (!scrollKeys.has(key)) {
        return;
      }

      activeKeysRef.current.delete(key);

      if (getDirection() === 0) {
        stopScrollLoop();
      }
    };

    const clearActiveKeys = () => {
      activeKeysRef.current.clear();
      stopScrollLoop();
    };

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
    window.addEventListener("blur", clearActiveKeys);
    document.addEventListener("visibilitychange", clearActiveKeys);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
      window.removeEventListener("blur", clearActiveKeys);
      document.removeEventListener("visibilitychange", clearActiveKeys);
      clearActiveKeys();
    };
  }, []);

  return null;
}
