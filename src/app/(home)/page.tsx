"use client";

import { usePaginatedQuery } from "convex/react";
import { Navbar } from "./navbar";
import TemplateGalery from "./template-galery";
import { api } from "../../../convex/_generated/api";
import { DocumentsTable } from "./documents-table";
import { useSearchParam } from "../../../hooks/use-search-param";

export default function Page() {
  const [search] = useSearchParam("search");

  const { results, status, loadMore } = usePaginatedQuery(
    api.documents.getDocuments,
    { search },
    { initialNumItems: 5 }
  );
  return (
    <div className="min-h-screen flex flex-col">
      <div className="fixed top-0 left-0 right-0 z-10 h-16 bg-white p-4">
        <Navbar />
      </div>
      <div className="mt-16">
        <TemplateGalery />
        <DocumentsTable
          documents={results}
          loadMore={loadMore}
          status={status}
        />
      </div>
    </div>
  );
}
