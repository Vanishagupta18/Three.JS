import React from 'react';
import * as THREE from 'three';
import {useTexture} from '@react-three/drei';
import {useFrame} from '@react-three/fiber';

const Cyl=()=>{
    let tex=useTexture('Textures.png');
    let cyl=React.useRef();
    useFrame((state,delta) => {
        cyl.current.rotation.y+=delta;
        
    });
      return (
        <group rotation={[0,1.4,0.5]}>
            <mesh ref={cyl} >
             <cylinderGeometry args={[1,1,1,60,60,true]}/>
             <meshStandardMaterial map={tex} transparent side={THREE.DoubleSide} />
           </mesh>
           </group>
           )
        }

export default Cyl
