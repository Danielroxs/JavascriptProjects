import Container from "./UI/Container.tsx";
import {
  useTimersContext,
  type Timer as TimerProps,
} from "../store/timer-context.tsx";
import { useEffect, useRef, useState } from "react";

export default function Timer({ name, duration }: TimerProps) {
  const interval = useRef<number | null>(null);
  const [remaininggTime, setRemaininggTime] = useState(duration * 1000);

  const { isRunning } = useTimersContext();

  if (remaininggTime <= 0 && interval.current) {
    clearInterval(interval.current);
  }

  useEffect(() => {
    let timer: number;
    if (isRunning) {
      timer = setInterval(() => {
        setRemaininggTime((prevTime) => {
          if (prevTime <= 0) {
            return prevTime; // No hacer nada si ya expiró
          }
          return prevTime - 50; // Solo restar si hay tiempo restante
        });
      }, 50);
      interval.current = timer;
    } else if (interval.current) {
      clearInterval(interval.current);
    }

    return () => {
      if (timer) {
        clearInterval(timer);
      }
    };
  }, [isRunning]);

  const formattedRemainingTime = (remaininggTime / 1000).toFixed(2);

  return (
    <Container as="article">
      <h2>{name}</h2>
      <p>
        <progress max={duration * 1000} value={remaininggTime} />
      </p>
      <p>{formattedRemainingTime}</p>
    </Container>
  );
}
