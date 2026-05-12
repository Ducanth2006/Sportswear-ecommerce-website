import { createBrowserRouter } from "react-router-dom";
import ClientLayout from "../components/layout/ClientLayout";
import Home from "../pages/Home";
import Register from "../pages/auth/Register";

// Các component giả lập để giữ chỗ
const LoginPlaceholder = () => (
  <div className="text-center py-20 text-xl font-bold">
    Trang Đăng Nhập (Sẽ làm sau)
  </div>
);
const ProductsPlaceholder = () => (
  <div className="text-center py-20 text-3xl font-bold">
    Lưới 60.000 Sản Phẩm Sẽ Hiện Ở Đây
  </div>
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <ClientLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "products",
        element: <ProductsPlaceholder />,
      },
      {
        path: "login",
        element: <LoginPlaceholder />,
      },
      {
        path: "register",
        element: <Register />,
      },
    ],
  },
]);

export default router;
