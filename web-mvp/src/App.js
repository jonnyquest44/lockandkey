import React, { useState } from 'react';
import './App.css';

// Sample data for 7 movement patterns
const sampleData = {
  athleteId: "athlete-001",
  date: "2025-11-19",
  patterns: [
    {
      pattern: "Squat",
      score: 72,
      assessment: "yellow",
      correctiveIntensity: 2,
      strengthIntensity: 1,
      neighbors: ["Hinge", "Lunge"]
    },
    {
      pattern: "Hinge",
      score: 88,
      assessment: "green",
      correctiveIntensity: 1,
      strengthIntensity: 3,
      neighbors: ["Squat", "Pull"]
    },
    {
      pattern: "Lunge",
      score: 81,
      assessment: "green",
      correctiveIntensity: 1,
      strengthIntensity: 2,
      neighbors: ["Squat", "Locomotion"]
    },
    {
      pattern: "Locomotion",
      score: 90,
      assessment: "green",
      correctiveIntensity: 0,
      strengthIntensity: 2,
      neighbors: ["Lunge", "Rotation"]
    },
    {
      pattern: "Rotation",
      score: 65,
      assessment: "yellow",
      correctiveIntensity: 2,
      strengthIntensity: 1,
      neighbors: ["Locomotion", "Push"]
    },
    {
      pattern: "Push",
      score: 55,
      assessment: "yellow",
      correctiveIntensity: 2,
      strengthIntensity: 2,
      neighbors: ["Rotation", "Pull"]
    },
    {
      pattern: "Pull",
      score: 92,
      assessment: "green",
      correctiveIntensity: 0,
      strengthIntensity: 3,
      neighbors: ["Hinge", "Push"]
    }
  ]
};

// Color mapping
const assessmentColors = {
  green: "#22C55E",
  yellow: "#EAB308",
  red: "#EF4444"
};

const patternHues = {
  Squat: "#3B82F6",
  Hinge: "#8B5CF6",
  Lunge: "#14B8A6",
  Locomotion: "#F97316",
  Rotation: "#EC4899",
  Push: "#0EA5E9",
  Pull: "#10B981"
};

function App() {
  const [selectedPattern, setSelectedPattern] = useState(null);
  const patterns = sampleData.patterns;

  return (
    <div className="App">
      <header className="app-header">
        <h1>Movement Wheel MVP</h1>
        <p className="subtitle">Lock & Skeleton Key System</p>
      </header>

      <div className="main-container">
        {/* Left side - Wheel */}
        <div className="left-panel">
          <div className="card">
            <h2>Movement Pattern Wheel</h2>
            <RadialWheel 
              patterns={patterns} 
              onSelectPattern={setSelectedPattern}
              selectedPattern={selectedPattern}
            />
            <div className="legend">
              <div className="legend-item">
                <span className="legend-dot" style={{backgroundColor: assessmentColors.green}}></span>
                <span>Green = Clear</span>
              </div>
              <div className="legend-item">
                <span className="legend-dot" style={{backgroundColor: assessmentColors.yellow}}></span>
                <span>Yellow = Caution</span>
              </div>
              <div className="legend-item">
                <span className="legend-dot" style={{backgroundColor: assessmentColors.red}}></span>
                <span>Red = Restricted</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right side - Details and priorities */}
        <div className="right-panel">
          <PatternDetail pattern={selectedPattern} allPatterns={patterns} />
          <TodaysPriorities patterns={patterns} />
          <VolumeRotation patterns={patterns} />
        </div>
      </div>
    </div>
  );
}

// Radial Wheel Component
function RadialWheel({ patterns, onSelectPattern, selectedPattern }) {
  const center = 200;
  const radiusInner = 60;
  const ringWidth = 25;
  const total = patterns.length;
  const angleStep = (2 * Math.PI) / total;

  const intensityToOpacity = (level) => {
    if (level === 0) return 0.15;
    if (level === 1) return 0.4;
    if (level === 2) return 0.65;
    return 0.9;
  };

  const polarToCartesian = (cx, cy, r, angle) => {
    return {
      x: cx + r * Math.cos(angle),
      y: cy + r * Math.sin(angle)
    };
  };

  const describeArc = (cx, cy, radius, startAngle, endAngle) => {
    const start = polarToCartesian(cx, cy, radius, startAngle);
    const end = polarToCartesian(cx, cy, radius, endAngle);
    const largeArcFlag = endAngle - startAngle <= Math.PI ? "0" : "1";
    return `M ${start.x} ${start.y} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${end.x} ${end.y}`;
  };

  return (
    <svg 
      width="400" 
      height="400" 
      viewBox="0 0 400 400"
      className="radial-wheel"
      preserveAspectRatio="xMidYMid meet"
    >
      {patterns.map((p, idx) => {
        const startAngle = -Math.PI / 2 + idx * angleStep;
        const endAngle = startAngle + angleStep * 0.85;
        const midAngle = (startAngle + endAngle) / 2;

        const baseHue = patternHues[p.pattern] || "#64748B";
        const assessmentColor = assessmentColors[p.assessment];
        const middleOpacity = intensityToOpacity(p.correctiveIntensity);
        const outerOpacity = intensityToOpacity(p.strengthIntensity);

        const labelPos = polarToCartesian(center, center, radiusInner + ringWidth * 3 + 30, midAngle);
        
        const isSelected = selectedPattern?.pattern === p.pattern;

        return (
          <g 
            key={p.pattern} 
            onClick={() => onSelectPattern(p)} 
            style={{ cursor: "pointer" }}
            className={isSelected ? "selected-wedge" : ""}
          >
            {/* Inner ring - Assessment */}
            <path
              d={describeArc(center, center, radiusInner, startAngle, endAngle)}
              stroke={assessmentColor}
              strokeWidth={ringWidth}
              fill="none"
              opacity={0.9}
            />

            {/* Middle ring - Corrective */}
            <path
              d={describeArc(center, center, radiusInner + ringWidth, startAngle, endAngle)}
              stroke={baseHue}
              strokeOpacity={middleOpacity}
              strokeWidth={ringWidth}
              fill="none"
            />

            {/* Outer ring - Strength */}
            <path
              d={describeArc(center, center, radiusInner + ringWidth * 2, startAngle, endAngle)}
              stroke={baseHue}
              strokeOpacity={outerOpacity}
              strokeWidth={ringWidth}
              fill="none"
            />

            {/* Label */}
            <text
              x={labelPos.x}
              y={labelPos.y}
              textAnchor="middle"
              fontSize="13"
              fontWeight={isSelected ? "bold" : "normal"}
              fill={isSelected ? "#000" : "#333"}
            >
              {p.pattern}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

// Pattern Detail Component
function PatternDetail({ pattern, allPatterns }) {
  if (!pattern) {
    return (
      <div className="card">
        <h3>Pattern Detail</h3>
        <p className="placeholder-text">Click a pattern on the wheel to see details</p>
      </div>
    );
  }

  const isRestricted = pattern.assessment !== "green";
  const neighbors = allPatterns.filter(p => pattern.neighbors.includes(p.pattern));

  return (
    <div className="card">
      <h3>Pattern Detail: {pattern.pattern}</h3>
      <div className="detail-row">
        <span className="label">Score:</span>
        <span className="value">{pattern.score}/100</span>
      </div>
      <div className="detail-row">
        <span className="label">Assessment:</span>
        <span className={`badge badge-${pattern.assessment}`}>
          {pattern.assessment.toUpperCase()}
        </span>
      </div>
      <div className="detail-row">
        <span className="label">Corrective:</span>
        <span className="value">Level {pattern.correctiveIntensity}</span>
      </div>
      <div className="detail-row">
        <span className="label">Strength:</span>
        <span className="value">Level {pattern.strengthIntensity}</span>
      </div>

      {isRestricted && (
        <div className="volume-suggestion">
          <h4>Volume Rotation Suggestion</h4>
          <p>Reduce strength volume for <strong>{pattern.pattern}</strong> and rotate load toward neighbors:</p>
          <ul>
            {neighbors.map(n => (
              <li key={n.pattern}>
                <strong>{n.pattern}</strong>: increase strength intensity by +1 level (if &lt; 3)
              </li>
            ))}
          </ul>
        </div>
      )}

      <details className="json-details">
        <summary>View JSON</summary>
        <pre>{JSON.stringify(pattern, null, 2)}</pre>
      </details>
    </div>
  );
}

// Today's Priorities Component
function TodaysPriorities({ patterns }) {
  const sorted = [...patterns].sort((a, b) => {
    const order = { red: 0, yellow: 1, green: 2 };
    return order[a.assessment] - order[b.assessment];
  });

  return (
    <div className="card">
      <h3>Today's Priorities</h3>
      <ul className="priority-list">
        {sorted.map(p => (
          <li key={p.pattern} className="priority-item">
            <span className={`status-dot status-${p.assessment}`}></span>
            <span className="pattern-name">{p.pattern}</span>
            <span className="intensity-tag">C{p.correctiveIntensity} / S{p.strengthIntensity}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

// Volume Rotation Component
function VolumeRotation({ patterns }) {
  const restricted = patterns.filter(p => p.assessment !== "green");

  if (restricted.length === 0) {
    return (
      <div className="card">
        <h3>Recommended Volume Rotation</h3>
        <p className="placeholder-text">All patterns are clear. No rotation needed.</p>
      </div>
    );
  }

  return (
    <div className="card">
      <h3>Recommended Volume Rotation</h3>
      <p className="info-text">When a pattern is Yellow/Red, reduce its strength volume and shift to neighbors.</p>
      {restricted.map(p => (
        <div key={p.pattern} className="rotation-item">
          <div className="rotation-header">
            <strong>{p.pattern}</strong>
            <span className={`badge badge-${p.assessment}`}>{p.assessment}</span>
          </div>
          <div className="rotation-suggestion">
            <span>Strength: {p.strengthIntensity} → {Math.max(0, p.strengthIntensity - 1)} (reduce)</span>
          </div>
          <div className="rotation-suggestion">
            <span>Neighbors: {p.neighbors.join(", ")} (+1 set each)</span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default App;