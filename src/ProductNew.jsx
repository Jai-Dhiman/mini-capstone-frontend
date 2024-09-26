export function ProductNew({ onCreate }) {
  const handleSubmit = (event) => {
    event.preventDefault();
    const params = new FormData(event.target);
    onCreate(params, () => event.target.reset());
  };

  return (
    <div className="new-product">
      <h1>New Product</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input id="name" name="name" type="text" />
        </div>
        <div>
          <label htmlFor="price">Price:</label>
          <input id="price" name="price" type="text" />
        </div>
        <div>
          <label htmlFor="supplier_id">Supplier ID:</label>
          <input id="supplier_id" name="supplier_id" type="text" />
        </div>
        <div>
          <label htmlFor="image_url">Image URL:</label>
          <input id="image_url" name="image_url" type="text" />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <input id="description" name="description" type="text" />
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  );
}
