import React, { useEffect, useState } from "react";

const Profile = () => {
    const [pic, setPic] = useState(null);
    const [picurl, setPicUrl] = useState(localStorage.getItem("profile") || "https://cdn-icons-png.flaticon.com/512/3135/3135715.png");
    const [isUploading, setIsUploading] = useState(false);

    const email = localStorage.getItem("email");

    useEffect(() => {
        if (email) {
            getProfilePic();
        }
    }, [email]);  // ✅ Email dependency add ki

    const getProfilePic = async () => {
        try {
            const response = await fetch("http://localhost:5000/api/get-profile", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });

            if (response.ok) {
                const data = await response.json();
                setPicUrl(data.profilePic || "https://cdn-icons-png.flaticon.com/512/3135/3135715.png");
            } else {
                console.error("Failed to fetch profile from backend");
            }
        } catch (error) {
            console.error("Error fetching profile:", error);
        }
    };

    const handlePicture = (e) => setPic(e.target.files[0]);

    const handleUpload = async () => {
        if (!pic) {
            alert("⚠️ Please select an image first!");
            return;
        }
        if (isUploading) return;

        setIsUploading(true);

        const data = new FormData();
        data.append("file", pic);
        data.append("upload_preset", "shopping");
        data.append("cloud_name", "dbuk7btza");

        try {
            const response = await fetch("https://api.cloudinary.com/v1_1/dbuk7btza/image/upload", {
                method: "POST",
                body: data,
            });

            const result = await response.json();
            if (result.url) {
                localStorage.setItem("profile", result.url);
                setPicUrl(result.url);
                await updateProfileInBackend(result.url);
                getProfilePic(); // ✅ Image upload hone ke baad update karega
            } else {
                alert("Failed to upload image");
            }
        } catch (error) {
            console.error("Error uploading image:", error);
        } finally {
            setIsUploading(false);
        }
    };

    const updateProfileInBackend = async (profileUrl) => {
        try {
            const response = await fetch("http://localhost:5000/api/upload-profile", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, profilePic: profileUrl }),
            });

            if (response.ok) {
                alert("✅ Profile updated successfully!");
            } else {
                alert("Failed to update profile in backend");
            }
        } catch (error) {
            console.error("Error updating profile in backend:", error);
        }
    };

    
        return (
            <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light p-5">
                <div className="card shadow-sm p-4 rounded w-100 w-sm-75 w-md-50 w-lg-40">
                    <h2 className="text-center text-primary mb-4">Profile Picture</h2>
                    <div className="d-flex justify-content-center mb-4">
                        <img 
                            src={picurl} 
                            alt="Profile" 
                            className="rounded-circle border border-secondary shadow-sm" 
                            style={{ width: "120px", height: "120px" }} 
                        />
                    </div>
                    <input 
                        type="file" 
                        onChange={handlePicture} 
                        className="form-control mb-3"
                    />
                    <button 
                        onClick={handleUpload} 
                        className={`btn btn-primary w-100 ${isUploading ? "disabled" : ""}`} 
                        disabled={isUploading}
                    >
                        {isUploading ? "Uploading..." : "Upload Picture"}
                    </button>
                </div>
            </div>
        );
    };
    

export default Profile;
