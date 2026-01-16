import { useAuth, useUser } from "@clerk/clerk-react";
import { Navigate } from "react-router-dom";

export function RoleBasedRoute({ children, allowedRoles }) {
  const { isSignedIn, isLoaded } = useAuth();
  const { user } = useUser();

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (!isSignedIn) {
    return <Navigate to="/sign-in" replace />;
  }

  // Get user role from metadata (you'll set this in Clerk dashboard)
  const userRole = user?.publicMetadata?.role || 'worker';

  // Check if user's role is allowed
  if (!allowedRoles.includes(userRole)) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-2">Access Denied</h1>
          <p className="text-gray-600">You don't have permission to view this page.</p>
          <button 
            onClick={() => window.history.back()}
            className="mt-4 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return children;
}
