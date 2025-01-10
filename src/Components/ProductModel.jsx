import React from 'react'
import { useEffect, useState } from 'react'
import { useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

function ProductModel({ model, scale }) {
    const glb = useLoader(GLTFLoader, `${import.meta.env.VITE_API_URL}/${model}`);
    return <primitive object={glb.scene} scale={scale} />
}

export default ProductModel