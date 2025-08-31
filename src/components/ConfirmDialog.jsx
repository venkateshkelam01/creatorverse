import { useEffect } from "react";

export default function ConfirmDialog({
  open,
  title = "Wait!!!!",
  message,
  cancelText = "Nah, never mind",
  confirmText = "Yes! Totally sure",
  onCancel,
  onConfirm,
}) {
  useEffect(() => {
    const onKey = (e) => { if (!open) return; if (e.key === "Escape") onCancel?.(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onCancel]);

  if (!open) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal-card">
        <div className="modal-title">⚠️ {title} ⚠️</div>
        <p className="modal-message">{message}</p>
        <div className="row" style={{ justifyContent: "center" }}>
          <button className="btn ghost" onClick={onCancel}>{cancelText}</button>
          <button className="btn danger" onClick={onConfirm}>{confirmText}</button>
        </div>
      </div>
    </div>
  );
}
