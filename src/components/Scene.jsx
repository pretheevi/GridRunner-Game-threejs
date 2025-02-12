import { Canvas } from "@react-three/fiber";
import { Environment, Sky } from "@react-three/drei";
import RotatingCube from "./RotatingCube";
import Ground from "./Ground";

function Scene({ keys }) {
  return (
    <div className="absolute w-screen h-screen z-0 bg-gray-900 top-0 left-0">
      <Canvas shadows>
        <directionalLight 
          position={[0, 10, 10]} 
          intensity={3}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          shadow-camera-near={0.5}
          shadow-camera-far={50}
          shadow-camera-left={-10}
          shadow-camera-right={10}
          shadow-camera-top={10}
          shadow-camera-bottom={-10}
          shadow-bias={-0.0000}
        />
        <ambientLight intensity={0.2} />
        <Environment preset="city" background={false} />
        <Sky distance={15} sunPosition={[0, 1, 0]} inclination={0} azimuth={0.25} />
        <RotatingCube keys={keys} />
        <Ground />
      </Canvas>
    </div>
  );
}

export default Scene;