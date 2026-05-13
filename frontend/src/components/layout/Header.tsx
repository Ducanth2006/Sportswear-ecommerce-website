import { Layout, Input, Badge, Button, Typography } from "antd";
import {
  SearchOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";

const { Header: AntHeader } = Layout;
const { Text } = Typography;

const Header = () => {
  return (
    <>
      <div
        style={{
          background: "#000",
          color: "#fff",
          fontSize: "13px",
          textAlign: "center",
          padding: "8px 0",
          fontWeight: 500,
        }}
      >
        FREE STANDARD SHIPPING &amp; RETURNS | JOIN ELITE CLUB
      </div>

      <AntHeader
        style={{
          background: "#fff",
          padding: "0 40px",
          height: 70,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          position: "sticky",
          top: 0,
          zIndex: 1000,
          boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
        }}
      >
        <div
          style={{
            fontSize: 24,
            fontWeight: 900,
            color: "#000",
            letterSpacing: -1,
          }}
        >
          ELITE PERFORMANCE
        </div>

        <div style={{ display: "flex", gap: 32, fontWeight: 600 }}>
          <Link to="/" style={{ color: "#ff4d4f", fontWeight: 700 }}>
            MEN
          </Link>
          <Link to="/" style={{ color: "#111" }}>
            WOMEN
          </Link>
          <Link to="/" style={{ color: "#111" }}>
            KIDS
          </Link>
          <Link to="/" style={{ color: "#111" }}>
            SPORTS
          </Link>
          <Link to="/" style={{ color: "#111" }}>
            BRANDS
          </Link>
          <Link to="/" style={{ color: "#111" }}>
            RELEASES
          </Link>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <Input
            placeholder="Search"
            prefix={<SearchOutlined />}
            style={{
              width: 280,
              borderRadius: 30,
              backgroundColor: "#f5f5f5",
            }}
          />

          <Link to="/login">
            <Button
              type="text"
              icon={<UserOutlined />}
              style={{ color: "#111" }}
            />
          </Link>

          <Badge count={3} offset={[0, 4]}>
            <Link to="/cart">
              <Button
                type="text"
                icon={<ShoppingCartOutlined />}
                style={{ color: "#111", fontSize: 22 }}
              />
            </Link>
          </Badge>
        </div>
      </AntHeader>
    </>
  );
};

export default Header;
