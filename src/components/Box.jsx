import React from 'react'

const Box = () => {
  return (
    <div>Box</div>
  )
}

export default Box;

// const MovableBox = forwardRef((props, ref) => {
//   const [position, setPosition] = useState([0, -0.7, 0]);
//   const boxRef = useRef();
//   const keys = useRef(new Set());

//   const moveBox = useCallback(() => {
//     setPosition(([x, y, z]) => {
//       const step = 0.1;
//       let moved = false;
//       let newX = x, newZ = z;
  
//       if (keys.current.has("ArrowUp") || keys.current.has("w")) {
//         newZ += step; // Corrected: W should move forward (positive Z)
//         moved = true;
//       }
//       if (keys.current.has("ArrowDown") || keys.current.has("s")) {
//         newZ -= step; // Corrected: S should move backward (negative Z)
//         moved = true;
//       }
//       if (keys.current.has("ArrowLeft") || keys.current.has("a")) {
//         newX += step;
//         moved = true;
//       }
//       if (keys.current.has("ArrowRight") || keys.current.has("d")) {
//         newX -= step;
//         moved = true;
//       }
  
//       // Smooth rotation using quaternion
//       if (moved && boxRef.current) {
//         const targetDirection = new THREE.Vector3(newX - x, 0, newZ - z).normalize();
//         const targetRotation = new THREE.Quaternion().setFromUnitVectors(
//           new THREE.Vector3(0, 0, 1), // Fixed: Forward direction is now (0, 0, 1)
//           targetDirection
//         );
  
//         boxRef.current.quaternion.slerp(targetRotation, 0.1); // Smooth rotation
//       }
  
//       return [newX, y, newZ];
//     });
//   }, []);
  
//   useFrame(() => {
//     if (boxRef.current) {
//       const targetPosition = new THREE.Vector3(...position);
//       boxRef.current.position.lerp(targetPosition, 0.05);
  
//       const forward = new THREE.Vector3();
//       boxRef.current.getWorldDirection(forward);
  
//       if (props.cameraRef && props.cameraRef.current) {
//         const cameraOffset = forward.clone().multiplyScalar(-4).setY(1); // Fixed: Ensure camera stays behind
//         const desiredCameraPosition = targetPosition.clone().add(cameraOffset);
  
//         props.cameraRef.current.position.lerp(desiredCameraPosition, 0.08);
//         props.cameraRef.current.lookAt(targetPosition);
//       }
  
//       // Update OrbitControls target
//       if (props.controlsRef && props.controlsRef.current) {
//         props.controlsRef.current.target.lerp(targetPosition, 0.05);
//       }
//     }
//   });
  
  
  
//   useEffect(() => {
//     const handleKeyDown = (e) => keys.current.add(e.key);
//     const handleKeyUp = (e) => keys.current.delete(e.key);
//     const interval = setInterval(moveBox, 100);

//     window.addEventListener("keydown", handleKeyDown);
//     window.addEventListener("keyup", handleKeyUp);
//     return () => {
//       window.removeEventListener("keydown", handleKeyDown);
//       window.removeEventListener("keyup", handleKeyUp);
//       clearInterval(interval);
//     };
//   }, [moveBox]);

//   return (
//     <mesh
//       ref={(node) => {
//         boxRef.current = node;
//         if (ref) ref.current = node;
//       }}
//       castShadow
//     >
//       <boxGeometry args={[0.5, 0.6, 0.5]} />
//       <meshStandardMaterial color="lightblue" metalness={0.5} roughness={0.5} />
//     </mesh>
//   );
// });

// function Scene() {
//   const cameraRef = useRef();
//   const controlsRef = useRef();

//   return (
//     <Canvas
//       style={{ width: "100vw", height: "100vh" }}
//       shadows={{ type: THREE.PCFSoftShadowMap }}
//       gl={{ toneMapping: THREE.ACESFilmicToneMapping }}
//     >
//       <PerspectiveCamera makeDefault ref={cameraRef} position={[0, 2, 10]} fov={25} />
//       <ambientLight intensity={0.4} />
//       <hemisphereLight intensity={0.8} color="pink" groundColor="green" />

//       <directionalLight
//         position={[5, 10, 7]}
//         intensity={2.5}
//         castShadow
//         shadow-mapSize-width={1024}
//         shadow-mapSize-height={1024}
//         shadow-camera-near={0.5}
//         shadow-camera-far={50}
//         shadow-camera-left={-10}
//         shadow-camera-right={10}
//         shadow-camera-top={10}
//         shadow-camera-bottom={-10}
//         shadow-bias={-0.0001}
//       />

//       <ContactShadows position={[0, -1, 0]} opacity={0.3} blur={1} />
//       <Environment preset="city" background={false} />
//       <Sky distance={15} sunPosition={[0, 1, 0]} inclination={0} azimuth={0.25} />

//       <MovableBox cameraRef={cameraRef} controlsRef={controlsRef} />

//       <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]} receiveShadow>
//         <planeGeometry args={[15, 15]} />
//         <meshStandardMaterial color="green" roughness={1} />
//       </mesh>

//       <OrbitControls ref={controlsRef} maxPolarAngle={Math.PI / 2} />

//       {/* Uncomment for post-processing effects */}
//       <EffectComposer>
//         <Bloom luminanceThreshold={0.7} luminanceSmoothing={0.9} height={200} />
//         <SSAO radius={0.2} intensity={2} />
//       </EffectComposer>
//     </Canvas>
//   );
// }

// import { Canvas, useFrame, useSpring} from "@react-three/fiber";
// import { OrbitControls, PerspectiveCamera, ContactShadows, Environment, Sky } from "@react-three/drei";
// import * as THREE from "three";
// import { useState, useEffect, useRef, useCallback, forwardRef } from "react";
// import { EffectComposer, Bloom, SSAO } from "@react-three/postprocessing";