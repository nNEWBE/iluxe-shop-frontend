import React from "react";
import { ConfigProvider, Dropdown, Pagination, Space, Tag } from "antd";
import type { MenuProps, TableColumnsType } from "antd";
import { Product } from "../components/shared/NavBar/NavUtils";
import { categoryOptions } from "../components/ui/Filter/FilterUtils";
import {
  useDeleteProductMutation,
  useGetAllProductsQuery,
} from "../redux/api/product/productApi";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { selectParams, setParams } from "../redux/features/filter/filterSlice";
import { Link } from "react-router-dom";
import TableProvider from "../components/ui/Table/Table";
import { toast } from "sonner";
import { ApiError } from "../error/error";

interface DataType {
  _id: string;
  key: React.Key;
  productImage: string;
  name: string;
  category: string;
  price: number;
  inStock: boolean;
}

const ManageProducts: React.FC = () => {
  const params = useAppSelector(selectParams);
  const dispatch = useAppDispatch();
  const [deleteProduct] = useDeleteProductMutation(undefined);
  const { data, isFetching } = useGetAllProductsQuery(params);
  const cardData: Product[] = data?.data?.result;
  const metaData = data?.data?.meta;
  const currentPage = parseInt(params.page) || 1;

  const handleDelete = async (id: string) => {
    const toastId = toast.loading("Product deleting");
    try {
      await deleteProduct(id);
      toast.success("Product deleted successfully", {
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

  const handleFilterChange = (key: string, value: string) => {
    dispatch(setParams([{ key, value }]));
  };

  const columns: TableColumnsType<DataType> = [
    {
      title: "No",
      dataIndex: "key",
      rowScope: "row",
    },
    {
      title: "Image",
      dataIndex: "productImage",
      rowScope: "row",
      render: (item) => (
        <img
          className="w-20 h-12 object-cover rounded-md border-2 border-secondary"
          src={item}
        />
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
      showSorterTooltip: { target: "full-header" },
    },
    {
      title: "Category",
      dataIndex: "category",
      filters: categoryOptions?.map((category) => ({
        text: category.label,
        value: category.value,
      })),
      onFilter: (value, record) => record.category.includes(value as string),
    },
    {
      title: "Price",
      dataIndex: "price",
      sorter: (a, b) => a.price - b.price,
    },
    {
      title: "Stock",
      dataIndex: "inStock",
      filters: [
        { text: "In Stock", value: "true" },
        { text: "Out of Stock", value: "false" },
      ],
      onFilter: (value, record) => record.inStock === (value === "true"),
      render: (item) => (
        <ConfigProvider
          theme={{
            token: {
              fontFamily: "Madimi One",
            },
          }}
        >
          <Tag color={item ? "blue" : "volcano"}>
            {item ? "In Stock" : "Out of Stock"}
          </Tag>
        </ConfigProvider>
      ),
    },
    {
      title: "Action",
      key: "operation",
      render: (_, record) => {
        const items: MenuProps["items"] = [
          {
            key: "1",
            label: <Link to={`/product/${record._id}`}>Details</Link>,
          },
          { type: "divider" },
          { type: "divider" },
          {
            key: "2",
            label: <p onClick={() => handleDelete(record._id)}>Delete</p>,
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

  const productData: DataType[] = cardData?.map(
    ({ _id, productImage, name, category, price, inStock }, index) => ({
      _id: _id,
      key: index + 1,
      productImage,
      name,
      category,
      price,
      inStock,
    })
  );

  return (
    <TableProvider<DataType>
      isFetching={isFetching}
      columnsData={columns}
      data={productData}
    >
      <div className="flex justify-end my-2">
        <ConfigProvider
          theme={{
            token: {
              fontFamily: "Madimi One",
            },
          }}
        >
          <Pagination
            pageSize={6}
            current={currentPage}
            defaultCurrent={1}
            total={metaData?.total || 0}
            onChange={(page) => {
              handleFilterChange("page", `${page}`);
            }}
          />
        </ConfigProvider>
      </div>
    </TableProvider>
  );
};

export default ManageProducts;
