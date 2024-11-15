import { OrbitControls, Environment } from '@react-three/drei';
import { Canvas, useLoader, useFrame } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { AnimationMixer } from 'three';
import { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';
import beeModel from "../assets/model/pyramid_glass_animation.glb";
import IMAGE from "../assets/model/night-9.jpg";
import TrustWalletConnect from "../components/TrustWalletConnect";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as THREE from 'three';
import ModalLandingPage from "../components/ModalLandingPage";

const coordinates = [
    { index: 0, name: "Default", rotation: { x: 0, y: 0, z: 0 }, content: "" },
    { index: 1, name: "Section 1", rotation: { x: 0, y: 0.55, z: 0 }, content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum." },
    { index: 2, name: "Section 2", rotation: { x: 0, y: 2.7, z: 0 }, content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum." },
    { index: 3, name: "Section 3", rotation: { x: 0, y: 4.8, z: 0 }, content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum." }
];

// Separate Model component for Canvas context
const Model = ({ rotation, actionIndex, onActionComplete  }) => {
    const gltf = useLoader(GLTFLoader, beeModel);
    const mixer = useRef(null);
    const modelRef = useRef();

    useEffect(() => {
        // Chỉ in log Done một lần khi play được gọi
        let timeoutId;
    
        if (gltf.animations && gltf.animations.length > 0) {
            mixer.current = new AnimationMixer(gltf.scene);
    
            // Chỉ chạy action nếu actionIndex hợp lệ
            if (actionIndex >= 1 && actionIndex <= 3) {
                const action = mixer.current.clipAction(gltf.animations[actionIndex - 1]);
                
                // Reset và setup action
                action.reset();
                action.setLoop(THREE.LoopOnce); // Chạy 1 lần
                action.clampWhenFinished = true; // Dừng khi kết thúc
    
                // Chạy action
                action.play();
    
                // In log "Done" sau 1500ms sau khi play() được gọi
                timeoutId = setTimeout(() => {
                    onActionComplete(actionIndex);
                }, 3000); // Đặt thời gian là 1500ms
            }
        }
    
        // Cleanup khi component unmounts hoặc khi thay đổi effect
        return () => {
            if (timeoutId) {
                clearTimeout(timeoutId); // Clear timeout khi không cần nữa
            }
        };
    }, [gltf, actionIndex]); // Đảm bảo effect chạy khi gltf hoặc actionIndex thay đổi

    useFrame((state, delta) => {
        mixer.current?.update(delta);
    });

    // Apply gsap rotation when rotation changes
    useEffect(() => {
        gsap.to(modelRef.current.rotation, {
            x: rotation.x,
            y: rotation.y,
            z: rotation.z,
            duration: 1.2,
            ease: "power2.inOut"
        });
    }, [rotation]);

    return <primitive object={gltf.scene} ref={modelRef} position={[0, 8, 0]} />;
};

const Pyramid = () => {
    const [corCount, setCorCount] = useState(0);
    const [currentCoordinate, setCurrentCoordinate] = useState(coordinates[0]);
    const [activeModal, setActiveModal] = useState(null); // Trạng thái lưu modal đang mở
    const [isRotate, setRotate] = useState(true);
    let count = 1;

    const handleActionComplete = (index) => {
        console.log(`Action ${index} has completed.`);
        setActiveModal(index); // Hiển thị modal tương ứng với actionIndex
        setRotate(true);
    };

    useEffect(() => {
        const interval = setInterval(() => {
            notify();
        }, 3000);

        toast.dismiss();
        return () => clearInterval(interval);
    }, []);

    const notify = () => {
        toast.dismiss();
        toast(`🦄 Wow!!Wow!!Wow!!Wow so easy ${count++}!`, {
            position: "bottom-center",
            autoClose: false,
            limit: 1,
            hideProgressBar: true,
            closeOnClick: false,
            pauseOnHover: false,
            draggable: false,
            progress: undefined,
            theme: "light",
            closeButton: false
        });
    };

    const next = () => {
        const newIndex = (corCount + 1) % coordinates.length;
        setCorCount(newIndex);
        setCurrentCoordinate(coordinates[newIndex]);
        setRotate(false);
    };

    const prev = () => {
        const newIndex = (corCount - 1 + coordinates.length) % coordinates.length;
        setCorCount(newIndex);
        setCurrentCoordinate(coordinates[newIndex]);
        setRotate(false);

    };

    const closeModal = () => {
        setActiveModal(null);
    };

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

            <Canvas camera={{ position: [0, 35, 30], fov: 80 }}>
                <Environment files={IMAGE} background backgroundBlurriness={0.07} />
                <directionalLight position={[3.3, 1.0, 4.4]} intensity={9000} />
                <Model rotation={currentCoordinate.rotation} actionIndex={currentCoordinate.index} onActionComplete={handleActionComplete} />
                <OrbitControls autoRotate={isRotate} enableZoom={false} />
            </Canvas>

            <div className="button-container">
                <button className="button-item" onClick={prev}>Prev</button>
                <button disabled className="button-item section-name">{currentCoordinate.name}</button>
                <button className="button-item" onClick={next}>Next</button>
            </div>

            <ModalLandingPage isOpen={activeModal === 1} onClose={closeModal} header="KASPOOL" content={currentCoordinate.content} />
            <ModalLandingPage isOpen={activeModal === 2} onClose={closeModal} header="DAAG" content={currentCoordinate.content} />
            <ModalLandingPage isOpen={activeModal === 3} onClose={closeModal} header="UTILS" content={currentCoordinate.content} />
        </div>
    );
};

export default Pyramid;
