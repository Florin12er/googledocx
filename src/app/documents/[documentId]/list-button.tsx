import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { useEditorStore } from "@/store/use-editor-store";
import { ListIcon, ListOrdered } from "lucide-react";

export const ListButton = () => {
  const { editor } = useEditorStore();
  const list = [
    {
      label: "Bullet List",
      icon: ListIcon,
      isActive: () => editor?.isActive("bulletList"),
      onClick: () => editor?.chain().focus().toggleBulletList().run(),
      shortcut: "Ctrl + Shift + 8",
    },
    {
      label: "Ordered List",
      icon: ListOrdered,
      isActive: () => editor?.isActive("orderedList"),
      onClick: () => editor?.chain().focus().toggleOrderedList().run(),
      shortcut: "Ctrl + Shift + 7",
    },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="h-7 w-7 shrink-0 flex items-center justify-center rounded-sm hover:bg-neutral-200/80 overflow-hidden">
          <ListIcon className="h-4 w-4" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-1 flex flex-col gap-y-1">
        {list.map(({ label, icon: Icon, shortcut, onClick, isActive }) => (
          <button
            key={label}
            onClick={onClick}
            className={cn(
              "flex items-center justify-between px-2 py-1.5 rounded-sm hover:bg-neutral-200/80 w-full",
              isActive() && "bg-neutral-200/80",
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
