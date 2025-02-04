import React, { useRef, useState } from "react";
import { Id } from "../../../../convex/_generated/dataModel";
import { useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { useDebounce } from "../../../../hooks/use-debounce";
import { toast } from "sonner";
import { useStatus } from "@liveblocks/react";
import { BsCloudCheck, BsCloudSlash } from "react-icons/bs";
import { LoaderIcon } from "lucide-react";

interface DocumentInputProps {
  title: string;
  id: Id<"documents">;
}
export const DocumentInput = ({ title, id }: DocumentInputProps) => {
  const status = useStatus();
  const [value, setValue] = useState(title);
  const [isPending, setIsPending] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const mutate = useMutation(api.documents.updateById);

  const debounceUpdate = useDebounce((newValue: string) => {
    if (newValue === title) return;

    setIsPending(true);
    mutate({
      id,
      title: newValue,
    })
      .catch(() => {
        toast.error(
          "Access Denied: You don’t have permission to update this document. Only admins can perform this action."
        );
      })
      .finally(() => {
        setIsPending(false);
      });
  });
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);
    debounceUpdate(newValue);
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsPending(true);
    mutate({
      id,
      title: value,
    })
      .then(() => {
        setIsEditing(false);
      })
      .catch(() => {
        toast.error(
          "Access Denied: You don’t have permission to update this document. Only admins can perform this action."
        );
      })
      .finally(() => {
        setIsPending(false);
      });
  };
  const showLoader =
    isPending || status === "connecting" || status === "reconnecting";
  const showError = status === "disconnected";
  return (
    <div className="flex items-center gap-2 max-w-[50ch]">
      {isEditing ? (
        <form onSubmit={handleSubmit} className="relative w-fit">
          <span className="invisible whitespace-pre px-1.5 text-lg">
            {value || " "}
          </span>
          <input
            ref={inputRef}
            value={value}
            onChange={onChange}
            onBlur={() => setIsEditing(false)}
            className="absolute inset-0 text-lg text-black bg-transparent truncate"
          />
        </form>
      ) : (
        <span
          onClick={() => {
            setIsEditing(true);
            setTimeout(() => {
              inputRef.current?.focus();
            }, 0);
          }}
          className="text-lg px-1.5 cursor-pointer truncate"
        >
          {title}
        </span>
      )}
      {!showError && !showLoader && <BsCloudCheck className="size-4" />}
      {showError && <BsCloudSlash className="size-4" />}
      {showLoader && (
        <LoaderIcon className="size-4 animate-spin text-muted-foreground" />
      )}
    </div>
  );
};
