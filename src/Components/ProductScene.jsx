import React, { Suspense } from 'react'
import { OrbitControls, Environment } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import ProductModel from './ProductModel'

function ProductScene({ model, scale, height, background, remote }) {
    return (
        <div className='cursor-grab w-full' style={{ height: height }}>
            <Canvas camera={{ position: [0, 0, 5], fov: 45 }} className='h-full w-full bg-slate-50' style={{ background: background }}>
                <OrbitControls />
                <ambientLight intensity={0.5} />
                <directionalLight position={[10, 10, 5]} intensity={1} />
                <Suspense fallback={null}>
                    <ProductModel model={model} scale={scale} remote={remote} />
                    <Environment preset="city" />
                </Suspense>
            </Canvas>
        </div>
    )
}

export default ProductScene