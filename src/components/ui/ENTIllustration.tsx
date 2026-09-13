"use client";

import { useEffect, useRef } from "react";

export default function ENTIllustration({
  className = "",
  size = 400,
  animate = true,
}: {
  className?: string;
  size?: number;
  animate?: boolean;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    canvas.style.width = `${size}px`;
    canvas.style.height = `${size}px`;
    ctx.scale(dpr, dpr);

    let angleY = 0;
    let targetAngleY = 0;
    let animationId: number;

    const drawEar = (ctx: CanvasRenderingContext2D, cx: number, cy: number, scale: number, rotationY: number) => {
      ctx.save();
      ctx.translate(cx, cy);
      ctx.scale(scale, scale);

      const earGradient = ctx.createRadialGradient(0, 0, 0, 0, 0, 40);
      earGradient.addColorStop(0, "#e8f5f3");
      earGradient.addColorStop(0.5, "#b8e0d8");
      earGradient.addColorStop(1, "#8fc9be");

      ctx.fillStyle = earGradient;
      ctx.strokeStyle = "#0d9488";
      ctx.lineWidth = 1.5;

      ctx.beginPath();
      ctx.ellipse(0, 0, 25 * Math.abs(Math.cos(rotationY)) + 5, 35, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      ctx.beginPath();
      ctx.ellipse(0, -5, 12 * Math.abs(Math.cos(rotationY)) + 3, 18, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      const canalGradient = ctx.createRadialGradient(-5, 5, 0, -5, 5, 8);
      canalGradient.addColorStop(0, "#1a3a36");
      canalGradient.addColorStop(1, "#0d2824");
      ctx.fillStyle = canalGradient;
      ctx.beginPath();
      ctx.ellipse(-5 * Math.cos(rotationY), 5, 6 * Math.abs(Math.cos(rotationY)) + 2, 8, 0, 0, Math.PI * 2);
      ctx.fill();

      ctx.strokeStyle = "#0d948840";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(-15 * Math.cos(rotationY), -20);
      ctx.quadraticCurveTo(0, -10, 10 * Math.cos(rotationY), -15);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(-12 * Math.cos(rotationY), 10);
      ctx.quadraticCurveTo(0, 20, 8 * Math.cos(rotationY), 25);
      ctx.stroke();

      ctx.restore();
    };

    const drawNose = (ctx: CanvasRenderingContext2D, cx: number, cy: number, scale: number) => {
      ctx.save();
      ctx.translate(cx, cy);
      ctx.scale(scale, scale);

      const noseGradient = ctx.createLinearGradient(-15, -10, 15, 20);
      noseGradient.addColorStop(0, "#e8f5f3");
      noseGradient.addColorStop(0.5, "#b8e0d8");
      noseGradient.addColorStop(1, "#8fc9be");

      ctx.fillStyle = noseGradient;
      ctx.strokeStyle = "#0d9488";
      ctx.lineWidth = 1.5;

      ctx.beginPath();
      ctx.moveTo(0, -15);
      ctx.bezierCurveTo(-15, -5, -18, 15, 0, 25);
      ctx.bezierCurveTo(18, 15, 15, -5, 0, -15);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = "#0d948830";
      ctx.beginPath();
      ctx.ellipse(-6, 8, 5, 4, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.ellipse(6, 8, 5, 4, 0, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    };

    const drawThroat = (ctx: CanvasRenderingContext2D, cx: number, cy: number, scale: number) => {
      ctx.save();
      ctx.translate(cx, cy);
      ctx.scale(scale, scale);

      const throatGradient = ctx.createLinearGradient(-20, -10, 20, 30);
      throatGradient.addColorStop(0, "#fef3e8");
      throatGradient.addColorStop(0.5, "#fdd9b8");
      throatGradient.addColorStop(1, "#fb923c");

      ctx.fillStyle = throatGradient;
      ctx.strokeStyle = "#ea580c";
      ctx.lineWidth = 1.5;

      ctx.beginPath();
      ctx.moveTo(-18, -10);
      ctx.bezierCurveTo(-22, 5, -18, 25, -8, 30);
      ctx.lineTo(8, 30);
      ctx.bezierCurveTo(18, 25, 22, 5, 18, -10);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = "#fb923c80";
      ctx.beginPath();
      ctx.ellipse(0, 5, 12, 8, 0, 0, Math.PI * 2);
      ctx.fill();

      ctx.strokeStyle = "#ea580c40";
      ctx.lineWidth = 1;
      for (let i = -1; i <= 1; i++) {
        ctx.beginPath();
        ctx.moveTo(i * 8, -5);
        ctx.quadraticCurveTo(0, 15, i * 8, 25);
        ctx.stroke();
      }

      ctx.restore();
    };

    const drawSoundWaves = (ctx: CanvasRenderingContext2D, cx: number, cy: number, scale: number, time: number) => {
      ctx.save();
      ctx.translate(cx, cy);
      ctx.scale(scale, scale);

      for (let i = 0; i < 4; i++) {
        const waveTime = time * 0.001 + i * 0.5;
        const radius = 50 + i * 18 + Math.sin(waveTime) * 5;
        const opacity = 0.15 - i * 0.03 + Math.sin(waveTime) * 0.02;

        ctx.strokeStyle = `rgba(13, 148, 136, ${Math.max(0, opacity)})`;
        ctx.lineWidth = 1.5;
        ctx.setLineDash([8, 4]);
        ctx.lineDashOffset = time * 0.05;

        ctx.beginPath();
        ctx.ellipse(0, 0, radius, radius * 0.7, 0, 0, Math.PI * 2);
        ctx.stroke();
      }

      ctx.setLineDash([]);
      ctx.restore();
    };

    const drawParticles = (ctx: CanvasRenderingContext2D, cx: number, cy: number, scale: number, time: number) => {
      ctx.save();
      ctx.translate(cx, cy);
      ctx.scale(scale, scale);

      for (let i = 0; i < 12; i++) {
        const angle = (i / 12) * Math.PI * 2 + time * 0.0003;
        const radius = 70 + Math.sin(time * 0.001 + i) * 10;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius * 0.6;
        const opacity = 0.3 + Math.sin(time * 0.002 + i) * 0.2;
        const size = 2 + Math.sin(time * 0.0015 + i) * 1.5;

        ctx.fillStyle = `rgba(13, 148, 136, ${opacity})`;
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.restore();
    };

    const render = (time: number) => {
      if (!ctx) return;

      ctx.clearRect(0, 0, size, size);

      ctx.save();
      ctx.translate(size / 2, size / 2);
      ctx.rotate(angleY * 0.5);
      ctx.translate(-size / 2, -size / 2);

      const centerX = size / 2;
      const centerY = size / 2;

      drawSoundWaves(ctx, centerX, centerY, 1, time);
      drawParticles(ctx, centerX, centerY, 1, time);

      drawEar(ctx, centerX - 100, centerY - 20, 1.2, angleY);
      drawNose(ctx, centerX, centerY + 60, 1);
      drawThroat(ctx, centerX + 100, centerY - 20, 1);

      ctx.restore();

      if (animate) {
        angleY += (targetAngleY - angleY) * 0.05;

        targetAngleY = Math.cos(time * 0.0007) * 0.2;

        animationId = requestAnimationFrame(render);
      }
    };

    animationId = requestAnimationFrame(render);

    const handleMouseMove = (e: MouseEvent) => {
      if (!animate) return;
      const rect = canvas.getBoundingClientRect();
      const mouseX = (e.clientX - rect.left) / rect.width - 0.5;
      targetAngleY = mouseX * 0.3;
    };

    canvas.addEventListener("mousemove", handleMouseMove);

    return () => {
      cancelAnimationFrame(animationId);
      canvas.removeEventListener("mousemove", handleMouseMove);
    };
  }, [size, animate]);

  return (
    <canvas
      ref={canvasRef}
      className={`w-full h-full max-w-[${size}px] max-h-[${size}px] ${className}`}
      aria-label="3D ENT anatomy illustration showing ear, nose, and throat structures with subtle animation"
      role="img"
    />
  );
}