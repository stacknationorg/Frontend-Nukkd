import Dashboard from "@material-ui/icons/Dashboard";
import People from "@material-ui/icons/People";
import Shop from "@material-ui/icons/Shop";
import Category from "@material-ui/icons/Category";
import Store from "@material-ui/icons/Store";
// core components/views for Admin layout
import DashboardPage from "../components/admin/pages/Dashboard.js";
import Managers from "../components/admin/pages/Managers.js";
import ApprovedOwners from "../components/admin/pages/ApprovedOwners.js";
import PendingOwners from "../components/admin/pages/PendingOwners.js";
import Brands from "../components/admin/pages/Brands.js";
import Categorys from "../components/admin/pages/Categories.js";
import Products from "../components/admin/pages/Products.js";
import Services from "../components/admin/pages/Services.js";
import Stores from "../components/admin/pages/Stores.js";
import Employees from "../components/admin/pages/Employees.js";
import Customers from "../components/admin/pages/Customers.js";

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: Dashboard,
    component: DashboardPage,
    layout: "/admin"
  },
  {
    path: "/managers",
    name: "Team Managers",
    icon: People,
    component: Managers,
    layout: "/admin"
  },
  {
    path: "/owners/approved",
    name: "Approved Owners",
    icon: People,
    component: ApprovedOwners,
    layout: "/admin"
  },
  {
    path: "/owners/pending",
    name: "Pending Owners",
    icon: People,
    component: PendingOwners,
    layout: "/admin"
  },
  {
    path: "/brands",
    name: "All Brands",
    icon: Shop,
    component: Brands,
    layout: "/admin"
  },
  {
    path: "/categories",
    name: "All Categories",
    icon: Category,
    component: Categorys,
    layout: "/admin"
  },
  {
    path: "/products",
    name: "All Products",
    icon: Shop,
    component: Products,
    layout: "/admin"
  },
  {
    path: "/services",
    name: "All Services",
    icon: Shop,
    component: Services,
    layout: "/admin"
  },
  {
    path: "/stores",
    name: "All Stores",
    icon: Store,
    component: Stores,
    layout: "/admin"
  },
  {
    path: "/employees",
    name: "All Employees",
    icon: People,
    component: Employees,
    layout: "/admin"
  },
  {
    path: "/customers",
    name: "All Customers",
    icon: People,
    component: Customers,
    layout: "/admin"
  },
];

export default dashboardRoutes;