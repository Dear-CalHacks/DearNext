"use client";

import { useState } from "react";
import {
	Dialog,
	DialogBackdrop,
	DialogPanel,
	TransitionChild,
} from "@headlessui/react";
import {
	HeartIcon,
	FolderIcon,
	UserGroupIcon,
	HomeIcon,
	UsersIcon,
	XMarkIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import FamilyCard from "../components/family/FamilyCard";

const navigation = [
	{ name: "Home", href: "/home", icon: HomeIcon, current: false },
	{ name: "Family", href: "/family", icon: HeartIcon, current: true },
	{ name: "Friends", href: "/friends", icon: UserGroupIcon, current: false },
];

function classNames(...classes) {
	return classes.filter(Boolean).join(" ");
}

export default function Family() {
	const [sidebarOpen, setSidebarOpen] = useState(false);

	return (
		<>
			<div className="flex h-screen text-neutral-700">
				{/* Desktop Sidebar */}
				<div className="flex flex-col min-w-64">
					<div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6">
						<div className="flex h-16 items-center">
							<Image
								src="/advait.jpeg"
								alt="Your Company"
								width={32}
								height={32}
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
														"group flex gap-x-3 rounded-md p-6 text-sm font-semibold leading-6"
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
										<Image
											src="/advait.jpeg"
											alt=""
											width={32}
											height={32}
											className="h-8 w-8 rounded-full bg-gray-50"
										/>
										<span className="sr-only">Your profile</span>
										<span aria-hidden="true">Joe Biden</span>
									</a>
								</li>
							</ul>
						</nav>
					</div>
				</div>

				{/* Content Area 1 */}
				<div className="w-1/3 flex">
					<div className="p-10 w-full">
						<h1 className="text-2xl font-bold pb-4">Family Members</h1>
						<FamilyCard name="John Doe" userID="119319" age="20" relationship="Son"/>
					</div>
				</div>

			</div>
		</>
	);
}
