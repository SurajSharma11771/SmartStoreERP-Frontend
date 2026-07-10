import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

export function exportPurchasesExcel(purchases) {
  const data = purchases.map((purchase) => ({
    Invoice: purchase.invoiceNumber,
    Supplier: purchase.supplierName,
    Amount: purchase.totalAmount,
    Status: purchase.status,
    Date: new Date(purchase.purchaseDate).toLocaleDateString(),
  }));

  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(workbook, worksheet, "Purchases");

  const excelBuffer = XLSX.write(workbook, {
    bookType: "xlsx",
    type: "array",
  });

  const file = new Blob([excelBuffer], {
    type: "application/octet-stream",
  });

  saveAs(file, "purchases.xlsx");
}
export function exportSalesExcel(sales) {
  const data = sales.map((sale) => ({
    Invoice: sale.invoiceNumber,
    Customer: sale.customerName,
    Amount: sale.totalAmount,
    Status: sale.status,
    Date: new Date(sale.saleDate).toLocaleDateString(),
  }));

  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(workbook, worksheet, "Sales");

  const excelBuffer = XLSX.write(workbook, {
    bookType: "xlsx",
    type: "array",
  });

  const file = new Blob([excelBuffer], {
    type: "application/octet-stream",
  });

  saveAs(file, "sales.xlsx");
}
export function exportInventoryExcel(products) {
  const data = products.map((product) => ({
    Product: product.name,
    SKU: product.sku,
    Category: product.categoryName,
    Stock: product.quantity,
    MinimumStock: product.minimumStock,
    CostPrice: product.costPrice,
    StockValue: product.quantity * product.costPrice,
  }));

  const worksheet = XLSX.utils.json_to_sheet(data);

  const workbook = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(workbook, worksheet, "Inventory");

  const excelBuffer = XLSX.write(workbook, {
    bookType: "xlsx",
    type: "array",
  });

  const file = new Blob([excelBuffer], {
    type: "application/octet-stream",
  });

  saveAs(file, "inventory.xlsx");
}
