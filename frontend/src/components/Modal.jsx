export default function Modal({ aberto, titulo, children, onClose }) {
  if (!aberto) return null;

  return (
    <div className="modal-bg">
      <div className="modal">
        <div className="modal-header">
          <h2>{titulo}</h2>
          <button onClick={onClose}>×</button>
        </div>

        <div className="modal-body">
          {children}
        </div>
      </div>
    </div>
  );
}