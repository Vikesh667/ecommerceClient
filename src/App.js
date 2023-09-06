import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import ProductDetail from "./features/products/component/ProductDetails";
import LoginPage from "./pages/LoginPage";
import SingUpPage from "./pages/SingUpPage";
import CartPage from "./pages/CartPage";
const router=createBrowserRouter(
[
  {
    path:"/",
    element:(<Home/>)
  },
  {
    path:"/productDetails",
    element:(<ProductDetail/>)
  },
  {
    path:"/login",
    element:(<LoginPage/>)
  },
  {
    path:"/signup",
    element:(<SingUpPage/>)
  },
  {
    path:"/cart",
    element:(<CartPage/>)
  }
]
)

function App() {
  return (
    <div>
      <RouterProvider router={router}/>
    </div>
  );
}

export default App;
