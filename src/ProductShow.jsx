export function ProductShow({ product, onUpdate, onDestroy }) {
  const handleSubmit = (event) => {
    event.preventDefault();
    const params = new FormData(event.target);
    onUpdate(product.id, params, () => event.target.reset());
  };
  return (
    <div>
      <h1>Product information</h1>
      <h2>{product.name}</h2>
      <img src={product.image_url} />
      <p>Price: {product.price}</p>
      <p>Description: {product.description}</p>

      <form onSubmit={handleSubmit}>
        <div>
          Name: <input defaultValue={product.name} name="name" type="text" />
        </div>
        <div>
          Image Url: <input defaultValue={product.image_urlurl} name="image_url" type="text" />
        </div>
        <div>
          Price: <input defaultValue={product.price} name="price" type="text" />
        </div>
        <div>
          Description: <input defaultValue={product.description} name="description" type="text" />
        </div>
        <button type="submit">Update</button>
      </form>
      <button onClick={() => onDestroy(product.id)}>Destroy</button>
    </div>
  );
}
