import Modal from 'react-modal';

const ModalSection2 = ({ isOpen, onClose, header, isClosing }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Example Modal"
      className={`Modal__Content ${isClosing ? "closing" : "showing"}`}
      overlayClassName="Modal__Overlay" // Custom overlay class
      ariaHideApp={false} // This disables the aria-hidden on the app when the modal is open (optional)
    >
      <div className="Modal__Header" style={{ textAlign: "left" }}>{header}</div>
      {/* <button className="Modal__CloseButton" onClick={onClose}>×</button> */}

      {/* Render HTML content safely */}
      <div
        className="Modal__Body"
        style={{ lineHeight: "35px", textAlign: "left" }}
      >
        <h1 style={{ fontSize: "12px", fontStyle: "italic" }}>A blockchain solution platform is a comprehensive software or infrastructure that enables businesses and developers to build</h1>
        <div className="item">
          <p style={{ fontSize: "20px", fontWeight: "bolder" }}> ⦁	MULTI-SOURCE MINING</p>
          <p>KASPOOL will develop a digital asset mining system from various sources, leveraging the power of the community to optimize mining efforts.</p>
        </div>
        <div className="item">
          <p style={{ fontSize: "20px", fontWeight: "bolder" }}> ⦁	KASPOOL COIN</p>
          <p>KASPOOL will incorporate the best technical criteria from Kaspa</p>
        </div>
        <div className="item">
          <p style={{ fontSize: "20px", fontWeight: "bolder" }}> ⦁	STABLE AND FAIR INVESTMENT VALUES</p>
          <p>The main goal of Kaspool is to create an investment ecosystem that offers high returns while ensuring stability.</p>
        </div>
        <div className="item">
          <p style={{ fontSize: "20px", fontWeight: "bolder" }}> ⦁	SECURITY AND TRANSPARENCY</p>
          <p>Kaspool will implement strict security principles similar to Kaspa, utilizing PoW (Proof-of-Work) technology with the kHeavyHash algorithm</p>
        </div>
      </div>
    </Modal>
  );
};

export default ModalSection2;
