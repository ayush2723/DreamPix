import { withAuth } from "next-auth/middleware";

export default withAuth({
  callbacks: {
    authorized: ({ req, token }) => {
      const path = req.nextUrl.pathname;

      // Allow public routes
      if (path === "/" || path.startsWith("/sign-in") || path.startsWith("/sign-up")) {
        // For auth pages, redirect to home if already logged in
        if (token && (path === "/sign-in" || path.startsWith("/sign-in/") || path === "/sign-up" || path.startsWith("/sign-up/"))) {
          return false;
        }
        return true;
      }

      // Protect all other routes
      return !!token;
    },
  },
});

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};