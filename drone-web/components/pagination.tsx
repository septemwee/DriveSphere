"use client";

import { useRouter, useSearchParams } from "next/navigation";

export default function Pagination({
  currentPage,
  totalPages,
}: {
  currentPage: number;
  totalPages: number;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const goToPage = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());
    router.push(`?${params.toString()}`);
  };

  const getPageNumbers = () => {
    const delta = 2;
    const range: number[] = [];
    const rangeWithDots: (number | string)[] = [];
    let l: number | undefined = undefined;

    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= currentPage - delta && i <= currentPage + delta)
      ) {
        range.push(i);
      }
    }

    for (let i of range) {
      if (l !== undefined) {
        if (i - l === 2) {
          rangeWithDots.push(l + 1);
        } else if (i - l !== 1) {
          rangeWithDots.push("...");
        }
      }
      rangeWithDots.push(i);
      l = i;
    }

    return rangeWithDots;
  };

  const Button = ({
    disabled,
    onClick,
    active,
    children,
  }: {
    disabled?: boolean;
    onClick?: () => void;
    active?: boolean;
    children: React.ReactNode;
  }) => (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`px-3 py-2 text-sm rounded-md transition-all ${
        disabled
          ? "bg-gray-100 text-gray-400 cursor-not-allowed"
          : active
          ? "bg-black text-white shadow hover:bg-gray-300"
          : "bg-gray-200 text-gray-700 hover:bg-gray-300"
      }`}
    >
      {children}
    </button>
  );

  return (
    <div className="flex items-center justify-center space-x-2 mt-6 select-none">

      <Button
        disabled={currentPage === 1}
        onClick={() => goToPage(currentPage - 1)}
      >
        ← Prev
      </Button>


      {getPageNumbers().map((pageNum, index) =>
        typeof pageNum === "number" ? (
          <Button
            key={index}
            onClick={() => goToPage(pageNum)}
            active={pageNum === currentPage}
          >
            {pageNum}
          </Button>
        ) : (
          <span key={index} className="px-2 text-gray-400">
            {pageNum}
          </span>
        )
      )}


      <Button
        disabled={currentPage === totalPages}
        onClick={() => goToPage(currentPage + 1)}
      >
        Next →
      </Button>
    </div>
  );
}
