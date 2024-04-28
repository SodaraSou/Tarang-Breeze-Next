"use client";
import AdminLayout from "@/app/AdminLayout";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { getUsers } from "@/services/user";
import { deleteVenue } from "@/services/venue";
import { DiailogVenue } from "@/components/DiailogVenue";
import { IoMenu } from "react-icons/io5";
import { Input } from "@/components/ui/input";
import { updateVenue } from "@/services/venue";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuTrigger,
	DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";

function UserPage() {
	const { data, isLoading } = useQuery({
		queryFn: getUsers,
		queryKey: ["getUsersKey"],
	});
	// const handleDelete = async (id) => {
	// 	const response = await deleteVenue(id);
	// 	if (response.status === 204) {
	// 		alert("Successfully Deleted!");
	// 	}
	// };

	// const [dialog, setDialog] = useState(null);

	// const [updateData, setUpdateData] = useState({
	// 	name: "",
	// 	size: 0,
	// 	sportType: 0,
	// 	description: "",
	// 	photo: "",
	// });

	// const onChange = (e) => {
	// 	e.preventDefault();
	// 	if (e.target.id === "photo") {
	// 		setUpdateData((prevState) => ({
	// 			...prevState,
	// 			[e.target.id]: e.target.files[0],
	// 		}));
	// 	} else {
	// 		setUpdateData((prevState) => ({
	// 			...prevState,
	// 			[e.target.id]: e.target.value,
	// 		}));
	// 	}
	// };

	// const submit = async (e) => {
	// 	e.preventDefault();
	// 	const formData = new FormData();
	// 	formData.append("photo", updateData.photo);
	// 	formData.append("name", updateData.name);
	// 	formData.append("sport_type_id", updateData.sportType);
	// 	formData.append("description", updateData.description);
	// 	formData.append("size", updateData.size);
	// 	await updateVenue(venueData.id, formData);
	// };
	return (
		<AdminLayout>
			<Card className="bg-white rounded-xl">
				<CardHeader className="flex justify-between">
					<div className="flex justify-between">
						<div>
							<CardTitle>User</CardTitle>
							<CardDescription>Manage User</CardDescription>
						</div>
						{/*<DiailogVenue />*/}
					</div>
				</CardHeader>
				<CardContent>
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead className="hidden w-[100px] sm:table-cell">
									<span className="sr-only">Image</span>
								</TableHead>
								<TableHead>Name</TableHead>
								<TableHead>Phone</TableHead>
								<TableHead className="hidden md:table-cell">ID</TableHead>
								<TableHead>Actions</TableHead>
							</TableRow>
						</TableHeader>

						{!isLoading && data ? (
							<TableBody>
								{data.map((user, index) => (
									<TableRow key={index}>
										{" "}
										{/* Added key attribute */}
										<TableCell className="hidden sm:table-cell">
											<img
												alt="Product image"
												className="aspect-square rounded-md object-cover"
												height="64"
												src={`https://api.tarang.site/${user.photo}`}
											/>
										</TableCell>
										<TableCell className="font-medium">{user.name}</TableCell>
										<TableCell>{user.phone}</TableCell>
										<TableCell className="hidden md:table-cell">
											{user.id}
										</TableCell>
										<TableCell>
											<Dialog>
												<DropdownMenu>
													<DropdownMenuTrigger>
														<IoMenu />
													</DropdownMenuTrigger>

													<DropdownMenuContent>
														<DropdownMenuSeparator />
														<DialogTrigger
															asChild
															onClick={null}
														>
															<DropdownMenuItem>Edit</DropdownMenuItem>
														</DialogTrigger>
														<DialogTrigger
															asChild
															onClick={null}
														>
															<DropdownMenuItem>Delete</DropdownMenuItem>
														</DialogTrigger>
													</DropdownMenuContent>
												</DropdownMenu>
											</Dialog>
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						) : (
							<div>No user</div>
						)}
					</Table>
				</CardContent>
				{/* <CardFooter>
          <div className="text-xs text-muted-foreground">
            Showing <strong>1-10</strong> of <strong>32</strong> products
          </div>
        </CardFooter> */}
			</Card>
		</AdminLayout>
	);
}

export default UserPage;
