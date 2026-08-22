import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { parseCountUpValue } from "@/lib/countUp";

interface CountUpValueProps {
  value: string;
  duration?: number;
}

const easeOutCubic = (progress: number) => 1 - Math.pow(1 - progress, 3);

const CountUpValue = ({ value, duration = 1_600 }: CountUpValueProps) => {
  const parsed = parseCountUpValue(value);
  const target = parsed?.target;
  const suffix = parsed?.suffix;
  const prefersReducedMotion = useReducedMotion();
  const [displayValue, setDisplayValue] = useState(() =>
    target !== undefined && !prefersReducedMotion ? 0 : target ?? 0,
  );

  useEffect(() => {
    if (target === undefined) return;

    if (prefersReducedMotion || target === 0) {
      setDisplayValue(target);
      return;
    }

    setDisplayValue(0);
    const startedAt = performance.now();
    let animationFrame = 0;

    const updateValue = (timestamp: number) => {
      const progress = Math.min((timestamp - startedAt) / duration, 1);
      setDisplayValue(Math.round(target * easeOutCubic(progress)));

      if (progress < 1) {
        animationFrame = window.requestAnimationFrame(updateValue);
      }
    };

    animationFrame = window.requestAnimationFrame(updateValue);
    return () => window.cancelAnimationFrame(animationFrame);
  }, [duration, prefersReducedMotion, suffix, target]);

  if (target === undefined || suffix === undefined) {
    return <span data-stat-final-value={value}>{value}</span>;
  }

  return (
    <span className="tabular-nums">
      <span className="sr-only">{value}</span>
      <span
        aria-hidden="true"
        data-count-up="true"
        data-count-up-target={target}
        data-stat-final-value={value}
      >
        {displayValue}
        {suffix}
      </span>
    </span>
  );
};

export default CountUpValue;
