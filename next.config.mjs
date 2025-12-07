/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "raw.githubusercontent.com",
      "upload.wikimedia.org",
      "www.gstatic.com",
      "shadcn-ui.com",
      "cdn-icons-png.flaticon.com",
    ],
  },
  productionBrowserSourceMaps: false,
};

export default nextConfig;
