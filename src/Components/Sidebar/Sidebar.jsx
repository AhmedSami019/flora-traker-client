import { BrickWallShield, CalendarClock, Group, LayoutDashboard, NotebookPen } from "lucide-react";
import { Link } from "react-router";

const Sidebar = () => {
  // links
  const links = (
    <>
      <Link className="flex gap-2 items-center text-gray-600 py-2 px-4 font-medium hover:bg-base-300 rounded-md">
      <LayoutDashboard color="black"></LayoutDashboard>
        Dashboard
      </Link>
      <Link
        to={"/dashboard/MyPlants"}
        className="flex gap-2 items-center text-gray-600 py-2 px-4 font-medium hover:bg-base-300 rounded-md"
      >
        <Group color="black"></Group>
        My Collection
      </Link>
      <Link className="flex gap-2 items-center text-gray-600 py-2 px-4 font-medium hover:bg-base-300 rounded-md">
      <CalendarClock color="black"></CalendarClock>
        Care Calender
      </Link>
      <Link className="flex gap-2 items-center text-gray-600 py-2 px-4 font-medium hover:bg-base-300 rounded-md">
      <NotebookPen color="black"></NotebookPen>
        Plant Journal
      </Link>
      <Link className="flex gap-2 items-center text-gray-600 py-2 px-4 font-medium hover:bg-base-300 rounded-md">
      <BrickWallShield color="black" />
        Botanical Guide
      </Link>
    </>
  );

  return (
    <div className="bg-white p-2  w-80 h-full">
      <ul className="space-y-0.5 pl-5 mt-5 flex flex-col">{links}</ul>
    </div>
  );
};

export default Sidebar;
