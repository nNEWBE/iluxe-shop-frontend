import { useEffect, useState } from "react";
import {  Table } from "antd";
import type { TableColumnsType } from "antd";

interface TableProps<T> {
  columnsData: TableColumnsType<T>;
  data: T[];
  paginationConfig?: Record<string, unknown>;
  isFetching?: boolean;
  children?: React.ReactNode;
}

const TableProvider = <T,>({
  columnsData,
  data,
  paginationConfig,
  isFetching,
  children,
}: TableProps<T>) => {
  const [scrollX, setScrollX] = useState("calc(550px + 50%)");

  useEffect(() => {
    const updateScrollX = () => {
      if (window.innerWidth <= 640) {
        setScrollX("calc(650px + 50%)");
      } else {
        setScrollX("calc(550px + 50%)");
      }
    };

    updateScrollX();
    window.addEventListener("resize", updateScrollX);

    return () => {
      window.removeEventListener("resize", updateScrollX);
    };
  }, []);

  return (
    <div>
      <Table<T>
        pagination={paginationConfig || false}
        loading={isFetching}
        columns={columnsData}
        dataSource={data}
        bordered
        scroll={{ x: scrollX }}
      />
      {children}
    </div>
  );
};

export default TableProvider;
