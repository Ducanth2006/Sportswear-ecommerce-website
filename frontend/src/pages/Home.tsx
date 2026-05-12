import { Button, Row, Col, Typography } from "antd";
import ProductList from "./products/ProductList";
import CategoryBar from "../components/layout/CategoryBar";

const { Title, Text } = Typography;

const Home = () => {
  return (
    <>
      {/* ==================== HERO BANNER ==================== */}
      <div
        style={{
          height: "680px",
          backgroundImage: `linear-gradient(rgba(0,0,0,0.45), rgba(0,0,0,0.35)), url('/chạy.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center 30%",
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "flex-start",
          color: "white",
          padding: "0 80px 120px 80px",
        }}
      >
        <div style={{ maxWidth: "660px" }}>
          <h1
            style={{
              fontSize: "82px",
              fontWeight: 900,
              lineHeight: 1.05,
              marginBottom: "16px",
              letterSpacing: "-4px",
              textTransform: "uppercase",
            }}
          >
            CHASE THE ENERGY
          </h1>
          <p style={{ fontSize: "24px", marginBottom: "52px", opacity: 0.98 }}>
            New activewear drops to push your limits.
          </p>
          <div style={{ display: "flex", gap: "20px" }}>
            <Button
              size="large"
              style={{
                height: 62,
                padding: "0 56px",
                fontSize: "18px",
                fontWeight: 700,
                backgroundColor: "#ff4d4f",
                border: "none",
                borderRadius: "8px",
                color: "#fff",
              }}
            >
              SHOP MEN
            </Button>
            <Button
              size="large"
              style={{
                height: 62,
                padding: "0 56px",
                fontSize: "18px",
                fontWeight: 700,
                backgroundColor: "#000",
                color: "#fff",
                border: "2px solid #fff",
                borderRadius: "8px",
              }}
            >
              SHOP WOMEN
            </Button>
          </div>
        </div>
      </div>

      <CategoryBar />
      <ProductList />

      {/* ==================== 2 BANNER LỚN ==================== */}
      <div style={{ padding: "0 40px 80px" }}>
        <Row gutter={24}>
          <Col xs={24} md={12}>
            <div
              style={{
                height: "380px",
                backgroundImage: `url('/body.jpg')`, // thay bằng ảnh của bạn
                backgroundSize: "cover",
                backgroundPosition: "center",
                borderRadius: "12px",
                position: "relative",
                display: "flex",
                alignItems: "flex-end",
                padding: "40px",
                color: "#fff",
                cursor: "pointer",
              }}
            >
              <h2
                style={{
                  fontSize: "42px",
                  fontWeight: 900,
                  lineHeight: 1,
                  textShadow: "0 4px 12px rgba(0,0,0,0.7)",
                }}
              >
                RUNNING
                <br />
                ESSENTIALS
              </h2>
            </div>
          </Col>

          <Col xs={24} md={12}>
            <div
              style={{
                height: "380px",
                backgroundImage: `url('/giày.jpg')`, // thay bằng ảnh của bạn
                backgroundSize: "cover",
                backgroundPosition: "center",
                borderRadius: "12px",
                position: "relative",
                display: "flex",
                alignItems: "flex-end",
                padding: "40px",
                color: "#fff",
                cursor: "pointer",
              }}
            >
              <h2
                style={{
                  fontSize: "42px",
                  fontWeight: 900,
                  lineHeight: 1,
                  textShadow: "0 4px 12px rgba(0,0,0,0.7)",
                }}
              >
                TRAINING
                <br />
                GEAR
              </h2>
            </div>
          </Col>
        </Row>
      </div>

      {/* ==================== MEMBERSHIP SECTION ==================== */}
      <div style={{ background: "#000", color: "#fff", padding: "80px 40px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", textAlign: "center" }}>
          <Title level={2} style={{ color: "#fff", marginBottom: 16 }}>
            BECOME AN ELITE MEMBER &amp; GET 15% OFF
          </Title>
          <Text style={{ fontSize: 18, display: "block", marginBottom: 40 }}>
            Join the club for exclusive drops, free shipping, and early access.
          </Text>
          <Button
            size="large"
            style={{
              backgroundColor: "#ff4d4f",
              color: "#fff",
              height: 56,
              padding: "0 48px",
              fontSize: 18,
              fontWeight: 700,
              border: "none",
            }}
          >
            SIGN UP FOR FREE
          </Button>
        </div>
      </div>

      {/* ==================== FOOTER ==================== */}
      <footer
        style={{ background: "#111", color: "#ccc", padding: "60px 40px 30px" }}
      >
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <Row gutter={[40, 40]}>
            <Col xs={24} sm={6}>
              <h4 style={{ color: "#fff", marginBottom: 16 }}>
                ELITE PERFORMANCE
              </h4>
              <p style={{ fontSize: 14, lineHeight: 1.6 }}>
                Engineered for the relentless.
                <br />
                Built for the elite.
              </p>
            </Col>
            <Col xs={24} sm={6}>
              <h4 style={{ color: "#fff", marginBottom: 16 }}>
                CUSTOMER SERVICE
              </h4>
              <p style={{ fontSize: 14, lineHeight: 2 }}>
                SUPPORT
                <br />
                ORDERS
                <br />
                RETURNS
              </p>
            </Col>
            <Col xs={24} sm={6}>
              <h4 style={{ color: "#fff", marginBottom: 16 }}>COMPANY</h4>
              <p style={{ fontSize: 14, lineHeight: 2 }}>
                PRIVACY
                <br />
                TERMS
                <br />
                SITEMAP
              </p>
            </Col>
            <Col xs={24} sm={6}>
              <h4 style={{ color: "#fff", marginBottom: 16 }}>NEWSLETTER</h4>
              <div style={{ display: "flex", gap: 8 }}>
                <input
                  type="email"
                  placeholder="ENTER EMAIL"
                  style={{
                    flex: 1,
                    padding: "12px",
                    border: "none",
                    borderRadius: "4px 0 0 4px",
                  }}
                />
                <Button
                  style={{
                    background: "#fff",
                    color: "#000",
                    borderRadius: "0 4px 4px 0",
                  }}
                >
                  SUBSCRIBE
                </Button>
              </div>
            </Col>
          </Row>

          <div
            style={{
              textAlign: "center",
              marginTop: 60,
              fontSize: 13,
              opacity: 0.6,
            }}
          >
            © 2024 ELITE PERFORMANCE. ALL RIGHTS RESERVED.
          </div>
        </div>
      </footer>
    </>
  );
};

export default Home;
