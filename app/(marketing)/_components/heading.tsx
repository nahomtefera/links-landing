'use client';

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Authenticated, Unauthenticated, AuthLoading } from "convex/react";
import {SignInButton} from "@clerk/clerk-react"
import Spinner from "@/components/ui/spinner";
import Link from "next/link";
import { appName } from "@/lib/utils";

const Heading = () => {

    return ( 
        <div className="max-w-3xl space-y-4">
            <h1 className="text-3xl sm:text-5xl md:text-6xl">
                Your Ideas, Documents, and Plans. Unified. Welcome to <span className="underline">{appName}</span>
            </h1>
            <h3 className="text-base sm:text-xl md:text-2xl font-medium">
                LinksPage is the connected workspace where <br/>
                better, faster works happen.
            </h3>

            <Unauthenticated>
                <SignInButton mode="modal">
                    <Button size="sm">
                        Get {appName} Free
                        <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                </SignInButton>                        
            </Unauthenticated>

            <AuthLoading>
                <div className="w-full flex items-center justify-center">
                    <Spinner size="lg" />
                </div>
            </AuthLoading>

            <Authenticated>
                <Button asChild>
                    <Link href="/documents"> 
                        Enter {appName}
                        <ArrowRight className="h-4 w-4 ml-2" />
                    </Link>
                </Button>
            </Authenticated>

        </div>
     );
}
 
export default Heading;