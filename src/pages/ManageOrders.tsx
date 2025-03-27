import React from "react";
import { ConfigProvider, Dropdown, Space, Tag } from "antd";
import type { MenuProps, TableColumnsType } from "antd";
import { useGetAllOrdersQuery } from "../redux/api/order/orderApi";
import { Order } from "../components/shared/NavBar/NavUtils";
import TableProvider from "../components/ui/Table/Table";

interface DataType {
  _id: string;
  key: React.Key;
  email: string;
  name: string;
  available: number;
  ordered: number;
  status: "Pending" | "Shipping";
}


const ManageOrders: React.FC = () => {
  const { data, isFetching } = useGetAllOrdersQuery(undefined);
  const order: Order[] = data?.data;


  const columns: TableColumnsType<DataType> = [
    {
      title: "No",
      dataIndex: "key",
      rowScope: "row",
    },
    {
      title: "Customer",
      dataIndex: "email",
    },
    {
      title: "Product Name",
      dataIndex: "name",
    },
    {
      title: "Available",
      dataIndex: "available",
    },
    {
      title: "Ordered",
      dataIndex: "ordered",
    },
    {
      title: "Status",
      dataIndex: "status",
      filters: [
        { text: "Pending", value: "true" },
        { text: "Shipping", value: "false" },
      ],
      onFilter: (value, record) => record.status.includes(value as string),
      render: (item) => (
        <ConfigProvider
          theme={{
            token: {
              fontFamily: "Madimi One",
            },
          }}
        >
          <Tag color={item === "Pending" ? "green" : "blue"}>{item}</Tag>
        </ConfigProvider>
      ),
    },
    {
      title: "Action",
      key: "operation",
      dataIndex: "status",
      render: (item) => {
        const items: MenuProps["items"] = [
          { key: "1", label: "Delete" },
          ...(item !== "Shipping"
            ? [
                { type: "divider" as const },
                { key: "2", label: "Shipping" },
              ]
            : []),
        ];
        return (
          <Space size="middle">
            <Dropdown menu={{ items }}>
              <a>Actions</a>
            </Dropdown>
          </Space>
        );
      },
    },
  ];

  const orderData: DataType[] = order?.map(
    ({ _id, email, product, quantity, status }, index) => ({
      _id: _id,
      key: index + 1,
      email,
      name: product?.name,
      available: product?.quantity,
      ordered: quantity,
      status,
    })
  );

  const paginationConfig = {
    pageSize: 6,
    total: orderData?.length,
    showSizeChanger: false,
  };

  return (
      <TableProvider<DataType> isFetching={isFetching} columnsData={columns} data={orderData} paginationConfig={paginationConfig}/>
  );
};

export default ManageOrders;
