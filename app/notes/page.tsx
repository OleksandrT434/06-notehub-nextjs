import AppPage from "./notes.client";
import { fetchNotes } from "@/lib/api";
import type { PaginatedNotes } from "@/lib/api";

interface NotesPageProps {
  page?: number;
  perPage?: number;
}

export default async function NotesPage({ page = 1, perPage = 12 }: NotesPageProps) {
  const initialData: PaginatedNotes = await fetchNotes(page, perPage, "");
  return <AppPage initialData={initialData} />;
}
