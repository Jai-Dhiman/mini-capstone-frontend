import "./App.css";

export function Modal({ children, show, onClose }) {
  if (show) {
    return (
      <div className="modal-background">
        <section className="modal-main">
          {children}
          <button className="close" type="button" onClick={onClose}>
            &times;
          </button>
        </section>
      </div>
    );
  }
}
