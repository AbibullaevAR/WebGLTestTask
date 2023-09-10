import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { getGeometry } from '../Cone/utils.js';

const Scene = ({ positions, scale, position, rotation }) => {
  const ref = useRef();
  useFrame(() => {
    ref.current.rotation.x += 0.001;
    ref.current.rotation.y += 0.001;
    ref.current.rotation.z += 0.001;
  });

  const geometry = useMemo(() => getGeometry(positions), [positions]);

  return (
    <group ref={ref} position={position} rotation={rotation} scale={scale}>
      <line geometry={geometry}>
        <lineBasicMaterial
          attach="material"
          color={'#05011c'}
          linewidth={10}
          linecap={'round'}
          linejoin={'round'}
        />
      </line>
    </group>
  );
};

export default Scene;
