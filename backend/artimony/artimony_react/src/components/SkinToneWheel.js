import { useState } from "react";

function SkinToneWheel({ setColor, selectedColor = null }) {
  const [selected, setSelected] = useState(selectedColor);

  // Define the skin tones as angles and colors
  const skinTones = [
    { angle: 0, color: "#FFDBAC" }, // Light skin
    { angle: 72, color: "#F1C27D" }, // Medium light skin
    { angle: 144, color: "#E0AC69" }, // Medium skin
    { angle: 216, color: "#C68642" }, // Medium dark skin
    { angle: 288, color: "#8D5524" }, // Dark skin
  ];

  const radius = 40; // Radius of the circle
  const normalStrokeWidth = 30; // Normal width of the color band
  const selectedStrokeWidth = 40; // Enhanced width for the selected color band

  // Convert polar coordinates to Cartesian for SVG path
  const polarToCartesian = (angle, radius) => {
    const radians = ((angle - 90) * Math.PI) / 180.0;
    return {
      x: radius * Math.cos(radians),
      y: radius * Math.sin(radians),
    };
  };

  // Calculate SVG arc path
  const describeArc = (x, y, radius, startAngle, endAngle) => {
    const start = polarToCartesian(endAngle, radius);
    const end = polarToCartesian(startAngle, radius);
    const arcSweep = endAngle - startAngle <= 180 ? "0" : "1";

    return [
      "M",
      start.x + x,
      start.y + y,
      "A",
      radius,
      radius,
      0,
      arcSweep,
      0,
      end.x + x,
      end.y + y,
    ].join(" ");
  };

  const handlePathClick = (index, toneColor) => {
    setColor(toneColor);
    setSelected(index); // Update the selected index
  };

  return (
    <div>
      <h2 className="fs-subtitle m-0">Your Skin Tone</h2>
      <svg width={120} height={120} viewBox="0 15 160 130">
        {skinTones.map((tone, index) => (
          <path
            key={index}
            d={describeArc(80, 80, radius, tone.angle, tone.angle + 72)}
            fill="none"
            stroke={tone.color}
            strokeWidth={
              index === selected ? selectedStrokeWidth : normalStrokeWidth
            }
            onClick={() => handlePathClick(index, tone.color)}
            style={{ cursor: "pointer", transition: "stroke-width 0.3s ease" }}
          />
        ))}
      </svg>
      {/* <div>
        Selected Color:{" "}
        <div
          style={{
            display: "inline-block",
            width: 50,
            height: 20,
            backgroundColor: color,
          }}
        ></div>
      </div> */}
    </div>
  );
}

export default SkinToneWheel;
