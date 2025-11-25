import { NavLink } from "react-router-dom";

const menu = [
  { label: "Dashboard", path: "/" },
  { label: "Applications", path: "/applications" },
  { label: "New Application", path: "/applications/new" },
];

function Sidebar() {
  return (
    <aside className='w-64 border-r h-screen p-4 bg-red'>
      <nav className='flex flex-col gap-4'>
        {menu.map((item) => (
          <NavLink key={item.label} to={item.path}>
            {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}

export default Sidebar;
