import { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import axios from "axios";
import ProductForm from "./ProductForm";
import { Product } from "../interfaces/Product";
const api = "http://localhost:3001/products";

const ProductList = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isOpenForm, setIsOpenForm] = useState<boolean>(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  useEffect(() => {
    axios
      .get(api)
      .then(({ data }) => {
        setProducts(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const openForm = (product: Product | null = null) => {
    setIsOpenForm(true);
    setSelectedProduct(product);
  };

  const closeFom = () => {
    setIsOpenForm(false);
    setSelectedProduct(null);
  };

  const showEditForm = (product: Product) => {
    openForm(product);
    console.log(product);
    setSelectedProduct((prevs) => ({ ...prevs, ...product }));
  };

  const updateProduct = (product: Product) => {
    axios
      .put(`${api}/${product.id}`, {
        name: product.name,
        price: product.price,
        desc: product.desc,
      })
      .then(() => {
        const newProducts = products.map((item) => {
          return item.id === product.id ? product : item;
        });
        setProducts(newProducts);
        alert("Cập nhật thành công");
      })
      .catch((res) => {
        console.log(res);
      });
  };

  const deleteProduct = (id: string) => {
    axios
      .delete(`${api}/${id}`)
      .then(() => {
        const confirmValue = window.confirm("Bạn có chắc chắn muốn xóa?");
        if (!confirmValue) return;
        const newProducts = products.filter((product) => product.id !== id);
        setProducts(newProducts);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const addProduct = (product: Product) => {
    axios
      .post(api, product)
      .then(({ data }) => {
        console.log(data);
        setProducts((prevs) => [...prevs, data]);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSubmit = (product: Product) => {
    if (selectedProduct) {
      console.log("update");
      updateProduct(product);
    } else {
      addProduct(product);
    }
    closeFom();
  };

  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h2> Product Form</h2>
            <Button onClick={() => openForm()}>Thêm sản phẩm</Button>
            {isOpenForm && (
              <ProductForm
                onSubmit={handleSubmit}
                closeForm={closeFom}
                initProduct={selectedProduct}
              />
            )}
          </div>
          <div className="col-12">
            <h2>Product List</h2>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <td>ID</td>
                  <td>Name</td>
                  <td>Price</td>
                  <td>Description</td>
                  <td>Action</td>
                </tr>
              </thead>
              <tbody>
                {products &&
                  products.map((product) => (
                    <tr key={product.id}>
                      <td>{product.id}</td>
                      <td>{product.name}</td>
                      <td>{product.price}</td>
                      <td>{product.desc || "Đang cập nhật"}</td>
                      <td>
                        <Button
                          onClick={() => showEditForm(product)}
                          className="btn btn-warning"
                        >
                          Edit
                        </Button>{" "}
                        <Button
                          className="btn btn-danger"
                          onClick={() =>
                            product.id && deleteProduct(product.id)
                          }
                        >
                          Delete
                        </Button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
