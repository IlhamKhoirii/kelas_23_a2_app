import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [namaPengguna, setNamaPengguna] = useState("");
    const [emailPengguna, setEmailPengguna] = useState("");
    const [alamat, setAlamat] = useState("");
    const [noTelp, setNoTelp] = useState("");
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const user = JSON.parse(localStorage.getItem("user"));
                if (user && user.id_user) {
                    const response = await axios.get(`http://localhost:5000/api/users/${user.id_user}`);
                    const userData = response.data;
                    setUserId(userData.id_user);
                    setNamaPengguna(userData.nama_user);
                    setEmailPengguna(userData.email);
                    setNoTelp(userData.no_telp);
                    // Fetch alamat data
                    const alamatResponse = await axios.get(`http://localhost:5000/api/alamatpelanggan/${user.id_user}`);
                    const alamatData = alamatResponse.data;
                    setAlamat(alamatData.alamat);
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        fetchUserData();
    }, []);

    const updateNamaPengguna = (newNamaPengguna) => {
        setNamaPengguna(newNamaPengguna);
    };

    const updateEmailPengguna = (newEmailPengguna) => {
        setEmailPengguna(newEmailPengguna);
    };

    const updateAlamat = (newAlamat) => {
        setAlamat(newAlamat);
    };

    const updateNoTelp = (newNoTelp) => {
        setNoTelp(newNoTelp);
    };

    return (
        <UserContext.Provider value={{
            namaPengguna,
            emailPengguna,
            alamat,
            noTelp,
            userId,
            updateNamaPengguna,
            updateEmailPengguna,
            updateAlamat,
            updateNoTelp
        }}>
            {children}
        </UserContext.Provider>
    );
};