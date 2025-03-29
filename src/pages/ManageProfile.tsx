import { useAppSelector } from "../redux/hooks";
import { useCurrentToken } from "../redux/features/auth/authSlice";
import { useGetMeQuery } from "../redux/api/user/userApi";
import Title from "../components/ui/Title";
import { ConfigProvider, Tag } from "antd";
import Dialog from "../components/ui/Dialog";
import ManageProfileSkeleton from "../components/ui/Skeleton/ManageProfileSkeleton";

const ManageProfile = () => {
  const token = useAppSelector(useCurrentToken);
  const { data, isLoading } = useGetMeQuery(token);
  const userData = data?.data;

  if (isLoading) {
    return <ManageProfileSkeleton />;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Title word_1="Manage" word_2="Profile" />

      <div className="bg-white shadow-md border-2 border-secondary rounded-lg p-6">
        <div className="flex flex-col gap-5 sm:flex-row items-center justify-between">
          <div className="flex sm:text-start text-center flex-col sm:flex-row items-center gap-4 font-madimi text-gray-500">
            <p className="w-24 h-24 rounded-full border-2 border-secondary text-secondary bg-primary font-berkshire text-6xl flex items-center justify-center">
              {userData?.name.charAt(0)}
            </p>
            <div>
              <h2 className="text-2xl text-secondary font-berkshire font-semibold mb-1">
                {userData?.name}
              </h2>
              <p>
                Registered since {new Date(userData?.createdAt).toDateString()}
              </p>

              <div className="flex items-center sm:justify-start justify-center mt-1">
                <ConfigProvider
                  theme={{
                    token: {
                      fontFamily: "Madimi One",
                    },
                  }}
                >
                  <Tag color="blue">
                    {userData?.role.charAt(0).toUpperCase() +
                      userData?.role.slice(1)}
                  </Tag>
                  <Tag color={userData?.isBlocked ? "red" : "green"}>
                    {userData?.isBlocked ? "Blocked" : "Active"}
                  </Tag>
                </ConfigProvider>
              </div>
            </div>
          </div>

          <Dialog />
        </div>
      </div>

      <div className="bg-white shadow-md border-2 border-secondary rounded-lg font-madimi p-6 mt-6">
        <h3 className="text-lg font-semibold mb-4 font-berkshire">
          General Information
        </h3>
        <div className="grid sm:grid-cols-2 sm:gap-4 gap-1">
          <div className="flex gap-2">
            <p className="text-sm text-gray-500">Email:</p>
            <p className="text-md font-medium">{userData?.email}</p>
          </div>
          <div className="flex gap-2">
            <p className="text-sm text-gray-500">Contact:</p>
            <p className="text-md font-medium">{userData?.phone}</p>
          </div>
          <div className="flex gap-2">
            <p className="text-sm text-gray-500">Address:</p>
            <p className="text-md font-medium">{userData?.address}</p>
          </div>
          <div className="flex gap-2">
            <p className="text-sm text-gray-500">City:</p>
            <p className="text-md font-medium">{userData?.city}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageProfile;
