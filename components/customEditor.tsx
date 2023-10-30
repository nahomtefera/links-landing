'use client';
import { useTheme } from "next-themes";
import { useEdgeStore } from "@/lib/edgestore";
import {
    BlockNoteEditor,
    BlockSchema,
    DefaultBlockSchema,
    PartialBlock,
    defaultBlockSchema,
    defaultProps,
} from "@blocknote/core";
import {
    BlockNoteView,
    useBlockNote,
    createReactBlockSpec,
    InlineContent,
    ReactSlashMenuItem,
    getDefaultReactSlashMenuItems,
} from "@blocknote/react";
import "@blocknote/core/style.css"
import { RiImage2Fill } from "react-icons/ri";
import CardBlock from "./customBlocks/cardBlock";

interface EditorProps {
    onChange: (value:string) => void;
    initialContent?: string;
    editable?: boolean;
}

const Editor = ({
    onChange,
    initialContent,
    editable,
}:EditorProps) => {
    const { resolvedTheme } = useTheme()
    const { edgestore } = useEdgeStore()

    const handleUpload = async (file: File) => {
        const response = await edgestore.publicFiles.upload({
            file
        })

        return response.url
    }


    // Creates a custom image block.
    const CUSTOM_CardBlock = createReactBlockSpec({
        type: "card",
        propSchema: defaultProps,
        containsInlineContent: true,
        render: ({ block, editor }) => (
        <>
            <CardBlock block={block} editor={editor} />
        </>
        ),
    });
    
    // The custom schema, which includes the default blocks and the custom image
    // block.
    const customSchema = {
        // Adds all default blocks.
        ...defaultBlockSchema,
        // Adds the custom image block.
        card: CUSTOM_CardBlock,
    } satisfies BlockSchema;

    // Creates a slash menu item for inserting an image block.
    const insert_CUSTOM_Card: ReactSlashMenuItem<typeof customSchema> = {
        name: "Insert Card Block",
        execute: (editor) => {

            editor.insertBlocks(
                [
                    {
                        type: "card",
                    },
                ],
                editor.getTextCursorPosition().block,
                "after",
            );
        },
        aliases: ["image", "img", "picture", "media"],
        group: "Media",
        icon: <RiImage2Fill />,
        hint: "Insert a card",
    };    

    const editor: BlockNoteEditor = useBlockNote({
        // Tells BlockNote which blocks to use.
        blockSchema: customSchema,
        slashMenuItems: [
            ...getDefaultReactSlashMenuItems(customSchema),
            insert_CUSTOM_Card,
        ],
        editable,
        initialContent: initialContent
          ? JSON.parse(initialContent) as PartialBlock[]
          : undefined,
        onEditorContentChange: (editor) => {
            onChange(JSON.stringify(editor.topLevelBlocks, null, 2))
        },
        uploadFile: handleUpload
    })

    return ( 
        <div>
            <BlockNoteView 
                editor={editor}
                theme={resolvedTheme === "dark" ? "dark" : "light"}
            />
        </div>
     );
}
 
export default Editor;