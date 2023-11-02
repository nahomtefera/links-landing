'use client';

import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { api } from "@/convex/_generated/api";
import { Doc } from "@/convex/_generated/dataModel";
import UseOrigin from "@/hooks/use-origin";
import { useMutation } from "convex/react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Check, Copy, Globe, ExternalLink } from "lucide-react";
import Link from "next/link";



interface PublishProps {
    initialData: Doc<"documents">
}

const Publish = ({
    initialData
}: PublishProps) => {
    
    const origin = UseOrigin()
    const update = useMutation(api.documents.update)
    const [copied, setCopied] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const url = `${origin}/preview/${initialData._id}`;

    const onPublish = () => {
        setIsSubmitting(true)

        const promise = update({
            id: initialData._id,
            isPublished: true,
            publishedContent: initialData.content
        })
         .finally(()=>{setIsSubmitting(false)})
        
        toast.promise(promise, {
            loading: "Publishing...",
            success: "Note published",
            error: "Failed to publish note."
        })
    }

    const onUnPublish = () => {
        setIsSubmitting(true)

        const promise = update({
            id: initialData._id,
            isPublished: false
        })
         .finally(()=>{setIsSubmitting(false)})
        
        toast.promise(promise, {
            loading: "Unpublishing...",
            success: "Note unpublished",
            error: "Failed to unpublish note."
        })
    }

    const onCopy = () => {
        navigator.clipboard.writeText(url);
        setCopied(true)

        setTimeout(()=>{
            setCopied(false)
        }, 1000)
    }

    const isDraft = initialData?.content?.trim() !== initialData?.publishedContent?.trim()

    return ( 
        <Popover>
            <PopoverTrigger asChild>
                <Button size="sm" variant="ghost">
                    {initialData.isPublished 
                        ? isDraft
                            ? "Publish"
                            : "Published"
                        : "Publish"
                    }
                    {initialData.isPublished && isDraft
                        ? <Globe className="text-yellow-500 w-4 h-4 ml-2"/>
                        : <Globe className="text-sky-500 w-4 h-4 ml-2"/>
                    }
                </Button>
            </PopoverTrigger>
            <PopoverContent
                className="w-72"
                align="end"
                alignOffset={8}
                forceMount
            >
                {initialData.isPublished ? (
                    <div className="space-y-4">
                        <div className="flex items-center gap-x-2">
                            {isDraft
                                ? <Globe className="text-yellow-500 animate-pulse h-4 w-4"/>
                                : <Globe className="text-sky-500 animate-pulse h-4 w-4"/>
                            }
                            
                            {isDraft 
                                ? <p className="text-sm font-medium text-yellow-500">
                                    New content
                                  </p>
                                : <p className="text-sm font-medium text-sky-500">
                                    This note is live
                                  </p>
                            }
                            
                            {isDraft
                                ? ""
                                : <Link href={`/preview/${initialData._id}`} target="_blank">
                                    <ExternalLink className="text-sky-500 w-4 h-4 ml-2"/>
                                  </Link>
                            }

                            
                        </div>
                        <div className="flex items-center">
                            <input 
                                value={url}
                                className="flex-1 px-2 text-xs rounded-l-md h-8 bg-muted truncate"
                                disabled
                            />
                            <Button
                                onClick={onCopy}
                                disabled={copied}
                                className="h-8 rounded-l-none"
                            > 
                                {copied ? (
                                    <Check className="h-4 w-4" />
                                ) : (
                                    <Copy className="h-4 w-4" />
                                )}
                            </Button>
                        </div>
                        {isDraft && (
                            <Button
                                disabled={isSubmitting}
                                onClick={onPublish}
                                className="w-full text-xs"
                                size="sm"
                            >
                                Publish
                            </Button>
                        )}
                        <Button
                            size="sm"
                            className="w-full text-xs"
                            disabled={isSubmitting}
                            onClick={onUnPublish}
                        >
                            Unpublish
                        </Button>
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center">
                        <Globe 
                            className="h-8 w-8 text-muted-foreground mb-2"
                        />
                        <p className="text-sm font-medium mb-2">
                            Publish this note
                        </p>
                        <span className="text-muted-foreground text-xs mb-4">
                            Share your work with others
                        </span>
                        <Button
                            disabled={isSubmitting}
                            onClick={onPublish}
                            className="w-full text-xs"
                            size="sm"
                        >
                            Publish
                        </Button>
                    </div>
                )}
            </PopoverContent>
        </Popover>
     );
}
 
export default Publish;