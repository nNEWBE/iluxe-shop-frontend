import React from "react";
import { ConfigProvider, Dropdown, Space, Tag } from "antd";
import type { MenuProps, TableColumnsType } from "antd";
import {
  useBlockUserMutation,
  useGetAllUsersQuery,
} from "../redux/api/user/userApi";
import { Author } from "../components/home/FeaturedProducts/FeaturedProducts.types";
import TableProvider from "../components/ui/Table/Table";
import { toast } from "sonner";
import { ApiError } from "../error/error";

interface DataType {
  _id: string;
  key: React.Key;
  name: string;
  email: string;
  role: string;
  isBlocked: boolean;
}

const ManageUsers: React.FC = () => {
  const { data, isFetching } = useGetAllUsersQuery(undefined);
  const [blockUser] = useBlockUserMutation();
  const user: Author[] = data?.data;

  const handleUnblock = async (id: string) => {
    const toastId = toast.loading("User unblocking");
    try {
      await blockUser({ id, isBlocked: false });
      toast.success("User unblocked successfully", {
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

  const handleBlock = async (id: string) => {
    const toastId = toast.loading("User blocking");
    try {
      await blockUser({ id, isBlocked: true });
      toast.success("User blocked successfully", {
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
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Role",
      dataIndex: "role",
    },
    {
      title: "Status",
      dataIndex: "isBlocked",
      filters: [
        { text: "Blocked", value: "true" },
        { text: "Unblocked", value: "false" },
      ],
      onFilter: (value, record) => record.isBlocked === (value === "true"),
      render: (item) => (
        <ConfigProvider
          theme={{
            token: {
              fontFamily: "Madimi One",
            },
          }}
        >
          <Tag color={item ? "volcano" : "blue"}>
            {item ? "Blocked" : "Active"}
          </Tag>
        </ConfigProvider>
      ),
    },
    {
      title: "Action",
      key: "operation",
      render: (_, record) => {
        const items: MenuProps["items"] = [
          record.isBlocked
            ? {
                key: "1",
                label: <p onClick={() => handleUnblock(record._id)}>Unblock</p>,
              }
            : {
                key: "1",
                label: <p onClick={() => handleBlock(record._id)}>Block</p>,
              },
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

  const userData: DataType[] = user?.map(
    ({ _id, name, email, role, isBlocked }, index) => ({
      _id: _id,
      key: index + 1,
      name,
      email,
      role,
      isBlocked,
    })
  );

  const paginationConfig = {
    pageSize: 6,
    total: userData?.length,
    showSizeChanger: false,
  };

  return (
    <TableProvider<DataType>
      isFetching={isFetching}
      columnsData={columns}
      data={userData}
      paginationConfig={paginationConfig}
    />
  );
};

export default ManageUsers;
