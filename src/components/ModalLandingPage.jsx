import Modal from 'react-modal';

const ModalLandingPage = ({ isOpen, onClose, header, content }) => {
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
        <div>{content}</div>
      </Modal>
    );
  }
  
  export default ModalLandingPage;