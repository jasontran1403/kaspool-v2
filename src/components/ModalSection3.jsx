import Modal from 'react-modal';

const ModalSection3 = ({ isOpen, onClose, header, isClosing }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Example Modal"
      className={`Modal__Content Modal__Content__3 ${isClosing ? "closing" : "showing"}`}
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
        <h1 style={{ fontSize: "12px", fontStyle: "italic" }}>Kaspool utilizes the BlockDAG platform and references GhostDAG technology, which minimizes the waste of computational resources and creates parallel blocks.</h1>
        <div className="item">
          <p style={{ fontSize: "20px", fontWeight: "bolder" }}> ⦁	Mining Pool</p>
        </div>
        <div className="item">
          <p style={{ fontSize: "20px", fontWeight: "bolder" }}> ⦁	KasPool Wallet</p>
        </div>
        <div className="item">
          <p style={{ fontSize: "20px", fontWeight: "bolder" }}> ⦁	KasPoolChain</p>
        </div>
        <div className="item">
          <p style={{ fontSize: "20px", fontWeight: "bolder" }}> ⦁	KasExchange</p>
        </div>
        <div className="item">
          <p style={{ fontSize: "20px", fontWeight: "bolder" }}> ⦁	Decentralized Platform</p>
        </div>
      </div>
    </Modal>
  );
};

export default ModalSection3;
