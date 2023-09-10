import React, { Children, useMemo } from 'react';
import './ControlPanel.css';

const ControlPanel = ({
  handleConeParams,
  coneParams,
  isSmooth,
  setIsSmooth,
}) => {
  const controlsConfig = useMemo(
    () => [
      {
        id: 'height',
        label: 'Height',
        value: coneParams.height,
        onChange: (e) => handleConeParams({ height: e.target.value }),
        min: 1,
        max: 50,
      },
      {
        id: 'radius',
        label: 'Radius',
        value: coneParams.radius,
        onChange: (e) => handleConeParams({ radius: e.target.value }),
        min: 1,
        max: 30,
      },
      {
        id: 'segments',
        label: 'Segments',
        value: coneParams.segments,
        onChange: (e) => handleConeParams({ segments: e.target.value }),
        min: 3,
        max: 10000,
      },
    ],
    [coneParams, handleConeParams],
  );

  return (
    <div className={`controls`}>
      <form>
        {controlsConfig?.map(({ id, label, value, onChange, min, max }) => (
          <div className="control-container" key={id}>
            <label htmlFor={id}>{label}</label>
            <input
              type="number"
              name={id}
              id={id}
              value={value}
              onChange={onChange}
              min={min}
              max={max}
            />
          </div>
        ))}
        <div className="control-container">
          <label htmlFor="smooth">Smooth: </label>
          <input
            type="checkbox"
            name="smooth"
            id="smooth"
            value={isSmooth}
            onChange={() => setIsSmooth(!isSmooth)}
          />
        </div>
      </form>
    </div>
  );
};

export default ControlPanel;
