import React from "react";
import { useState, useEffect } from "react";

import { 
  DropdownMenu,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem
} from "@/components/ui/dropdown-menu";

import { ChevronDown, LucideIcon, MoreHorizontal, Plus, Trash, Settings2 } from "lucide-react";
import "./cardBlock.css";

const cardStyles = {
  backgroundColor: "#ffffff", // White background
  color: "#333", // Dark text
  border: "1px solid #ddd", // Subtle border
  borderRadius: "8px", // Rounded corners
  padding: "16px",
  maxWidth: "600px",
  margin: "20px auto",
  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)", // Subtle shadow
};

const titleStyles = {
  fontSize: "2rem", // Large, bold text
  fontWeight: "bold",
  userSelect: "none"
};

const linkStyles = {
  color: "#0077b6", // Subtle blue link text
  textDecoration: "none",
  fontSize: "1.4rem", // Medium-sized link text
  userSelect: "none"
};

const descriptionStyles = {
  fontSize: "1.2rem", // Medium-sized text
  marginTop: "12px",
  textAlign: "center",
};

const imageStyles = {
  width: "100%",
  borderRadius: "8px",
  marginTop: "16px",
};

const flatCardStyles = {
  backgroundColor: "#f0f0f0", // Light gray background
  color: "#666", // Gray text
  padding: "12px",
  borderRadius: "8px",
  marginTop: "20px",
};

const flatTextStyles = {
  fontSize: "1.2rem", // Medium-sized text
};

const CardBlock = ({ block, editor }) => {
    // console.log("editor: ", editor);
    // console.log("editor options ", editor.options.editable);
  const editable = editor.options.editable;
  const blockId = block.id;
  let initialValues;
  if(block.content !== undefined) {
    if(block.content[0] !== undefined) {
        initialValues = JSON.parse(block?.content[0]?.text)
    }
  }

  const [input1, setInput1] = useState(initialValues?.input1 || "");
  const [input2, setInput2] = useState(initialValues?.input2 || "");

  const onHandleChange = (value:string, stateName:string) => {
    if (stateName === "input1") {
      setInput1(value);
      editor.updateBlock(editor.getBlock(blockId), {
        content: JSON.stringify({ input1: value, input2: input2 }),
      });
    } else {
      setInput2(value);
      editor.updateBlock(editor.getBlock(blockId), {
        content: JSON.stringify({ input1: input1, input2: value }),
      });
    }
  };
  
  const onDelete = () =>{
    editor.removeBlocks([editor.getBlock(blockId)])
  }

  return (
    <>
      <div style={cardStyles}>
        {editable && (
            <div className="flex items-right justify-end gap-x-2" style={{display:"flex", flexDirection:"column"}}>
              <DropdownMenu>
                <DropdownMenuTrigger
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                  asChild
                >
                  <div
                    role="button"
                    className="opacity-0 group-hover:opacity-100 h-full rounded-sm hover-bg-neutral-300 dark:hover-bg-neutral-600"
                    style={{alignSelf:"end"}}
                  >
                    <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-60" align="start" side="right" forceMount>
                  <DropdownMenuItem onClick={onDelete}>
                    <Trash className="h-4 w-4 mr-2" />
                    Delete
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={()=>{}}>
                    <Settings2 className="h-4 w-4 mr-2" />
                    Styles
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={()=>{}}>
                    <Plus className="h-4 w-4 mr-2" />
                    Thing
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
          </div>
        )}

        { input1 && (
          <div style={titleStyles}>{input1}</div>
        )}
        
        {input2 && 
          <p style={linkStyles}>{input2}</p>
        }
        
      </div>
      {
        editable && (
            <div style={{display: "flex", justifyItems:"center", justifyContent:"center"}}>
                <input
                    style={{
                        border: "1px solid #efefef",
                        borderRadius: "10px",
                        padding: ".5em",
                        margin: ".2em"
                    }}
                    value={input1}
                    onChange={(e) => {
                    onHandleChange(e.target.value, "input1");
                    }}
                />
                <input
                    style={{
                        border: "1px solid #efefef",
                        borderRadius: "10px",
                        padding: ".5em",
                        margin: ".2em"
                    }}
                    value={input2}
                    onChange={(e) => {
                    onHandleChange(e.target.value, "input2");
                    }}
                />
            </div>
        )
      }

    </>
  );
};

export default CardBlock;
