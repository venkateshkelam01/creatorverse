import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "../client";

function ViewCreator() {
  const { id } = useParams();
  const numericId = Number(id);
  const [creator, setCreator] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // guard against invalid id
    if (Number.isNaN(numericId)) {
      console.error("Invalid creator id:", id);
      setLoading(false);
      return;
    }

    const fetchCreator = async () => {
      const { data, error } = await supabase
        .from("creators")
        .select("*")
        .eq("id", numericId)
        .maybeSingle(); 

      if (error) {
        console.error("Error fetching creator:", error.message);
      } else if (!data) {
        console.warn("No single creator found for id:", numericId);
      }
      setCreator(data || null);
      setLoading(false);
    };

    fetchCreator();
  }, [numericId, id]);

  if (loading) return <p className="empty">Loading creator…</p>;
  if (!creator) return <p className="empty">Creator not found.</p>;

  return (
    <div>
      <h1>{creator.name}</h1>
      <p className="subtitle">{creator.description}</p>

      {creator.imageURL && (
        <img
          src={creator.imageURL}
          alt={creator.name}
          style={{
            width: "100%",
            maxWidth: 680,
            borderRadius: 16,
            border: "1px solid #202636",
            marginBottom: 16,
          }}
        />
      )}

      <div className="row">
        {creator.url && (
          <a
            className="btn"
            href={creator.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            Visit
          </a>
        )}
        <Link className="link" to={`/edit/${creator.id}`}>
          ✏️ Edit
        </Link>
        <Link className="link" to="/">
          ← Back
        </Link>
      </div>
    </div>
  );
}

export default ViewCreator;
