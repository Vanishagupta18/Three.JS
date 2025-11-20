import React from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls} from '@react-three/drei'
import './style.css'
import * as THREE from 'three'

function App() {
  return (
      <Canvas>
        <OrbitControls/>
        <ambientLight/>
        <mesh>
          <cylinderGeometry args={[1,1,1,30,30,true]}/>
          <meshStandardMaterial side={THREE.DoubleSide} />
        </mesh>

      </Canvas>

  )
}

export default App
