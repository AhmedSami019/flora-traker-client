import { BrickWallShield, CalendarClock, Group, LayoutDashboard, NotebookPen } from "lucide-react";
import { Link } from "react-router";

const Sidebar = () => {
  // links
  const links = (
    <>
      <Link className="flex gap-2 items-center text-gray-600 py-2 px-4 font-medium hover:font-semibold">
      <LayoutDashboard color="black"></LayoutDashboard>
        Dashboard
      </Link>
      <Link
        to={"/dashboard/myTrees"}
        className="flex gap-2 items-center text-gray-600 py-2 px-4 font-medium hover:font-semibold"
      >
        <Group color="black"></Group>
        My Collection
      </Link>
      <Link className="flex gap-2 items-center text-gray-600 py-2 px-4 font-medium hover:font-semibold">
      <CalendarClock color="black"></CalendarClock>
        Care Calender
      </Link>
      <Link className="flex gap-2 items-center text-gray-600 py-2 px-4 font-medium hover:font-semibold">
      <NotebookPen color="black"></NotebookPen>
        Plant Journal
      </Link>
      <Link className="flex gap-2 items-center text-gray-600 py-2 px-4 font-medium hover:font-semibold">
      <BrickWallShield color="black" />
        Botanical Guide
      </Link>
    </>
  );

  return (
    <div className="bg-white p-2  w-80">
      <ul className="space-y-0.5 pl-5 mt-5 flex flex-col">{links}</ul>
    </div>
  );
};

export default Sidebar;
