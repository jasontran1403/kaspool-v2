import Modal from 'react-modal';

const ModalSection1 = ({ isOpen, onClose, header }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Example Modal"
      className="Modal__Content" // Custom modal content class
      overlayClassName="Modal__Overlay" // Custom overlay class
      ariaHideApp={false} // This disables the aria-hidden on the app when the modal is open (optional)
    >
      <div className="Modal__Header">{header}</div>
      <button className="Modal__CloseButton" onClick={onClose}>×</button>

      {/* Render HTML content safely */}
      <div
        className="Modal__Body"
        style={{ lineHeight: "35px" }}
      >
        <h1 style={{ fontSize: "24px", fontWeight: "bolder" }}>The Importance of Crypto</h1>
        <div className="item">
          <p style={{ fontSize: "20px", fontWeight: "bolder" }}> ⦁	Confidentiality</p>
          <p>Market Capitalization: Crypto reached $1.17 trillion (2023), with Bitcoin and Ethereum leading the way.</p>
        </div>
        <div className="item">
          <p style={{ fontSize: "20px", fontWeight: "bolder" }}> ⦁	Security</p>
          <p>Trading Volume: Binance processes over $76 billion per day.</p>
        </div>
        <div className="item">
          <p style={{ fontSize: "20px", fontWeight: "bolder" }}> ⦁	Automation</p>
          <p>Users: 420 million people own crypto, with an increasing number of countries legalizing it.</p>
        </div>
        <div className="item">
          <p style={{ fontSize: "20px", fontWeight: "bolder" }}> ⦁	Compliance with regulations</p>
          <p>Blockchain Applications: Over 80% of major banks are investing in this technology.</p>
        </div>
      </div>
    </Modal>
  );
};

export default ModalSection1;
