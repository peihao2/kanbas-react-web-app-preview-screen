import { BsPlus } from "react-icons/bs";
import { IoEllipsisVertical } from "react-icons/io5";
import './Assignments.css';

export default function BannerControlButtons() {
  return (
    <div className="float-end d-flex align-items-center">
      <button className="oval-button me-2">40% of Total</button>
      <BsPlus className="fs-4 me-2" />
      <IoEllipsisVertical className="fs-4" />
    </div>
  );
}