import React, { useState } from "react";
import ProductTable from "./components/ProductTable";
import NewProductForm from "./components/NewProductForm";

function App() {
  const [refresh, setRefresh] = useState(false);

  const triggerRefresh = () => setRefresh(!refresh);

  return (
    <div className="App" style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>Magazin Online Produse pentru Interviu</h1>

      <h2>Overview</h2>
      <ProductTable refresh={refresh} />

      <h2>New Product</h2>
      <NewProductForm onAdd={triggerRefresh} />
    </div>
  );
}

export default App;
