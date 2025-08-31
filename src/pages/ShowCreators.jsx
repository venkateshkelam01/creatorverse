import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../client";
import CreatorCard from "../components/CreatorCard";

function ShowCreators() {
  const [creators, setCreators] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCreators = async () => {
      const { data, error } = await supabase
        .from("creators")
        .select("*")
        .order("id", { ascending: false });

      if (error) {
        console.error("Error fetching creators:", error.message);
      } else {
        setCreators(data || []);
      }
      setLoading(false);
    };

    fetchCreators();
  }, []);

  if (loading) return <p className="empty">Loading creators...</p>;

  return (
    <div>
      <h1>Creatorverse</h1>
      <p className="subtitle">Discover amazing content creators</p>
      
      {creators.length === 0 ? (
        <p className="empty">No creators found. <Link to="/add">Add the first one!</Link></p>
      ) : (
        <div className="grid">
          {creators.map((creator) => (
            <CreatorCard key={creator.id} creator={creator} />
          ))}
        </div>
      )}
    </div>
  );
}

export default ShowCreators;
