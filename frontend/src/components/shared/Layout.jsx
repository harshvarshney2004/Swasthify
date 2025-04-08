import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
// import AIChatbot from '../AIChatbot'; // Import the AIChatbot component

export default function Layout() {
	return (
		<div className="bg-neutral-100 h-screen w-screen overflow-hidden flex flex-row relative"> {/* Add relative to parent for fixed positioning */}
			<Sidebar />
			<div className="flex flex-col flex-1">
				<Header />
				<div className="flex-1 p-4 min-h-0 overflow-auto">
					<Outlet />
				</div>
			</div>

			{/* Fixed chatbot component */}
			{/* <div className="fixed bottom-5 right-5">
				<AIChatbot />
			</div> */}
		</div>
	);
}
