import * as THREE from 'three';

export const getGeometry = (positions, normals, isSmooth) => {
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute(
    'position',
    new THREE.BufferAttribute(new Float32Array(positions), 3),
  );
  if (isSmooth) {
    geometry.setAttribute(
      'normal',
      new THREE.BufferAttribute(new Float32Array(normals), 3),
    );
  } else geometry.computeVertexNormals();
  return geometry;
};
