import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col } from "react-bootstrap";
import Product from "../components/Product";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { listProducts } from "../actions/productActions";
// import axios from 'axios'

const HomePage = () => {
  // const [products, setProducts] = useState([])
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  useEffect(() => {
    dispatch(listProducts());

    // const fetchProducts = async () => {
    //     const { data } = await axios.get('/api/products')

    //     setProducts(data)
    // }
    // fetchProducts()
  }, [dispatch]);

  // const products = []

  return (
    <>
      <h1>Cyber Monday</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="warning"> {error}</Message>
      ) : (
        <Row>
          {products.map((product) => (
            <Col key={products.id} sm={12} md={6} lg={4} xl={3}>
              <Product key={products.id} product={product} />
            </Col>
          ))}
        </Row>
      )}
    </>
  );
};

export default HomePage;
