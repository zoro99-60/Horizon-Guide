import React from 'react'

interface ProgressRingProps {
  progress: number
  size?: number
  strokeWidth?: number
  color?: string
  trackColor?: string
  label?: string
}

export function ProgressRing({
  progress,
  size = 112,
  strokeWidth = 8,
  color = 'hsl(var(--primary))',
  trackColor = 'hsl(var(--muted))',
  label
}: ProgressRingProps) {
  const radius = (size - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI
  const offset = circumference - (progress / 100) * circumference

  return (
    <div className="relative inline-flex items-center justify-center flex-shrink-0" style={{ width: size, height: size }}>
      <svg className="-rotate-90 transform" style={{ width: size, height: size }}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={trackColor}
          strokeWidth={strokeWidth}
          fill="none"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="transition-all duration-1000 ease-out"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-2xl font-bold font-heading text-foreground">{Math.round(progress)}%</span>
        {label && <span className="text-xs text-muted-foreground mt-0.5">{label}</span>}
      </div>
    </div>
  )
}
