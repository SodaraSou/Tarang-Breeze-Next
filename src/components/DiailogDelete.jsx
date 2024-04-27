import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function DialogDemo() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Delete</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogDescription>
            Do you want to Delete this Venue?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
            <div>
          <Button type="submit">Confirm</Button>
            </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
{/* <Dialog>
                        <DropdownMenu>
                          <DropdownMenuTrigger>
                            <IoMenu />
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DialogTrigger asChild>
                              <DropdownMenuItem>
                                <span>Edit</span>
                              </DropdownMenuItem>
                            </DialogTrigger>
                            <DialogTrigger asChild>
                              <DropdownMenuItem>
                                <span>Delete</span>
                              </DropdownMenuItem>
                            </DialogTrigger>
                          </DropdownMenuContent>
                        </DropdownMenu>
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
                                onClick={() => handleDelete(venue.id)}
                              >
                                Delete
                              </Button>
                            </DialogFooter>
                        </DialogContent>
                      </Dialog> */}