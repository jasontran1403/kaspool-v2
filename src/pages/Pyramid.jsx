import { Stats, OrbitControls, Environment } from '@react-three/drei';
import { Canvas, useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader';
import beeModel from "../assets/model/pyramid_glas_gray.glb"; // 3D model
import IMAGE from "../assets/model/night-9.jpg";
import TrustWalletConnect from "../components/TrustWalletConnect"; // Connect Wallet component
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from 'react';

const cor = [
    {
        x: 1,
        y: 2,
        z: 3
    },
    {
        x: 2,
        y: 3,
        z: 4
    },
    {
        x: 4,
        y: 5,
        z: 6
    }
]

const Pyramid = () => {
    const gltf = useLoader(GLTFLoader, beeModel);
    let count = 1;
    const [corCount, setCorCount] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            notify();
        }, 3000);

        toast.dismiss();
        return () => clearInterval(interval); // Clean up on component unmount
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
            closeButton: false // This will remove the close button
        })
    };

    const next = () => {
        console.log(cor[corCount]);
        setCorCount(corCount+1);
    };

    const prev = () => {
        console.log(cor[corCount]);
        setCorCount(corCount-1);
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
                <Environment
                    files={IMAGE}
                    background
                    backgroundBlurriness={0.07}
                />
                <directionalLight position={[3.3, 1.0, 4.4]} intensity={9000} />
                <primitive object={gltf.scene} position={[0, 10, 0]} />
                <OrbitControls target={[0, 1, 0]} autoRotate />
                {/* <Stats /> */}
            </Canvas>
            <div className="button">
                <button onClick={() => prev()}> Prev </button>
                <button onClick={() => next()}> Next </button>
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

    )
}

export default Pyramid;