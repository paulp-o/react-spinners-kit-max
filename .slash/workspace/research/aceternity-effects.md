# Aceternity/Magic UI Decorative Effects for Spinner Library Showcase

Date: 2026-04-14

## Summary

This document provides pure CSS + Tailwind implementations (no external libraries) for 7 decorative effects commonly used in aceternity UI and magic UI. All effects are designed for a dark-themed (`#000` background) spinner library showcase and are subtle enough to not distract from the spinner animations.

---

## 1. Grid Background Pattern

### CSS-Only Implementation

```css
/* Add to your global CSS or Tailwind config */
.bg-grid-pattern {
  background-image: 
    linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
  background-size: 60px 60px;
}
```

### React Component

```tsx
// GridBackground.tsx
interface GridBackgroundProps {
  size?: number;
  className?: string;
}

export function GridBackground({ 
  size = 60, 
  className = "" 
}: GridBackgroundProps) {
  const style = {
    backgroundSize: `${size}px ${size}px`,
  };
  
  return (
    <div
      className={`absolute inset-0 pointer-events-none ${className}`}
      style={style}
    />
  );
}

// Usage: Add the grid as a background layer
/*
<div className="relative min-h-screen bg-black">
  <GridBackground className="opacity-50" />
  <YourSpinnerContent />
</div>
*/
```

### Alternative: Dot Grid Pattern

```css
.bg-dot-grid {
  background-image: radial-gradient(circle, rgba(255,255,255,0.15) 1px, transparent 1px);
  background-size: 24px 24px;
}
```

---

## 2. Gradient Glow Effects

### CSS-Only Implementation

```css
.gradient-glow {
  background: radial-gradient(
    ellipse 80% 50% at 50% 120%,
    rgba(120, 50, 255, 0.15),
    transparent 70%
  );
}

/* Multiple colored blurs */
.gradient-glow-multi {
  background: 
    radial-gradient(ellipse 100% 80% at 20% 40%, rgba(120, 50, 255, 0.08), transparent 50%),
    radial-gradient(ellipse 80% 60% at 80% 60%, rgba(50, 150, 255, 0.06), transparent 50%),
    radial-gradient(ellipse 60% 40% at 50% 100%, rgba(255, 100, 150, 0.05), transparent 40%);
}
```

### React Component

```tsx
// GradientGlow.tsx
interface GradientGlowProps {
  colors?: Array<{ color: string; opacity: number; position: { x: number; y: number } }>;
  className?: string;
}

const defaultColors = [
  { color: "#7830ff", opacity: 0.12, position: { x: 30, y: 60 } },
  { color: "#3080ff", opacity: 0.08, position: { x: 70, y: 50 } },
  { color: "#ff3090", opacity: 0.06, position: { x: 50, y: 100 } },
];

export function GradientGlow({
  colors = defaultColors,
  className = ""
}: GradientGlowProps) {
  return (
    <div
      className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}
    >
      {colors.map((c, i) => (
        <div
          key={i}
          className="absolute rounded-full blur-3xl"
          style={{
            background: c.color,
            opacity: c.opacity,
            left: `${c.position.x}%`,
            top: `${c.position.y}%`,
            width: "60%",
            height: "60%",
            transform: "translate(-50%, -50%)",
          }}
        />
      ))}
    </div>
  );
}

/*
<div className="relative bg-black">
  <GradientGlow />
  <YourSpinnerContent />
</div>
*/
```

---

## 3. Border Beam / Shimmer Effect

### CSS-Only Implementation

```css
.border-beam-container {
  position: relative;
  border-radius: 1rem;
  overflow: hidden;
}

.border-beam {
  position: absolute;
  inset: 0;
  border-radius: inherit;
  padding: 1px;
  background: linear-gradient(
    135deg,
    transparent 40%,
    rgba(255, 170, 64, 0.6) 50%,
    transparent 60%
  ) border-box;
  -webkit-mask: 
    linear-gradient(#fff 0 0) content-box, 
    linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  animation: border-beam-move 3s linear infinite;
}

@keyframes border-beam-move {
  0% {
    transform: translateX(-100%) rotate(45deg);
  }
  100% {
    transform: translateX(200%) rotate(45deg);
  }
}
```

### React Component

```tsx
// BorderBeam.tsx
interface BorderBeamProps {
  size?: number;
  duration?: number;
  colorFrom?: string;
  colorTo?: string;
  className?: string;
}

export function BorderBeam({
  size = 300,
  duration = 6,
  colorFrom = "#ffaa40",
  colorTo = "#9c40ff",
  className = ""
}: BorderBeamProps) {
  return (
    <div
      className={`pointer-events-none absolute inset-0 rounded-[inherit] ${className}`}
      style={{
        padding: "1px",
        mask: `linear-gradient(transparent, transparent), linear-gradient(#000, #000)`,
        maskComposite: "exclude",
        WebkitMaskComposite: "xor",
      }}
    >
      <div
        className="absolute"
        style={{
          width: size,
          height: size,
          background: `linear-gradient(135deg, transparent 40%, ${colorFrom} 50%, ${colorTo} 60%)`,
          animation: `border-beam-move ${duration}s linear infinite`,
        }}
      />
      <style>{`
        @keyframes border-beam-move {
          0% {
            transform: translateX(-50%) translateY(-50%) rotate(45deg);
          }
          100% {
            transform: translateX(200%) translateY(200%) rotate(45deg);
          }
        }
      `}</style>
    </div>
  );
}

/*
<div className="relative rounded-xl bg-zinc-900 border border-zinc-800 p-6">
  <BorderBeam />
  <YourSpinnerCard />
</div>
*/
```

### Alternative: Hover Border Gradient

```css
.hover-border-gradient {
  position: relative;
  border-radius: 1rem;
  background: linear-gradient(#000, #000) padding-box,
              linear-gradient(135deg, #7830ff, #3080ff, #30ff80) border-box;
  border: 2px solid transparent;
  transition: all 0.3s ease;
}

.hover-border-gradient:hover {
  background: linear-gradient(#111, #111) padding-box,
              linear-gradient(135deg, #7844ff, #3090ff, #40ff90) border-box;
}
```

---

## 4. Spotlight / Cursor Follow Effect

### React Component (Pure CSS Animation)

```tsx
// Spotlight.tsx
"use client";

import { useState, useEffect } from "react";

interface SpotlightProps {
  className?: string;
  mouseX?: number;
  mouseY?: number;
}

export function Spotlight({
  className = ""
}: SpotlightProps) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setVisible(true);
    };

    const handleMouseLeave = () => {
      setVisible(false);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div
      className={`pointer-events-none fixed inset-0 z-50 transition-opacity duration-300 ${
        visible ? "opacity-100" : "opacity-0"
      } ${className}`}
      style={{
        background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(120, 50, 255, 0.06), transparent 40%)`,
      }}
    />
  );
}

/*
<Spotlight className="opacity-50" />
*/
```

### Alternative: Card Spotlight (Local)

```tsx
// CardSpotlight.tsx
"use client";

import { useState, useRef } from "react";

interface CardSpotlightProps {
  className?: string;
  children?: React.ReactNode;
}

export function CardSpotlight({ 
  className = "", 
  children 
}: CardSpotlightProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setPosition({ x, y });
    setOpacity(1);
  };

  const handleMouseLeave = () => {
    setOpacity(0);
  };

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden rounded-xl bg-zinc-900 border border-zinc-800 ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className="pointer-events-none absolute -inset-px rounded-xl transition-opacity duration-300"
        style={{
          opacity,
          background: `radial-gradient(650px circle at ${position.x}px ${position.y}px, rgba(14, 165, 233, 0.15), transparent 80%)`,
        }}
      />
      {children}
    </div>
  );
}

/*
<CardSpotlight className="p-8">
  <YourSpinnerContent />
</CardSpotlight>
*/
```

---

## 5. Text Gradient Animation

### CSS-Only Implementation

```css
.text-gradient-animate {
  background: linear-gradient(
    90deg,
    #7830ff,
    #3080ff,
    #30ff80,
    #7830ff
  );
  background-size: 300%;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: text-gradient 4s linear infinite;
}

@keyframes text-gradient {
  0% {
    background-position: 0%;
  }
  100% {
    background-position: 300%;
  }
}
```

### React Component

```tsx
// TextGradient.tsx
interface TextGradientProps {
  children: React.ReactNode;
  className?: string;
  colors?: string[];
}

export function TextGradient({
  children,
  className = "",
  colors = ["#7830ff", "#3080ff", "#30ff80", "#f03080", "#7830ff"]
}: TextGradientProps) {
  const gradientStyle = {
    background: `linear-gradient(90deg, ${colors.join(", ")})`,
    backgroundSize: "300%",
    WebkitBackgroundClip: "text",
    backgroundClip: "text",
    WebkitTextFillColor: "transparent",
  };

  return (
    <>
      <style>{`
        @keyframes text-gradient-shift {
          0% { background-position: 0% 50%; }
          100% { background-position: 300% 50%; }
        }
      `}</style>
      <span
        className={`inline-block ${className}`}
        style={gradientStyle}
      >
        {children}
      </span>
    </>
  );
}

/*
<TextGradient className="text-4xl font-bold">
  Your Spinner Library
</TextGradient>
*/
```

### Tailwind Class (Add to config)

```js
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      animation: {
        "text-gradient": "text-gradient-shift 4s linear infinite",
      },
      keyframes: {
        "text-gradient-shift": {
          "0%": { backgroundPosition: "0% 50%" },
          "100%": { backgroundPosition: "300% 50%" },
        },
      },
    },
  },
};

/*
Usage: <span className="bg-gradient-to-r from-violet-500 via-cyan-500 to-emerald-500 bg-[length:300%_300%] bg-clip-text text-transparent animate-text-gradient">
*/
```

---

## 6. Floating Particles

### CSS-Only Implementation

```css
/* Minimal particle using pseudo-elements */
.particles-container {
  position: relative;
  overflow: hidden;
}

.particles-container::before,
.particles-container::after {
  content: "";
  position: absolute;
  width: 300px;
  height: 300px;
  border-radius: 50%;
  background: radial-gradient(
    circle,
    rgba(120, 50, 255, 0.15) 0%,
    transparent 70%
  );
  animation: particle-float 20s ease-in-out infinite;
}

.particles-container::before {
  top: -50%;
  left: -20%;
}

.particles-container::after {
  bottom: -30%;
  right: -10%;
  animation-delay: -10s;
}

@keyframes particle-float {
  0%, 100% {
    transform: translate(0, 0) scale(1);
  }
  25% {
    transform: translate(30px, -30px) scale(1.1);
  }
  50% {
    transform: translate(-20px, 20px) scale(0.9);
  }
  75% {
    transform: translate(-30px, -20px) scale(1.05);
  }
}
```

### React Component

```tsx
// FloatingParticles.tsx
import { useMemo } from "react";

interface FloatingParticlesProps {
  count?: number;
  className?: string;
}

export function FloatingParticles({
  count = 15,
  className = ""
}: FloatingParticlesProps) {
  const particles = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      size: Math.random() * 3 + 1,
      x: Math.random() * 100,
      y: Math.random() * 100,
      duration: Math.random() * 20 + 10,
      delay: Math.random() * -20,
      opacity: Math.random() * 0.3 + 0.1,
    }));
  }, [count]);

  return (
    <div
      className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}
    >
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full"
          style={{
            width: p.size,
            height: p.size,
            background: `rgba(120, 100, 255, ${p.opacity})`,
            left: `${p.x}%`,
            top: `${p.y}%`,
            animation: `particle-float ${p.duration}s ease-in-out ${p.delay}s infinite`,
            boxShadow: `0 0 ${p.size * 2}px rgba(120, 100, 255, ${p.opacity})`,
          }}
        />
      ))}
      <style>{`
        @keyframes particle-float {
          0%, 100% {
            transform: translateY(0) translateX(0);
            opacity: 0.1;
          }
          25% {
            transform: translateY(-100px) translateX(20px);
            opacity: 0.3;
          }
          50% {
            transform: translateY(-200px) translateX(-10px);
            opacity: 0.2;
          }
          75% {
            transform: translateY(-300px) translateX(15px);
            opacity: 0.15;
          }
          100% {
            transform: translateY(-400px);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}

/*
<div className="relative h-96 w-full bg-black">
  <FloatingParticles count={20} />
</div>
*/
```

---

## 7. Meteor / Shooting Star Lines

### React Component

```tsx
// Meteors.tsx
import { useMemo } from "react";

interface MeteorsProps {
  number?: number;
  className?: string;
}

export function Meteors({
  number = 20,
  className = ""
}: MeteorsProps) {
  const meteorStyles = useMemo(() => {
    return Array.from({ length: number }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      animationDelay: `${Math.random() * 1 + 0.2}s`,
      animationDuration: `${Math.random() * 8 + 2}s`,
    }));
  }, [number]);

  return (
    <div
      className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}
    >
      {meteorStyles.map((m) => (
        <span
          key={m.id}
          className="absolute size-0.5 rotate-[215deg] animate-meteor rounded-full bg-zinc-500"
          style={{
            top: "-5%",
            left: m.left,
            animationDelay: m.animationDelay,
            animationDuration: m.animationDuration,
          }}
        >
          {/* Meteor Tail */}
          <span
            className="absolute top-1/2 -z-10 h-px w-12 -translate-y-1/2 bg-gradient-to-r from-zinc-500 to-transparent"
            style={{ left: "100%" }}
          />
        </span>
      ))}
      <style>{`
        @keyframes meteor {
          0% {
            transform: rotate(215deg) translateX(0);
            opacity: 1;
          }
          70% {
            opacity: 1;
          }
          100% {
            transform: rotate(215deg) translateX(-500px);
            opacity: 0;
          }
        }
        .animate-meteor {
          animation: meteor 5s linear infinite;
        }
      `}</style>
    </div>
  );
}

/*
<div className="relative h-96 w-full bg-black">
  <Meteors number={15} />
</div>
*/
```

### Alternative: Static CSS Meteors (No JS)

```css
/* Pure CSS meteor effect with fixed positions */
.meteor-container {
  position: absolute;
  inset: 0;
  overflow: hidden;
}

.meteor-1, .meteor-2, .meteor-3 {
  position: absolute;
  width: 150px;
  height: 1px;
  background: linear-gradient(to right, transparent, rgba(255,255,255,0.8), transparent);
  transform: rotate(-45deg);
  border-radius: 50%;
}

.meteor-1 {
  top: 20%;
  left: 10%;
  animation: meteor-fall-1 8s linear infinite;
  animation-delay: 0s;
}

.meteor-2 {
  top: 40%;
  left: 30%;
  animation: meteor-fall-2 6s linear infinite;
  animation-delay: 3s;
}

.meteor-3 {
  top: 15%;
  left: 60%;
  animation: meteor-fall-3 10s linear infinite;
  animation-delay: 5s;
}

@keyframes meteor-fall-1 {
  0% { transform: rotate(-45deg) translateX(-200px); opacity: 0; }
  10% { opacity: 1; }
  30% { transform: rotate(-45deg) translateX(calc(100vw + 200px)); opacity: 0; }
  100% { opacity: 0; }
}

/* Add similar keyframes for meteor-fall-2 and meteor-fall-3 with different durations */
```

---

## Quick Reference: Tailwind Config Additions

```js
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      animation: {
        "meteor": "meteor 5s linear infinite",
        "border-beam": "border-beam-move 3s linear infinite",
        "particle-float": "particle-float 20s ease-in-out infinite",
        "text-gradient": "text-gradient-shift 4s linear infinite",
      },
      keyframes: {
        "meteor": {
          "0%": { transform: "rotate(215deg) translateX(0)", opacity: "1" },
          "70%": { opacity: "1" },
          "100%": { transform: "rotate(215deg) translateX(-500px)", opacity: "0" },
        },
        "border-beam-move": {
          "0%": { transform: "translateX(-100%) rotate(45deg)" },
          "100%": { transform: "translateX(100%) rotate(45deg)" },
        },
        "particle-float": {
          "0%, 100%": { transform: "translateY(0) translateX(0)" },
          "25%": { transform: "translateY(-25vh) translateX(10px)" },
          "50%": { transform: "translateY(-50vh) translateX(-10px)" },
          "75%": { transform: "translateY(-75vh) translateX(15px)" },
          "100%": { transform: "translateY(-100vh)" },
        },
        "text-gradient-shift": {
          "0%": { backgroundPosition: "0% 50%" },
          "100%": { backgroundPosition: "300% 50%" },
        },
      },
    },
  },
}
```

---

## Combined Example: Spinner Showcase Page Layout

```tsx
// SpinnerShowcase.tsx
export function SpinnerShowcase() {
  return (
    <div className="relative min-h-screen bg-black overflow-hidden">
      {/* 1. Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[60px_60px]" />
      
      {/* 2. Gradient Glow */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] rounded-full bg-[radial-gradient(ellipse,rgba(120,50,255,0.1),transparent_70%)]" />
      </div>
      
      {/* 3. Floating Particles */}
      <FloatingParticles count={12} className="opacity-40" />
      
      {/* 4. Meteors */}
      <Meteors number={8} className="opacity-30" />
      
      {/* 5. Spotlight Effect */}
      <Spotlight className="opacity-50" />
      
      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen">
        {/* 6. Text Gradient */}
        <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-violet-500 via-cyan-500 to-emerald-500 bg-[length:300%_300%] bg-clip-text text-transparent animate-text-gradient">
          React Spinners
        </h1>
        
        <p className="text-zinc-400 text-xl mb-12">
          Beautiful loading animations for your React apps
        </p>
        
        {/* Spinner Cards with Border Beam */}
        <div className="grid grid-cols-3 gap-6">
          {spinners.map((spinner) => (
            <CardSpotlight key={spinner.name} className="p-6">
              <spinner.component />
              <p className="mt-4 text-zinc-300 text-center">{spinner.name}</p>
            </CardSpotlight>
          ))}
        </div>
      </div>
    </div>
  );
}
```

---

## Recommendations

1. **For spinner showcases, prioritize**: Grid background, gradient glow, and spotlight effects — they're subtle and don't compete with spinners.

2. **Avoid on individual spinner cards**: Text gradient animation and meteors can be distracting near active spinners.

3. **Performance**: All effects use CSS animations (GPU-accelerated) or minimal React state updates.

4. **Opacity guidelines**: Keep glows at 5-15% opacity, particles at 10-30% opacity for dark themes.

5. **Customize colors**: Replace the purple/cyan/emerald palette with your brand colors by adjusting the hex values in each component.