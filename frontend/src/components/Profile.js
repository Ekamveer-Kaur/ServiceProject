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
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-5">
            <div className="bg-white shadow-lg rounded-lg p-6 w-80 text-center">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Profile Picture</h2>
                <img src={picurl} alt="Profile" className="rounded-full mx-auto border border-gray-300 shadow-md" style={{ width: "100px", height: "100px" }} />
                <br />
                <input type="file" onChange={handlePicture} className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-500 file:text-white hover:file:bg-blue-600 cursor-pointer" />
                <button onClick={handleUpload} className={`mt-4 w-full text-white font-semibold py-2 rounded-lg shadow-md transition-all duration-200 ${isUploading ? "bg-gray-500 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"}`} disabled={isUploading}>
                    {isUploading ? "Uploading..." : "Upload Picture"}
                </button>
            </div>
        </div>
    );
};

export default Profile;
