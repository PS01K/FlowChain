import { useAuth } from "@clerk/clerk-react";
import { Navigate } from "react-router-dom";

export function ProtectedRoute({ children }) {
  const { isSignedIn, isLoaded } = useAuth();

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

  return children;
}
