import { Suspense } from "react";
import { UsersTable } from "@/components/dashboard/users/users-table";
import { UsersTableSkeleton } from "@/components/dashboard/users/users-table-skeleton";

export default function UsersPage() {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Users</h2>
        <p className="text-muted-foreground">
          Manage user accounts and permissions
        </p>
      </div>
      
      <Suspense fallback={<UsersTableSkeleton />}>
        <UsersTable />
      </Suspense>
    </div>
  );
}