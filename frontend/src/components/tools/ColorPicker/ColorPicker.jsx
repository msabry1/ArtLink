import React, { useState, useEffect } from 'react';

function ColorPicker({ initialColor, onColorChange }) {
  const [color, setColor] = useState(initialColor); // Default color

  const handleInputChange = (e) => {
    setColor(e.target.value);
  };

  // Trigger the parent's callback whenever the color changes
  useEffect(() => {
    onColorChange(color);
  }, [color, onColorChange]); // Dependency array ensures the effect runs when 'color' changes

  return (
    <div style={{ backgroundColor: color }}>
      <input
        type="color"
        style={{ opacity: 0 }}
        value={color}
        onChange={handleInputChange}
      />
    </div>
  );
}

export default ColorPicker;
