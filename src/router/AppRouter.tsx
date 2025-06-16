import { Routes, Route } from "react-router";
import MainLayout from "@/layouts/MainLayout";
import HomePage from "@/pages/Home";
import SearchPage from "@/pages/Search";
import SubjectsPage from "@/pages/Authors";

export default function AppRouter() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/subjects" element={<SubjectsPage />} />
      </Route>
    </Routes>
  );
}
