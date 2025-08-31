import { Link, useNavigate } from "react-router-dom";
import { TrashIcon, EditIcon, InfoIcon, ExternalIcon } from "./Icons";
import { supabase } from "../client";
import { useState, useCallback } from "react";
import ConfirmDialog from "./ConfirmDialog";

export default function CreatorCard({ creator }) {
  const navigate = useNavigate();
  const [confirmOpen, setConfirmOpen] = useState(false);

  const handleCardClick = useCallback(() => {
    // Navigate to details when clicking anywhere on the card (except interactive elements)
    navigate(`/creator/${creator.id}`);
  }, [creator.id, navigate]);

  const handleCardKeyDown = (e) => {
    // Keyboard accessibility: Enter/Space activate the card nav
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleCardClick();
    }
  };

  const stop = (e) => {
    // Prevent bubbling to the card click handler from inner interactive elements
    e.stopPropagation();
  };

  const handleDelete = async () => {
    const { error } = await supabase
      .from("creators")
      .delete()
      .eq("id", Number(creator.id));
    setConfirmOpen(false);
    if (error) return console.error("Delete error:", error.message);
    navigate(0); // refresh list
  };

  return (
    <div
      className="card creator-card"
      role="button"
      tabIndex={0}
      onClick={handleCardClick}
      onKeyDown={handleCardKeyDown}
      aria-label={`Open details for ${creator.name}`}
      style={{ 
        cursor: "pointer",
        position: "relative",
        overflow: "hidden",
        minHeight: "280px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between"
      }}
    >
      {/* Background Image */}
      {creator.imageURL && (
        <div 
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: `url(${creator.imageURL})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            zIndex: 1
          }}
        />
      )}
      
      {/* Fallback background gradient when no image */}
      {!creator.imageURL && (
        <div 
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            zIndex: 1
          }}
        />
      )}

      {/* Overlay for better text readability */}
      <div 
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.7) 100%)",
          zIndex: 2
        }}
      />

      {/* Action icons (top-right) */}
      <div 
        className="card-actions" 
        onClick={stop} 
        onKeyDown={stop}
        style={{ zIndex: 4, position: "relative" }}
      >
        <Link
          to={`/creator/${creator.id}`}
          className="chip"
          title="Details"
          aria-label={`View ${creator.name} details`}
        >
          <InfoIcon />
        </Link>
        <Link
          to={`/edit/${creator.id}`}
          className="chip"
          title="Edit"
          aria-label={`Edit ${creator.name}`}
        >
          <EditIcon />
        </Link>
        <button
          className="chip"
          title="Delete"
          aria-label={`Delete ${creator.name}`}
          onClick={() => setConfirmOpen(true)}
        >
          <TrashIcon />
        </button>
      </div>

      {/* Content - positioned at bottom */}
      <div style={{ zIndex: 3, position: "relative", padding: "18px" }}>
        <h2 className="creator-title" style={{ color: "#fff", textShadow: "0 2px 4px rgba(0,0,0,0.8)" }}>
          {creator.name}
        </h2>
        <p className="creator-desc" style={{ color: "rgba(255,255,255,0.9)", textShadow: "0 1px 2px rgba(0,0,0,0.8)" }}>
          {creator.description}
        </p>

        {/* Bottom row: Visit + View/Edit links */}
        <div className="spread" style={{ marginTop: "12px" }}>
          {creator.url ? (
            <a
              className="link"
              href={creator.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={stop}
              onKeyDown={stop}
              aria-label={`Visit ${creator.name}'s link`}
              style={{ 
                background: "rgba(255,255,255,0.2)", 
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255,255,255,0.3)",
                color: "#fff"
              }}
            >
              <ExternalIcon /> Visit
            </a>
          ) : (
            <span />
          )}

          <div className="row" onClick={stop} onKeyDown={stop}>
            <Link 
              className="link" 
              to={`/creator/${creator.id}`}
              style={{ 
                background: "rgba(255,255,255,0.2)", 
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255,255,255,0.3)",
                color: "#fff"
              }}
            >
              View
            </Link>
            <Link 
              className="link" 
              to={`/edit/${creator.id}`}
              style={{ 
                background: "rgba(255,255,255,0.2)", 
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255,255,255,0.3)",
                color: "#fff"
              }}
            >
              Edit
            </Link>
          </div>
        </div>
      </div>

      <ConfirmDialog
        open={confirmOpen}
        title="WAIT!!!!"
        message={`Are you sure you want to delete ${creator.name}???`}
        onCancel={() => setConfirmOpen(false)}
        onConfirm={handleDelete}
      />
    </div>
  );
}
