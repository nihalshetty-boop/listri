
import RequireAuth from "@/components/auth/RequireAuth";

export default function DashboardPage() {
  return (
    <RequireAuth>
      <div className="p-4">
        <h1 className="text-2xl font-semibold">Welcome to your dashboard!</h1>
        {/* Add actual content here */}
      </div>
    </RequireAuth>
  );
}
