import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Container, CssBaseline } from '@mui/material';
import ProductList from './components/ProductList';
import ShoppingCartDrawer from './components/ShoppingCartDrawer';
import ProductModal from './components/ProductModal';
import Cart from './components/Cart';
import { Product } from './types';
import Header from './components/Header';

const App: React.FC = () => {
 const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<{ product: Product; quantity: number }[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    fetch('/Data/data.json')
      .then((response) => response.json())
      .then((data) => setProducts(data));
  }, []);

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  const handleDrawerOpen = () => {
    setIsDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setIsDrawerOpen(false);
  };

  const addToCart = (product: Product, quantity: number) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.product.id === product.id);
      if (existingProduct) {
        return prevCart.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prevCart, { product, quantity }];
    });
  };

  const removeFromCart = (productId: number) => {
    setCart((prevCart) => prevCart.filter((item) => item.product.id !== productId));
  };

  const updateQuantity = (productId: number, quantity: number) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  return (
    <Router>
      <Header onDrawerOpen={handleDrawerOpen} />
      <Container sx={{ mt: 10 }}>
        <CssBaseline />
        <Routes>
          <Route
            path="/"
            element={<ProductList products={products} onProductClick={handleProductClick} />}
          />
          <Route
            path="/cart"
            element={<Cart cartItems={cart} setCartItems={setCart} />} 
          />
        </Routes>
        <ShoppingCartDrawer
          cartItems={cart}
          open={isDrawerOpen}
          onClose={handleDrawerClose}
          removeFromCart={removeFromCart}
          updateQuantity={updateQuantity}
        />
        <ProductModal
          product={selectedProduct}
          open={isModalOpen}
          onClose={handleModalClose}
          addToCart={addToCart} cartItems={[]}        
        />
      </Container>
    </Router>
  );
};

export default App;
