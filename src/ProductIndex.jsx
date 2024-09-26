export function ProductIndex({ products, onShow }) {
  return (
    <div>
      <h1>All products</h1>
      <div className="product-grid">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <h2>{product.name}</h2>
            <img src={product.image_url} />
            <p>${product.price}</p>
            <button onClick={() => onShow(product)}>More info</button>
          </div>
        ))}
      </div>
    </div>
  );
}
