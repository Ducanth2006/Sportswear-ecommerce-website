import { useEffect, useState } from "react";
import { Typography, Button } from "antd";
import ProductCard from "../../components/product/ProductCard";
import { mockProducts } from "../../utils/mockData";

const { Title } = Typography;

interface ProductListProps {
  genderFilter?: string; 
}

const ProductList = ({ genderFilter }: ProductListProps) => {
  const [filteredProducts, setFilteredProducts] = useState(mockProducts);

  useEffect(() => {
    let result = mockProducts;
    if (genderFilter) {
      result = result.filter((product) => product.gender === genderFilter);
    }

    setFilteredProducts(result);
  }, [genderFilter]);

  return (
    <div style={{ padding: "40px 40px 60px" }} id="trending-now">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 32,
        }}
      >
        <Title level={2} style={{ margin: 0 }}>
          TRENDING NOW
        </Title>
        <Button type="link" style={{ fontSize: 16, fontWeight: 600 }}>
          VIEW ALL →
        </Button>
      </div>

      <div
        style={{
          display: "flex",
          gap: 24,
          overflowX: "auto",
          paddingBottom: 20,
          scrollBehavior: "smooth",
        }}
        className="hide-scrollbar"
      >
        {filteredProducts.map((product) => (
          <div key={product.id} style={{ minWidth: "280px", flexShrink: 0 }}>
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
