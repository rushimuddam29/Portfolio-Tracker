import React, { useState } from "react";
import axios from "axios";

const StockForm = ({ onReload }) => {
    const [stockData, setStockData] = useState({
        name: "",
        ticker: "",
        quantity: "",
        buyPrice: "",
    });

    const [editMode, setEditMode] = useState(false);
    const [editId, setEditId] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setStockData({ ...stockData, [name]: value });
    };

    const API_URL = import.meta.env.VITE_API_URL_PROD;

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editMode) {
                await axios.put(API_URL + `/api/stocks/${editId}`, stockData);
            } else {
                await axios.post(API_URL + "/api/stocks", stockData);
            }
            setStockData({ name: "", ticker: "", quantity: "", buyPrice: "" });
            setEditMode(false);
            setEditId(null);
            onReload();
        } catch (err) {
            console.error(err.message);
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="bg-white p-4 rounded shadow-md mb-6"
        >
            <h2 className="text-xl font-semibold mb-4">
                {editMode ? "Edit Stock" : "Add Stock"}
            </h2>
            <div className="grid grid-cols-2 gap-4">
                <input
                    type="text"
                    name="name"
                    value={stockData.name}
                    onChange={handleChange}
                    placeholder="Stock Name"
                    className="p-2 border rounded"
                    required
                />
                <input
                    type="text"
                    name="ticker"
                    value={stockData.ticker}
                    onChange={handleChange}
                    placeholder="Ticker Symbol"
                    className="p-2 border rounded"
                    required
                />
                <input
                    type="number"
                    name="quantity"
                    value={stockData.quantity}
                    onChange={handleChange}
                    placeholder="Quantity"
                    className="p-2 border rounded"
                    required
                />
                <input
                    type="number"
                    step="0.01"
                    name="buyPrice"
                    value={stockData.buyPrice}
                    onChange={handleChange}
                    placeholder="Buy Price"
                    className="p-2 border rounded"
                    required
                />
            </div>
            <button
                type="submit"
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
                {editMode ? "Update Stock" : "Add Stock"}
            </button>
        </form>
    );
};

export default StockForm;
