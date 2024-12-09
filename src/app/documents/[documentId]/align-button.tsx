import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { useEditorStore } from "@/store/use-editor-store";
import {
  AlignCenterIcon,
  AlignJustifyIcon,
  AlignLeftIcon,
  AlignRightIcon,
} from "lucide-react";

const alignments = [
  {
    label: "Align Left",
    value: "left",
    icon: AlignLeftIcon,
    shortcut: "Ctrl + Shift + L",
  },
  {
    label: "Align Center ",
    value: "center",
    icon: AlignCenterIcon,
    shortcut: " Ctrl + Shift + E",
  },
  {
    label: "Align Right",
    value: "right",
    icon: AlignRightIcon,
    shortcut: "Ctrl + Shift + R",
  },
  {
    label: "Align Justify",
    value: "justify",
    icon: AlignJustifyIcon,
    shortcut: "Ctrl + Shift + J",
  },
];

export const AlignButton = () => {
  const { editor } = useEditorStore();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="h-7 w-7 shrink-0 flex items-center justify-center rounded-sm hover:bg-neutral-200/80 overflow-hidden">
          <AlignLeftIcon className="h-4 w-4" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-1 flex flex-col gap-y-1">
        {alignments.map(({ label, value, icon: Icon, shortcut }) => (
          <button
            key={value}
            onClick={() => editor?.chain().focus().setTextAlign(value).run()}
            className={cn(
              "flex items-center justify-between px-2 py-1.5 rounded-sm hover:bg-neutral-200/80 w-full",
              editor?.isActive({ textAlign: value }) && "bg-neutral-200/80",
            )}
          >
            <div className="flex items-center gap-x-2">
              <Icon className="h-4 w-4" />
              <span className="text-sm">{label}</span>
            </div>
            <span className="text-xs text-gray-500 ml-2">{shortcut}</span>
          </button>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
