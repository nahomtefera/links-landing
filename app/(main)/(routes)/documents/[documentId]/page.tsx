'use client';

import Cover from "@/components/cover";
import Toolbar from "@/components/toolbar";
import dynamic from "next/dynamic";
import { useMemo, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react"
import { useMutation } from "convex/react"
import { Eye, EyeOff } from "lucide-react";

interface DocumentIdPageProps {
    params: {
        documentId: Id<"documents">
    }
}

const DocumentIdPage = ({
    params
}: DocumentIdPageProps) => {

    const Editor = useMemo(() => dynamic(() => import("@/components/customEditor"), { ssr: false }), [])
    const [previewEditor, setPreviewEditor] = useState(false)


    const document = useQuery(api.documents.getById, {
        documentId: params.documentId
    })

    const update = useMutation(api.documents.update)
    const handleClick = () => {
        setPreviewEditor(!previewEditor)
    }

    const onChange = (content: string) => {
        update({
            id: params.documentId,
            content
        })
    }

    if (document === undefined) {
        return (
            <div>
                <Cover.Skeleton />
                <div className="md:max-w-3xl lg:max-w-4xl mx-auto mt-10">
                    <div className="space-y-4 pl-8 pt-4">
                        <Skeleton className="h-14 w-[50%]"/>
                        <Skeleton className="h-4 w-[80%]"/>
                        <Skeleton className="h-4 w-[40%]"/>
                        <Skeleton className="h-4 w-[60%]"/>
                    </div>
                </div>
            </div>
        )
    }

    if (document === null) {
        return (
            <div>Not found.</div>
        )
    }

    return ( 
        <div className="pb-40">
            <Cover url={document.coverImage}/>
            <div className="md:max-w-3xl lg:max-w-4xl mx-auto">
                <Toolbar 
                    initialData={document}
                    previewEditor={previewEditor}
                    setPreviewEditor={setPreviewEditor}
                />
                
                {previewEditor && (
                    <Editor 
                        editable={false}
                        onChange={onChange}
                        initialContent={document.content}
                    />
                )}
                {!previewEditor && (
                    <Editor
                        editable={true}
                        onChange={onChange}
                        initialContent={document.content}
                    />
                )}
            </div>
        </div>
     );
}
 
export default DocumentIdPage;