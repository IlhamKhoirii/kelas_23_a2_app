import React, { useState, useEffect } from "react";
import { Container, Table, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import NavbarAdmin from "../../components/NavbarAdmin/NavbarAdmin";
import axios from "axios";
import "./AdminSalesReport.css";

const AdminSalesReport = () => {
    const navigate = useNavigate();
    const [salesData, setSalesData] = useState([]);
    const [todaySales, setTodaySales] = useState(0);
    const [itemsSoldToday, setItemsSoldToday] = useState(0);
    const [filterMonth, setFilterMonth] = useState(new Date().getMonth() + 1);
    const [filterYear, setFilterYear] = useState(new Date().getFullYear());

    useEffect(() => {
        const fetchSalesData = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/detailpesanan");
                setSalesData(response.data);
            } catch (error) {
                console.error("Error fetching sales data:", error);
            }
        };

        fetchSalesData();
    }, []);

    useEffect(() => {
        const today = new Date().toISOString().split("T")[0];
        const todaySalesData = salesData.filter(sale => sale.pesanan.dibuat_pada.split("T")[0] === today);
        setTodaySales(todaySalesData.length);
        setItemsSoldToday(todaySalesData.reduce((acc, sale) => acc + sale.kuantitas, 0));
    }, [salesData]);

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        if (name === "month") setFilterMonth(value);
        if (name === "year") setFilterYear(value);
    };

    const handleLogout = () => {
        localStorage.removeItem("authToken");
        navigate("/login");
    };

    return (
        <>
            <NavbarAdmin handleLogout={handleLogout} />

            <Container className="admin-sales-report mt-4">
                <h2>Laporan Penjualan</h2>
                <p>Hari ini: <strong>{new Date().toLocaleDateString()}</strong></p>

                <div className="sales-summary">
                    <div className="summary-item">
                        <h4>Jumlah Pengguna Membeli Hari ini:</h4>
                        <p>{todaySales} pengguna</p>
                    </div>
                    <div className="summary-item">
                        <h4>Jumlah Barang Terjual Hari ini:</h4>
                        <p>{itemsSoldToday} barang</p>
                    </div>
                </div>

                <Form className="filter-form mb-4">
                    <Form.Group controlId="filterMonth">
                        <Form.Label>Bulan</Form.Label>
                        <Form.Control
                            as="select"
                            name="month"
                            value={filterMonth}
                            onChange={handleFilterChange}
                        >
                            {[...Array(12).keys()].map(month => (
                                <option key={month + 1} value={month + 1}>
                                    {new Date(0, month).toLocaleString("default", { month: "long" })}
                                </option>
                            ))}
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId="filterYear" className="ml-3">
                        <Form.Label>Tahun</Form.Label>
                        <Form.Control
                            type="number"
                            name="year"
                            value={filterYear}
                            onChange={handleFilterChange}
                            min="2020"
                            max={new Date().getFullYear()}
                        />
                    </Form.Group>

                    <Button variant="primary" className="ml-3" onClick={() => console.log("Filter applied")}>
                        Tampilkan
                    </Button>
                </Form>

                <Table striped bordered hover responsive>
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Username Pelanggan</th>
                            <th>No. Kode Barang</th>
                            <th>Tanggal</th>
                            <th>Waktu</th>
                            <th>Harga Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {salesData.map((sale, index) => (
                            <tr key={sale.id_detail_pesanan}>
                                <td>{index + 1}</td>
                                <td>{sale.pesanan.user.nama_user}</td>
                                <td>{sale.produk.kode_produk}</td>
                                <td>{new Date(sale.pesanan.dibuat_pada).toLocaleDateString()}</td>
                                <td>{new Date(sale.pesanan.dibuat_pada).toLocaleTimeString()}</td>
                                <td>Rp {sale.kuantitas * sale.produk.harga.toLocaleString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Container>
        </>
    );
};

export default AdminSalesReport;