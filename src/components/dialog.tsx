"use client";

import { z } from "zod";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { createPage } from "~/data/userService";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormControl, FormField, FormItem } from "./ui/form";
import { revalidatePath } from "next/cache";

const formSchema = z.object({
  title: z
    .string()
    .min(1, { message: "Title must be at least 1 character." })
    .max(30, { message: "Title must be at most 30 characters." }),
});

export function CreatePageDialog() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: `Untitled`,
    },
  });

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await createPage({ title: values.title });
      console.log("Page created:", values.title);
      form.reset();
      revalidatePath("/");
    } catch (error) {
      console.error("Error creating page:", error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full">Create Page</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a New Notepage</DialogTitle>
        </DialogHeader>
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <Label>What title would you like?</Label>
                  <FormControl>
                    <Input
                      {...field}
                      type="text"
                      id="title"
                      placeholder="Title"
                      required
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <DialogFooter className="flex justify-end space-x-2">
              <DialogClose asChild>
                <Button type="button" className="mt-2">
                  Cancel
                </Button>
              </DialogClose>
              <Button variant="outline" type="submit" className="mt-2">
                Create
              </Button>
            </DialogFooter>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
}
