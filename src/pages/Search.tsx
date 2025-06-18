import AdvancedSearchForm from "@/Components/AdvancedSearch/AdvancedSearchForm";
import AdvancedSearchResults from "@/Components/AdvancedSearch/AdvancedSearchResults";
import PageHeader from "@/Components/Common/PageHeader";

const AdvancedSearchPage = () => {
  return (
    <>
      <PageHeader
        title="Advanced search"
        description="Use filters to refine your book search"
      />
      <AdvancedSearchForm />
      <AdvancedSearchResults />
    </>
  );
};

export default AdvancedSearchPage;
