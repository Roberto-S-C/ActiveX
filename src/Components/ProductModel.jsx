import React, { useEffect, useState } from 'react'
import { useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { Box3, Vector3 } from 'three'

function ProductModel({ model, scale }) {
    const glb = useLoader(GLTFLoader, `${import.meta.env.VITE_API_URL}/${model}`);
    const [normalizedScale, setNormalizedScale] = useState(scale);

    useEffect(() => {
        const box = new Box3().setFromObject(glb.scene);
        const size = new Vector3();
        box.getSize(size);
        const maxDimension = Math.max(size.x, size.y, size.z);
        const normalizationScale = scale / maxDimension;
        setNormalizedScale(normalizationScale);
    }, [glb, scale]);

    return <primitive object={glb.scene} scale={normalizedScale} />
}

export default ProductModel