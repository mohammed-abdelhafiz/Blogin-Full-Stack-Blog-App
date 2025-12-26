"use client";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Id } from "@/convex/_generated/dataModel";
import { MessageSquare } from "lucide-react";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CommentFormData, commentFormSchema } from "@/schemas/blogArticle";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";
import { useParams, useRouter } from "next/navigation";
import { api } from "@/convex/_generated/api";
import {
  Preloaded,
  useMutation,
  usePreloadedQuery,
  useQuery,
} from "convex/react";
import { useTransition } from "react";
import { toast } from "sonner";
import { FormButton } from "@/components/custom/form-button";
import { Comment } from "./comment";
import { Separator } from "@/components/ui/separator";

interface CommentsSectionProps {
  preloadedComments: Preloaded<typeof api.comments.getCommentsByBlogId>;
}

export const CommentsSection = ({
  preloadedComments,
}: CommentsSectionProps) => {
  const { blogArticleId } = useParams<{ blogArticleId: Id<"blogArticles"> }>();
  const comments = usePreloadedQuery(preloadedComments);
  const createComment = useMutation(api.comments.createComment);
  const [isPending, startTransition] = useTransition();
  const form = useForm({
    resolver: zodResolver(commentFormSchema),
    defaultValues: {
      content: "",
      blogArticleId,
    },
  });
  const isLoggedIn = useQuery(api.auth.getCurrentUser);
  const router = useRouter();

  const onSubmit = (data: CommentFormData) => {
    startTransition(async () => {
      try {
        if (!isLoggedIn) {
          return router.push("/auth/login");
        }
        await createComment(data);
        toast.success("Comment created successfully");
        form.reset();
      } catch (error: unknown) {
        if (error instanceof Error) {
          toast.error(error.message);
        } else {
          toast.error("Failed to create comment");
        }
      }
    });
  };
  return (
    <Card>
      <CardHeader className="flex items-center gap-2 border-b">
        <MessageSquare className="size-5" />
        <h2 className="text-xl font-bold">{comments.length} Comments</h2>
      </CardHeader>
      <CardContent className="space-y-8">
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <Controller
            name="content"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel>Comment</FieldLabel>
                <Textarea
                  aria-invalid={fieldState.invalid}
                  placeholder="Share your thoughts..."
                  {...field}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <FormButton isPending={isPending}>Comment</FormButton>
        </form>
        {comments.length > 0 && <Separator />}
        <section className="space-y-6">
          {comments.map((comment) => (
            <Comment key={comment._id} comment={comment} />
          ))}
        </section>
      </CardContent>
    </Card>
  );
};
