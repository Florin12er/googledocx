import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useEditorStore } from "@/store/use-editor-store";
import { Copy, Link2Icon } from "lucide-react";
import { ToolTip } from "@/components/ui/custom-tooltip";

const DEFAULT_URL = "https://";
const COPY_TIMEOUT = 2000;

const useLinkValue = (editor: any) => {
  const [value, setValue] = useState(DEFAULT_URL);

  useEffect(() => {
    if (!editor) return;

    const updateValue = () => {
      const currentHref = editor.getAttributes("link")?.href || DEFAULT_URL;
      setValue(currentHref);
    };

    editor.on("transaction", updateValue);
    return () => editor.off("transaction", updateValue);
  }, [editor]);

  return [value, setValue] as const;
};

const useCopyState = () => {
  const [copied, setCopied] = useState(false);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), COPY_TIMEOUT);
  };

  return [copied, handleCopy] as const;
};

export const LinkButton: React.FC = () => {
  const { editor } = useEditorStore();
  const [value, setValue] = useLinkValue(editor);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [copied, handleCopy] = useCopyState();
  const inputRef = useRef<HTMLInputElement>(null);

  const onChange = (href: string) => {
    editor?.chain().focus().extendMarkRange("link").setLink({ href }).run();
    setValue(DEFAULT_URL);
    setDropdownOpen(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onChange(value);
      setDropdownOpen(false);
    }
  };

  const handleDropdownOpen = () => {
    setDropdownOpen(true);
    setTimeout(() => inputRef.current?.focus(), 0);
  };

  useEffect(() => {
    const handleKeyDownShortcut = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === "L") {
        e.preventDefault();
        setDropdownOpen((prev) => !prev);
        if (!dropdownOpen) {
          // Focus input only when opening
          setTimeout(() => inputRef.current?.focus(), 0);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDownShortcut);

    return () => {
      window.removeEventListener("keydown", handleKeyDownShortcut);
    };
  }, [dropdownOpen]);

  return (
    <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
      <DropdownMenuTrigger asChild>
        <button
          className="h-7 min-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm"
          onClick={handleDropdownOpen}
        >
          <ToolTip content="Insert link" shortCut="Ctrl+Shift+L">
            <Link2Icon className="size-4" />
            <div className="h-0.5 w-full" style={{ backgroundColor: value }} />
          </ToolTip>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-2.5 flex items-center gap-x-2">
        <Input
          ref={inputRef}
          placeholder="https://example.com"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <Button
          variant="outline"
          onClick={() => handleCopy(value)}
          className={`flex items-center gap-x-2 py-1 px-2 rounded-md hover:bg-neutral-200 focus:outline-none ${copied ? "bg-green-200" : ""}`}
        >
          <Copy className="text-sm" />
          <span
            className={`text-sm ${copied ? "text-green-600" : "text-neutral-600"}`}
          >
            {copied ? "Copied!" : "Copy"}
          </span>
        </Button>
        <Button onClick={() => onChange(value)}>Apply</Button>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
