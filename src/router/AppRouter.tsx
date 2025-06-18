import { Routes, Route } from "react-router";
import AppLayout from "@/layouts/AppLayout/AppLayout";
import HomePage from "@/pages/Home";
import SearchPage from "@/pages/Search";
import BooksDetails from "../pages/BookDetails";

export default function AppRouter() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/works/:bookId" element={<BooksDetails />} />
      </Route>
    </Routes>
  );
}
