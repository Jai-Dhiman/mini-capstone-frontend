export function ProductShow({ product }) {
  return (
    <div>
      <h1>Product information</h1>
      <h2>{product.name}</h2>
      <img src={product.image_url} />
      <p>Price: {product.price}</p>
      <p>Description: {product.description}</p>
    </div>
  );
}
