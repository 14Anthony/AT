import React, { useEffect, useState } from "react";
import { Container, Col, Row } from "react-bootstrap";
import { Input, TextArea } from "../Form";
import { Button, Form } from "react-bootstrap";
import productAPI from "../../utils/productAPI.js";
import ImageCloud from "../ImageCloud";

function FormCard() {
  const [formObject, setFormObject] = useState({});
  const [file, setFile] = useState("");
  const [products, setProducts] = useState({
    name: "",
    image: "",
    brand: "",
    description: "",
    category: "",
    price: "",
    countInStock: "",
    rating: 1,
    numReviews: 0,
    motto: "we have the meats",
  });
  const [image, setImage] = useState({
    imageUrl: null,
    imageAlt: null,
  });

  // Load all books and store them with setBooks
  useEffect(() => {}, []);

  // Loads all products and sets them to products
  function loadProducts() {
    productAPI
      .getProducts()
      .then((res) => setProducts(res.data))
      .catch((err) => console.log(err));
  }

  function handleInputChange(e) {
    const { name, value } = e.target;
    setFormObject({ ...formObject, [name]: value });
  }

  function handleFormSubmit(event) {
    event.preventDefault();
    console.log("yoohooo, big summer blowout");
    if (formObject.name && formObject.price) {
      productAPI
        .saveProduct({
          // name: "Airpods Wireless Bluetooth Headphones",
          // image: "/images/airpods.jpg",
          // description:
          //   "Bluetooth technology lets you connect it with compatible devices wirelessly High-quality AAC audio offers immersive listening experience Built-in microphone allows you to take calls while working",
          // brand: "Apple",
          // category: "Electronics",
          // price: 89.99,
          // countInStock: 10,
          // rating: 4.5,
          // numReviews: 12,
          // user: 12,

          name: formObject.name,
          image: formObject.image,
          brand: formObject.brand,
          description: formObject.description,
          category: formObject.category,
          price: formObject.price,
          countInStock: formObject.countInStock,
          rating: 5,
          user:'',
          numReviews: 0,
          motto: "we have the meats",
        })
        .then((res) => loadProducts())
        .catch((err) => console.log(err));
    }
  }

  function onFileChange(e) {
    setFile(e.target.files[0]);
    const { files } = document.querySelector('input[type="file"]');
    const formData = new FormData();
    formData.append("file", files[0]);
    formData.append("upload_preset", "productimages");
    const options = {
      method: "POST",
      body: formData,
    };

    // replace cloudname with your Cloudinary cloud_name
    return fetch(
      "https://api.cloudinary.com/v1_1/hsmzl2fw7/image/upload",
      options
    )
      .then((res) => res.json())
      .then((res) => {
        console.log(image);
        setImage({
          imageUrl: res.secure_url,
          imageAlt: `An image of ${res.original_filename}`,
        });
        setFormObject({ image: image.imageUrl });
      })
      .catch((err) => console.log(err));
  }

  /**
   * Component to display thumbnail of image.
   */
  const ImageThumb = ({ image }) => {
    return (
      <img
        name="image"
        src={URL.createObjectURL(image)}
        alt={image.name}
        style={{ width: "200px" }}
      />
    );
  };
  console.log(formObject);
  // console.log(file);
  return (
    <Container fluid className="py-3">
      <Row>
        <Col size="md-6">
          <form action="/" method="POST" encType="multipart/form-data">
            <Input
              onChange={handleInputChange}
              name="name"
              placeholder="Product Name (required)"
            />
            <Input
              onChange={handleInputChange}
              name="brand"
              placeholder="Brand  (required)"
            />
            <TextArea
              onChange={handleInputChange}
              name="description"
              placeholder="Product Description (required)"
            />
            <Input
              onChange={handleInputChange}
              name="category"
              placeholder="Category (required)"
            />
            <Input
              onChange={handleInputChange}
              name="countInStock"
              placeholder="Quantity in Stock (required)"
            />
            <Input
              onChange={handleInputChange}
              name="price"
              placeholder="Price (required)"
            />
            <Form.Group>
              <div id="upload-box">
                <input name="image" type="file" onChange={onFileChange} />
              </div>
              {file && <ImageThumb name="image" image={file} />}
            </Form.Group>

            <Button
              className="mb-2"
              disabled={!(formObject.price && formObject.name)}
              onClick={handleFormSubmit}
            >
              Add Product
            </Button>
          </form>
        </Col>
      </Row>
    </Container>
  );
}

export default FormCard;
