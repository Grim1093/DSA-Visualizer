export { default } from "next-auth/middleware";

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/learning/:path*",
    "/testing/:path*"
  ]
};
