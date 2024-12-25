import React from 'react'
import { useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

function ProductModel({ model, scale}) {
    const glb = useLoader(GLTFLoader, model);
    return <primitive object={glb.scene} scale={scale} />
}

export default ProductModel