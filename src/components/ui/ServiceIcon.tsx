"use client";

import { useEffect, useRef, useState } from "react";

interface ServiceIconProps {
  type: "ear" | "sinus" | "throat" | "head-neck" | "hearing" | "voice";
  size?: number;
  className?: string;
}

const iconColors = {
  ear: { primary: "#0d9488", secondary: "#14b8a6", bg: "#e8f5f3" },
  sinus: { primary: "#0891b2", secondary: "#06b6d4", bg: "#e0f2f7" },
  throat: { primary: "#ea580c", secondary: "#f97316", bg: "#fef3e8" },
  "head-neck": { primary: "#7c3aed", secondary: "#8b5cf6", bg: "#f5f0ff" },
  hearing: { primary: "#db2777", secondary: "#ec4899", bg: "#fdf2f8" },
  voice: { primary: "#16a34a", secondary: "#22c55e", bg: "#ecfdf5" },
};

export default function ServiceIcon({ type, size = 80, className = "" }: ServiceIconProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [dimensions, setDimensions] = useState({ width: size, height: size });
  const colors = iconColors[type];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = dimensions.width * dpr;
    canvas.height = dimensions.height * dpr;
    canvas.style.width = `${dimensions.width}px`;
    canvas.style.height = `${dimensions.height}px`;
    ctx.scale(dpr, dpr);

    let time = 0;
    let animationId: number;

    const drawEar = (ctx: CanvasRenderingContext2D, cx: number, cy: number, s: number, t: number) => {
      ctx.save();
      ctx.translate(cx, cy);
      ctx.scale(s, s);

      const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, 35);
      gradient.addColorStop(0, colors.bg);
      gradient.addColorStop(1, colors.secondary + "40");

      ctx.fillStyle = gradient;
      ctx.strokeStyle = colors.primary;
      ctx.lineWidth = 2;

      ctx.beginPath();
      ctx.ellipse(0, 0, 22 + Math.sin(t * 0.002) * 2, 30, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      ctx.beginPath();
      ctx.ellipse(0, -3, 10 + Math.sin(t * 0.003) * 1.5, 16, 0, 0, Math.PI * 2);
      ctx.stroke();

      const canalGrad = ctx.createRadialGradient(-3, 4, 0, -3, 4, 7);
      canalGrad.addColorStop(0, colors.primary + "60");
      canalGrad.addColorStop(1, colors.primary);
      ctx.fillStyle = canalGrad;
      ctx.beginPath();
      ctx.ellipse(-3, 4, 5, 7, 0, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    };

    const drawSinus = (ctx: CanvasRenderingContext2D, cx: number, cy: number, s: number, t: number) => {
      ctx.save();
      ctx.translate(cx, cy);
      ctx.scale(s, s);

      const gradient = ctx.createLinearGradient(-12, -10, 12, 20);
      gradient.addColorStop(0, colors.bg);
      gradient.addColorStop(1, colors.secondary + "40");

      ctx.fillStyle = gradient;
      ctx.strokeStyle = colors.primary;
      ctx.lineWidth = 2;

      ctx.beginPath();
      ctx.moveTo(0, -14);
      ctx.bezierCurveTo(-12, -2, -14, 10, 0, 18);
      ctx.bezierCurveTo(14, 10, 12, -2, 0, -14);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = colors.primary + "30";
      ctx.beginPath();
      ctx.ellipse(-5, 5, 4, 3, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.ellipse(5, 5, 4, 3, 0, 0, Math.PI * 2);
      ctx.fill();

      ctx.strokeStyle = colors.primary + "40";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(-8, 2);
      ctx.quadraticCurveTo(0, 12, 8, 2);
      ctx.stroke();

      ctx.restore();
    };

    const drawThroat = (ctx: CanvasRenderingContext2D, cx: number, cy: number, s: number, t: number) => {
      ctx.save();
      ctx.translate(cx, cy);
      ctx.scale(s, s);

      const gradient = ctx.createLinearGradient(-15, -8, 15, 25);
      gradient.addColorStop(0, colors.bg);
      gradient.addColorStop(1, colors.secondary + "40");

      ctx.fillStyle = gradient;
      ctx.strokeStyle = colors.primary;
      ctx.lineWidth = 2;

      ctx.beginPath();
      ctx.moveTo(-14, -8);
      ctx.bezierCurveTo(-18, 6, -14, 20, -5, 24);
      ctx.lineTo(5, 24);
      ctx.bezierCurveTo(14, 20, 18, 6, 14, -8);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = colors.primary + "30";
      ctx.beginPath();
      ctx.ellipse(0, 4, 10, 6, 0, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    };

    const drawHeadNeck = (ctx: CanvasRenderingContext2D, cx: number, cy: number, s: number, t: number) => {
      ctx.save();
      ctx.translate(cx, cy);
      ctx.scale(s, s);

      const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, 35);
      gradient.addColorStop(0, colors.bg);
      gradient.addColorStop(1, colors.secondary + "40");

      ctx.fillStyle = gradient;
      ctx.strokeStyle = colors.primary;
      ctx.lineWidth = 2;

      ctx.beginPath();
      ctx.ellipse(0, -15, 18, 20, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(-12, 5);
      ctx.bezierCurveTo(-16, 15, -8, 28, 0, 30);
      ctx.bezierCurveTo(8, 28, 16, 15, 12, 5);
      ctx.stroke();

      ctx.fillStyle = colors.primary + "30";
      ctx.beginPath();
      ctx.ellipse(0, -10, 8, 5, 0, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    };

    const drawHearing = (ctx: CanvasRenderingContext2D, cx: number, cy: number, s: number, t: number) => {
      ctx.save();
      ctx.translate(cx, cy);
      ctx.scale(s, s);

      const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, 30);
      gradient.addColorStop(0, colors.bg);
      gradient.addColorStop(1, colors.secondary + "40");

      ctx.fillStyle = gradient;
      ctx.strokeStyle = colors.primary;
      ctx.lineWidth = 2;

      ctx.beginPath();
      ctx.arc(0, 0, 25, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      for (let i = 0; i < 3; i++) {
        const waveTime = t * 0.002 + i * 0.8;
        const radius = 35 + i * 10 + Math.sin(waveTime) * 5;
        ctx.strokeStyle = `rgba(${parseInt(colors.primary.slice(1, 3), 16)}, ${parseInt(colors.primary.slice(3, 5), 16)}, ${parseInt(colors.primary.slice(5, 7), 16)}, ${0.15 - i * 0.04})`;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(0, 0, radius, -Math.PI * 0.3, Math.PI * 1.3);
        ctx.stroke();
      }

      ctx.fillStyle = colors.primary;
      ctx.beginPath();
      ctx.arc(0, 0, 4, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    };

    const drawVoice = (ctx: CanvasRenderingContext2D, cx: number, cy: number, s: number, t: number) => {
      ctx.save();
      ctx.translate(cx, cy);
      ctx.scale(s, s);

      const gradient = ctx.createLinearGradient(-20, -10, 20, 20);
      gradient.addColorStop(0, colors.bg);
      gradient.addColorStop(1, colors.secondary + "40");

      ctx.fillStyle = gradient;
      ctx.strokeStyle = colors.primary;
      ctx.lineWidth = 2;

      ctx.beginPath();
      ctx.moveTo(-18, -8);
      ctx.bezierCurveTo(-22, 5, -16, 18, -6, 22);
      ctx.bezierCurveTo(0, 24, 6, 16, 6, 8);
      ctx.bezierCurveTo(6, 0, 0, -6, -4, -8);
      ctx.bezierCurveTo(-8, -10, -14, -10, -18, -8);
      ctx.fill();
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(8, -8);
      ctx.bezierCurveTo(12, 5, 8, 18, 2, 22);
      ctx.stroke();

      for (let i = 0; i < 3; i++) {
        const waveTime = t * 0.003 + i;
        ctx.strokeStyle = `rgba(${parseInt(colors.primary.slice(1, 3), 16)}, ${parseInt(colors.primary.slice(3, 5), 16)}, ${parseInt(colors.primary.slice(5, 7), 16)}, ${0.2 - i * 0.05})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(12 + i * 4, -4 + Math.sin(waveTime) * 3);
        ctx.quadraticCurveTo(16 + i * 4, 4 + Math.sin(waveTime + 1) * 3, 12 + i * 4, 12 + Math.sin(waveTime + 2) * 3);
        ctx.stroke();
      }

      ctx.restore();
    };

    const drawFunctions: Record<string, typeof drawEar> = {
      ear: drawEar,
      sinus: drawSinus,
      throat: drawThroat,
      "head-neck": drawHeadNeck,
      hearing: drawHearing,
      voice: drawVoice,
    };

    const render = (timestamp: number) => {
      if (!ctx) return;
      time = timestamp;

      ctx.clearRect(0, 0, dimensions.width, dimensions.height);

      ctx.save();
      ctx.translate(dimensions.width / 2, dimensions.height / 2);

      const scale = Math.min(dimensions.width, dimensions.height) / 100;
      drawFunctions[type](ctx, 0, 0, scale, time);

      ctx.restore();

      animationId = requestAnimationFrame(render);
    };

    animationId = requestAnimationFrame(render);

    return () => cancelAnimationFrame(animationId);
  }, [dimensions, type, colors]);

  return (
    <canvas
      ref={canvasRef}
      className={`w-[${size}px] h-[${size}px] ${className}`}
      aria-label={`${type} service icon`}
      role="img"
    />
  );
}