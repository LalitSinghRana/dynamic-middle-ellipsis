import { RotateCw } from "lucide-react";

import { Button } from "@/components/ui/button";

export function ButtonIcon() {
	return (
		<Button variant="secondary" size="icon" className="mr-2">
			<RotateCw className="h-4 w-4 animate-spin" />
		</Button>
	);
}

export function ButtonLoading() {
	return (
		<Button variant="destructive" size="xs" className="mr-2">
			<RotateCw className="mr-2 h-4 w-4 animate-spin" />
			Btn
		</Button>
	);
}
