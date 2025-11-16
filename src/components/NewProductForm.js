import React, { useState, useEffect } from "react";

function NewProductForm({ onAdd }) {
  const [product, setProduct] = useState({
    name: "",
    description: "",
    category: "",
    subCategory: "",
    sellerName: "",
    price: 0,
    quantity: 0,
  });

  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    if (product.category) {
      fetch(
        `http://localhost:8080/subcategories/by-category/${product.category}`
      )
        .then((res) => res.json())
        .then((data) => setSubCategories(data))
        .catch((err) => console.error(err));
    } else {
      setSubCategories([]);
    }
    setProduct((prev) => ({ ...prev, subCategory: "" }));
  }, [product.category]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...product,
      subCategory: product.subCategory ? { id: product.subCategory } : null,
      category: product.category ? { id: product.category } : null,
    };

    try {
      await fetch("http://localhost:8080/add-product", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      setProduct({
        name: "",
        description: "",
        category: "",
        subCategory: "",
        sellerName: "",
        price: 0,
        quantity: 0,
      });

      onAdd();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="form-grid">
        <div className="form-group">
          <label htmlFor="name">Nume produs</label>
          <input
            id="name"
            name="name"
            placeholder="Ex: Laptop performant"
            value={product.name}
            onChange={handleChange}
            required
            className="input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="sellerName">Vânzător</label>
          <input
            id="sellerName"
            name="sellerName"
            placeholder="Ex: Magazin SRL"
            value={product.sellerName}
            onChange={handleChange}
            className="input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="price">Preț</label>
          <input
            id="price"
            name="price"
            type="number"
            min="0"
            placeholder="0"
            value={product.price}
            onChange={handleChange}
            className="input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="quantity">Cantitate</label>
          <input
            id="quantity"
            name="quantity"
            type="number"
            min="0"
            placeholder="0"
            value={product.quantity}
            onChange={handleChange}
            className="input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="category">Categorie</label>
          <select
            id="category"
            name="category"
            value={product.category}
            onChange={handleChange}
            required
            className="input select"
          >
            <option value="">Alege categorie</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="subCategory">Subcategorie</label>
          <select
            id="subCategory"
            name="subCategory"
            value={product.subCategory}
            onChange={handleChange}
            required
            disabled={!product.category}
            className="input select"
          >
            <option value="">Alege subcategorie</option>
            {subCategories.map((sc) => (
              <option key={sc.id} value={sc.id}>
                {sc.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="description">Descriere</label>
        <textarea
          id="description"
          name="description"
          placeholder="Detalii despre produs..."
          value={product.description}
          onChange={handleChange}
          className="input textarea"
          rows={3}
        />
      </div>

      <div className="form-actions">
        <button type="submit" className="btn btn-primary">
          Adaugă produs
        </button>
      </div>
    </form>
  );
}

export default NewProductForm;
