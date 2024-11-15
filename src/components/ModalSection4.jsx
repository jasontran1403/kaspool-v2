import Modal from 'react-modal';

const ModalSection4 = ({ isOpen, onClose, header }) => {
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
        <h1 style={{ fontSize: "24px", fontWeight: "bolder" }}>Development team</h1>
        <div className="item">
          <p style={{ fontSize: "14px", fontStyle: "italic" }}>In our digital world, trust, security, and efficiency are vital. Enter blockchain technology, the game-changer.</p>
        </div>
      </div>
    </Modal>
  );
};

export default ModalSection4;
