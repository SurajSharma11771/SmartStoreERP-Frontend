import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export function exportPurchaseInvoicePdf(purchase) {
  const doc = new jsPDF();

  doc.setFontSize(18);
  doc.text("SMARTSTORE ERP", 105, 15, { align: "center" });

  doc.setFontSize(12);
  doc.text("Purchase Invoice", 105, 23, { align: "center" });

  doc.setFontSize(10);
  doc.text(`Invoice No: ${purchase.invoiceNumber}`, 14, 35);
  doc.text(`Supplier: ${purchase.supplierName}`, 14, 42);
  doc.text(`Status: ${purchase.status}`, 14, 49);
  doc.text(
    `Date: ${new Date(purchase.purchaseDate).toLocaleString()}`,
    14,
    56
  );

  const rows = purchase.items.map((item) => [
    item.productName,
    item.quantity,
    `Rs. ${item.purchasePrice}`,
    `Rs. ${item.totalPrice}`,
  ]);

  autoTable(doc, {
    startY: 65,
    head: [["Product", "Qty", "Price", "Total"]],
    body: rows,
  });

  const finalY = doc.lastAutoTable.finalY + 10;

  doc.setFontSize(12);
  doc.text(`Grand Total: Rs. ${purchase.totalAmount}`, 14, finalY);

  doc.save(`purchase-${purchase.invoiceNumber}.pdf`);
}

export function exportInventoryPdf(products) {
  const doc = new jsPDF();

  doc.setFontSize(18);
  doc.text("Inventory Report", 14, 18);

  autoTable(doc, {
    startY: 28,
    head: [[
      "Product",
      "SKU",
      "Category",
      "Stock",
      "Min Stock",
      "Cost Price",
      "Stock Value",
    ]],
    body: products.map((product) => [
      product.name,
      product.sku,
      product.categoryName,
      product.quantity,
      product.minimumStock,
      `₹${product.costPrice}`,
      `₹${product.quantity * product.costPrice}`,
    ]),
  });

  doc.save("inventory-report.pdf");
}
