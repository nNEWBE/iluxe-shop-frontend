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

  return (
    <div className="w-full overflow-x-auto">
      <div className="min-w-lg mx-auto p-6">
        <Title word_1="Manage" word_2="Profile" />

        {isLoading ? (
          <ManageProfileSkeleton />
        ) : (
          <div>
            <div className="bg-white border border-gray-300 rounded-lg p-6 mb-6">
              <div className="flex gap-5  items-center justify-between">
                <div className="flex text-start items-center gap-4 font-madimi text-gray-500">
                  {userData?.profileImage!=="N/A" ? (
                    <img
                      className="w-24 h-24 rounded-full border-2 border-secondary object-cover"
                      src={userData?.profileImage}
                      alt={userData?.name}
                    />
                  ) : (
                    <p className="w-24 h-24 rounded-full border-2 border-secondary text-secondary bg-primary font-berkshire text-6xl flex items-center justify-center">
                      {userData?.name.charAt(0).toUpperCase()}
                    </p>
                  )}
                  <div>
                    <h2 className="text-2xl text-secondary font-berkshire font-semibold mb-1">
                      {userData?.name}
                    </h2>
                    <p>
                      Registered since{" "}
                      {new Date(userData?.createdAt).toDateString()}
                    </p>

                    <div className="flex items-center justify-start mt-1">
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

            <div className="bg-white border border-gray-300 rounded-lg font-madimi p-6">
              <h3 className="text-lg font-semibold mb-4 font-berkshire">
                General Information
              </h3>
              <div className="grid grid-cols-2 gap-4 ">
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
        )}
      </div>
    </div>
  );
};

export default ManageProfile;
