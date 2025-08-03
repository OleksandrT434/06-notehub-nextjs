"use client"
import css from './page.module.css';


import Pagination from '@/components/Pagination/Pagination';
import { useState } from 'react';
import SearchBox from '@/components/SearchBox/SearchBox';
import Modal from '@/components/Modal/Modal';
import NoteList from '@/components/NoteList/NoteList';
import { useQuery, keepPreviousData} from '@tanstack/react-query';
import { fetchNotes} from '@/lib/api';
import NoteForm from '@/components/NoteForm/NoteForm';
import type { Note } from '../../types/note';

interface PaginatedNotes {
  notes: Note[];
  totalPages: number;
}
type AppPageProps = {
  initialData: PaginatedNotes;
};


import { useDebouncedCallback } from 'use-debounce';

export default function AppPage( { initialData }: AppPageProps) {
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [debouncedValue, setDebouncedValue] = useState('');

  const debounced = useDebouncedCallback((value: string) => {
    setDebouncedValue(value);
    setPage(1);
  }, 500)
  const handleSearch = (newInputSearch: string) => {
    setInputValue(newInputSearch);
    debounced(newInputSearch);
  }
  

  const { data } = useQuery<PaginatedNotes>({
    queryKey: ['notes', page, debouncedValue],
    queryFn: () => fetchNotes(page, 12, debouncedValue),
    placeholderData: keepPreviousData,
    initialData,
  });

    

  const notes = data?.notes ?? [];
  const totalPages = data?.totalPages ?? 1;

    return (
      <div className={css.app}>
      <header className={css.toolbar}>
          <SearchBox value={inputValue} onSearch={handleSearch} />
        <button className={css.button} onClick={() => {setIsModalOpen(true)}}>
        Create note +
        </button>
        </header>

        {notes.length === 0 && <p>No notes found.</p>}
        {notes.length > 0 && (
        <>
         
          {totalPages > 1 && (
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={setPage}
              />
            )} <NoteList notes={notes}/>
          </>
        )}
        {isModalOpen && (
              <Modal onClose={() => setIsModalOpen(false)}>
                <NoteForm onClose={() => setIsModalOpen(false)} />
              </Modal>
        )}
      </div>
    );
}
