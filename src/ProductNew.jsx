export function ProductNew({ onCreate }) {
  const handleSubmit = (event) => {
    event.preventDefault();
    const params = new FormData(event.target);
    onCreate(params, () => event.target.reset());
  };

  return (
    <div>
      <h1>New Product</h1>
      <form onSubmit={handleSubmit}>
        <div>
          Name: <input name="name" type="text" />
        </div>
        <div>
          Price: <input name="price" type="text" />
        </div>
        <div>
          Image URL: <input name="image_url" type="text" />
        </div>
        <div>
          Description: <input name="description" type="text" />
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  );
}
