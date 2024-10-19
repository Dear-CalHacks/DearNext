"use client";

import { useState } from "react";
import {
	Dialog,
	DialogBackdrop,
	DialogPanel,
	TransitionChild,
} from "@headlessui/react";
import {
	Bars3Icon,
	CalendarIcon,
	ChartPieIcon,
	DocumentDuplicateIcon,
	FolderIcon,
	HomeIcon,
	UsersIcon,
	XMarkIcon,
} from "@heroicons/react/24/outline";

const navigation = [
	{ name: "Home", href: "/home", icon: HomeIcon, current: false },
	{ name: "Family", href: "/family", icon: UsersIcon, current: true },
	{ name: "Friends", href: "/friends", icon: FolderIcon, current: false },
];

function classNames(...classes) {
	return classes.filter(Boolean).join(" ");
}

export default function Family() {
	const [sidebarOpen, setSidebarOpen] = useState(false);

	return (
		<>
			<div>
				{/* Desktop Sidebar */}
				<div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-64 lg:flex-col">
					<div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6">
						<div className="flex h-16 items-center">
							<img
								alt="Your Company"
								src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
								className="h-8 w-auto"
							/>
						</div>
						<nav className="flex flex-1 flex-col">
							<ul role="list" className="flex flex-1 flex-col gap-y-7">
								<li>
									<ul role="list" className="-mx-2 space-y-1">
										{navigation.map((item) => (
											<li key={item.name}>
												<a
													href={item.href}
													className={classNames(
														item.current
															? "bg-gray-50 text-indigo-600"
															: "text-gray-700 hover:bg-gray-50 hover:text-indigo-600",
														"group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6"
													)}
												>
													<item.icon
														aria-hidden="true"
														className={classNames(
															item.current
																? "text-indigo-600"
																: "text-gray-400 group-hover:text-indigo-600",
															"h-6 w-6 shrink-0"
														)}
													/>
													{item.name}
												</a>
											</li>
										))}
									</ul>
								</li>

								<li className="-mx-6 mt-auto">
									<a
										href="#"
										className="flex items-center gap-x-4 px-6 py-3 text-sm font-semibold leading-6 text-gray-900 hover:bg-gray-50"
									>
										<img
											alt=""
											src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
											className="h-8 w-8 rounded-full bg-gray-50"
										/>
										<span className="sr-only">Your profile</span>
										<span aria-hidden="true">Tom Cook</span>
									</a>
								</li>
							</ul>
						</nav>
					</div>
				</div>

				<main className="">
					<div className="">
						<div className="px-4 py-10">
              {/* Main area */}
            </div>
					</div>
				</main>

				<div className="fixed inset-y-0 right-96 hidden min-w-96 overflow-y-auto border-l border-gray-200 px-4 py-6 sm:px-6 lg:px-8 xl:block"></div>
			</div>
		</>
	);
}
