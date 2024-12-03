const products = {
    sembako: {
        imageUrl: "images/sembako.jpg", // Gambar kategori sembako
        items: [
            { id: 11, name: "Beras Raja Lele", price: 50000, sold: 120, stock: 50, imageUrl: "images/beras.jpg" },
            { id: 12, name: "Minyak Goreng", price: 20000, sold: 80, stock: 30, imageUrl: "https://via.placeholder.com/150" },
            { id: 13, name: "Minyak Zaitun", price: 100000, sold: 80, stock: 30, imageUrl: "https://via.placeholder.com/150" },
            { id: 14, name: "Gula Djawa", price: 100000, sold: 80, stock: 30, imageUrl: "https://via.placeholder.com/150" },
        ],
    },
    obat: {
        imageUrl: "images/obat.jpg", // Gambar kategori obat
        items: [
            { id: 21, name: "Paracetamol", price: 15000, sold: 60, stock: 100, imageUrl: "images/paracetamol.jpg" },
        ],
    },
    alat_tulis: {
        imageUrl: "images/alat_tulis.jpg", // Gambar kategori alat tulis
        items: [
            { id: 31, name: "Pensil Faber-Castell 2B", price: 5000, sold: 200, stock: 300, imageUrl: "images/fc_2b.jpg" },
        ],
    },
    minuman: {
        imageUrl: "images/minuman.jpg", // Gambar kategori minuman
        items: [
            { id: 41, name: "Le Minerale", price: 3000, sold: 100, stock: 200, imageUrl: "images/le_minerale.jpg" },
        ],
    },
    alat_mandi: {
        imageUrl: "images/alat_mandi.jpg", // Gambar kategori alat mandi
        items: [
            { id: 51, name: "Sabun Mandi Nuvo", price: 7000, sold: 150, stock: 80, imageUrl: "images/sabun_mandi.jpg" },
        ],
    },
    snacks: {
        imageUrl: "images/snacks.jpg", // Gambar kategori snacks
        items: [
            { id: 61, name: "Keripik Kentang Lays", price: 10000, sold: 90, stock: 40, imageUrl: "images/lays_keripik.jpg" },
        ],
    },
};

export default products;
