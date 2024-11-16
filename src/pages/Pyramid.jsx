import { OrbitControls, Environment } from '@react-three/drei';
import { Canvas, useLoader, useFrame } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { AnimationMixer } from 'three';
import { useEffect, useState, useRef } from 'react';
import { GrCaretNext, GrCaretPrevious  } from "react-icons/gr";
import gsap from 'gsap';
import beeModel from "../assets/model/pyramid_glass_full.glb";
import IMAGE from "../assets/model/night-9.jpg";
import TrustWalletConnect from "../components/TrustWalletConnect";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as THREE from 'three';
import ModalSection1 from "../components/ModalSection1";
import ModalSection2 from "../components/ModalSection2";
import ModalSection3 from "../components/ModalSection3";
import ModalSection4 from "../components/ModalSection4";

const coordinates = [
    { index: 0, name: "Default", camera: { x: 0, y: 0, z: 30 }, rotation: { x: 0, y: 8, z: -5 }, content: "" },
    { index: 1, name: "KASPOOL", camera: { x: 15, y: 5, z: 25 }, rotation: { x: -5, y: 15, z: 5 }, content: "" },
    { index: 2, name: "FEATURES", camera: { x: -5, y: 5, z: 30 }, rotation: { x: 5, y: 15, z: 5 }, content: "" },
    { index: 3, name: "BLOCKDAG", camera: { x: 10, y: 10, z: 40 }, rotation: { x: 5, y: 10, z: 20 }, content: "" },
    { index: 4, name: "TEAM", camera: { x: -10, y: 10, z: 50 }, rotation: { x: 0, y: 25, z: 10 }, content: "" }
];

const Model = ({ rotation, actionIndex, onActionComplete }) => {
    const gltf = useLoader(GLTFLoader, beeModel);
    const mixer = useRef(null);
    const modelRef = useRef();

    useEffect(() => {
        let timeoutId;

        if (gltf.animations && gltf.animations.length > 0) {
            mixer.current = new AnimationMixer(gltf.scene);
            
            if (actionIndex >= 1 && actionIndex <= 3) {
                const action = mixer.current.clipAction(gltf.animations[actionIndex - 1]);

                action.reset();
                action.setLoop(THREE.LoopOnce);
                action.clampWhenFinished = true;

                action.play();
            } else if(actionIndex == 4){
                const action = mixer.current.clipAction(gltf.animations[4]);

                action.reset();
                action.setLoop(THREE.LoopOnce);
                action.clampWhenFinished = true;

                action.play();
            }

            mixer.current.addEventListener("finished", () => {
                timeoutId = setTimeout(() => {
                    onActionComplete(actionIndex);
                }, 600);
            });
        }

        return () => {
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
        };
    }, [gltf, actionIndex]);

    useFrame((state, delta) => {
        mixer.current?.update(delta);
    });

    // Apply gsap rotation when rotation changes
    useEffect(() => {
        if (modelRef.current) {
            gsap.to(modelRef.current.position, {
                x: rotation.x,
                y: rotation.y,
                z: rotation.z,
                duration: 1,
                ease: "power2.inOut"
            });
        }

        // Góc quay cố định cho mỗi actionIndex
        let targetRotationY = modelRef.current.rotation.y;
        let targetRotationX = modelRef.current.rotation.y;

        if (actionIndex === 0) {
            targetRotationY = THREE.MathUtils.degToRad(0);
            targetRotationX = 0;
        } else if (actionIndex === 1) {
            targetRotationY = THREE.MathUtils.degToRad(40);  // Quay 50 độ theo chiều ngược chiều kim đồng hồ
            targetRotationX = 0;
        } else if (actionIndex === 2) {
            targetRotationY = THREE.MathUtils.degToRad(90);  // Quay 280 độ theo chiều kim đồng hồ
            targetRotationX = 0;
        } else if (actionIndex === 3) {
            targetRotationY = THREE.MathUtils.degToRad(180);  // Quay 280 độ theo chiều kim đồng hồ
            targetRotationX = 0;
        } else if (actionIndex === 4) {
            targetRotationY = THREE.MathUtils.degToRad(150);   // Quay 50 độ theo chiều ngược chiều kim đồng hồ
            targetRotationX = THREE.MathUtils.degToRad(-20)
        }

        // Xoay về góc cố định thay vì cộng dồn vào góc hiện tại
        gsap.to(modelRef.current.rotation, {
            x: targetRotationX,
            y: targetRotationY,
            duration: 1.2,
            ease: "power2.inOut"
        });
    }, [actionIndex]);


    return <primitive object={gltf.scene} ref={modelRef} position={[rotation.x, rotation.y, rotation.z]} />;
};

const Pyramid = () => {
    const [corCount, setCorCount] = useState(0);
    const [currentCoordinate, setCurrentCoordinate] = useState(coordinates[0]);
    const [activeModal, setActiveModal] = useState(null); // Trạng thái lưu modal đang mở
    const [isRotate, setRotate] = useState(true);
    const [isDisable, setDisable] = useState(false);
    let toastId = null;

    const randomAmount = (min = 5, max = 200) => {
        return (Math.random() * (max - min) + min).toFixed(2);
    };

    useEffect(() => {
        if (currentCoordinate.index === 0) {
            setDisable(false);
        }
    }, [currentCoordinate]);

    const handleActionComplete = (index) => {
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
        const content = (
            <div>
                <span role="img" aria-label="kaspa">🦄 KASPA</span><br />
                Mined {randomAmount(5, 200)} KAS at 00:00:00 24/12/2024
            </div>
        );
    
        // Check if the toast already exists, update it instead of dismissing
        if (toastId) {
            toast.update(toastId, {
                render: content,
            });
        } else {
            toastId = toast(content, {
                position: "bottom-center",
                autoClose: false,
                limit: 1,
                hideProgressBar: true,
                closeOnClick: false,
                pauseOnHover: false,
                draggable: false,
                progress: undefined,
                theme: "light",
                closeButton: false,
                className: "custom-toast",
            });
        }
    };

    const next = () => {
        if (isDisable) return;
        const newIndex = (corCount + 1) % coordinates.length;
        setCorCount(newIndex);
        setCurrentCoordinate(coordinates[newIndex]);
        setRotate(false);
        setDisable(true);
    };

    const prev = () => {
        if (isDisable) return;
        const newIndex = (corCount - 1 + coordinates.length) % coordinates.length;
        setCorCount(newIndex);
        setCurrentCoordinate(coordinates[newIndex]);
        setRotate(false);
        setDisable(true);
    };

    const closeModal = () => {
        setActiveModal(null);
        setDisable(false);
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
                <Model
                    rotation={currentCoordinate.rotation}
                    actionIndex={currentCoordinate.index}
                    onActionComplete={handleActionComplete}
                />
                <OrbitControls autoRotate={false} enableZoom={true} />
            </Canvas>

            <div className="button-container">
                <GrCaretPrevious className={`button-item ${!isDisable ? 'active' : 'inactive'}`}  onClick={prev} />
                <button disabled className="button-item section-name">{currentCoordinate.name}</button>
                <GrCaretNext className={`button-item ${!isDisable ? 'active' : 'inactive'}`}  onClick={next} />
            </div>
            <ModalSection1 isOpen={activeModal === 1} onClose={closeModal} header={currentCoordinate.name} />
            <ModalSection2 isOpen={activeModal === 2} onClose={closeModal} header={currentCoordinate.name} />
            <ModalSection3 isOpen={activeModal === 3} onClose={closeModal} header={currentCoordinate.name} />
            <ModalSection4 isOpen={activeModal === 4} onClose={closeModal} header={currentCoordinate.name} />
        </div>
    );
};

export default Pyramid;
