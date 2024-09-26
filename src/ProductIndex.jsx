export function ProductIndex({ products, onShow }) {
  return (
    <div>
      <h1>All products</h1>
      {products.map((product) => (
        <div key={product.id}>
          <h2>{product.name}</h2>
          <img src={product.image_url} />
          <p>Price: {product.price}</p>
          <p>Description: {product.description}</p>
          <button onClick={() => onShow(product)}>More info</button>
        </div>
      ))}
    </div>
  );
}
