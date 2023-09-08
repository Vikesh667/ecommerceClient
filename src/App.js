import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import SingUpPage from "./pages/SingUpPage";
import CartPage from "./pages/CartPage";
import Checkout from "./pages/Checkout";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import Protected from "./features/auth/component/Protected";
const router=createBrowserRouter(
[
  {
    path:"/",
    element:(<Home/>)
  },
  {
    path:"/productDetails/:id",
    element:(<ProductDetailsPage/>)
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
    element:(<Protected><CartPage/></Protected>)
  },
  {
    path:"/checkout",
    element:(<Protected><Checkout/></Protected>)
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
