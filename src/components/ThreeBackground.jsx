import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function DataGrid() {
  const meshRef = useRef();
  const count = 2000;

  const { positions, colors, speeds } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const spd = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 40;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 25;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 20 - 5;

      // Green-amber palette
      const t = Math.random();
      if (t < 0.6) {
        col[i * 3] = 0;
        col[i * 3 + 1] = 0.4 + Math.random() * 0.6;
        col[i * 3 + 2] = 0;
      } else if (t < 0.85) {
        col[i * 3] = 1;
        col[i * 3 + 1] = 0.55;
        col[i * 3 + 2] = 0;
      } else {
        col[i * 3] = 0.2;
        col[i * 3 + 1] = 0.2;
        col[i * 3 + 2] = 0.2;
      }
      spd[i] = 0.002 + Math.random() * 0.008;
    }
    return { positions: pos, colors: col, speeds: spd };
  }, []);

  useFrame(() => {
    if (!meshRef.current) return;
    const posArr = meshRef.current.geometry.attributes.position.array;
    for (let i = 0; i < count; i++) {
      posArr[i * 3 + 1] -= speeds[i];
      if (posArr[i * 3 + 1] < -12.5) {
        posArr[i * 3 + 1] = 12.5;
      }
    }
    meshRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={positions}
          count={count}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          array={colors}
          count={count}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        vertexColors
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
}

function GridLines() {
  const linesRef = useRef();

  const geometry = useMemo(() => {
    const points = [];
    const spacing = 2;
    const extent = 20;
    // Horizontal lines
    for (let y = -extent; y <= extent; y += spacing) {
      points.push(new THREE.Vector3(-extent, y, -8));
      points.push(new THREE.Vector3(extent, y, -8));
    }
    // Vertical lines
    for (let x = -extent; x <= extent; x += spacing) {
      points.push(new THREE.Vector3(x, -extent, -8));
      points.push(new THREE.Vector3(x, extent, -8));
    }
    const geo = new THREE.BufferGeometry().setFromPoints(points);
    return geo;
  }, []);

  useFrame((state) => {
    if (linesRef.current) {
      linesRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.05) * 0.02;
    }
  });

  return (
    <lineSegments ref={linesRef} geometry={geometry}>
      <lineBasicMaterial color="#0a1a0a" transparent opacity={0.4} />
    </lineSegments>
  );
}

export default function ThreeBackground() {
  return (
    <div className="fixed inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 60 }}
        gl={{ antialias: false, alpha: true }}
        style={{ background: "transparent" }}
      >
        <GridLines />
        <DataGrid />
      </Canvas>
    </div>
  );
}
