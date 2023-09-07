import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import SingUpPage from "./pages/SingUpPage";
import CartPage from "./pages/CartPage";
import Checkout from "./pages/Checkout";
import ProductDetailsPage from "./pages/ProductDetailsPage";
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
    element:(<CartPage/>)
  },
  {
    path:"/checkout",
    element:(<Checkout/>)
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
