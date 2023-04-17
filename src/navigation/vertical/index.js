// ** Navigation imports
import apps from "./apps";
import pages from "./pages";
import forms from "./forms";
import tables from "./tables";
import charts from "./charts";
import dashboards from "./dashboards";
import uiElements from "./ui-elements";

import {
  Book,
  BookOpen,
  Briefcase,
  GitPullRequest,
  Grid,
  List,
  Server,
  Users,
} from "react-feather";

const mainRoutes = [
  {
    header: "Transactions",
  },
  {
    id: "transaction",
    title: "Transaction",
    meta: {
      appLayout: true,
      className: "transaction",
    },
    icon: <Server size={20} />,
    navLink: "/transaction",
  },
  {
    id: "handover",
    title: "Handover",
    meta: {
      appLayout: true,
      className: "handover",
    },
    icon: <BookOpen size={20} />,
    navLink: "/handover",
  },
  {
    header: "Reporting",
  },
  {
    id: "reporting-inventory",
    title: "Inventory",
    meta: {
      appLayout: true,
      className: "reporting-inventory",
    },
    icon: <Book size={20} />,
    navLink: "/reporting-inventory",
  },
  {
    header: "Master Data",
  },
  {
    id: "company",
    title: "Company",
    meta: {
      appLayout: true,
      className: "company",
    },
    icon: <Briefcase size={20} />,
    navLink: "/company",
  },
  {
    id: "category",
    title: "Category",
    meta: {
      appLayout: true,
      className: "category",
    },
    icon: <Grid size={20} />,
    navLink: "/category",
  },
  {
    id: "user",
    title: "User",
    meta: {
      appLayout: true,
      className: "user",
    },
    icon: <Users size={20} />,
    navLink: "/user",
  },
  {
    id: "inventory",
    title: "Inventory",
    meta: {
      appLayout: true,
      className: "inventory",
    },
    icon: <GitPullRequest size={20} />,
    navLink: "/inventory",
  },
];

// ** Merge & Export
export default [
  ...dashboards,
  ...mainRoutes,
  // ...apps,
  // ...pages,
  // ...uiElements,
  // ...forms,
  // ...tables,
  // ...charts,
];
