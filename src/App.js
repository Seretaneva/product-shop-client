// src/App.js
import React, { useState } from "react";
import ProductTable from "./components/ProductTable";
import NewProductForm from "./components/NewProductForm";
import "./App.css";

function App() {
  const [refresh, setRefresh] = useState(false);

  const triggerRefresh = () => setRefresh(!refresh);

  return (
    <div className="app">
      <header className="app-header">
        <h1 className="app-title">Magazin Online - Produse</h1>
        <p className="app-subtitle">
          Interviu tehnic · Administrare produse simplă și rapidă
        </p>
      </header>

      <main className="app-content">
        <section className="section">
          <div className="section-header">
            <h2>Overview</h2>
          </div>
          <div className="card">
            <ProductTable refresh={refresh} />
          </div>
        </section>

        <section className="section">
          <div className="section-header">
            <h2>Produs nou</h2>
          </div>
          <div className="card">
            <NewProductForm onAdd={triggerRefresh} />
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
