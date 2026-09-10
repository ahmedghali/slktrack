"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import {
  Cube,
  ArrowsClockwise,
  Lightning,
  Eye,
  CursorClick,
  Sparkle,
  LinkSimple,
} from "@phosphor-icons/react";

interface Component3DInfo {
  id: string;
  name: string;
  category: string;
  meshIndex: number;
  specs: string;
}

const COMPONENTS_INFO: Component3DInfo[] = [
  { id: "RS-011", name: "Rope Socket", category: "Cable Head Connection", meshIndex: 0, specs: '1.500" OD · 15/16"-10 UN · 3.2 lbs' },
  { id: "ST-003", name: "Stem (Solid Bar)", category: "Downhole Mass", meshIndex: 1, specs: '1.500" OD × 5 ft · 28.5 lbs' },
  { id: "JR-014", name: "Spang Mechanical Jar", category: "Impact Accelerator", meshIndex: 2, specs: '1.500" OD · 20" Stroke · 16.8 lbs' },
  { id: "KJ-007", name: "Knuckle Joint", category: "360° Articulation", meshIndex: 3, specs: '1.500" OD · Ball & Socket · 4.1 lbs' },
  { id: "PT-001", name: "Pulling Tool (GS)", category: "Subsurface Latch", meshIndex: 4, specs: '1.500" OD · Inner Dog Latch · 7.4 lbs' },
];

export function ToolString3DCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeViewMode, setActiveViewMode] = useState<"standard" | "exploded" | "jarring">("standard");
  const [selectedPart, setSelectedPart] = useState<Component3DInfo>(COMPONENTS_INFO[0]);
  const [isRotating, setIsRotating] = useState(true);

  // References to communicate with Three.js animation loop
  const sceneRef = useRef<{
    renderer: THREE.WebGLRenderer;
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    group: THREE.Group;
    parts: THREE.Group[];
    wire: THREE.Mesh;
    particles: THREE.Points;
    wellbore: THREE.Mesh;
    targetOffsets: number[];
    currentOffsets: number[];
    isDragging: boolean;
    prevMouseX: number;
    prevMouseY: number;
    jarAnimation: number;
  } | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || 600;
    const height = container.clientHeight || 480;

    // 1. Scene setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x070a11, 0.04);

    // 2. Camera setup
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 11);

    // 3. Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.replaceChildren(renderer.domElement);

    // 4. Enhanced Multi-tone Oilfield Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.1);
    scene.add(ambientLight);

    const dirLightCyan = new THREE.DirectionalLight(0x38bdf8, 3.2);
    dirLightCyan.position.set(6, 8, 5);
    scene.add(dirLightCyan);

    const dirLightGold = new THREE.DirectionalLight(0xf59e0b, 2.4);
    dirLightGold.position.set(-6, -4, 4);
    scene.add(dirLightGold);

    const pointLight = new THREE.PointLight(0x60a5fa, 4.0, 18);
    pointLight.position.set(0, 1, 5);
    scene.add(pointLight);

    // 5. Materials with rich metallic & petroleum gold tones
    const metalMat = new THREE.MeshStandardMaterial({
      color: 0xcfd8dc,
      metalness: 0.9,
      roughness: 0.2,
    });

    const chromeMat = new THREE.MeshStandardMaterial({
      color: 0xf8fafc,
      metalness: 0.98,
      roughness: 0.1,
    });

    const brandBlueMat = new THREE.MeshStandardMaterial({
      color: 0x0284c7,
      metalness: 0.8,
      roughness: 0.25,
      emissive: 0x0369a1,
      emissiveIntensity: 0.35,
    });

    const goldPetroleumMat = new THREE.MeshStandardMaterial({
      color: 0xf59e0b,
      metalness: 0.88,
      roughness: 0.22,
      emissive: 0xd97706,
      emissiveIntensity: 0.25,
    });

    // 6. Build the 3D Slickline Tool String components
    const group = new THREE.Group();
    scene.add(group);

    const parts: THREE.Group[] = [];

    // Part 0: Rope Socket (Top)
    const ropeSocketGroup = new THREE.Group();
    ropeSocketGroup.position.y = 3.6;

    // Wireline cable entering top
    const wireGeom = new THREE.CylinderGeometry(0.04, 0.04, 2.5, 16);
    const wireMesh = new THREE.Mesh(wireGeom, chromeMat);
    wireMesh.position.y = 1.6;
    ropeSocketGroup.add(wireMesh);

    // Socket body
    const rsBody = new THREE.Mesh(new THREE.CylinderGeometry(0.32, 0.32, 1.2, 32), metalMat);
    const rsCollar = new THREE.Mesh(new THREE.CylinderGeometry(0.38, 0.38, 0.25, 32), brandBlueMat);
    rsCollar.position.y = 0.3;
    const rsBevel = new THREE.Mesh(new THREE.ConeGeometry(0.32, 0.3, 32), goldPetroleumMat);
    rsBevel.rotation.x = Math.PI;
    rsBevel.position.y = 0.75;

    ropeSocketGroup.add(rsBody, rsCollar, rsBevel);
    parts.push(ropeSocketGroup);
    group.add(ropeSocketGroup);

    // Part 1: Stem (Solid polished weight bar)
    const stemGroup = new THREE.Group();
    stemGroup.position.y = 1.9;

    const stemBody = new THREE.Mesh(new THREE.CylinderGeometry(0.32, 0.32, 2.0, 32), chromeMat);
    const stemRing1 = new THREE.Mesh(new THREE.TorusGeometry(0.33, 0.03, 16, 32), metalMat);
    stemRing1.rotation.x = Math.PI / 2;
    stemRing1.position.y = 0.8;
    const stemRing2 = stemRing1.clone();
    stemRing2.position.y = -0.8;

    stemGroup.add(stemBody, stemRing1, stemRing2);
    parts.push(stemGroup);
    group.add(stemGroup);

    // Part 2: Spang Mechanical Jar (Sliding impact accelerator)
    const jarGroup = new THREE.Group();
    jarGroup.position.y = 0.1;

    const jarOuter = new THREE.Mesh(new THREE.CylinderGeometry(0.36, 0.36, 1.4, 32), metalMat);
    const jarInnerShaft = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.2, 1.6, 32), chromeMat);
    const jarKnocker = new THREE.Mesh(new THREE.CylinderGeometry(0.39, 0.39, 0.3, 32), goldPetroleumMat);
    jarKnocker.position.y = 0.5;

    jarGroup.add(jarOuter, jarInnerShaft, jarKnocker);
    parts.push(jarGroup);
    group.add(jarGroup);

    // Part 3: Knuckle Joint (Articulating sphere)
    const knuckleGroup = new THREE.Group();
    knuckleGroup.position.y = -1.3;

    const knuckleSphere = new THREE.Mesh(new THREE.SphereGeometry(0.42, 32, 32), chromeMat);
    const knuckleCapTop = new THREE.Mesh(new THREE.CylinderGeometry(0.32, 0.38, 0.4, 32), brandBlueMat);
    knuckleCapTop.position.y = 0.35;
    const knuckleCapBot = new THREE.Mesh(new THREE.CylinderGeometry(0.38, 0.32, 0.4, 32), goldPetroleumMat);
    knuckleCapBot.position.y = -0.35;

    knuckleGroup.add(knuckleSphere, knuckleCapTop, knuckleCapBot);
    parts.push(knuckleGroup);
    group.add(knuckleGroup);

    // Part 4: Pulling Tool (GS Latch with dogs and core)
    const pullingToolGroup = new THREE.Group();
    pullingToolGroup.position.y = -2.7;

    const ptBody = new THREE.Mesh(new THREE.CylinderGeometry(0.34, 0.32, 1.2, 32), metalMat);
    const ptDogs = new THREE.Mesh(new THREE.CylinderGeometry(0.44, 0.42, 0.35, 6), goldPetroleumMat);
    ptDogs.position.y = 0.1;
    const ptCorePin = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.18, 0.6, 16), chromeMat);
    ptCorePin.position.y = -0.7;

    pullingToolGroup.add(ptBody, ptDogs, ptCorePin);
    parts.push(pullingToolGroup);
    group.add(pullingToolGroup);

    // 7. Holographic 3D Wellbore Casing Cylinder (Wireframe grid)
    const wellboreGeom = new THREE.CylinderGeometry(1.6, 1.6, 11, 24, 24, true);
    const wellboreMat = new THREE.MeshBasicMaterial({
      color: 0x1e3a8a,
      wireframe: true,
      transparent: true,
      opacity: 0.18,
    });
    const wellbore = new THREE.Mesh(wellboreGeom, wellboreMat);
    scene.add(wellbore);

    // 8. Particle Fluid Flow in Wellbore
    const particleCount = 180;
    const particleGeom = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      const radius = 0.7 + Math.random() * 0.8;
      const angle = Math.random() * Math.PI * 2;
      particlePositions[i] = Math.cos(angle) * radius;
      particlePositions[i + 1] = (Math.random() - 0.5) * 11;
      particlePositions[i + 2] = Math.sin(angle) * radius;
    }

    particleGeom.setAttribute("position", new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0x38bdf8,
      size: 0.06,
      transparent: true,
      opacity: 0.65,
    });
    const particles = new THREE.Points(particleGeom, particleMat);
    scene.add(particles);

    // Initial base Y positions for standard vs exploded mode
    const standardOffsets = [3.6, 1.9, 0.1, -1.3, -2.7];
    const explodedOffsets = [4.4, 2.3, 0.1, -2.0, -3.9];

    sceneRef.current = {
      renderer,
      scene,
      camera,
      group,
      parts,
      wire: wireMesh,
      particles,
      wellbore,
      targetOffsets: standardOffsets,
      currentOffsets: [...standardOffsets],
      isDragging: false,
      prevMouseX: 0,
      prevMouseY: 0,
      jarAnimation: 0,
    };

    // 9. Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const time = clock.getElapsedTime();

      if (sceneRef.current) {
        const state = sceneRef.current;

        // Auto-rotation when not manually dragging
        if (isRotating && !state.isDragging) {
          state.group.rotation.y += 0.8 * delta;
          state.wellbore.rotation.y -= 0.2 * delta;
        }

        // Particle upward flow
        const posAttr = state.particles.geometry.attributes.position as THREE.BufferAttribute;
        const posArray = posAttr.array as Float32Array;
        for (let i = 1; i < particleCount * 3; i += 3) {
          posArray[i] += 1.2 * delta;
          if (posArray[i] > 5.5) {
            posArray[i] = -5.5;
          }
        }
        posAttr.needsUpdate = true;

        // Smooth transition of component Y offsets (for exploded view)
        for (let i = 0; i < state.parts.length; i++) {
          state.currentOffsets[i] += (state.targetOffsets[i] - state.currentOffsets[i]) * 0.1;
          state.parts[i].position.y = state.currentOffsets[i];
        }

        // Jarring kinetic stroke animation
        if (state.jarAnimation > 0) {
          state.jarAnimation -= delta * 2.5;
          const jarPart = state.parts[2]; // Jar is index 2
          const impactOffset = Math.sin(time * 25) * 0.2 * state.jarAnimation;
          jarPart.position.y = state.currentOffsets[2] + impactOffset;
        }
      }

      renderer.render(scene, camera);
    };

    animate();

    // 10. Mouse interaction handlers for 3D rotation
    const onMouseDown = (e: MouseEvent) => {
      if (!sceneRef.current) return;
      sceneRef.current.isDragging = true;
      sceneRef.current.prevMouseX = e.clientX;
      sceneRef.current.prevMouseY = e.clientY;
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!sceneRef.current || !sceneRef.current.isDragging) return;
      const deltaX = e.clientX - sceneRef.current.prevMouseX;
      const deltaY = e.clientY - sceneRef.current.prevMouseY;

      sceneRef.current.group.rotation.y += deltaX * 0.01;
      sceneRef.current.group.rotation.x = Math.max(-0.4, Math.min(0.4, sceneRef.current.group.rotation.x + deltaY * 0.01));

      sceneRef.current.prevMouseX = e.clientX;
      sceneRef.current.prevMouseY = e.clientY;
    };

    const onMouseUp = () => {
      if (sceneRef.current) sceneRef.current.isDragging = false;
    };

    const dom = renderer.domElement;
    dom.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);

    // 11. Responsive resize listener
    const onResize = () => {
      if (!container || !renderer || !camera) return;
      const newW = container.clientWidth;
      const newH = container.clientHeight;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };

    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      dom.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
    };
  }, [isRotating]);

  // Mode Handlers
  function setViewMode(mode: "standard" | "exploded" | "jarring") {
    setActiveViewMode(mode);
    if (!sceneRef.current) return;

    if (mode === "exploded") {
      sceneRef.current.targetOffsets = [4.4, 2.3, 0.1, -2.0, -3.9];
    } else if (mode === "standard") {
      sceneRef.current.targetOffsets = [3.6, 1.9, 0.1, -1.3, -2.7];
    } else if (mode === "jarring") {
      sceneRef.current.jarAnimation = 1.0;
      sceneRef.current.targetOffsets = [3.6, 1.9, 0.1, -1.3, -2.7];
    }
  }

  function handleSelectPart(part: Component3DInfo) {
    setSelectedPart(part);
    if (!sceneRef.current) return;
    // Highlight effect: point camera towards part
    const targetY = sceneRef.current.targetOffsets[part.meshIndex];
    sceneRef.current.group.position.y = -targetY * 0.6;
  }

  return (
    <div className="relative overflow-hidden rounded-3xl border border-white/15 bg-gradient-to-b from-[#091122]/95 to-[#050914]/98 p-6 shadow-2xl backdrop-blur-2xl lg:p-8">
      {/* Header bar with mode pills */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-5">
        <div>
          <span className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider text-brand">
            <Cube size={15} weight="bold" />
            WebGL 3D Interactive Model
          </span>
          <h3 className="mt-1 text-xl font-bold tracking-tight text-white sm:text-2xl">
            3D Downhole BHA Tool String Visualizer
          </h3>
        </div>

        {/* 3D Viewport Controls */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setViewMode("standard")}
            className={`rounded-xl border px-3.5 py-1.5 font-mono text-xs font-semibold transition-all cursor-pointer ${
              activeViewMode === "standard"
                ? "border-brand bg-brand text-white shadow-md shadow-brand/40"
                : "border-white/10 bg-white/5 text-text-muted hover:text-white"
            }`}
          >
            Stacked View
          </button>
          <button
            onClick={() => setViewMode("exploded")}
            className={`rounded-xl border px-3.5 py-1.5 font-mono text-xs font-semibold transition-all cursor-pointer ${
              activeViewMode === "exploded"
                ? "border-brand bg-brand text-white shadow-md shadow-brand/40"
                : "border-white/10 bg-white/5 text-text-muted hover:text-white"
            }`}
          >
            Exploded CAD
          </button>
          <button
            onClick={() => setViewMode("jarring")}
            className={`flex items-center gap-1.5 rounded-xl border px-3.5 py-1.5 font-mono text-xs font-semibold transition-all cursor-pointer ${
              activeViewMode === "jarring"
                ? "border-warn bg-warn text-white shadow-md shadow-warn/40"
                : "border-white/10 bg-white/5 text-text-muted hover:text-white"
            }`}
          >
            <Lightning size={14} weight="bold" />
            Simulate Jar Impact
          </button>
          <button
            onClick={() => setIsRotating((prev) => !prev)}
            aria-label="Toggle 3D Rotation"
            className={`flex items-center gap-1 rounded-xl border p-1.5 text-xs transition-colors cursor-pointer ${
              isRotating
                ? "border-brand/40 bg-brand/15 text-brand"
                : "border-white/10 bg-white/5 text-text-dim"
            }`}
            title="Toggle 360 Rotation"
          >
            <ArrowsClockwise size={16} className={isRotating ? "animate-spin" : ""} />
          </button>
        </div>
      </div>

      {/* 3D Canvas Viewport + Interactive HUD */}
      <div className="mt-6 grid gap-6 lg:grid-cols-[1.5fr_1fr] lg:items-center">
        {/* WebGL Canvas Container */}
        <div className="relative h-[420px] sm:h-[480px] w-full rounded-2xl border border-white/10 bg-black/40 shadow-inner overflow-hidden cursor-grab active:cursor-grabbing">
          {/* Canvas mount point */}
          <div ref={containerRef} className="absolute inset-0 h-full w-full" />

          {/* Interactive 3D Guide Overlay */}
          <div className="pointer-events-none absolute bottom-4 left-4 flex items-center gap-2 rounded-lg bg-black/60 px-3 py-1.5 font-mono text-[11px] text-text-muted backdrop-blur-md border border-white/10">
            <CursorClick size={14} className="text-brand" />
            Drag with mouse to rotate 3D angle &middot; Real-time WebGL
          </div>

          {/* Depth / Wellbore scale overlay */}
          <div className="pointer-events-none absolute top-4 left-4 flex flex-col gap-1 font-mono text-[10px] text-text-dim">
            <span className="text-brand font-semibold">● WELLBORE DEPTH: 2,850.5m</span>
            <span>PRESSURE: 4,200 PSI</span>
            <span>WIRE TENSION: 380 LBS</span>
          </div>
        </div>

        {/* Component Selector & Specs HUD */}
        <div className="space-y-4">
          <div className="font-mono text-xs font-semibold uppercase tracking-wider text-text-dim">
            Select 3D Component to Inspect
          </div>

          <div className="space-y-2">
            {COMPONENTS_INFO.map((part) => {
              const isSelected = selectedPart.id === part.id;
              return (
                <button
                  key={part.id}
                  onClick={() => handleSelectPart(part)}
                  className={`flex w-full items-center justify-between rounded-xl border p-3 text-left transition-all cursor-pointer ${
                    isSelected
                      ? "border-brand bg-brand/20 shadow-md shadow-brand/20 translate-x-1"
                      : "border-white/5 bg-white/[0.02] hover:border-white/15 hover:bg-white/[0.05]"
                  }`}
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-brand">
                        {part.id}
                      </span>
                      <span className="truncate text-xs font-semibold text-white">
                        {part.name}
                      </span>
                    </div>
                    <div className="mt-0.5 font-mono text-[11px] text-text-muted">
                      {part.specs}
                    </div>
                  </div>
                  {isSelected && (
                    <span className="flex h-2 w-2 rounded-full bg-brand anim-pulse shrink-0 ml-2" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Selected Part Focus Card */}
          <div className="rounded-2xl border border-brand/30 bg-brand/5 p-4 text-xs">
            <div className="flex items-center gap-1.5 font-semibold text-brand uppercase tracking-wide">
              <Eye size={15} weight="bold" />
              Focused 3D Geometry: {selectedPart.name}
            </div>
            <p className="mt-1 text-text-muted leading-relaxed">
              Serialized under ID <strong className="text-white">{selectedPart.id}</strong> in the central fleet registry. All dimensions, pin/box threads, and tension stress limits are verified automatically.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
