"use client";
import AdminLayout from "@/app/AdminLayout";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { getTeam } from "@/services/team";
import { DialogTeam } from '@/components/DailogTeam';
import { deleteTeam } from "@/services/team";
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

function TeamPage() {
  const { data, isLoading } = useQuery({
    queryFn: getTeam,
    queryKey: ["getTeamsKey"],
  });
  console.log(data);
  const handleDelete = async (id) => {
    const response = await deleteTeam(id);
    if (response.status === 204) {
      alert("Successfully Deleted!");
    }
  };

  const [dialog, setDialog] = useState(null); // Initialize dialog state as null

  const [updateData, setUpdateData] = useState({
    name: "",
    size: 0,
    sportType: 0,
    description: "",
    photo: "",
  });

  const onChange = (e) => {
    e.preventDefault();
    if (e.target.id === "photo") {
      setUpdateData((prevState) => ({
        ...prevState,
        [e.target.id]: e.target.files[0],
      }));
    } else {
      setUpdateData((prevState) => ({
        ...prevState,
        [e.target.id]: e.target.value,
      }));
    }
  };

  const submit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("photo", updateData.photo);
    formData.append("name", updateData.name);
    formData.append("sport_type_id", updateData.sportType);
    await updateVenue(venueData.id, formData);
  };
  return (
    <AdminLayout>
      <Card className="bg-white rounded-xl">
        <CardHeader className="flex justify-between">
          <div className="flex justify-between">
            <div>
              <CardTitle>Team</CardTitle>
              <CardDescription>Manage Team</CardDescription>
            </div>
            <DialogTeam />
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="hidden w-[100px] sm:table-cell">
                  <span >Logo</span>
                </TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>

            {!isLoading && data ? (
              <TableBody>
                {data.teams.map((team, index) => (
                  <TableRow key={index}>
                    {" "}
                    {/* Added key attribute */}
                    <TableCell className="hidden sm:table-cell">
                      <img
                        alt="Product image"
                        className="aspect-square rounded-full object-cover"
                        height="64"
                        src={`https://api.tarang.site/${team.logo}`}
                      />
                    </TableCell>
                    <TableCell className="font-medium">{team.name}</TableCell>
                    <TableCell>{team.sportType.name}</TableCell>
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
                              onClick={() => {
                                setDialog("edit");
                              }}
                            >
                              <DropdownMenuItem>Edit</DropdownMenuItem>
                            </DialogTrigger>
                            <DialogTrigger
                              asChild
                              onClick={() => {
                                setDialog("delete");
                              }}
                            >
                              <DropdownMenuItem>Delete</DropdownMenuItem>
                            </DialogTrigger>
                          </DropdownMenuContent>
                        </DropdownMenu>
                        {dialog === "edit" ? (
                          <DialogContent className="sm:max-w-[425px] bg-white">
                            <div className="flex flex-col items-center gap-10">
                              <h1 className="text-2xl md:text-2xl font-bold">
                                Edit Team
                              </h1>
                              <form
                                encType="multipart/form-data"
                                onSubmit={submit}
                                className="flex flex-col gap-10 items-center w-full"
                              >
                                <div className="flex flex-col w-full gap-4">
                                    <div className="w-full">
                                      <Input
                                        type="text"
                                        placeholder="Name"
                                        id={"name"}
                                        onChange={onChange}
                                      />
                                    </div>
                                  <div className="flex flex-col w-full gap-2">
                                    <label
                                      htmlFor="category"
                                      className="text-sm md:text-base"
                                    >
                                      Sport Type
                                    </label>
                                    <Select
                                      onValueChange={(value) => {
                                        setUpdateData((prevState) => ({
                                          ...prevState,
                                          sport_type_id: value,
                                        }));
                                      }}
                                      required
                                    >
                                      <SelectTrigger>
                                        <SelectValue placeholder="Select Sport Type" />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectGroup className="bg-white">
                                          <SelectItem value="1">
                                            Football
                                          </SelectItem>
                                          <SelectItem value="2">
                                            Badminton
                                          </SelectItem>
                                          <SelectItem value="3">
                                            Ping Pong
                                          </SelectItem>
                                          <SelectItem value="4">
                                            Volleyball
                                          </SelectItem>
                                        </SelectGroup>
                                      </SelectContent>
                                    </Select>
                                  </div>
                                  <label
                                      htmlFor="category"
                                      className="text-sm md:text-base"
                                    >
                                      Team Logo
                                    </label>
                                  <div>
                                    <Input
                                      type="file"
                                      title={"image"}
                                      id={"logo"}
                                      onChange={onChange}
                                    />
                                  </div>
                                </div>
                                <div className="flex gap-4">
                                  <DialogFooter>
                                    <Button
                                      className="bg-green-300 rounded-xl"
                                      variant="outline"
                                      type="submit"
                                    >
                                      Update Team
                                    </Button>
                                  </DialogFooter>
                                </div>
                              </form>
                            </div>
                          </DialogContent>
                        ) : (
                          <DialogContent className="bg-white w-[325px] flex flex-col justify-center items-center">
                            <DialogHeader>
                              <DialogTitle>
                                Are you absolutely sure?
                              </DialogTitle>
                            </DialogHeader>

                            <DialogFooter>
                              <Button
                                className="bg-red-500 text-white rounded-xl"
                                variant="outline"
                                onClick={() => handleDelete(team.id)}
                              >
                                Delete
                              </Button>
                            </DialogFooter>
                          </DialogContent>
                        )}
                      </Dialog>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            ) : (
              <div>No Team</div>
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

export default TeamPage;
