/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // domains: [
    //   'avatars.githubusercontent.com',
    //   'lh3.googleusercontent.com',
    //   'res.cloudinary.com'
    // ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com'
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com'
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com'
      }
    ]
  }
}

export default nextConfig
