import React, { createContext, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [profilePicture, setProfilePicture] = useState(null);
    const [namaPengguna, setNamaPengguna] = useState("Evelyn"); // Initial value for the username

    const updateProfilePicture = (newProfilePicture) => {
        setProfilePicture(newProfilePicture);
    };

    const updateNamaPengguna = (newNamaPengguna) => {
        setNamaPengguna(newNamaPengguna);
    };

    return (
        <UserContext.Provider value={{ profilePicture, namaPengguna, updateProfilePicture, updateNamaPengguna }}>
            {children}
        </UserContext.Provider>
    );
};
