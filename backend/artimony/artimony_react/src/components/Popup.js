const Popup = ({ children, className, closable, onClose = () => {} }) => {
  className = "popup " + className;
  return (
    <div className={className}>
      {closable && (
        <button className="text-white close-button" onClick={onClose}>
          <i className="fa-solid fa-xmark"></i>
        </button>
      )}
      <div className="popup-content">{children}</div>
    </div>
  );
};

export default Popup;
