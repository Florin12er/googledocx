import React, { useState, useEffect } from "react";
import { ToolTip } from "@/components/ui/custom-tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useEditorStore } from "@/store/use-editor-store";
import { HighlighterIcon } from "lucide-react";
import { type ColorResult, SketchPicker } from "react-color";

export const HighlightColorButton: React.FC = () => {
  const { editor } = useEditorStore();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const value = editor?.getAttributes("highlight").color || "#000000";

  const onChange = (color: ColorResult) => {
    editor?.chain().focus().setHighlight({ color: color.hex }).run();
  };

  useEffect(() => {
    const handleKeyDownShortcut = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === "H") {
        e.preventDefault();
        setDropdownOpen((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyDownShortcut);

    return () => {
      window.removeEventListener("keydown", handleKeyDownShortcut);
    };
  }, []);

  return (
    <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
      <DropdownMenuTrigger asChild>
        <button className="h-7 min-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm">
          <ToolTip content="Highlight color" shortCut="Ctrl+Shift+H">
            <HighlighterIcon className="size-4" />
            <div className="h-0.5 w-full" style={{ backgroundColor: value }} />
          </ToolTip>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-0">
        <SketchPicker onChange={onChange} color={value} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
