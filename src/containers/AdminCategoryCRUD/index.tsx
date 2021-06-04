import React, {useEffect, useState} from "react";
import {loadEscortCategories} from "@api/escortCategory";
import {EscortCategory} from "@dbTypes/index";

interface Paginator {
  limit: number,
  offset: number,
  count: number,
  next: string | null,
  previous: string | null
}

const paginatorInitial: Paginator = {
  count: 0,
  limit: 2,
  next: null,
  previous: null,
  offset: 1
}

const AdminCategoryCRUD = () => {
  const [escortCategories, setEscortCategories] = useState<EscortCategory[]>([]);
  const [paginator, setPaginator] = useState<Paginator>(paginatorInitial);
  useEffect(() => {
    const fetchEscortCategories = async () => {
      const response = await loadEscortCategories(paginator.limit, paginator.offset);
      setEscortCategories(response?.data?.results);
      setPaginator({
        ...paginator,
        count: response?.data?.count,
        next: response?.data?.next,
        previous: response?.data?.previous
      })
    };
    fetchEscortCategories();
  }, [paginator.offset])
  return <div>
    Category Crud
    {escortCategories.map(category => <div key={category.id}>{category.name}</div>)}
    {paginator.next && <div
      onClick={() => setPaginator({...paginator, offset: paginator.offset + 1})}
    >
      next
    </div>}
    {paginator.previous && <div
      onClick={() => setPaginator({...paginator, offset: paginator.offset - 1})}
    >
      previous
    </div>}
    {paginator.count/paginator.limit}
  </div>
}

export default AdminCategoryCRUD;