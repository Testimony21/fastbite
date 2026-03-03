import React, { useState } from "react";
import axios from "axios";
import "./AddRestaurant.css";
import { toast } from "react-toastify";

export default function AddRestaurant() {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));

    const [formData, setFormData] = useState({
        name: "",
        description: "",
        address: "",
        location: "",
        phone: "",
        cuisine: "",
    });

    const [imagePreview, setImagePreview] = useState(null);
    const [imageFile, setImageFile] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImageFile(file);
        setImagePreview(URL.createObjectURL(file));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);

            const data = new FormData();
            Object.keys(formData).forEach((key) =>
                data.append(key, formData[key])
            );
            if (imageFile) data.append("image", imageFile);

            await axios.post("http://localhost:5000/api/restaurants", data, {
                headers: {
                    Authorization: `Bearer ${userInfo.token}`,
                },
            });

        toast.success("Restaurant added successfully 🎉");

            setFormData({
                name: "",
                description: "",
                address: "",
                location: "",
                phone: "",
                cuisine: "",
            });
            setImagePreview(null);
            setImageFile(null);
        } catch (err) {
            toast.error(err.response?.data?.message || "Error adding restaurant");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="add-restaurant-card">
            <h2>Add Your Restaurant</h2>
            <p className="subtitle">Fill the details below to list your restaurant on FastBite.</p>
            <form onSubmit={handleSubmit}>

                <div className="image-upload">
                    {imagePreview ? (
                        <img src={imagePreview} alt="preview" />
                    ) : (
                        <span>Upload Logo</span>
                    )}
                    <input type="file" accept="image/*" onChange={handleImageChange} />
                </div>

                <input type="text"
                    name="name"
                    placeholder="Restaurant Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />

                <textarea
                    name="description"
                    placeholder="Short description"
                    value={formData.description}
                    onChange={handleChange}
                />

                <input
                    type="text"
                    name="address"
                    placeholder="Street Address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                />

                <input
                    type="text"
                    name="location"
                    placeholder="City (e.g., Benin City)"
                    value={formData.location}
                    onChange={handleChange}
                    required
                />

                <input
                    type="text"
                    name="phone"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                />

                <input
                    type="text"
                    name="cuisine"
                    placeholder="Cuisine (e.g., Nigerian, Pizza, Chinese)"
                    value={formData.cuisine}
                    onChange={handleChange}
                    required
                />

                <button type="submit" disabled={loading}>
                    {loading ? "Adding..." : "Add Restaurant"}
                </button>
            </form>
        </div>
    );
}