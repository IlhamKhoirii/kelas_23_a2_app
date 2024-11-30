import React from 'react';
import { Container, Row, Col, Card } from "react-bootstrap";

const ProductList = ({ products, onProductClick }) => {
    return (
        <Container>
            <Row>
                {products.map((product) => (
                    <Col md={4} key={product.id} className="mb-4">
                        <Card onClick={() => onProductClick(product)}>  {/* Click to open ProductDetailModal */}
                            <Card.Img variant="top" src={product.imageUrl} />
                            <Card.Body>
                                <Card.Title>{product.name}</Card.Title>
                                <Card.Text>Harga: Rp{product.price.toLocaleString()}</Card.Text>
                                <Card.Text>Terjual: {product.sold}</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default ProductList;
