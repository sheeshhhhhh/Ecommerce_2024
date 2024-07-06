/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                hostname: 'utfs.io' // this is for upload my thing
            }
        ]
    }
};

export default nextConfig;
