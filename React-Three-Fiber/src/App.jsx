import React from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls} from '@react-three/drei'
import './style.css'
import * as THREE from 'three'
import Cyl from './Cyl.jsx'
import { Bloom, EffectComposer, ToneMapping } from '@react-three/postprocessing'

function App() {
  return (
    <>
      <Canvas flat camera={{fov:35}}>
        <OrbitControls/>
        <ambientLight/>
        <Cyl/>
        <EffectComposer>
        <Bloom
          mipmapBlur
          intensity={1.0} // The bloom intensity.
          luminanceThreshold={0} // The luminance threshold. Raise this value to mask out darker elements in the scene.
          luminanceSmoothing={0} // Smoothness of the luminance threshold. Range is [0, 1].
        />
        <ToneMapping adaptive/>
        </EffectComposer>
       </Canvas>
       <div className="w-full bg-black py-32">
        <h1>Welcome to my Portfolio</h1>
       </div>
</>
  )
}

export default App
