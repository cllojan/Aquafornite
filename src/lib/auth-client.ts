import { createAuthClient } from "better-auth/react";
export const authClient = createAuthClient({
    baseURL: process.env.BETTER_AUTH_URL!,
    disableCSRFCheck:process.env.NODE_ENV ==="development"
     
});
export const { signIn, signOut, useSession } = authClient;