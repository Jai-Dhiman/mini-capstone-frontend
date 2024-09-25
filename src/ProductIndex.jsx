export function ProductsIndex({ products }) {
  return (
    <div>
      <h1>All products</h1>
      {products.map((product) => (
        <div key={product.id}>
          <h2>{product.name}</h2>
          <img src={product.image_url} />
          <p>Price: {product.price}</p>
          <p>Supplier: {product.supplier}</p>
          <p>Inventory: {product.inventory}</p>
          <p>Description: {product.description}</p>
        </div>
      ))}
    </div>
  );
}
