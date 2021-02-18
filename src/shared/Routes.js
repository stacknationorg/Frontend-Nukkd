import Home from "../components/Home";
import Stores from "../components/stores/Stores";
import Login from "../components/customers/Login";
import Register from "../components/customers/Register";
import * as AdminLogin from "../components/admin/Login";
import * as ManagerLogin from "../components/manager/Login";
import AdminApp from "../components/admin/AdminApp";
import ManagerApp from "../components/manager/ManagerApp";

export const Routes = {
    home:{
        path:"/",
        name:"Home",
        component:Home
    },
    stores:{
        path:"/stores",
        name:"Stores",
        component:Stores
    },
    customerLogin:{
        path:"/login",
        name:"Customer Login",
        component:Login
    },
    customerRegister:{
        path:"/register",
        name:"Customer Register",
        component:Register
    },
    adminLogin:{
        path:"/admin",
        name:"Admin Login",
        component:AdminLogin.default
    },
    adminDashboard:{
        path:"/admin/dashboard",
        name:"Admin Dashboard",
        component:AdminApp
    },
    adminManager:{
        path:"/admin/managers",
        name:"Admin Manager",
        component:AdminApp
    },
    adminApprovedOwners:{
        path:"/admin/owners/approved",
        name:"Admin Owners",
        component:AdminApp
    },
    adminPendingOwners:{
        path:"/admin/owners/pending",
        name:"Admin Owners",
        component:AdminApp
    },
    adminBrands:{
        path:"/admin/brands",
        name:"Admin Brands",
        component:AdminApp
    },
    adminCategories:{
        path:"/admin/categories",
        name:"Admin Categories",
        component:AdminApp
    },
    adminProducts:{
        path:"/admin/products",
        name:"Admin Products",
        component:AdminApp
    },
    adminServices:{
        path:"/admin/services",
        name:"Admin Services",
        component:AdminApp
    },
    adminStores:{
        path:"/admin/stores",
        name:"Admin Stores",
        component:AdminApp
    },
    adminEmployees:{
        path:"/admin/employees",
        name:"Admin Employees",
        component:AdminApp
    },
    adminCustomers:{
        path:"/admin/customers",
        name:"Admin Customers",
        component:AdminApp
    },
    managerLogin:{
        path:"/manager",
        name:"Manager Login",
        component:ManagerLogin.default
    },
    managerDashboard:{
        path:"/manager/dashboard",
        name:"Manager Dashboard",
        component:ManagerApp
    },
    managerApprovedOwners:{
        path:"/manager/owners/approved",
        name:"Manager Owners",
        component:ManagerApp
    },
    managerPendingOwners:{
        path:"/manager/owners/pending",
        name:"Manager Owners",
        component:ManagerApp
    },
    managerBrands:{
        path:"/manager/brands",
        name:"Manager Brands",
        component:ManagerApp
    },
    managerCategories:{
        path:"/manager/categories",
        name:"Manager Categories",
        component:ManagerApp
    },
    managerProducts:{
        path:"/manager/products",
        name:"Manager Products",
        component:ManagerApp
    },
    managerServices:{
        path:"/manager/services",
        name:"Manager Services",
        component:ManagerApp
    },
    managerStores:{
        path:"/manager/stores",
        name:"Manager Stores",
        component:ManagerApp
    },
    managerEmployees:{
        path:"/manager/employees",
        name:"Manager Employees",
        component:ManagerApp
    },
    managerCustomers:{
        path:"/manager/customers",
        name:"Manager Customers",
        component:ManagerApp
    },
}