import { Suspense } from "react";
import { ProductsTable } from "@/components/dashboard/products/products-table";
import { ProductsTableSkeleton } from "@/components/dashboard/products/products-table-skeleton";

export default function ProductsPage() {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Products</h2>
        <p className="text-muted-foreground">
          Manage your product inventory and catalog
        </p>
      </div>
      
      <Suspense fallback={<ProductsTableSkeleton />}>
        <ProductsTable />
      </Suspense>
    </div>
  );
}