import { FaCircleCheck } from "react-icons/fa6";
import { IoMdInformationCircle } from "react-icons/io";
import { RiErrorWarningFill, RiLoader3Fill } from "react-icons/ri";
import { MdError } from "react-icons/md";

export const icons = {
    success: <FaCircleCheck className="text-lg text-green-500 rounded-full" />,
    info: <IoMdInformationCircle className="text-lg text-primary rounded-full" />,
    warning: <RiErrorWarningFill className="text-lg text-yellow-500 rounded-full" />,
    error: <MdError className="text-lg text-red-500 rounded-full" />,
    loading: <RiLoader3Fill className="text-lg text-secondary animate-spin rounded-full" />,
};
