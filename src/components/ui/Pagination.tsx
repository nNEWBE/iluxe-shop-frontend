import { ArrowLeft, ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "./button";

const AMPagination = ({ totalPage }: { totalPage: number }) => {
  const location = useLocation();
  const navigate = useNavigate();

  // Extract current page from query params
  const queryParams = new URLSearchParams(location.search);
  const initialPage = parseInt(queryParams.get("page") || "1", 10);
  const [currentPage, setCurrentPage] = useState(initialPage);

  // Update state if URL changes externally (e.g., back/forward browser)
  useEffect(() => {
    const updatedPage = parseInt(new URLSearchParams(location.search).get("page") || "1", 10);
    setCurrentPage(updatedPage);
  }, [location.search]);

  const updatePage = (page: number) => {
    const params = new URLSearchParams(location.search);
    params.set("page", page.toString());
    navigate(`${location.pathname}?${params.toString()}`);
    setCurrentPage(page);
  };

  const handlePrev = () => {
    if (currentPage > 1) updatePage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPage) updatePage(currentPage + 1);
  };

  return (
    <div className="flex items-center gap-2 font-madimi my-5">
      <Button
        onClick={handlePrev}
        disabled={currentPage === 1}
        variant="outline"
        size="sm"
        className="w-8 h-8 rounded-sm flex items-center justify-center border-black"
      >
        <ArrowLeft />
      </Button>

      {[...Array(totalPage)].map((_, index) => (
        <Button
          key={index}
          onClick={() => updatePage(index + 1)}
          variant={currentPage === index + 1 ? "default" : "outline"}
          size="sm"
          className="w-8 h-8 rounded-sm flex items-center justify-center border-black"
        >
          {index + 1}
        </Button>
      ))}

      <Button
        onClick={handleNext}
        disabled={currentPage === totalPage}
        variant="outline"
        size="sm"
        className="w-8 h-8 rounded-sm flex items-center justify-center border-black"
      >
        <ArrowRight />
      </Button>
    </div>
  );
};

export default AMPagination;
