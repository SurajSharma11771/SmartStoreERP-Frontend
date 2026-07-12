import { useEffect, useState } from "react";
import api from "../../services/api";
import {
  CategoryOutlined,
  GroupsOutlined,
  Inventory2Outlined,
  LocalShippingOutlined,
  WarningAmberOutlined,
  InventoryOutlined,
  PeopleAltOutlined,
  ReportProblemOutlined,
} from "@mui/icons-material";
import InventoryAlerts from "../../components/dashboard/InventoryAlerts";
import SalesOverview from "../../components/dashboard/SalesOverview";
import StatCard from "../../components/dashboard/StatCard";
import DashboardHeader from "../../components/dashboard/DashboardHeader";
import QuickActions from "../../components/dashboard/QuickActions";
import RecentProducts from "../../components/dashboard/RecentProducts";
import RecentCustomers from "../../components/dashboard/RecentCustomers";
import AIInsights from "../../components/dashboard/AIInsights";
function Dashboard() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [sales, setSales] = useState([]);

  useEffect(() => {
    api.get("/products").then((res) => setProducts(res.data.data));
    api.get("/categories").then((res) => setCategories(res.data.data));
    api.get("/suppliers").then((res) => setSuppliers(res.data.data));
    api.get("/customers").then((res) => setCustomers(res.data.data));
    api.get("/sales").then((res) => setSales(res.data.data));
  }, []);

  const lowStock = products.filter((p) => p.quantity <= p.minimumStock);

  const totalSales = sales.reduce(
    (sum, sale) => sum + Number(sale.netAmount || sale.totalAmount || 0),
    0
  );

  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const weeklySales = weekDays.map((day, index) => {
    const total = sales
      .filter((sale) => new Date(sale.saleDate).getDay() === index)
      .reduce(
        (sum, sale) => sum + Number(sale.netAmount || sale.totalAmount || 0),
        0
      );

    return { day, total };
  });


  return (
    <>
    <DashboardHeader totalSales={totalSales} />
      <div className="dashboard-grid-top">
  <StatCard
    title="Total Products"
    value={products.length}
    icon={<Inventory2Outlined />}
    accent="blue"
  />

  <StatCard
    title="Categories"
    value={categories.length}
    icon={<CategoryOutlined />}
    accent="purple"
  />

  <StatCard
    title="Suppliers"
    value={suppliers.length}
    icon={<LocalShippingOutlined />}
    accent="green"
  />

  <StatCard
    title="Customers"
    value={customers.length}
    icon={<GroupsOutlined />}
    accent="orange"
  />

  <StatCard
    title="Low Stock"
    value={lowStock.length}
    icon={<WarningAmberOutlined />}
    accent="red"
    description={
      lowStock.length === 0
        ? "Inventory is healthy"
        : "Items require attention"
    }
  />
</div>

      <div className="dashboard-row">
        <SalesOverview data={weeklySales} />

        <InventoryAlerts
  lowStockCount={lowStock.length}
  totalProducts={products.length}
  supplierCount={suppliers.length}
/>
    <QuickActions />
      
      
<RecentProducts products={products} />

          <RecentCustomers customers={customers} />

  <AIInsights
    totalSales={totalSales}
    lowStock={lowStock.length}
    totalProducts={products.length}
  />
</div>
    </>
  );
}


export default Dashboard;
