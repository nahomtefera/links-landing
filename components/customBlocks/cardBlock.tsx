import React from "react";
import { useState, useEffect } from "react";

import {
  BlockNoteView,
  useBlockNote,
  createReactBlockSpec,
  InlineContent,
  ReactSlashMenuItem,
  getDefaultReactSlashMenuItems,
} from "@blocknote/react";

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
  marginBottom: "8px",
  userSelect: "none"
};

const linkStyles = {
  color: "#0077b6", // Subtle blue link text
  textDecoration: "none",
  fontSize: "1.4rem", // Medium-sized link text
  marginTop: "8px",
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
    console.log("editor: ", editor);
    console.log("editor options ", editor.options.editable);
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
  

  return (
    <>
      <div style={cardStyles}>
        <div style={titleStyles}>{input1}</div>

        <p style={linkStyles}>{input2}</p>
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
