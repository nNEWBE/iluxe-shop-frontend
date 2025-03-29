import React from "react";
import { ConfigProvider, Dropdown, Space, Tag } from "antd";
import type { MenuProps, TableColumnsType } from "antd";
import {
  useDeleteOrderMutation,
  useGetSingleUserOrdersQuery,
} from "../redux/api/order/orderApi";
import { IOrder } from "../components/shared/NavBar/NavUtils";
import TableProvider from "../components/ui/Table/Table";
import { toast } from "sonner";
import { ApiError } from "../error/error";
import { useAppSelector } from "../redux/hooks";
import { useCurrentToken } from "../redux/features/auth/authSlice";
import { useGetMeQuery } from "../redux/api/user/userApi";

interface DataType {
  _id: string;
  key: React.Key;
  email: string;
  totalProduct: number;
  totalPrice: number;
  status: "Pending" | "Paid" | "Shipped" | "Completed" | "Cancelled";
}

const ViewOrders: React.FC = () => {
  const token = useAppSelector(useCurrentToken);
  const { data: user } = useGetMeQuery(token);
  const userId = user?.data?._id;

  const { data, isFetching } = useGetSingleUserOrdersQuery(
    { user_id: userId },
    {
      skip: !userId,
    }
  );

  const [deleteOrder] = useDeleteOrderMutation();

  const order: IOrder[] = data?.data || [];

  const handleDelete = async (id: string) => {
    const toastId = toast.loading("Order deleting...");
    try {
      await deleteOrder(id).unwrap();
      toast.success("Order deleted successfully", { id: toastId });
    } catch (error) {
      const message =
        (error as ApiError)?.data?.error?.details?.[0]?.message ||
        "Something went wrong";
      toast.error(message, { id: toastId });
    }
  };


  const columns: TableColumnsType<DataType> = [
    {
      title: "No",
      dataIndex: "key",
    },
    {
      title: "Customer",
      dataIndex: "email",
    },
    {
      title: "Total Product",
      dataIndex: "totalProduct",
    },
    {
      title: "Total Price",
      dataIndex: "totalPrice",
    },
    {
      title: "Status",
      dataIndex: "status",
      filters: [
        { text: "Pending", value: "Pending" },
        { text: "Paid", value: "Paid" },
        { text: "Shipped", value: "Shipped" },
        { text: "Completed", value: "Completed" },
        { text: "Cancelled", value: "Cancelled" },
      ],
      onFilter: (value, record) => record.status.includes(value as string),
      render: (item) => {
        const statusColors: Record<string, string> = {
          Pending: "orange",
          Paid: "blue",
          Shipped: "purple",
          Completed: "green",
          Cancelled: "red",
        };
        return (
          <ConfigProvider
            theme={{
              token: { fontFamily: "Madimi One" },
            }}
          >
            <Tag color={statusColors[item] || "default"}>{item}</Tag>
          </ConfigProvider>
        );
      },
    },
    {
      title: "Action",
      key: "operation",
      render: (_, record) => {


        const items: MenuProps["items"] = [
          {
            key: "1",
            label: (
              <p
                onClick={() => handleDelete(record._id)}
              >
                Delete
              </p>
            ),
          }
        ];

        return (
          <Space size="middle">
            <Dropdown menu={{ items }}>
              <a className="cursor-pointer">Actions</a>
            </Dropdown>
          </Space>
        );
      },
    },
  ];

  const orderData: DataType[] = order.map(
    ({ _id, user, products, totalPrice, status }, index) => ({
      _id,
      key: index + 1,
      email: user?.email || "N/A",
      totalProduct: products?.length || 0,
      totalPrice,
      status,
    })
  );

  return (
    <TableProvider<DataType>
      isFetching={isFetching}
      columnsData={columns}
      data={orderData}
      paginationConfig={{
        pageSize: 6,
        total: orderData.length,
        showSizeChanger: false,
      }}
    />
  );
};

export default ViewOrders;
