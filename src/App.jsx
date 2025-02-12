import { Canvas, useFrame, useThree} from "@react-three/fiber";
import { OrbitControls, Environment, Sky } from "@react-three/drei";
import { useState, useEffect, useRef, useMemo} from "react";
import * as THREE from "three";
import { EffectComposer, Bloom, SSAO } from "@react-three/postprocessing";


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

function ThreeTutorial() {
  return (
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
      <EffectComposer>
        <Bloom intensity={0.3} luminanceThreshold={0.1} luminanceSmoothing={0} />
        <SSAO radius={0.02} intensity={0.5} height={50} />
      </EffectComposer>

    </Canvas>
  )
}

function ControlsGuide() {
  return ( 
    <>
      <div className="absolute w-screen h-40 bg-transparent z-10 top-0 left-0 pointer-events-none flex flex-row justify-between items-start p-3">
        <div>
          <h4 className="text-gray-700 text-lg font-bold font-mono uppercase tracking-widest mb-2">
            Controls Guide
          </h4>
          <div className="grid grid-cols-2 gap-2 w-44 p-3 rounded-lg shadow-md">
            <div className="col-span-2 flex justify-center">
              <button className="bg-green-600 text-white w-16 p-1 rounded-md shadow-sm text-xs font-semibold">
                W <br />
                <span className="text-[10px] text-gray-200">Forward</span>
              </button>
            </div>
            <div className="col-span-1 flex justify-center">
              <button className="bg-green-500 text-white w-14 p-1 rounded-md shadow-sm text-xs font-semibold">
                A <br />
                <span className="text-[10px] text-gray-200">Left</span>
              </button>
            </div>
            <div className="col-span-1 flex justify-center">
              <button className="bg-green-500 text-white w-14 p-1 rounded-md shadow-sm text-xs font-semibold">
                D <br />
                <span className="text-[10px] text-gray-200">Right</span>
              </button>
            </div>
            <div className="col-span-2 flex justify-center">
              <button className="bg-green-600 text-white w-16 p-1 rounded-md shadow-sm text-xs font-semibold">
                S <br />
                <span className="text-[10px] text-gray-200">Back</span>
              </button>
            </div>
          </div>
        </div>

        <div className="text-gray-700 text-lg font-bold font-mono uppercase tracking-widest mb-2">
          <h3>🎮 GridRunner 🕹️</h3>
        </div>

        <div className="w-44 p-3 rounded-lg shadow-md text-center">
          <h3 className="text-gray-700 text-lg font-bold font-mono uppercase tracking-widest mb-1">Box</h3>
          <p className="text-[10px] font-bold font-mono uppercase tracking-widest text-gray-600">Touch the box to change the color.</p>

          <div className="group pointer-events-auto">
            <h3 className="font-bold text-gray-700 font-mono border-t border-white mt-1 pt-1 cursor-pointer ">
              Settings ⚙️
            </h3>
            <ul className="list-disc pl-4 transform translate-x-full opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
              <li className="text-[10px] font-mono">More Updates will come</li>
            </ul>
          </div>
        </div>
        
      </div>
    </>
  );
}

function About() {
  return (
    <div className="absolute w-screen h-screen bg-transparent z-[100] top-0 left-0 flex flex-col items-center justify-end pointer-events-none">
      <div className="p-2">
        <p className="text-[15px] text-white ">
          <span className=" tracking-widest font-mono ">Email: pretheeviraj0805@gmail.com </span>
          <span className="ml-3 tracking-widest font-mono">Phone: +91 7708999817</span>
          
        </p>
      </div>
      
    </div>
  );
}



function App() {
  return (
    <>
      <div className="relative">
        <ControlsGuide />
        <div className="absolute w-screen h-screen z-0 bg-gray-900 top-0 left-0">
        <ThreeTutorial />
        </div>
        <About />
      </div>
    </>
  );
}

export default App;