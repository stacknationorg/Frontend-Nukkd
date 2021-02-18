import Dashboard from "@material-ui/icons/Dashboard";
import People from "@material-ui/icons/People";
import Shop from "@material-ui/icons/Shop";
import Category from "@material-ui/icons/Category";
import Store from "@material-ui/icons/Store";
// core components/views for Admin layout
import DashboardPage from "../components/manager/pages/Dashboard.js";
import ApprovedOwners from "../components/manager/pages/ApprovedOwners.js";
import PendingOwners from "../components/manager/pages/PendingOwners.js";
import Brands from "../components/manager/pages/Brands.js";
import Categorys from "../components/manager/pages/Categories.js";
import Products from "../components/manager/pages/Products.js";
import Services from "../components/manager/pages/Services.js";
import Stores from "../components/manager/pages/Stores.js";
import Employees from "../components/manager/pages/Employees.js";
import Customers from "../components/manager/pages/Customers.js";

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: Dashboard,
    component: DashboardPage,
    layout: "/manager"
  },
  {
    path: "/owners/approved",
    name: "Approved Owners",
    icon: People,
    component: ApprovedOwners,
    layout: "/manager"
  },
  {
    path: "/owners/pending",
    name: "Pending Owners",
    icon: People,
    component: PendingOwners,
    layout: "/manager"
  },
  {
    path: "/brands",
    name: "All Brands",
    icon: Shop,
    component: Brands,
    layout: "/manager"
  },
  {
    path: "/categories",
    name: "All Categories",
    icon: Category,
    component: Categorys,
    layout: "/manager"
  },
  {
    path: "/products",
    name: "All Products",
    icon: Shop,
    component: Products,
    layout: "/manager"
  },
  {
    path: "/services",
    name: "All Services",
    icon: Shop,
    component: Services,
    layout: "/manager"
  },
  {
    path: "/stores",
    name: "All Stores",
    icon: Store,
    component: Stores,
    layout: "/manager"
  },
  {
    path: "/employees",
    name: "All Employees",
    icon: People,
    component: Employees,
    layout: "/manager"
  },
  {
    path: "/customers",
    name: "All Customers",
    icon: People,
    component: Customers,
    layout: "/manager"
  },
];

export default dashboardRoutes;