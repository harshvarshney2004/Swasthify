import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import classNames from 'classnames';
import {
    DOCTOR_SIDEBAR_LINKS,
  DOCTOR_SIDEBAR_BOTTOM_LINKS,
  PATIENT_SIDEBAR_LINKS,
  PATIENT_SIDEBAR_BOTTOM_LINKS,
} from '../../lib/constants';
import { HiOutlineLogout } from 'react-icons/hi';

const linkClass =
  'flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-200 group';

export default function Sidebar() {
  const userType = localStorage.getItem('userType');
  const sidebarLinks = userType === 'Doctor' ? DOCTOR_SIDEBAR_LINKS : PATIENT_SIDEBAR_LINKS;
  const sidebarBottomLinks = userType === 'Doctor' ? DOCTOR_SIDEBAR_BOTTOM_LINKS : PATIENT_SIDEBAR_BOTTOM_LINKS;

  return (
    <div className="group bg-white text-black h-screen w-20 hover:w-60 transition-all duration-300 overflow-hidden border-r border-gray-200 shadow-sm flex flex-col">
      <div className="flex items-center px-4 py-6">
        {/* <span className="text-lg font-bold text-gray-800 hidden group-hover:inline">
          SWASTHIFY
        </span> */}
      </div>

      <div className="flex-1 flex flex-col gap-1 px-2">
        {sidebarLinks.map((link) => (
          <SidebarLink key={link.key} link={link} />
        ))}
      </div>

      <div className="flex flex-col gap-1 px-2 py-2 border-t border-gray-200">
        {sidebarBottomLinks.map((link) => (
          <SidebarLink key={link.key} link={link} />
        ))}
        <Link to="/home" className={classNames(linkClass, 'text-red-500 hover:text-red-600')}>
          <HiOutlineLogout className="text-xl transition-colors" />
          <span className="hidden group-hover:inline text-sm font-medium">
            Logout
          </span>
        </Link>
      </div>
    </div>
  );
}

function SidebarLink({ link }) {
  const { pathname } = useLocation();
  const isActive = pathname === link.path;

  return (
    <Link
      to={link.path}
      className={classNames(
        linkClass,
        isActive
          ? 'bg-gray-100 font-semibold text-blue-600'
          : 'text-black hover:text-blue-600'
      )}
    >
      <span className="text-xl group-hover:text-blue-600 transition-colors">
        {link.icon}
      </span>
      <span className="hidden group-hover:inline text-sm font-medium transition-colors">
        {link.label}
      </span>
    </Link>
  );
}
