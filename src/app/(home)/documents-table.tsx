import { PaginationStatus } from "convex/react";
import { Doc } from "../../../convex/_generated/dataModel";
import { LoaderIcon } from "lucide-react";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { DocumentRow } from "./document-row";
import { Button } from "@/components/ui/button";

interface DocumentsTableProps {
  documents: Doc<"documents">[] | undefined;
  loadMore: (numItems: number) => void;
  status: PaginationStatus;
}

export function DocumentsTable({
  documents,
  loadMore,
  status,
}: DocumentsTableProps) {
  if (documents === undefined) {
    return (
      <div className="flex justify-center items-center h-24">
        <LoaderIcon className="animate-spin text-muted-foreground h-24" />
      </div>
    );
  }

  return (
    <div className="max-w-screen-xl mx-auto px-16 py-6 flex flex-col gap-5">
      <Table>
        {documents.length > 0 && (
          <TableHeader>
            <TableRow className="hover:bg-transparent border-none">
              <TableHead>Name</TableHead>
              <TableHead>&nbsp;</TableHead>
              <TableHead className="hidden md:table-cell">Shared</TableHead>
              <TableHead className="hidden md:table-cell">Created At</TableHead>
            </TableRow>
          </TableHeader>
        )}
        <TableBody>
          {documents.length === 0 ? (
            <TableRow className="hover:bg-transparent border-none">
              <TableCell
                className="h-24 text-center text-muted-foreground"
                colSpan={4}
              >
                No documents found
              </TableCell>
            </TableRow>
          ) : (
            documents.map((document) => (
              <DocumentRow key={document._id} document={document} />
            ))
          )}
        </TableBody>
      </Table>
      <div className="flex items-center justify-center gap-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => loadMore(5)}
          disabled={status !== "CanLoadMore"}
        >
          {status === "CanLoadMore" ? "Load More" : "End of Results"}
        </Button>
      </div>
    </div>
  );
}
