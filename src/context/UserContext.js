// src/context/UserContext.js
import React, { createContext, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [profilePicture, setProfilePicture] = useState(localStorage.getItem("profilePicture") || null);

    const updateProfilePicture = (newPictureUrl) => {
        setProfilePicture(newPictureUrl);
        localStorage.setItem("profilePicture", newPictureUrl); // Save to local storage for persistence
    };

    return (
        <UserContext.Provider value={{ profilePicture, updateProfilePicture }}>
            {children}
        </UserContext.Provider>
    );
};
