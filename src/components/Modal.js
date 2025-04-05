export default function Modal ({ isOpen, onClose, title, message }) {

  if (!isOpen) return null; 


  const handleClick = () => {
    onClose(); 
  };

  return (
    <div className="modal-container">
      <div className="modal">
        <h2>{title}</h2>
        <p>{message}</p>
        <button className="button-modal" onClick={handleClick}>OK</button>
      </div>
    </div>
  );
};

