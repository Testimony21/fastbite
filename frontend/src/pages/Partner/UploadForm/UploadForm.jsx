import { useState } from "react";
import axios from "axios";

export default function UploadForm() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    try {
      const token = localStorage.getItem("token"); // your JWT
      const res = await axios.post("http://localhost:5000/api/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`, // send JWT
        },
      });

      setMessage("Upload successful! URL: " + res.data.url);
    } catch (err) {
      setMessage("Upload failed: " + err.response?.data?.error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded">
      <input
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
        className="submit-button"
      />
      <button type="submit" className="bg-blue-500 text-white px-3 py-1 rounded">
        Upload
      </button>
      <p>{message}</p>
    </form>
  );
}
