import React, { useRef, useMemo } from 'react';
import * as THREE from 'three';

import { getGeometry } from './utils.js';
import { useFrame } from '@react-three/fiber';

const Cone = ({
  position,
  rotation,
  positions,
  normals,
  isSmooth,
  scale,
}) => {
  const meshRef = useRef();
  useFrame(() => {
    meshRef.current.rotation.x += 0.001;
    meshRef.current.rotation.y += 0.001;
    meshRef.current.rotation.z += 0.001;
  });

  const meshMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        side: THREE.DoubleSide,
        color: 0x135c7b,
      }),
    [],
  );
  const geometry = useMemo(
    () => getGeometry(positions, normals, isSmooth),
    [positions, normals, isSmooth],
  );

  return (
    <>
      {positions && (
        <mesh
          ref={meshRef}
          rotation={rotation}
          position={position}
          material={meshMaterial}
          geometry={geometry}
          scale={scale}
        />
      )}
    </>
  );
};

export default Cone;
