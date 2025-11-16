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

  // Fetch categories la mount
  useEffect(() => {
    fetch("http://localhost:8080/api/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((err) => console.error(err));
  }, []);

  // Fetch subcategories cand se schimba category
  useEffect(() => {
    if (product.category) {
      fetch(`http://localhost:8080/api/subcategories/by-category/${product.category}`)
        .then((res) => res.json())
        .then((data) => setSubCategories(data))
        .catch((err) => console.error(err));
    } else {
      setSubCategories([]);
    }
    setProduct((prev) => ({ ...prev, subCategory: "" })); // reset subCategory
  }, [product.category]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

 const handleSubmit = async (e) => {
  e.preventDefault();

  // Cream un obiect ready for backend
  const payload = {
    ...product,
    // Transformam subCategory din id in obiect { id: ... }
    subCategory: product.subCategory ? { id: product.subCategory } : null,
    // optional: daca ai si Category ca obiect, la fel poti face { id: product.category }
    category: product.category ? { id: product.category } : null,
  };

  try {
    await fetch("http://localhost:8080/add-product", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    // Reset form
    setProduct({
      name: "",
      description: "",
      category: "",
      subCategory: "",
      sellerName: "",
      price: 0,
      quantity: 0,
    });

    onAdd(); // Refresh table
  } catch (err) {
    console.error(err);
  }
};


  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
      <input
        name="name"
        placeholder="Name"
        value={product.name}
        onChange={handleChange}
        required
      />
      <input
        name="description"
        placeholder="Description"
        value={product.description}
        onChange={handleChange}
      />
      {/* Category dropdown */}
      <select
        name="category"
        value={product.category}
        onChange={handleChange}
        required
      >
        <option value="">Select Category</option>
        {categories.map((c) => (
          <option key={c.id} value={c.id}>
            {c.name}
          </option>
        ))}
      </select>
      {/* SubCategory dropdown */}
      <select
        name="subCategory"
        value={product.subCategory}
        onChange={handleChange}
        required
        disabled={!product.category}
      >
        <option value="">Select Subcategory</option>
        {subCategories.map((sc) => (
          <option key={sc.id} value={sc.id}>
            {sc.name}
          </option>
        ))}
      </select>
      <input
        name="sellerName"
        placeholder="Seller Name"
        value={product.sellerName}
        onChange={handleChange}
      />
      <input
        name="price"
        type="number"
        placeholder="Price"
        value={product.price}
        onChange={handleChange}
      />
      <input
        name="quantity"
        type="number"
        placeholder="Quantity"
        value={product.quantity}
        onChange={handleChange}
      />
      <button type="submit">Add Product</button>
    </form>
  );
}

export default NewProductForm;
