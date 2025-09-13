import { Barrio, Ewert, WindSong } from "next/font/google";
import { ButtonIcon, ButtonLoading } from "@/components/ButtonLoading";
import MiddleEllipsis from "@/components/MiddleEllipsis";
import { Badge } from "@/components/ui/badge";
import { ResizablePanel } from "@/components/ui/resizable";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

const barrio = Barrio({ subsets: ["latin"], weight: "400" });
const ewert = Ewert({ subsets: ["latin"], weight: "400" });
const windSong = WindSong({ subsets: ["latin"], weight: "500" });

export const ResizableEllipsisPanel = () => (
	<ResizablePanel minSize={30}>
		<div className="flex flex-col gap-4 w-full h-full p-4">
			<div className="flex flex-col w-full relative whitespace-nowrap">
				<MiddleEllipsis.Span id="my-element-id">
					Ellipsis text in center automatically when element resize
				</MiddleEllipsis.Span>
			</div>
			<Separator />
			<div className="flex flex-col w-full relative whitespace-nowrap">
				<MiddleEllipsis.Span ellipsisSymbol=" [ - - - - - ] ">
					You can pass any custom separator string of your choice
				</MiddleEllipsis.Span>
			</div>
			<Separator />
			<div className="flex w-full relative whitespace-nowrap">
				<MiddleEllipsis.BoundingDiv>
					<Badge className="mr-2">
						<MiddleEllipsis.Span>Multiple</MiddleEllipsis.Span>
					</Badge>
					<Badge className="mr-2">
						<MiddleEllipsis.Span>Elements</MiddleEllipsis.Span>
					</Badge>
					<Badge>
						<MiddleEllipsis.Span>Sharing</MiddleEllipsis.Span>
					</Badge>
				</MiddleEllipsis.BoundingDiv>
			</div>
			<Separator />
			<div className="flex flex-col w-full relative min-h-[80px]">
				<MiddleEllipsis.Span lineLimit={3}>
					Want text to wrap to [x] number of lines (3 in this e.g.) before
					truncation start. Got that covered too.
				</MiddleEllipsis.Span>
			</div>
			<Separator />
			<div>
				<div className={cn("flex flex-col w-full relative whitespace-nowrap")}>
					<MiddleEllipsis.Span>
						Different font families and sizes:
					</MiddleEllipsis.Span>
				</div>
				<div
					className={cn(
						"flex flex-col w-full relative whitespace-nowrap",
						windSong.className,
					)}
				>
					<b>
						<MiddleEllipsis.Span className="text-3xl">
							Wind Song Font Family 3xl
						</MiddleEllipsis.Span>
					</b>
				</div>
				<div
					className={cn(
						"flex flex-col w-full relative whitespace-nowrap",
						barrio.className,
					)}
				>
					<MiddleEllipsis.Span className="text-4xl">
						Barrio Font Family 4XL
					</MiddleEllipsis.Span>
				</div>
				<div
					className={cn(
						"flex flex-col w-full relative whitespace-nowrap",
						ewert.className,
					)}
				>
					<b>
						<MiddleEllipsis.Span className="text-3xl">
							Ewert Font Family 3XL
						</MiddleEllipsis.Span>
					</b>
				</div>
			</div>
			<Separator />
			<div className="flex flex-col w-full relative">
				<Badge>
					<MiddleEllipsis.Span>
						Parent's width depend on the child, no issue.
					</MiddleEllipsis.Span>
				</Badge>
			</div>
			<div className="flex flex-col w-full relative">
				<Badge className="py-2">
					<ButtonLoading />
					<ButtonIcon />
					<MiddleEllipsis.Span>
						Other elements inside parent
					</MiddleEllipsis.Span>
				</Badge>
			</div>
			<div className="flex flex-col w-full relative">
				<Badge variant="outline">
					<Badge variant="destructive">
						<Badge variant="secondary">
							<Badge>
								<MiddleEllipsis.Span>
									Deep inside multiple elements without width
								</MiddleEllipsis.Span>
							</Badge>
						</Badge>
					</Badge>
				</Badge>
			</div>
			<Separator />
			<div className="flex flex-col w-full bg-orange-500 ">
				<div className="px-8 mx-8 my-2 bg-violet-800">
					<div className="flex flex-col w-100 px-2 my-2 relative whitespace-nowrap bg-primary text-primary-foreground font-semibold">
						<MiddleEllipsis.Span>
							Ancestor divs having padding & margin
						</MiddleEllipsis.Span>
					</div>
				</div>
			</div>
			<Separator />
		</div>
	</ResizablePanel>
);
