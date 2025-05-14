import { Link, useSearchParams } from "react-router-dom";
import { useVerifyOrderQuery } from "../redux/api/order/orderApi";
import { ConfigProvider, Tag } from "antd";
import { AlertCircle, CheckCircle } from "lucide-react";
import Title from "../components/ui/Title";
import Button from "../components/ui/UiButton";
import { HiOutlineDocumentReport } from "react-icons/hi";
import { RiHome9Line } from "react-icons/ri";
import VerifyOrderSkeleton from "../components/ui/Skeleton/VerifyOrderSkeleton";

export default function VerifyOrder() {
  const [searchParams] = useSearchParams();
  const { isLoading, data } = useVerifyOrderQuery(
    searchParams.get("order_id"),
    { refetchOnMountOrArgChange: true }
  );

  const orderData = data?.data?.[0];

  return isLoading ? (
    <VerifyOrderSkeleton />
  ) : (
    <div className="container font-madimi mx-auto my-10 px-6 max-w-4xl">
      <Title word_1="Order" word_2="Verification" />

      <div className="grid gap-6 sm:grid-cols-2">
        <InfoCard title="Order Details">
          <InfoRow label="Order ID" value={orderData?.order_id} />
          <InfoRow
            label="Amount"
            value={`${orderData?.currency} ${orderData?.amount?.toFixed(2)}`}
          />
          <InfoRow
            label="Status"
            value={
              <ConfigProvider
                theme={{
                  token: {
                    fontFamily: "Madimi One",
                  },
                }}
              >
                <Tag
                  color={
                    orderData?.bank_status === "Success"
                      ? "blue"
                      : orderData?.bank_status === "Cancel"
                      ? "orange"
                      : orderData?.bank_status === "Failed"
                      ? "volcano"
                      : "default"
                  }
                >
                  {orderData?.bank_status}
                </Tag>
              </ConfigProvider>
            }
          />
          <InfoRow
            label="Date"
            value={new Date(orderData?.date_time)?.toLocaleString()}
          />
        </InfoCard>

        <InfoCard title="Payment Information">
          <InfoRow label="Method" value={orderData?.method} />
          <InfoRow label="Transaction ID" value={orderData?.bank_trx_id} />
          <InfoRow label="Invoice No" value={orderData?.invoice_no} />
          <InfoRow label="SP Code" value={orderData?.sp_code} />
          <InfoRow label="SP Message" value={orderData?.sp_message} />
        </InfoCard>

        <InfoCard title="Customer Information">
          <InfoRow label="Name" value={orderData?.name} />
          <InfoRow
            label="Email"
            value={
              orderData?.email?.length > 20
                ? orderData?.email?.slice(0, 20) + "..."
                : orderData?.email
            }
          />
          <InfoRow label="Phone" value={orderData?.phone_no} />
          <InfoRow label="Address" value={orderData?.address} />
          <InfoRow label="City" value={orderData?.city} />
        </InfoCard>

        <div className="border-2 border-secondary rounded-lg shadow-md p-6 flex flex-col justify-center items-center bg-gray-100">
          <h2 className="text-xl font-semibold font-berkshire mb-3">
            Verification Status
          </h2>
          <div className="flex items-center gap-2 text-lg">
            {orderData?.bank_status === "Success" ? (
              <>
                <CheckCircle className="text-green-500" size={24} />
                <span className="text-green-600 font-medium">Verified</span>
              </>
            ) : (
              <>
                <AlertCircle className="text-red-500" size={24} />
                <span className="text-red-600 font-medium">
                  {orderData?.bank_status === "Cancel" ||
                  orderData?.bank_status === "Failed"
                    ? "Not Verified"
                    : "Pending Verification"}
                </span>
              </>
            )}
          </div>
          <div className="flex justify-between gap-2 md:gap-10 mt-5 flex-wrap">
            <div>
              <Link to="/user/dashboard/view-orders" className="w-full mt-4">
                <Button icon={<HiOutlineDocumentReport />} text="View Orders" />
              </Link>
            </div>
            <div>
              <Link to="/" className="w-full mt-4">
                <Button icon={<RiHome9Line />} text="Go Home" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

interface InfoCardProps {
  title: string;
  children: React.ReactNode;
}

const InfoCard: React.FC<InfoCardProps> = ({ title, children }) => {
  return (
    <div className="border-2 border-secondary rounded-lg shadow-md p-4 bg-white">
      <h2 className="text-lg font-berkshire mb-2">{title}</h2>
      <div className="flex flex-col gap-2">{children}</div>
    </div>
  );
};

interface InfoRowProps {
  label: string;
  value?: React.ReactNode;
}

const InfoRow: React.FC<InfoRowProps> = ({ label, value }) => {
  return (
    <div className="flex justify-between gap-2">
      <span className="font-semibold text-gray-700">{label}:</span>
      <span className="text-gray-600">{value}</span>
    </div>
  );
};
