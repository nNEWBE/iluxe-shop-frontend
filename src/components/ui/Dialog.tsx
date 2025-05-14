import React, { useState } from "react";
import { Modal, Input, Form, Button, ConfigProvider, Image } from "antd";
import {
  useForm,
  Controller,
  SubmitHandler,
  FieldValues,
} from "react-hook-form";
import { FaUser, FaPhone, FaCity, FaMapMarkerAlt } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";
import {
  useGetMeQuery,
  useUpdateUserMutation,
} from "../../redux/api/user/userApi";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  setUpdatedUser,
  useCurrentToken,
} from "../../redux/features/auth/authSlice";
import { toast } from "sonner";
import { ApiError } from "../../error/error";

interface FormData {
  name: string;
  contact: number;
  address: string;
  city: string;
  image?: FileList;
}

const Dialog: React.FC = () => {
  const [open, setOpen] = useState(false);
  const { control, handleSubmit, reset, watch } = useForm<FormData>();
  const image = watch("image");
  const token = useAppSelector(useCurrentToken);
  const { data } = useGetMeQuery(token);
  const id = data?.data?._id;
  const [updateUser] = useUpdateUserMutation();
  const dispatch = useAppDispatch();

  const showModal = () => setOpen(true);
  const handleCancel = () => {
    reset();
    setOpen(false);
  };

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {

 const {image,...modifiedData}=data;
 console.log("🚀 ~ constonSubmit:SubmitHandler<FieldValues>= ~ image:", image)

    
    const formData = new FormData();
    formData.append("data", JSON.stringify(modifiedData));

    if (image) {
      formData.append("profileImage", image[0]);
    }

      const toastId = toast.loading("User updating...");
    try {
      const res = await updateUser({ id, data: formData }).unwrap();
      dispatch(setUpdatedUser({ name: res.data.name, profileImage: res.data.profileImage }));
      console.log("🚀 ~ constonSubmit:SubmitHandler<FieldValues>= ~ res:", res)
      setOpen(false);
      reset();
      toast.success("User updated successfully", { id: toastId, duration: 2000 });
    } catch (error: unknown) {
      if (typeof error === "object" && error !== null && "data" in error) {
        const apiError = error as ApiError;
        toast.error(
          apiError?.data?.error?.details?.[0]?.message || "Something went wrong",
          { id: toastId, duration: 2000 }
        );
      } else {
        toast.error("Something went wrong", { id: toastId, duration: 2000 });
      }
    }
 };

  return (
    <>
      <button
        onClick={showModal}
        className="flex cursor-pointer items-center gap-2 border-2 text-secondary px-4 py-1 rounded-md hover:bg-gray-200 transition"
      >
        <span className="text-sm font-madimi">Edit</span>
        <FaPencil className="size-3" />
      </button>

      <ConfigProvider
        theme={{
          token: {
            marginXS: 16,
            fontFamily: "Madimi One",
          },
        }}
      >
        <Modal
          centered
          open={open}
          onCancel={handleCancel}
          footer={null}
          width={350}
        >
          <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
            <h1 className="font-berkshire text-2xl mb-5">Edit Profile</h1>

            <Form.Item label="Name">
              <Controller
                name="name"
                control={control}
                render={({ field }) => (
                  <Input
                    prefix={<FaUser className="mr-2" />}
                    placeholder="Enter your name"
                    {...field}
                  />
                )}
              />
            </Form.Item>

            <Form.Item label="Contact">
              <Controller
                name="contact"
                control={control}
                render={({ field }) => (
                  <Input
                    prefix={<FaPhone className="mr-2" />}
                    placeholder="Enter your contact"
                    type="number"
                    {...field}
                  />
                )}
              />
            </Form.Item>

            <Form.Item label="Address">
              <Controller
                name="address"
                control={control}
                render={({ field }) => (
                  <Input
                    prefix={<FaMapMarkerAlt className="mr-2" />}
                    placeholder="Enter your address"
                    {...field}
                  />
                )}
              />
            </Form.Item>

            <Form.Item label="City">
              <Controller
                name="city"
                control={control}
                render={({ field }) => (
                  <Input
                    prefix={<FaCity className="mr-2" />}
                    placeholder="Enter your city"
                    {...field}
                  />
                )}
              />
            </Form.Item>

            <Form.Item label="Profile Image">
              <Controller
                name="image"
                control={control}
                render={({ field }) => (
                  <>
                    {!image?.[0] ? (
                      <div>
                        {/* Hidden file input */}
                        <input
                          type="file"
                          accept="image/*"
                          id="profileImageUpload"
                          className="sr-only"
                          onChange={(e) => field.onChange(e.target.files)}
                        />

                        {/* Label styled like an Ant Design input */}
                        <label
                          htmlFor="profileImageUpload"
                          className="block w-full border border-[#d9d9d9] rounded-md px-3 py-1.5 text-sm text-[#bfbfbf] bg-white cursor-pointer hover:border-[#4096ff] transition-all duration-150"
                        >
                          <div className="flex items-center gap-3">
                            <FaUser className="text-black" />
                            <span>Click to upload image</span>
                          </div>
                        </label>
                      </div>
                    ) : (
                      <div className="relative w-fit inline-block mt-2">
                        <Image
                          width={80}
                          height={80}
                          src={URL.createObjectURL(image[0])}
                          alt="Preview"
                          style={{ objectFit: "cover", borderRadius: 8 }}
                        />
                        <button
                          type="button"
                          onClick={() => field.onChange(undefined)}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs shadow"
                        >
                          ×
                        </button>
                      </div>
                    )}
                  </>
                )}
              />
            </Form.Item>

            <Button type="primary" htmlType="submit" block>
              Save Changes
            </Button>
          </Form>
        </Modal>
      </ConfigProvider>
    </>
  );
};

export default Dialog;
