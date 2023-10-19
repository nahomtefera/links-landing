'use client';

import { appName } from "@/lib/utils";
import {useConvexAuth} from "convex/react";
import {SignInButton, UserButton, useUser} from "@clerk/clerk-react"
import useScrollTop from "@/hooks/use-scroll-top";
import { cn } from "@/lib/utils";
import Logo from "./logo";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import Spinner from "@/components/ui/spinner";
import { Authenticated, Unauthenticated, AuthLoading } from "convex/react";
import Link from "next/link";

const Navbar = () => {
    const { isLoading, isAuthenticated } = useConvexAuth();
    const { user } = useUser();

    const scrolled = useScrollTop();
    console.log("auth status: ", isAuthenticated)
    console.log("user status: ", user)

    return ( 
        <div className={cn("z-50 bg-background dark:dark-background fixed top-0 flex items-center w-full p-6", scrolled && "border-b shadow-sm")}>
            <Logo />
            <div className="md:ml-auto md:justify-end sm:justify-start justify-between w-full flex items-center gap-x-2">
                <AuthLoading>
                    <Spinner/>
                </AuthLoading>
                <Unauthenticated>
                    <div className="justify-start">
                        <SignInButton mode="modal">
                            <Button variant="ghost" size="lg">
                                Login
                            </Button>
                        </SignInButton>
                        <SignInButton mode="modal">
                            <Button size="sm">
                                Get {appName} Free
                            </Button>
                        </SignInButton>                        
                    </div>
                </Unauthenticated>
                <Authenticated>
                    <>
                        <Button variant="ghost" size="sm"> 
                            <Link href="/documents">
                                Enter {appName} 
                            </Link>
                        </Button>
                        <UserButton 
                            afterSignOutUrl="/"
                        />
                    </>
                </Authenticated>
                <ModeToggle />
            </div>
        </div> 
    );
}
 
export default Navbar;