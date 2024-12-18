import { ToolTip } from "@/components/ui/custom-tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { useEditorStore } from "@/store/use-editor-store";
import { ListCollapseIcon } from "lucide-react";

const lineHeights = [
  {
    label: "Default",
    value: "normal",
  },
  {
    label: "1",
    value: "1",
  },
  {
    label: "1.25",
    value: "1.25",
  },
  {
    label: "1.5",
    value: "1.5",
  },
  {
    label: "1.75",
    value: "1.75",
  },
  {
    label: "2",
    value: "2",
  },
  {
    label: "2.25",
    value: "2.25",
  },
  {
    label: "2.5",
    value: "2.5",
  },
  {
    label: "2.75",
    value: "2.75",
  },
  {
    label: "3",
    value: "3",
  },
];

export const LineHeightButton = () => {
  const { editor } = useEditorStore();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="h-7 w-7 shrink-0 flex items-center justify-center rounded-sm hover:bg-neutral-200/80 overflow-hidden">
          <ToolTip content="Line Height">
            <ListCollapseIcon className="h-4 w-4" />
          </ToolTip>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-1 flex flex-col gap-y-1">
        {lineHeights.map(({ label, value }) => (
          <button
            key={value}
            onClick={() => editor?.chain().focus().setLineHeight(value).run()}
            className={cn(
              "flex items-center justify-between px-2 py-1.5 rounded-sm hover:bg-neutral-200/80 w-full",
              editor?.getAttributes("paragraph").lineHeight === value &&
                "bg-neutral-200/80",
            )}
          >
            <span className="text-sm">{label}</span>
          </button>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
