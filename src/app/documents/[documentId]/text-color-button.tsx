import React, { useState, useEffect } from "react";
import { ToolTip } from "@/components/ui/custom-tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useEditorStore } from "@/store/use-editor-store";
import { type ColorResult, SketchPicker } from "react-color";

export const TextColorButton: React.FC = () => {
  const { editor } = useEditorStore();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const value = editor?.getAttributes("textStyle").color || "#000000";

  const onChange = (color: ColorResult) => {
    editor?.chain().focus().setColor(color.hex).run();
  };

  useEffect(() => {
    const handleKeyDownShortcut = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.altKey && e.key === "t") {
        e.preventDefault(); // Prevent default behavior
        setDropdownOpen((prev) => !prev); // Toggle dropdown state
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
          <ToolTip content="Text color" shortCut="Ctrl+Alt+t">
            <span className="text-xs">A</span>
            <div className="h-0.5 w-3.5" style={{ backgroundColor: value }} />
          </ToolTip>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-0">
        <SketchPicker color={value} onChange={onChange} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
