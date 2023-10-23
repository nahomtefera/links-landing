'use client';

import EmojiPicker, { Theme } from "emoji-picker-react";
import { useTheme } from "next-themes";
import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";

interface IconPickerProps {
    onChange: (icon:string) => void;
    children: React.ReactNode;
    asChild?: boolean;
}
const IconPicker = ({
    onChange,
    children,
    asChild
}: IconPickerProps) => {
    const { resolvedTheme } = useTheme();
    const currentTheme = (resolvedTheme || "Light") as keyof typeof themeMap;
    const themeMap = {
        "dark": Theme.DARK,
        "light": Theme.LIGHT
    }
    const theme = themeMap[currentTheme];


    return ( 
        <Popover>
            <PopoverTrigger asChild>
                {children}
            </PopoverTrigger>
            <PopoverContent className="p-0 w-full border-none shadow-none"> 
                <EmojiPicker 
                    height={350}
                    theme={theme}
                    onEmojiClick={(data) => onChange(data.emoji)}
                />
            </PopoverContent>
        </Popover>
    );
}
 
export default IconPicker;