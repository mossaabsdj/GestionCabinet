import React from "react";
import { TableRow, TableCell } from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";

export function TableSkeletonRows({ columns = 3, rows = 5, widths = [] }) {
  return (
    <>
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <TableRow
          key={`skeleton-row-${rowIndex}`}
          className="hover:bg-transparent"
        >
          {Array.from({ length: columns }).map((_, colIndex) => {
            const widthClass = widths[colIndex] || "w-3/4";
            const isLastCol = colIndex === columns - 1;

            return (
              <TableCell
                key={`skeleton-cell-${rowIndex}-${colIndex}`}
                className={isLastCol ? "text-center" : ""}
              >
                <div
                  className={`h-5 rounded-md bg-[var(--color-200)]/60 animate-pulse ${
                    isLastCol ? "mx-auto inline-block" : ""
                  } ${widthClass}`}
                />
              </TableCell>
            );
          })}
        </TableRow>
      ))}
    </>
  );
}

export function TableLoadingIndicator({ message = "Chargement en cours..." }) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-[var(--color-600)]">
      <div className="w-8 h-8 border-3 border-[var(--color-600)] border-t-transparent rounded-full animate-spin mb-3" />
      <p className="text-sm font-medium text-gray-600">{message}</p>
    </div>
  );
}

export default TableSkeletonRows;
