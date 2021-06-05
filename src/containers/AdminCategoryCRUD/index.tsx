import React, { useEffect, useState } from "react";
import { loadEscortCategories } from "@api/escortCategory";
import { EscortCategory } from "@dbTypes/index";

interface Paginator {
  limit: number;
  offset: number;
  count: number;
  next: string | null;
  previous: string | null;
}

const paginatorInitial: Paginator = {
  count: 0,
  limit: 2,
  next: null,
  previous: null,
  offset: 1,
};

const AdminCategoryCRUD: React.FunctionComponent = () => {
  const [escortCategories, setEscortCategories] = useState<EscortCategory[]>(
    []
  );
  const [paginator, setPaginator] = useState<Paginator>(paginatorInitial);
  useEffect(() => {
    let mounted = true;
    const fetchEscortCategories = async () => {
      const response = await loadEscortCategories(
        paginator.limit,
        paginator.offset
      );
      if (mounted) {
        // setEscortCategories(response?.data?.results);
        // setPaginator({
        //   ...paginator,
        //   count: response?.data?.count,
        //   next: response?.data?.next,
        //   previous: response?.data?.previous,
        // });
      }
    };
    fetchEscortCategories();
    return () => {
      mounted = false;
    };
  }, [paginator.limit, paginator.offset]);

  return (
    <div>
      Category Crud
      {escortCategories.map((category) => (
        <div key={category.id}>{category.name}</div>
      ))}
      {paginator.next && (
        <button
          type="button"
          onClick={() =>
            setPaginator({ ...paginator, offset: paginator.offset + 1 })
          }
        >
          next
        </button>
      )}
      {paginator.previous && (
        <button
          type="button"
          onClick={() =>
            setPaginator({ ...paginator, offset: paginator.offset - 1 })
          }
        >
          previous
        </button>
      )}
      {paginator.count / paginator.limit}
    </div>
  );
};

export default AdminCategoryCRUD;
