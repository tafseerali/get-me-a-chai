import withFlowbiteReact from "flowbite-react/plugin/nextjs";

/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: [
            'encrypted-tbn0.gstatic.com',
            'cdn-icons-png.flaticon.com', // any other external domains you use
            'lh3.googleusercontent.com', // Google profile images
        ]
    }
};

export default withFlowbiteReact(nextConfig);


