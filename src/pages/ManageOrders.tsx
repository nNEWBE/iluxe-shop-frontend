import React from "react";
import { ConfigProvider, Dropdown, Space, Tag } from "antd";
import type { MenuProps, TableColumnsType } from "antd";
import {
  useDeleteOrderMutation,
  useGetAllOrdersQuery,
  useUpdateOrderStatusMutation,
} from "../redux/api/order/orderApi";
import { IOrder } from "../components/shared/NavBar/NavUtils";
import TableProvider from "../components/ui/Table/Table";
import { toast } from "sonner";
import { ApiError } from "../error/error";

interface DataType {
  _id: string;
  key: React.Key;
  email: string;
  totalProduct: number;
  totalPrice: number;
  status: "Pending" | "Paid" | "Shipped" | "Completed" | "Cancelled";
}

const ManageOrders: React.FC = () => {
  const { data, isFetching } = useGetAllOrdersQuery(undefined);
  const [deleteOrder] = useDeleteOrderMutation(undefined);
  const [updateOrderStatus] = useUpdateOrderStatusMutation(undefined);
  const order: IOrder[] = data?.data;

  const handleDelete = async (id: string) => {
    const toastId = toast.loading("Order deleting");
    try {
      await deleteOrder(id);
      toast.success("Order deleted successfully", {
        id: toastId,
        duration: 2000,
      });
    } catch (error: unknown) {
      if (typeof error === "object" && error !== null && "data" in error) {
        const apiError = error as ApiError;
        toast.error(
          apiError?.data?.error?.details?.[0]?.message ||
            "Something went wrong",
          {
            id: toastId,
            duration: 2000,
          }
        );
      } else {
        toast.error("Something went wrong", { id: toastId, duration: 2000 });
      }
    }
  };

  const handleChangeStatus = async (id: string, status: string) => {
    const toastId = toast.loading("Status changing");
    try {
      await updateOrderStatus({ id, status });
      toast.success("Status changed successfully", {
        id: toastId,
        duration: 2000,
      });
    } catch (error: unknown) {
      if (typeof error === "object" && error !== null && "data" in error) {
        const apiError = error as ApiError;
        toast.error(
          apiError?.data?.error?.details?.[0]?.message ||
            "Something went wrong",
          {
            id: toastId,
            duration: 2000,
          }
        );
      } else {
        toast.error("Something went wrong", { id: toastId, duration: 2000 });
      }
    }
  };

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
              token: {
                fontFamily: "Madimi One",
              },
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
        const availableStatuses = ["Pending", "Paid", "Shipped", "Completed"];
        const statusOptions = availableStatuses.filter(
          (status) => status !== record.status
        );

        const items: MenuProps["items"] = [
          {
            key: "1",
            label: (
              <p
                className="text-red-500"
                onClick={() => handleDelete(record._id)}
              >
                Delete
              </p>
            ),
          },
          { type: "divider" as const },
          ...statusOptions
            .flatMap((status, index) => [
              {
                key: `status-${index}`,
                label: (
                  <p
                    onClick={() => handleChangeStatus(record._id, status)}
                  >
                    {status}
                  </p>
                ),
              },
              index < statusOptions.length - 1
                ? { type: "divider" as const }
                : null, 
            ])
            .filter(Boolean), 
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

  const orderData: DataType[] = order?.map(
    ({ _id, user, products, totalPrice, status }, index) => ({
      _id: _id,
      key: index + 1,
      email: user?.email,
      totalProduct: products?.length,
      totalPrice,
      status,
    })
  );

  const paginationConfig = {
    pageSize: 6,
    total: orderData?.length,
    showSizeChanger: false,
  };

  return (
    <TableProvider<DataType>
      isFetching={isFetching}
      columnsData={columns}
      data={orderData}
      paginationConfig={paginationConfig}
    />
  );
};

export default ManageOrders;
