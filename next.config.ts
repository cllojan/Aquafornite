import type { NextConfig } from "next";
import withPlaiceholder from "@plaiceholder/next";

const nextConfig: NextConfig = {  

  images:{        
    remotePatterns: [
        {
          protocol: 'https',
          hostname: 'media.fortniteapi.io',              
        },
        {
         protocol:"https",
         hostname:"fortnite-api.com" 
        },
        {
          protocol:"https",
          hostname:"cdn.fortnite-api.com" 
         },
        {
          protocol: 'https',
          hostname: 'placehold.co',              
        },
        {
          protocol: 'https',
          hostname: 'fakeimg.pl',
        },
      ],
}
};

export default withPlaiceholder(nextConfig);
