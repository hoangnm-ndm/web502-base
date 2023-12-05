import { Button, Form } from "react-bootstrap";
import { Product } from "../interfaces/Product";
import { useEffect, useState } from "react";

type Props = {
  onSubmit: (product: Product) => void;
  initProduct: Product | null;
  closeForm: () => void;
};

const ProductForm = ({ onSubmit, initProduct, closeForm }: Props) => {
  const [product, setProduct] = useState<Product>(
    initProduct || {
      name: "",
      price: 0,
      desc: "",
    }
  );
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (product) {
      onSubmit(product);
    }
  };

  useEffect(() => {
    if (initProduct) {
      setProduct(initProduct);
    }
  }, [initProduct]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setProduct((prevs) => ({ ...prevs, [name]: value }));
  };
  return (
    <div>
      <h2>Product Form</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="">
          <Form.Label>Product Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter product name"
            name="name"
            value={product.name}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group controlId="">
          <Form.Label>Product Price</Form.Label>
          <Form.Control
            type="number"
            name="price"
            placeholder="Enter product price"
            value={product.price}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group controlId="">
          <Form.Label>Product Description</Form.Label>
          <Form.Control
            type="textarea"
            name="desc"
            placeholder="Enter product description"
            value={product.desc}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group>
          <Button variant="primary" type="submit">
            {initProduct ? "Update" : "Create"}
          </Button>
          <Button variant="primary" onClick={closeForm}>
            Cancel
          </Button>
        </Form.Group>
      </Form>
    </div>
  );
};

export default ProductForm;
