import React from "react";
import { ConfigProvider, Dropdown, Space, Tag } from "antd";
import type { MenuProps, TableColumnsType } from "antd";
import { useGetAllUsersQuery } from "../redux/api/user/userApi";
import { Author } from "../components/home/FeaturedProducts/FeaturedProducts.types";
import TableProvider from "../components/ui/Table/Table";

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
  const user: Author[] = data?.data;

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
      dataIndex: "inStock",
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
            {item ? "Blocked" : "Unblocked"}
          </Tag>
        </ConfigProvider>
      ),
    },
    {
      title: "Action",
      key: "operation",
      render: () => {
        const items: MenuProps["items"] = [
          {
            key: "1",
            label: "Block",
          },
          { type: "divider" },
          { key: "2", label: "Unblock" },
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
