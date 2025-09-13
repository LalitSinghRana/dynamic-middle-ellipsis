"use client";

import {
	ResizableHandle,
	ResizablePanelGroup,
} from "@/components/ui/resizable";
import { ResizableEllipsisPanel } from "./ResizableEllipsisPanel";

export default function Home() {
	return (
		<div className="flex w-screen max-w-3xl h-screen justify-center items-center">
			<ResizablePanelGroup direction="horizontal">
				<ResizableEllipsisPanel />
				<ResizableHandle withHandle />
				<ResizableEllipsisPanel />
			</ResizablePanelGroup>
		</div>
	);
}
