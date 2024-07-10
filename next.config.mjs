/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'lh3.googleusercontent.com', // this is for google
                pathname: '/a/**'
            },
            {
                hostname: 'utfs.io', // this is for upload my thing
            }
        ]
    }
};

export default nextConfig;
