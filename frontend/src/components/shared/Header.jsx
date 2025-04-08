import React, { Fragment } from 'react';
import { Menu, Popover, Transition } from '@headlessui/react';
import { HiOutlineBell, HiOutlineSearch, HiOutlineChatAlt, HiOutlineUser } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames';

export default function Header() {
	const navigate = useNavigate();

	return (
		<div className="bg-white h-16 px-6 flex items-center justify-between shadow-md">

			{/* Search Bar */}
			<div className="relative flex-grow mx-6">
				<HiOutlineSearch fontSize={20} className="text-gray-400 absolute top-1/2 left-3 -translate-y-1/2" />
				<input
					type="text"
					placeholder="Search..."
					className="text-sm focus:outline-none border border-gray-300 w-full h-10 pl-11 pr-4 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 transition duration-200"
				/>
			</div>

			{/* Notification and User Menu */}
			<div className="flex items-center gap-4">
				<Popover className="relative">
					{({ open }) => (
						<>
							<Popover.Button
								className={classNames(
									open ? 'bg-gray-100' : 'hover:bg-gray-50',
									'group inline-flex items-center rounded-lg p-2 text-gray-700 focus:outline-none'
								)}
							>
								<HiOutlineChatAlt fontSize={24} />
							</Popover.Button>
							<Transition
								as={Fragment}
								enter="transition ease-out duration-200"
								enterFrom="opacity-0 translate-y-1"
								enterTo="opacity-100 translate-y-0"
								leave="transition ease-in duration-150"
								leaveFrom="opacity-100 translate-y-0"
								leaveTo="opacity-0 translate-y-1"
							>
								<Popover.Panel className="absolute right-0 z-10 mt-2 transform w-64">
									<div className="bg-white rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 p-4">
										<strong className="text-gray-700 font-medium">Messages</strong>
										<div className="mt-2 text-sm text-gray-600">You have no new messages.</div>
									</div>
								</Popover.Panel>
							</Transition>
						</>
					)}
				</Popover>

				<Popover className="relative">
					{({ open }) => (
						<>
							<Popover.Button
								className={classNames(
									open ? 'bg-gray-100' : 'hover:bg-gray-50',
									'group inline-flex items-center rounded-lg p-2 text-gray-700 focus:outline-none'
								)}
							>
								<HiOutlineBell fontSize={24} />
							</Popover.Button>
							<Transition
								as={Fragment}
								enter="transition ease-out duration-200"
								enterFrom="opacity-0 translate-y-1"
								enterTo="opacity-100 translate-y-0"
								leave="transition ease-in duration-150"
								leaveFrom="opacity-100 translate-y-0"
								leaveTo="opacity-0 translate-y-1"
							>
								<Popover.Panel className="absolute right-0 z-10 mt-2 transform w-64">
									<div className="bg-white rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 p-4">
										<strong className="text-gray-700 font-medium">Notifications</strong>
										<div className="mt-2 text-sm text-gray-600">No new notifications.</div>
									</div>
								</Popover.Panel>
							</Transition>
						</>
					)}
				</Popover>

				<Menu as="div" className="relative">
					<div>
						<Menu.Button className="ml-2 bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-neutral-400">
							<span className="sr-only">Open user menu</span>
							<div
								className="h-10 w-10 rounded-full bg-sky-500 bg-cover bg-no-repeat bg-center"
								style={{ backgroundImage: 'url("https://source.unsplash.com/80x80?face")' }}
							>
								<span className="sr-only">User Profile</span>
							</div>
						</Menu.Button>
					</div>
					<Transition
						as={Fragment}
						enter="transition ease-out duration-100"
						enterFrom="transform opacity-0 scale-95"
						enterTo="transform opacity-100 scale-100"
						leave="transition ease-in duration-75"
						leaveFrom="transform opacity-100 scale-100"
						leaveTo="transform opacity-0 scale-95"
					>
						<Menu.Items className="origin-top-right z-10 absolute right-0 mt-2 w-48 rounded-lg shadow-md p-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
							<Menu.Item>
								{({ active }) => (
									<div
										onClick={() => navigate('profile')}
										className={classNames(
											active && 'bg-gray-100',
											'active:bg-gray-200 rounded-lg px-4 py-2 text-gray-700 cursor-pointer focus:bg-gray-200'
										)}
									>
										Your Profile
									</div>
								)}
							</Menu.Item>
							<Menu.Item>
								{({ active }) => (
									<div
										onClick={() => navigate('profile')}
										className={classNames(
											active && 'bg-gray-100',
											'active:bg-gray-200 rounded-lg px-4 py-2 text-gray-700 cursor-pointer focus:bg-gray-200'
										)}
									>
										Settings
									</div>
								)}
							</Menu.Item>
							<Menu.Item>
								{({ active }) => (
									<div
										className={classNames(
											active && 'bg-gray-100',
											'active:bg-gray-200 rounded-lg px-4 py-2 text-gray-700 cursor-pointer focus:bg-gray-200'
										)}
									>
										Sign out
									</div>
								)}
							</Menu.Item>
						</Menu.Items>
					</Transition>
				</Menu>
			</div>
		</div>
	);
}
