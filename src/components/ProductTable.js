import React, { useState, useEffect } from "react";

function ProductTable({ refresh }) {
  const [products, setProducts] = useState([]);
  const [nameFilter, setNameFilter] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const fetchProducts = async () => {
    try {
      let url = "http://localhost:8080/products?";
      if (nameFilter) url += `name=${nameFilter}&`;
      if (minPrice) url += `minPrice=${minPrice}&`;
      if (maxPrice) url += `maxPrice=${maxPrice}&`;

      const res = await fetch(url);
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };

  useEffect(() => {
    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refresh]);

  return (
    <div className="table-wrapper">
      <div className="filters">
        <input
          type="text"
          placeholder="Filtrează după nume"
          value={nameFilter}
          onChange={(e) => setNameFilter(e.target.value)}
          className="input filter-input"
        />
        <input
          type="number"
          placeholder="Preț minim"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
          className="input filter-input"
        />
        <input
          type="number"
          placeholder="Preț maxim"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          className="input filter-input"
        />
        <button onClick={fetchProducts} className="btn btn-secondary">
          Filtrează
        </button>
      </div>

      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th>Nume</th>
              <th>Descriere</th>
              <th>Categorie</th>
              <th>Subcategorie</th>
              <th>Vânzător</th>
              <th>Preț</th>
              <th>Cantitate</th>
            </tr>
          </thead>
          <tbody>
            {products.length === 0 ? (
              <tr>
                <td colSpan="7" className="table-empty">
                  Nu există produse pentru filtrul selectat.
                </td>
              </tr>
            ) : (
              products.map((p) => (
                <tr key={p.id}>
                  <td>{p.name}</td>
                  <td>{p.description}</td>
                  <td>{p.categoryName || ""}</td>
                  <td>{p.subCategoryName || ""}</td>
                  <td>{p.sellerName}</td>
                  <td>{p.price}</td>
                  <td>{p.quantity}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ProductTable;
