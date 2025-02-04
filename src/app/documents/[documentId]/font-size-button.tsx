import { ToolTip } from "@/components/ui/custom-tooltip";
import { useEditorStore } from "@/store/use-editor-store";
import { MinusIcon, PlusIcon } from "lucide-react";
import { useState, useEffect, useCallback } from "react";

export const FontsizeButton = () => {
  const { editor } = useEditorStore();

  const currentFontSize = editor?.getAttributes("textStyle").fontSize
    ? editor?.getAttributes("textStyle").fontSize.replace("px", "")
    : "16";

  const [fontSize, setFontSize] = useState(currentFontSize);
  const [inputValue, setInputValue] = useState(fontSize);
  const [isEditing, setIsEditing] = useState(false);

  const MAX_FONT_SIZE = 200;

  const updateFontSize = (newFontSize: string) => {
    const size = parseInt(newFontSize);
    if (!isNaN(size) && size > 0 && size <= MAX_FONT_SIZE) {
      editor?.chain().focus().setFontSize(`${size}px`).run();
      setFontSize(newFontSize);
      setInputValue(newFontSize);
      setIsEditing(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const size = parseInt(value);

    if (!isNaN(size) && size > 0) {
      setInputValue(value);
    } else if (value === "") {
      setInputValue("");
    }
  };

  const handleInputBlur = () => {
    if (parseInt(inputValue) > MAX_FONT_SIZE) {
      setInputValue(MAX_FONT_SIZE.toString());
    }
    updateFontSize(inputValue);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleInputBlur();
      editor?.commands.focus();
    }
  };

  const increment = () => {
    const newFontSize = Math.min(parseInt(fontSize) + 1, MAX_FONT_SIZE);
    updateFontSize(newFontSize.toString());
  };

  const decrement = () => {
    const newFontSize = parseInt(fontSize) - 1;
    if (newFontSize > 0) {
      updateFontSize(newFontSize.toString());
    }
  };

  const handleKeyboardShortcuts = useCallback(
    (e: KeyboardEvent) => {
      if (e.altKey && e.key === "+") {
        e.preventDefault();
        increment();
      }
      if (e.altKey && e.key === "-") {
        e.preventDefault();
        decrement();
      }
    },
    [increment, decrement]
  ); // Include increment and decrement in the dependency array

  useEffect(() => {
    window.addEventListener("keydown", handleKeyboardShortcuts);

    return () => {
      window.removeEventListener("keydown", handleKeyboardShortcuts);
    };
  }, [handleKeyboardShortcuts]); // Use the memoized version of handleKeyboardShortcuts

  return (
    <div className="flex items-center gap-x-0.5">
      <button
        onClick={decrement}
        className="h-7 w-7 shrink-0 flex items-center justify-center rounded-sm hover:bg-neutral-200/80"
      >
        <ToolTip content="Decrease font size" shortCut="Alt+Minus">
          <MinusIcon className="size-4" />
        </ToolTip>
      </button>
      {isEditing ? (
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          onKeyDown={handleKeyDown}
          className="h-7 w-10 text-sm text-center border border-neutral-400 rounded-sm bg-transparent focus:outline-none focus:ring-0"
        />
      ) : (
        <button
          className="h-7 w-10 text-sm text-center border border-neutral-400 rounded-sm bg-transparent cursor-text"
          onClick={() => {
            setIsEditing(true);
            setFontSize(currentFontSize);
            setInputValue(currentFontSize);
          }}
        >
          {currentFontSize}
        </button>
      )}
      <button
        onClick={increment}
        className="h-7 w-7 shrink-0 flex items-center justify-center rounded-sm hover:bg-neutral-200/80"
      >
        <ToolTip content="Increase font size" shortCut="Alt+Plus">
          <PlusIcon className="size-4" />
        </ToolTip>
      </button>
    </div>
  );
};
