import { Canvas, useFrame, useThree} from "@react-three/fiber";
import { OrbitControls, Environment, Sky } from "@react-three/drei";
import { useState, useEffect, useRef, useMemo} from "react";
import * as THREE from "three";
import { EffectComposer, Bloom, SSAO } from "@react-three/postprocessing";
import About from "./components/About";
import ControlsGuide from "./components/ControlsGuide";

function getRandomColor() {
  return `rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)})`;
}

function RotatingCube() {
  const cubeRef = useRef();
  const cubeColor = useRef(new THREE.Color("orange"));
  const { camera, gl } = useThree();
  const controlsRef = useRef();
  const [isMoving, setIsMoving] = useState(false);
  const keys = useRef({ w: false, a: false, s: false, d: false });

  useEffect(() => {
    const controls = controlsRef.current;
    if (!controls || !cubeRef.current) return;

    const handleStart = () => setIsMoving(true);
    const handleEnd = () => setIsMoving(false);

    controls.addEventListener("start", handleStart);
    controls.addEventListener("end", handleEnd);

    return () => {
      controls.removeEventListener("start", handleStart);
      controls.removeEventListener("end", handleEnd);
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (keys.current[e.key.toLowerCase()] !== undefined) {
        keys.current[e.key.toLowerCase()] = true;
      }
    };
    
    const handleKeyUp = (e) => {
      if (keys.current[e.key.toLowerCase()] !== undefined) {
        keys.current[e.key.toLowerCase()] = false;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);


  useFrame(() => {
    if(cubeRef.current && cubeRef.current.material) {
      cubeRef.current.material.color.lerp(cubeColor.current, 0.1);
      //cubeRef.current.rotation.y += 0.01;
    }

    if (!isMoving && cubeRef.current) {
      // define camera offset relative to cube local rotation position
      const offset = new THREE.Vector3(0, 0.5, -2);

      // Apply cube's rotation to offset
      offset.applyQuaternion(cubeRef.current.quaternion);

      // set camera position relative to cube
      const targetPosition = cubeRef.current.position.clone().add(offset);

      // smoothly interpolate the camera's position
      camera.position.lerp(targetPosition, 0.15); // 0.15 = smoothness speed

      // Make camera always look at the cube
      camera.lookAt(cubeRef.current.position);
    }

    // orbitControls
    if (controlsRef.current && cubeRef.current) {
      controlsRef.current.target.copy(cubeRef.current.position);
      controlsRef.current.update();
    }

    // Key controls
    if (!cubeRef.current) return;

    const moveSpeed = 0.08;
    const rotationSpeed = 0.05;

    const direction = new THREE.Vector3();
    cubeRef.current.getWorldDirection(direction);

    if (keys.current.w) {
      cubeRef.current.position.addScaledVector(direction, moveSpeed);
    }
    if (keys.current.s) {
      cubeRef.current.position.addScaledVector(direction, -moveSpeed);
    }
    if (keys.current.a) {
      cubeRef.current.rotation.y += rotationSpeed;
    }
    if (keys.current.d) {
      cubeRef.current.rotation.y -= rotationSpeed;
    }
  });

  const handleClick = () => {
      cubeColor.current = new THREE.Color(getRandomColor());
  };

  return (
    <>
      <mesh ref={cubeRef} onClick={handleClick} position={[0, 0.25, 0]} castShadow>
        <boxGeometry args={[0.5, 0.5, 0.5]} />
        <meshStandardMaterial color="orange" />
      </mesh>
      <OrbitControls ref={controlsRef} />
    </>
  );
}

function Ground() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
      <planeGeometry args={[15, 15]}  />
      <meshStandardMaterial color="green" roughness={1} />
    </mesh>
  )
}

function Scene() {
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

        {/* Add an HDRI skybox */}
        <Environment preset="city" background={false} />
        <Sky distance={15} sunPosition={[0, 1, 0]} inclination={0} azimuth={0.25} />

        <RotatingCube />
        <Ground />

        {/* Post-processing effects */}
        {/* <EffectComposer>
          <Bloom intensity={0.1} luminanceThreshold={0.1} luminanceSmoothing={0} />
          <SSAO radius={0.02} intensity={0.5} height={50} />
        </EffectComposer>   */}
      </Canvas>
    </div>

  )
}

function App() {
  return (
    <>
      <div className="relative">
        <ControlsGuide />
        <Scene />
        <About />
      </div>
    </>
  );
}

export default App;