import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../client";

export default function AddCreator() {
  const navigate = useNavigate();
  const [creator, setCreator] = useState({
    name: "", url: "", description: "", imageURL: ""
  });

  const handleChange = (e) =>
    setCreator((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      name: creator.name,
      url: creator.url,
      description: creator.description,
      imageURL: creator.imageURL || null,
    };
    const { data, error } = await supabase.from("creators").insert([payload]).select();
    if (error) return console.error("Error adding creator:", error.message);
    navigate(`/creator/${data?.[0]?.id ?? "/"}`);
  };

  return (
    <div>
      <h1>Add a New Creator</h1>
      <p className="subtitle">Provide a name, a link, and optionally an image.</p>

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", maxWidth: 640, gap: 10 }}>
        <input name="name" placeholder="Name" value={creator.name} onChange={handleChange} required />
        <input type="url" name="url" placeholder="Primary URL (YouTube, website, etc.)" value={creator.url} onChange={handleChange} required />
        <textarea name="description" placeholder="Description" value={creator.description} onChange={handleChange} required />
        <input type="url" name="imageURL" placeholder="Image URL (optional)" value={creator.imageURL} onChange={handleChange} />

        {creator.imageURL && (
          <img src={creator.imageURL} alt="preview" style={{ width:"100%", maxWidth:560, borderRadius:16, margin:"8px 0 12px", border:"1px solid #202636" }} />
        )}

        <div className="row" style={{ justifyContent: "flex-end" }}>
          <button className="btn" type="submit">Add Creator</button>
        </div>
      </form>
    </div>
  );
}
