import AppPage from "./Notes.client";
import { fetchNotes } from "@/lib/api";
import type { PaginatedNotes } from "@/lib/api";



export default async function NotesPage() {
  const initialData: PaginatedNotes = await fetchNotes(1, 12, "");
  return <AppPage initialData={initialData} />;
}