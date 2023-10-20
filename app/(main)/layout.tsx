'use client';
import { useConvexAuth } from "convex/react";
import Spinner from "@/components/ui/spinner";
import { redirect } from "next/navigation";
import Navigation from "./components/navigation";


const MainLayout = ({ children }:{ children: React.ReactNode}) => {

    const { isLoading, isAuthenticated } = useConvexAuth();

    if(isLoading) {
        return (
            <div className="h-full flex items-center justify-center">
                <Spinner />
            </div>
        );
    }
    
    if(!isAuthenticated) {
        return redirect("/")
    }
    

    return ( 
        <div className="h-full flex dark:dark-background">
            <Navigation />
            <main className="flex-1 h-full overflow-y-auto">
                {children}
            </main>
        </div>
    );
}
 
export default MainLayout;