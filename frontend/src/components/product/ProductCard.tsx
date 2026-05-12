import { Card, Image, Button, Typography } from "antd";
import { HeartOutlined, HeartFilled } from "@ant-design/icons";
import { useState } from "react";
import { Link } from "react-router-dom";

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  images: string[];
  description: string;
  rating: number;
  sold: number;
  isNew?: boolean;
  isBestSeller?: boolean;
}

const { Text } = Typography;

interface Props {
  product: Product;
}

const ProductCard = ({ product }: Props) => {
  const [liked, setLiked] = useState(false);

  return (
    <Card
      hoverable
      style={{ height: "100%", borderRadius: 8, overflow: "hidden" }}
      cover={
        <div style={{ position: "relative" }}>
          <Image
            src={product.images[0]}
            alt={product.name}
            style={{ height: 280, objectFit: "cover" }}
            preview={false}
          />

          {product.isNew && (
            <div
              style={{
                position: "absolute",
                top: 12,
                left: 12,
                background: "#f50",
                color: "#fff",
                padding: "4px 10px",
                fontSize: "12px",
                fontWeight: "bold",
                borderRadius: 4,
              }}
            >
              NEW
            </div>
          )}
          {product.isBestSeller && (
            <div
              style={{
                position: "absolute",
                top: 12,
                left: 12,
                background: "#faad14",
                color: "#fff",
                padding: "4px 10px",
                fontSize: "12px",
                fontWeight: "bold",
                borderRadius: 4,
              }}
            >
              BEST SELLER
            </div>
          )}

          <Button
            shape="circle"
            icon={
              liked ? (
                <HeartFilled style={{ color: "#f50" }} />
              ) : (
                <HeartOutlined />
              )
            }
            onClick={(e) => {
              e.stopPropagation();
              setLiked(!liked);
            }}
            style={{
              position: "absolute",
              top: 12,
              right: 12,
              background: "rgba(255,255,255,0.9)",
              border: "none",
            }}
          />
        </div>
      }
      bodyStyle={{ padding: 16 }}
    >
      <Link
        to={`/products/${product.id}`}
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <Text
          strong
          style={{ fontSize: 16, display: "block", marginBottom: 6 }}
        >
          {product.name}
        </Text>
        <Text style={{ fontSize: 18, fontWeight: 700, color: "#f50" }}>
          ${product.price}
        </Text>
      </Link>
    </Card>
  );
};

export default ProductCard;
