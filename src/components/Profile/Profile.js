import React from "react";
import "./Profile.css";

const Profile = () => {
    const user = {
        name: "Evelyn",
        email: "john.doe@example.com",
        bio: "Web developer with a passion for creating intuitive user interfaces.",
        profilePicture: "https://via.placeholder.com/150"
    };

    return (
        <div className="profile-container">
            <div className="profile-header">
                <img src={user.profilePicture} alt="Profile" className="profile-picture" />
                <h2>{user.name}</h2>
                <p className="profile-email">{user.email}</p>
            </div>
            <div className="profile-bio">
                <h3>About Me</h3>
                <p>{user.bio}</p>
            </div>
            <button className="edit-profile-btn">Edit Profile</button>
        </div>
    );
};

export default Profile;
