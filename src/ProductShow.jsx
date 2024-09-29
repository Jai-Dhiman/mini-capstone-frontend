export function ProductShow({ product, onUpdate, onDestroy }) {
  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const params = {
      name: form.name.value,
      image_url: form.image_url.value,
      price: form.price.value,
      supplier_id: form.supplier_id.value,
      description: form.description.value,
    };
    onUpdate(product.id, params, () => form.reset());
  };

  return (
    <div>
      <h1>Product information</h1>
      <h2>{product.name}</h2>
      <img src={product.image_url} />
      <p>Price: ${product.price}</p>
      <p>Supplier: {product.supplier.name}</p>
      <p>Description: {product.description}</p>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input id="name" defaultValue={product.name} name="name" type="text" />
        </div>
        <div>
          <label htmlFor="image_url">Image URL:</label>
          <input id="image_url" defaultValue={product.image_url} name="image_url" type="text" />
        </div>
        <div>
          <label htmlFor="psupplier">Price:</label>
          <input id="price" defaultValue={product.price} name="price" type="text" />
        </div>
        <div>
          <label htmlFor="supplier_id">Supplier ID:</label>
          <input id="supplier_id" defaultValue={product.supplier?.id || ""} name="supplier_id" type="text" />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <input id="description" defaultValue={product.description} name="description" type="text" />
        </div>
        <div className="button-group">
          <button type="submit">Update</button>
          <button type="button" onClick={() => onDestroy(product.id)}>
            Delete
          </button>
        </div>
      </form>
    </div>
  );
}
