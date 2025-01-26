import React, { useState } from "react";
import Dashboard from "./components/Dashboard";
import StockForm from "./components/StockForm";

const App = () => {
  const [reload, setReload] = useState(false);

  // Trigger a reload after adding or editing stocks
  const triggerReload = () => setReload(!reload);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">Portfolio Tracker</h1>
        <StockForm onReload={triggerReload} />
        <Dashboard reload={reload} />
      </div>
    </div>
  );
};

export default App;
