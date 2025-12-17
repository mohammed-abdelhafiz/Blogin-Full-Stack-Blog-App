"use client";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { BlogArticleData, blogArticleSchema } from "@/schemas/blog";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { Controller, useForm } from "react-hook-form";

import { toast } from "sonner";
import { createBlogAction } from "@/app/actions";
import { Textarea } from "@/components/ui/textarea";
export const CreateBlogForm = () => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(blogArticleSchema),
    defaultValues: {
      title: "",
      content: "",
    },
  });
  const onSubmit = (data: BlogArticleData) => {
    startTransition(async () => {
      try {
        await createBlogAction(data);
        toast.success("Blog article created successfully");
        router.push("/blog");
      } catch {
        toast.error("Failed to create blog article , please try again later");
      }
    });
  };
  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <FieldGroup className="gap-y-4">
        <Controller
          name="title"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel>Title</FieldLabel>
              <Input
                aria-invalid={fieldState.invalid}
                placeholder="Super interesting title"
                {...field}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="content"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel>Content</FieldLabel>
              <Textarea
                aria-invalid={fieldState.invalid}
                placeholder="Super interesting content"
                {...field}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Button type="submit" disabled={isPending}>
          {isPending ? (
            <>
              <Loader2 className="size-4 animate-spin" />
              <span>Loading...</span>
            </>
          ) : (
            <span>Create</span>
          )}
        </Button>
      </FieldGroup>
    </form>
  );
};
