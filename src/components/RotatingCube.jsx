import { useFrame, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useState, useEffect, useRef } from "react";
import * as THREE from "three";

function getRandomColor() {
  return `rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)})`;
}

function RotatingCube({ keys }) {
  const cubeRef = useRef();
  const cubeColor = useRef(new THREE.Color("orange"));
  const { camera } = useThree();
  const controlsRef = useRef();
  const [isMoving, setIsMoving] = useState(false);

  // Use useState for windowKey to trigger re-renders
  const [windowKey, setWindowKey] = useState({ w: false, a: false, s: false, d: false });

  // Handle OrbitControls start/end events
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

  // Handle keyboard events
  useEffect(() => {
    const handleKeyDown = (e) => {
      const key = e.key.toLowerCase();
      if (windowKey[key] !== undefined && !windowKey[key]) {
        setWindowKey((prev) => ({ ...prev, [key]: true }));
      }
    };

    const handleKeyUp = (e) => {
      const key = e.key.toLowerCase();
      if (windowKey[key] !== undefined && windowKey[key]) {
        setWindowKey((prev) => ({ ...prev, [key]: false }));
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [windowKey]);

  // Animation frame
  useFrame(() => {
    if (cubeRef.current && cubeRef.current.material) {
      cubeRef.current.material.color.lerp(cubeColor.current, 0.1);
    }

    if (!isMoving && cubeRef.current) {
      const offset = new THREE.Vector3(0, 0.5, -2);
      offset.applyQuaternion(cubeRef.current.quaternion);
      const targetPosition = cubeRef.current.position.clone().add(offset);
      camera.position.lerp(targetPosition, 0.15);
      camera.lookAt(cubeRef.current.position);
    }

    if (controlsRef.current && cubeRef.current) {
      controlsRef.current.target.copy(cubeRef.current.position);
      controlsRef.current.update();
    }

    if (!cubeRef.current) return;

    const moveSpeed = 0.08;
    const rotationSpeed = 0.05;

    const direction = new THREE.Vector3();
    cubeRef.current.getWorldDirection(direction);

    if (keys.w || windowKey.w) {
      cubeRef.current.position.addScaledVector(direction, moveSpeed);
    }
    if (keys.s || windowKey.s) {
      cubeRef.current.position.addScaledVector(direction, -moveSpeed);
    }
    if (keys.a || windowKey.a) {
      cubeRef.current.rotation.y += rotationSpeed;
    }
    if (keys.d || windowKey.d) {
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

export default RotatingCube;