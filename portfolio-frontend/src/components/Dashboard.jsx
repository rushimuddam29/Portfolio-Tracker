import React, { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = ({ reload }) => {
    const [stocks, setStocks] = useState([]);
    const [totalValue, setTotalValue] = useState(0);
    const [loading, setLoading] = useState(true);
    const API_URL = import.meta.env.VITE_API_URL_PROD;
    useEffect(() => {
        axios
            .get(API_URL + "/api/stocks")
            .then((res) => {
                setStocks(res.data.stocks || []);
                setTotalValue(res.data.totalValue || 0);
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setLoading(false);
            });
    }, [reload]);

    const totalPortfolioValue = (totalValue || 0).toFixed(2);

    const handleDelete = async (id) => {
        try {
            await axios.delete(API_URL + `/api/stocks/${id}`);
            setStocks(stocks.filter((stock) => stock._id !== id));
        } catch (err) {
            console.error(err.message);
        }
    };

    // If the data is loading, show a loading message or spinner
    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="p-4 bg-white rounded shadow-md">
            <h2 className="text-xl font-semibold mb-4">Portfolio Dashboard</h2>
            <p className="mb-4">Total Portfolio Value: ${totalPortfolioValue}</p>
            {stocks.length === 0 ? (
                <p>No stocks in your portfolio</p>  // If no stocks, display this message
            ) : (
                <ul className="space-y-2">
                    {stocks.map((stock) => (
                        <li
                            key={stock._id}
                            className="p-2 bg-gray-100 rounded flex justify-between items-center"
                        >
                            <div>
                                <strong>{stock.name}</strong> ({stock.ticker}) - Quantity:{" "}
                                {stock.quantity}, Buy Price: ${stock.buyPrice}
                            </div>
                            <button
                                className="text-red-500 hover:underline"
                                onClick={() => handleDelete(stock._id)}
                            >
                                Delete
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Dashboard;
