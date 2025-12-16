"use client";

import { useRef, useEffect } from "react";

export function SparklesCore({
  id = "sparkles",
  className = "",
  background = "transparent",
  particleColor = "#005461",
  particleDensity = 1200,
  minSize = 0.5,
  maxSize = 1.2,
}) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    let particles = Array.from({ length: particleDensity }).map(() => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * (maxSize - minSize) + minSize,
      speedX: (Math.random() - 0.5) * 0.3,
      speedY: (Math.random() - 0.5) * 0.3,
    }));

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;

        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.fillStyle = particleColor;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      requestAnimationFrame(animate);
    };

    animate();
  }, []);

  return (
    <canvas
      id={id}
      ref={canvasRef}
      className={`absolute inset-0 h-full w-full ${className}`}
      style={{ background }}
    ></canvas>
  );
}
