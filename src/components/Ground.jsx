function Ground() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
      <planeGeometry args={[15, 15]}  />
      <meshStandardMaterial color="green" roughness={1} />
    </mesh>
  )
}

export default Ground;