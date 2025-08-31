import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "../client";
import ConfirmDialog from "../components/ConfirmDialog";

function EditCreator() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Ensure numeric match for bigint PKs and to avoid string/number mismatch
  const numericId = Number(id);

  const [creator, setCreator] = useState({
    name: "",
    url: "",
    description: "",
    imageURL: "",
  });

  const [openDelete, setOpenDelete] = useState(false);

  // Fetch existing creator details
  useEffect(() => {
    const fetchCreator = async () => {
      const { data, error } = await supabase
        .from("creators")
        .select("*")
        .eq("id", numericId)
        .maybeSingle(); // tolerant alternative to .single()

      if (error) {
        console.error("Error fetching creator:", error.message);
      } else if (!data) {
        console.warn("No single creator found for id:", numericId);
      } else {
        setCreator({
          name: data.name ?? "",
          url: data.url ?? "",
          description: data.description ?? "",
          imageURL: data.imageURL ?? "",
        });
      }
    };

    // Only attempt if numericId is a valid number
    if (!Number.isNaN(numericId)) {
      fetchCreator();
    }
  }, [numericId]);

  // Handle form input changes
  const handleChange = (e) => {
    setCreator((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    const { data, error } = await supabase
      .from("creators")
      .update({
        name: creator.name,
        url: creator.url,
        description: creator.description,
        imageURL: creator.imageURL || null, // store null when empty
      })
      .eq("id", numericId);

    if (error) {
      console.error("Error updating creator:", error.message);
    } else {
      console.log("✅ Creator updated:", data);
      navigate(`/creator/${numericId}`); // redirect back to details page
    }
  };

  const confirmDelete = async () => {
    const { error } = await supabase
      .from("creators")
      .delete()
      .eq("id", numericId);

    setOpenDelete(false);

    if (error) {
      console.error("Error deleting creator:", error.message);
    } else {
      navigate("/"); // go back to the list after delete
    }
  };

  return (
    <div>
      <h1>Edit Creator</h1>
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          maxWidth: "640px",
          gap: "10px",
        }}
      >
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={creator.name}
          onChange={handleChange}
          required
        />

        <input
          type="url"
          name="url"
          placeholder="URL"
          value={creator.url}
          onChange={handleChange}
          required
        />

        <textarea
          name="description"
          placeholder="Description"
          value={creator.description}
          onChange={handleChange}
          required
        ></textarea>

        <input
          type="url"
          name="imageURL"
          placeholder="Image URL"
          value={creator.imageURL}
          onChange={handleChange}
        />

        {/* Live preview if an image URL is present */}
        {creator.imageURL && (
          <img
            src={creator.imageURL}
            alt="preview"
            style={{
              width: "100%",
              maxWidth: 560,
              borderRadius: 16,
              margin: "8px 0 12px",
              border: "1px solid #202636",
            }}
          />
        )}

        <div className="row" style={{ justifyContent: "space-between" }}>
          <button
            type="button"
            className="btn danger"
            onClick={() => setOpenDelete(true)}
          >
            Delete
          </button>
          <button type="submit" className="btn">
            Save Changes
          </button>
        </div>
      </form>

      <ConfirmDialog
        open={openDelete}
        title="WAIT!!!!"
        message={`Are you sure you want to delete ${
          creator.name || "this creator"
        }???`}
        onCancel={() => setOpenDelete(false)}
        onConfirm={confirmDelete}
      />
    </div>
  );
}

export default EditCreator;
