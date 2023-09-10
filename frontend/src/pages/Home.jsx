import React, {
  useCallback,
  useEffect,
  useState,
} from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

import Cone from '../components/Cone/Cone.jsx';
import ControlPanel from '../components/ControlPanel/ControlPanel.jsx';
import Scene from '../components/Scene/Scene.jsx';
import './canvasBody.css';

const SCALE = 0.5;
const INITIAL_SCALE = {height: 8, radius: 3, segments: 8};

const Home = () => {
  const [coneParams, setConeParams] = useState(INITIAL_SCALE);
  const [coneData, setConeData] = useState({});
  const [isSmooth, setIsSmooth] = useState(false);

  useEffect(() => {
    const fetchConeData = setTimeout(async () => {
      const { height = 8, radius = 3, segments = 8 } = coneParams;
      const response = await fetch(
        `http://127.0.0.1:5000/api/coneParams?height=${height}&radius=${radius}&segments=${segments}`,
      );
      const data = await response.json();
      setConeData(data);
    }, 1000);

    return () => clearTimeout(fetchConeData);
  }, [setConeData, coneParams]);

  const handleConeParams = useCallback(
    (newParams) => setConeParams({ ...coneParams, ...newParams }),
    [coneParams, setConeParams],
  );

  return (
    <>
      <div id="canvas-container" className="canvas-container">
        <Canvas mode="concurrent">
          <ambientLight intensity={7} />
          <spotLight position={[30, 30, 30]} angle={0.15} penumbra={1} />
          <pointLight position={[5, 5, 5]} intensity={50} />
          <pointLight position={[-3, -3, 5]} intensity={50} />

          {coneData?.conePositions && coneData?.coneNormals && (
            <>
              <Cone
                scale={SCALE}
                position={[-2, -0.5, 0]}
                rotation={[-0.5, 0, 0]}
                positions={coneData.conePositions}
                normals={coneData.coneNormals}
              />

              <Scene
                scale={SCALE}
                positions={coneData.conePositions}
                position={[-2, -0.5, 0]}
                rotation={[-0.5, 0, 0]}
              />
            </>
          )}
          <OrbitControls />
        </Canvas>
      </div>
      <ControlPanel
        handleConeParams={handleConeParams}
        coneParams={coneParams}
        isSmooth={isSmooth}
        setIsSmooth={setIsSmooth}
      />
    </>
  );
};
export default Home;
