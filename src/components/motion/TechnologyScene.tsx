import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Lightformer } from "@react-three/drei";
import { Suspense, useMemo, useRef } from "react";
import { CatmullRomCurve3, Group, MathUtils, Vector3 } from "three";

export type ScenePalette = { primary: string; accent: string; secondary: string; light: string };
type Point = [number, number, number];

// Rounded, dimensional line icons, rather than miniature real-world props.
function IconStroke({ points, color, width = 0.055, curved = false }: { points: Point[]; color: string; width?: number; curved?: boolean }) {
  const curve = useMemo(() => new CatmullRomCurve3(points.map((p) => new Vector3(...p)), false, "catmullrom", curved ? 0.5 : 0), [points, curved]);
  return (
    <mesh>
      <tubeGeometry args={[curve, 80, width, 8, false]} />
      <meshStandardMaterial color={color} metalness={0.22} roughness={0.3} />
    </mesh>
  );
}

function EducationIcons({ palette, paused }: { palette: ScenePalette; paused: boolean }) {
  const group = useRef<Group>(null);
  const cap = useRef<Group>(null);
  const bulb = useRef<Group>(null);
  const code = useRef<Group>(null);
  const time = useRef(0);
  useFrame(({ pointer }, rawDelta) => {
    if (!group.current || paused) return;
    const dt = Math.min(rawDelta, 0.05);
    time.current += dt;
    const smoothing = 1 - Math.exp(-3 * dt);
    group.current.rotation.x = MathUtils.lerp(group.current.rotation.x, pointer.y * 0.12, smoothing);
    group.current.rotation.y = MathUtils.lerp(group.current.rotation.y, -0.12 + pointer.x * 0.2, smoothing);
    group.current.position.y = Math.sin(time.current * 0.6) * 0.08;
    if (cap.current) { cap.current.position.y = 1.55 + Math.sin(time.current * 0.8) * 0.1; cap.current.rotation.z = -0.1 + Math.sin(time.current * 0.5) * 0.04; }
    if (bulb.current) bulb.current.position.y = 0.75 + Math.sin(time.current * 0.9 + 1) * 0.12;
    if (code.current) code.current.position.y = -1.5 + Math.sin(time.current * 0.7 + 2) * 0.08;
  });
  return (
    <group ref={group} rotation={[0, -0.12, 0]}>
      {/* Open book: curved page outlines, central spine and printed lines. */}
      <group position={[-0.2, -0.25, 0]} rotation={[0.08, 0.12, -0.07]}>
        <IconStroke color={palette.accent} width={0.075} curved points={[[0,-0.9,0],[0,-0.1,0],[0,0.7,0]]} />
        {[-1, 1].map((side) => (
          <group key={side}>
            <IconStroke color={palette.accent} width={0.075} points={[[0,0.7,0],[side*0.4,0.95,0.04],[side*1.2,0.95,0.12],[side*1.2,-0.7,0.12],[side*0.4,-0.7,0.04],[0,-0.9,0]]} />
            {[0.48,0.15,-0.18].map((y) => <IconStroke key={y} color={palette.light} width={0.025} points={[[side*0.27,y,0.07],[side*0.55,y+0.08,0.12],[side*0.94,y+0.08,0.17]]} />)}
          </group>
        ))}
      </group>
      {/* Graduation-cap symbol. */}
      <group ref={cap} position={[-0.75, 1.55, 0.3]} rotation-z={-0.1}>
        <IconStroke color={palette.primary} width={0.075} points={[[-1,0.1,0],[0,0.65,0],[1,0.1,0],[0,-0.45,0],[-1,0.1,0]]} />
        <IconStroke color={palette.primary} width={0.065} curved points={[[-0.62,-0.12,0],[-0.62,-0.55,0],[0,-0.75,0],[0.62,-0.55,0],[0.62,-0.12,0]]} />
        <IconStroke color={palette.light} width={0.035} points={[[0,0.12,0.07],[1,0.1,0.07],[1,-0.6,0.07]]} />
        <IconStroke color={palette.primary} width={0.07} points={[[1,-0.52,0.07],[1,-0.78,0.07]]} />
      </group>
      {/* Idea/lightbulb symbol. */}
      <group ref={bulb} position={[1.55, 0.75, 0.2]} scale={0.8} rotation-z={0.12}>
        <IconStroke color={palette.primary} width={0.065} curved points={[[-0.24,-0.55,0],[-0.32,-0.26,0],[-0.58,0.05,0],[-0.61,0.48,0],[-0.4,0.8,0],[0,0.94,0],[0.4,0.8,0],[0.61,0.48,0],[0.58,0.05,0],[0.32,-0.26,0],[0.24,-0.55,0]]} />
        <IconStroke color={palette.accent} points={[[-0.24,-0.6,0],[0.24,-0.6,0]]} />
        <IconStroke color={palette.accent} points={[[-0.17,-0.8,0],[0.17,-0.8,0]]} />
        <IconStroke color={palette.light} width={0.03} points={[[-0.23,0.2,0],[0,-0.04,0],[0.23,0.2,0]]} />
        {[[-0.9,0.75,-1.1,0.9],[0,1.2,0,1.45],[0.9,0.75,1.1,0.9]].map(([x,y,x2,y2], i) => <IconStroke key={i} color={palette.accent} width={0.035} points={[[x ?? 0,y ?? 0,0],[x2 ?? 0,y2 ?? 0,0]]} />)}
      </group>
      {/* Technical learning / coding symbol. */}
      <group ref={code} position={[0.7, -1.5, 0.25]} rotation-z={0.06}>
        <IconStroke color={palette.accent} width={0.065} points={[[-0.55,0.35,0],[-0.95,0,0],[-0.55,-0.35,0]]} />
        <IconStroke color={palette.accent} width={0.065} points={[[0.55,0.35,0],[0.95,0,0],[0.55,-0.35,0]]} />
        <IconStroke color={palette.primary} width={0.065} points={[[0.18,0.48,0],[-0.18,-0.48,0]]} />
      </group>
    </group>
  );
}

export default function TechnologyScene({ palette, paused }: { palette: ScenePalette; paused: boolean }) {
  return (
    <Canvas dpr={[1, 1.5]} camera={{ position: [0, 0, 10.5], fov: 42 }} frameloop={paused ? "demand" : "always"} gl={{ alpha: true, antialias: true }}>
      <ambientLight intensity={0.8} />
      <directionalLight position={[3, 5, 5]} intensity={3} color={palette.light} />
      <Suspense fallback={null}>
        <Environment resolution={64}>
          <Lightformer intensity={3} position={[0, 4, 3]} scale={[8, 8, 1]} color={palette.light} />
          <Lightformer intensity={2} position={[-4, 0, 2]} rotation-y={Math.PI / 2} scale={[6, 3, 1]} color={palette.accent} />
        </Environment>
        <EducationIcons palette={palette} paused={paused} />
      </Suspense>
    </Canvas>
  );
}
