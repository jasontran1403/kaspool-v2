import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { gsap } from "gsap";
import beeModel from "../assets/model/pyramid_glass_animation.glb"; // 3D model
import IMAGE2 from "../assets/model/night-9.jpg";

import TrustWalletConnect from "../components/TrustWalletConnect"; // Connect Wallet component

const arrPositionModel = [
  {
    id: "banner",
    position: { x: -0.1, y: -0.2, z: 0 },
    rotation: { x: 0, y: 3, z: 0 },
  },
  // Add more positions for other sections if needed
];

const PyramidAnimation = () => {
  const beeRef = useRef(); // Ref for the bee model
  const cameraRef = useRef(); // Ref for the camera
  const rendererRef = useRef(); // Ref for the renderer
  const mixerRef = useRef(); // Ref for the animation mixer
  const previousMousePosition = useRef({ x: 0, y: 0 });
  const isDragging = useRef(false);


  useEffect(() => {
    // Setup the camera
    const camera = new THREE.PerspectiveCamera(
      15,
      window.innerWidth / window.innerHeight,
      0.1,
      800
    );
    camera.position.z = window.innerWidth < 768 ? 150 : 350;
    cameraRef.current = camera; // Save the camera to ref

    const scene = new THREE.Scene();
    let mixer;

    // Load the 3D model
    const loader = new GLTFLoader();
    const textureLoader = new THREE.TextureLoader(); // Create a texture loader

    loader.load(beeModel, function (gltf) {
      const bee = gltf.scene;
      beeRef.current = bee; // Save the model to ref

      // Load the texture image
      const texture = textureLoader.load(IMAGE2); // Replace with the path to your image

      // Create a material using the texture
      const material = new THREE.MeshStandardMaterial({
        map: texture // Apply the texture to the material
      });

      // Apply the material to all mesh objects in the bee model
      bee.traverse((child) => {
        if (child.isMesh) {
          child.material = material;
        }
      });

      scene.add(bee);
      mixer = new THREE.AnimationMixer(bee);
      mixerRef.current = mixer; // Save mixer to ref
      mixer.clipAction(gltf.animations[0]).play(); // Optionally play the animation initially
      mixer.clipAction(gltf.animations[1]).play(); // Optionally play the animation initially

      mixer.clipAction(gltf.animations[2]).play(); // Optionally play the animation initially

      bee.position.set(0, 0, 0); // Center the model
      modelMove();
    });


    const modelMove = () => {
      const sections = document.querySelectorAll(".section");
      let currentSection;
      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= window.innerHeight / 3) {
          currentSection = section.id;
        }
      });

      let positionActive = arrPositionModel.findIndex(
        (val) => val.id === currentSection
      );

      if (positionActive >= 0) {
        const newCoordinates = arrPositionModel[positionActive];

        gsap.to(beeRef.current.position, {
          x: newCoordinates.position.x,
          y: newCoordinates.position.y,
          z: newCoordinates.position.z,
          duration: 3,
          ease: "power1.out",
        });
        gsap.to(beeRef.current.rotation, {
          x: newCoordinates.rotation.x,
          y: newCoordinates.rotation.y,
          z: newCoordinates.rotation.z,
          duration: 3,
          ease: "power1.out",
        });
      }
    };

    // Setup renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById("container3D").appendChild(renderer.domElement);
    rendererRef.current = renderer; // Save the renderer to ref

    // Setup lighting
    const ambientLight = new THREE.AmbientLight(0xFFFFFF, 1);
    scene.add(ambientLight);

    const topLight = new THREE.DirectionalLight(0xFFFFFF, 200);
    topLight.position.set(100, 100, 100);
    scene.add(topLight);

    // Animation loop
    const reRender3D = () => {
      requestAnimationFrame(reRender3D);
      renderer.render(scene, camera);
      if (mixer) mixer.update(0.02);
    };
    reRender3D();

    // Handle window resizing
    const handleResize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
    };
    window.addEventListener("resize", handleResize);

    // Mouse move event to rotate the camera around the model
    const handleMouseMove = (event) => {
      if (!isDragging.current || !beeRef.current) return;

      const deltaX = event.clientX - previousMousePosition.current.x;
      const deltaY = event.clientY - previousMousePosition.current.y;
      previousMousePosition.current = { x: event.clientX, y: event.clientY };

      const rotationSpeed = 0.005;

      // Apply rotations based on mouse movement
      beeRef.current.rotation.y += deltaX * rotationSpeed; // Rotate around the Y-axis (left-right)
      beeRef.current.rotation.x += deltaY * rotationSpeed; // Rotate around the X-axis (up-down)

      // Optional: Limit vertical rotation to avoid flipping
      beeRef.current.rotation.x = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, beeRef.current.rotation.x));
    };



    // Add event listeners for mouse events
    const handleMouseDown = (event) => {
      isDragging.current = true;
      previousMousePosition.current = { x: event.clientX, y: event.clientY };
    };
    const handleMouseUp = () => {
      isDragging.current = false;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  return (
    <div className="landingpage">
      <header className="navbar">
        <div className="content-fit">
          <div className="logo">
            <a href="/" style={{ textDecoration: "none", fontSize: "30px", color: "white" }}>
              <p>Kaspool</p>
            </a>
          </div>
          <nav>
            <ul className="landingpage-nav">
              <li>
                <TrustWalletConnect />
              </li>
            </ul>
          </nav>
        </div>
      </header>
      <div className="section" id="banner">
        <div className="content-fit"></div>
      </div>
      <div id="container3D"></div>
    </div>
  );
};

export default PyramidAnimation;
