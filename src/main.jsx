import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import Modal from "react-modal";
import Axios from "axios";
import { BrowserRouter, useLocation } from "react-router-dom";
import Router from "./routes";
import { API_ENDPOINT } from "./constants";
import "./index.css";
import { ThirdwebProvider } from "thirdweb/react";
import { ToastContainer, toast } from 'react-toastify';


function App() {
  const [isConnected, setIsConnected] = useState(
    !!localStorage.getItem("walletAddress")
  ); // Kiểm tra trạng thái kết nối ví
  const [lastStatus, setLastStatus] = useState();
  const isAdmin = window.location.href.includes("/admin"); // Kiểm tra URL có chứa '/admin' không
  const id = location.pathname.split("/admin/dashboard/")[1]; // Lấy ID từ URL

  const locationRef = useLocation();

  // Extract the full path after "/"
  const fullPath = locationRef.pathname.slice(1); // Remove leading "/"

  // Check if the path matches "refcode=<actual-code>"
  const refcodeMatch = fullPath.match(/^refcode=(.+)$/);
  const refcode = refcodeMatch ? refcodeMatch[1] : null;

  useEffect(() => {
    if (isAdmin && id) {
      // Xử lý cho Admin
      const data = JSON.stringify({
        walletAddress: id,
      });

      const config = {
        method: "post",
        url: `${API_ENDPOINT}auth/admin-jwt`,
        headers: {
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "69420",
        },
        data,
      };

      Axios.request(config).then((response) => {
        localStorage.setItem("walletAddress", response.data.wallet_address);
        localStorage.setItem("access_token", response.data.access_token);
        localStorage.setItem("is_in_tree", response.data.is_in_tree);
        localStorage.setItem("is_lock", response.data.is_lock);
        localStorage.setItem("bep20", response.data.bep20);
      });
    } else if (isConnected) {
      // Xử lý cho người dùng đã kết nối ví
      const data = JSON.stringify({
        walletAddress: localStorage.getItem("walletAddress"),
        publicKey: localStorage.getItem("walletAddress"),
        walletStateInit: localStorage.getItem("walletAddress"),
      });

      const config = {
        method: "post",
        url: `${API_ENDPOINT}auth/authenticate`,
        headers: {
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "69420",
        },
        data,
      };

      Axios.request(config).then((response) => {
        localStorage.setItem("access_token", response.data.access_token);
        localStorage.setItem("is_in_tree", response.data.is_in_tree);
        localStorage.setItem("is_lock", response.data.is_lock);
        localStorage.setItem("bep20", response.data.bep20);
      });
    } else {
      // Xử lý khi người dùng ngắt kết nối ví
      localStorage.removeItem("walletAddress");
      localStorage.removeItem("publicKey");
      localStorage.removeItem("walletStateInit");
      localStorage.removeItem("is_in_tree");
      localStorage.removeItem("is_lock");
      localStorage.removeItem("access_token");
      localStorage.removeItem("bep20");

      const config = {
        method: "get",
        url: `${API_ENDPOINT}auth/logout/${localStorage.getItem(
          "access_token"
        )}`,
        headers: {
          "ngrok-skip-browser-warning": "69420",
        },
      };

      Axios.request(config).then((response) => {
        if (response.data && lastStatus) {
          setLastStatus(false);
          window.location.href = "/";
        }
      });
    }
  }, [isConnected, isAdmin, id, lastStatus]);

  return <Router />;
}

Modal.setAppElement("#root"); // Thiết lập Modal

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <ThirdwebProvider>
      <App />
      <ToastContainer
        limit={1}
        newestOnTop={true}
        draggable={false}
        theme="light"
      />
    </ThirdwebProvider>
  </BrowserRouter>
);
