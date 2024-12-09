import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface ToolTipProps {
  children: React.ReactNode;
  content: string;
  shortCut?: string;
}

export const ToolTip: React.FC<ToolTipProps> = ({
  children,
  content,
  shortCut,
}) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <span>{children}</span>
        </TooltipTrigger>
        <TooltipContent className="bg-neutral-700 rounded-md flex gap-2">
          <div>{content}</div>
          {shortCut && <div className="text-xs text-zinc-400">{shortCut}</div>}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
