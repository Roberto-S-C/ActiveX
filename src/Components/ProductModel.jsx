import React, { useEffect, useState } from 'react'
import { useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { Box3, Vector3 } from 'three'

function ProductModel({ model, scale, remote }) {
    const [normalizedScale, setNormalizedScale] = useState(scale);
    const [fileUrl, setFileUrl] = useState(null);

    useEffect(() => {
        if (!remote && model) {
            const url = URL.createObjectURL(model);
            setFileUrl(url);
            return () => URL.revokeObjectURL(url); // Clean up the URL object
        }
    }, [model, remote]);

    let glb
    if (remote) { glb = useLoader(GLTFLoader, `${import.meta.env.VITE_API_URL}/${model}`) }
    if (!remote && fileUrl) { glb = useLoader(GLTFLoader, fileUrl) }

    useEffect(() => {
        if (glb) {
            const box = new Box3().setFromObject(glb.scene);
            const size = new Vector3();
            box.getSize(size);
            const maxDimension = Math.max(size.x, size.y, size.z);
            const normalizationScale = scale / maxDimension;
            setNormalizedScale(normalizationScale);
        }
    }, [glb, scale]);

    return glb ? <primitive object={glb.scene} scale={normalizedScale} /> : null;
}

export default ProductModel