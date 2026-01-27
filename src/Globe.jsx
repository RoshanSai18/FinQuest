/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const Globe = () => {
  const containerRef = useRef(null);
  const rendererRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const globeRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      45,
      containerRef.current.offsetWidth / containerRef.current.offsetHeight,
      0.1,
      1000
    );
    camera.position.z = 3;
    cameraRef.current = camera;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true 
    });
    renderer.setSize(
      containerRef.current.offsetWidth,
      containerRef.current.offsetHeight
    );
    renderer.setPixelRatio(window.devicePixelRatio);
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Create globe
    const geometry = new THREE.SphereGeometry(1, 64, 64);
    
    // Create gradient material
    const material = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        color1: { value: new THREE.Color(0x0B0C10) },
        color2: { value: new THREE.Color(0x1a2235) },
        color3: { value: new THREE.Color(0xc8ff00) },
      },
      vertexShader: `
        varying vec2 vUv;
        varying vec3 vPosition;
        void main() {
          vUv = uv;
          vPosition = position;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float time;
        uniform vec3 color1;
        uniform vec3 color2;
        uniform vec3 color3;
        varying vec2 vUv;
        varying vec3 vPosition;
        
        void main() {
          vec3 color = mix(color1, color2, vUv.y);
          
          // Add grid lines
          float lat = abs(fract(vUv.y * 20.0) - 0.5);
          float lon = abs(fract(vUv.x * 20.0) - 0.5);
          float grid = smoothstep(0.48, 0.5, max(lat, lon));
          
          color = mix(color, color3, grid * 0.3);
          
          // Add glow
          float glow = pow(1.0 - abs(vPosition.z), 2.0);
          color += color3 * glow * 0.2;
          
          gl_FragColor = vec4(color, 1.0);
        }
      `,
      wireframe: false,
    });

    const globe = new THREE.Mesh(geometry, material);
    scene.add(globe);
    globeRef.current = globe;

    // Add wireframe overlay
    const wireframeGeometry = new THREE.SphereGeometry(1.01, 32, 32);
    const wireframeMaterial = new THREE.MeshBasicMaterial({
      color: 0xc8ff00,
      wireframe: true,
      transparent: true,
      opacity: 0.1,
    });
    const wireframe = new THREE.Mesh(wireframeGeometry, wireframeMaterial);
    scene.add(wireframe);

    // Add point lights
    const pointLight1 = new THREE.PointLight(0xc8ff00, 1, 100);
    pointLight1.position.set(5, 3, 5);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0xffffff, 0.5, 100);
    pointLight2.position.set(-5, -3, -5);
    scene.add(pointLight2);

    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0x404040, 2);
    scene.add(ambientLight);

    // Animation
    let time = 0;
    const animate = () => {
      requestAnimationFrame(animate);

      time += 0.01;
      if (material.uniforms) {
        material.uniforms.time.value = time;
      }

      // Rotate globe
      if (globeRef.current) {
        globeRef.current.rotation.y += 0.002;
        globeRef.current.rotation.x = Math.sin(time * 0.3) * 0.1;
      }

      if (wireframe) {
        wireframe.rotation.y += 0.002;
        wireframe.rotation.x = Math.sin(time * 0.3) * 0.1;
      }

      renderer.render(scene, camera);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      if (!containerRef.current) return;
      
      camera.aspect = containerRef.current.offsetWidth / containerRef.current.offsetHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(
        containerRef.current.offsetWidth,
        containerRef.current.offsetHeight
      );
    };

    window.addEventListener('resize', handleResize);

    // Mouse interaction
    const handleMouseMove = (event) => {
      if (!containerRef.current || !globeRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      globeRef.current.rotation.y += x * 0.01;
      globeRef.current.rotation.x += y * 0.01;
    };

    containerRef.current.addEventListener('mousemove', handleMouseMove);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      if (containerRef.current) {
        containerRef.current.removeEventListener('mousemove', handleMouseMove);
        if (rendererRef.current && containerRef.current.contains(rendererRef.current.domElement)) {
          containerRef.current.removeChild(rendererRef.current.domElement);
        }
      }
      geometry.dispose();
      material.dispose();
      wireframeGeometry.dispose();
      wireframeMaterial.dispose();
      if (rendererRef.current) {
        rendererRef.current.dispose();
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full h-full min-h-[400px]"
      style={{ minHeight: '500px' }}
    />
  );
};

export default Globe;
