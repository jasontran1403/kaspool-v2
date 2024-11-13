import { Stats, OrbitControls, Environment } from '@react-three/drei';
import { Canvas, useLoader, useFrame } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { AnimationMixer } from 'three';
import beeModel from "../assets/model/pyramid_glass_animation.glb";
import IMAGE from "../assets/model/night-9.jpg";
import TrustWalletConnect from "../components/TrustWalletConnect";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState, useRef } from 'react';

const cor = [
    { x: 1, y: 2, z: 3 },
    { x: 2, y: 3, z: 4 },
    { x: 4, y: 5, z: 6 }
];

// Separate Model component for Canvas context
const Model = () => {
    const gltf = useLoader(GLTFLoader, beeModel);
    const mixer = useRef(null);

    useEffect(() => {
        if (gltf.animations && gltf.animations.length > 0) {
            mixer.current = new AnimationMixer(gltf.scene);
            const action1 = mixer.current.clipAction(gltf.animations[0]);
            const action2 = mixer.current.clipAction(gltf.animations[1]);
            const action3 = mixer.current.clipAction(gltf.animations[2]);

            action1.play();
            action2.play();
            action3.play();
        }
    }, [gltf]);

    useFrame((state, delta) => {
        mixer.current?.update(delta);
    });

    return <primitive object={gltf.scene} position={[0, 10, 0]} />;
};

const Pyramid = () => {
    const [corCount, setCorCount] = useState(0);
    let count = 1;

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
        console.log(cor[corCount]);
        setCorCount((prev) => (prev + 1) % cor.length);
    };

    const prev = () => {
        console.log(cor[corCount]);
        setCorCount((prev) => (prev - 1 + cor.length) % cor.length);
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

            <Canvas camera={{ position: [20, 35, 35] }}>
                <Environment files={IMAGE} background backgroundBlurriness={0.07} />
                <directionalLight position={[3.3, 1.0, 4.4]} intensity={9000} />
                <Model />
                <OrbitControls target={[0, 1, 0]} autoRotate />
                {/* <Stats /> */}
            </Canvas>
            
            <div className="button">
                <button onClick={prev}> Prev </button>
                <button onClick={next}> Next </button>
            </div>
            
            <div className="hashrate-container">
                <ToastContainer
                    position="bottom-center"
                    limit={1}
                    autoClose={false}
                    newestOnTop={true}
                    draggable={false}
                    theme="light"
                />
            </div>
        </div>
    );
};

export default Pyramid;
