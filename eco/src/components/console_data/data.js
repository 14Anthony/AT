import ProductListAdminPage from "../../pages/ProductListAdminPage";
import UserListAdminPage from "../../pages/UserListAdminPage";
import FormCard from "../FormCard";
import Report from "../Report";
import ProfilePage from "../../pages/ProfilePage";

// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoffee } from "@fortawesome/free-solid-svg-icons";
import {
  // faCoffee,
  faUserCircle,
  faListAlt,
  faEdit,
  faChartBar,
  faAddressCard,
  
} from "@fortawesome/free-regular-svg-icons";

export const AdminSideBar = [
  {
    name: "Manage Profile",
    order: "s1",
    id: "Profile",
    main: () => <ProfilePage/>,
    icon: faUserCircle,
  },
  {
    name: "Manage Users",
    order: "s2",
    id: "Users",
    main:() => <UserListAdminPage/>,
    icon: faAddressCard,
  },
  {
    name: "View Products",
    order: "s3",
    id: "ProductsList",
    main: () => <ProductListAdminPage/> ,
    icon: faListAlt,
  },
  {
    name: "Add Product",
    order: "s4",
    id: "AddProduct",
    main: () => <FormCard/>,
    icon: faEdit,
  },
  // {
  //   name: "Remove Product",
  //    order: "",
  //    id: "",
  //   path: "/ADMIN",component:""
  //    icon: faCoffee,
  // },
  {
    name: "Reports",
    order: "s5",
    id: "Reports",
    main: () => <Report/>,
    icon: faChartBar,
  },
];
export const UserSideBar = [
  {
    name: "User Console",
    order: "",
    id: "",
    main: () => <h2>Home</h2>,
    icon: faCoffee,
  },
  {
    name: "Manage Profile",
    order: "",
    id: "",
    main: () => <h2>Home</h2>,
    icon: faCoffee,
  },
  {
    name: "Payment Methods",
    order: "",
    id: "",
    main: () => <h2>Home</h2>,
    icon: faCoffee,
  },
  {
    // name: "Purchase History",
    // order: "",
    // path: "",
    // component: "",
    // icon: faCoffee,
  },
];
