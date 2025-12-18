import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { CommentType } from "@/lib/types";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useMemo } from "react";

dayjs.extend(relativeTime);

interface CommentProps {
  comment: CommentType;
}

export const Comment = ({ comment }: CommentProps) => {
  const timeAgo = useMemo(() => {
    return dayjs(comment._creationTime).fromNow();
  }, [comment._creationTime]);

  return (
    <div className="flex items-center gap-3 ">
      <Avatar>
        <AvatarImage
          src={`https://avatar.vercel.sh/${comment.authorName}`}
          alt={comment.authorName}
        />
        <AvatarFallback>
          {comment.authorName.slice(0, 2).toUpperCase()}
        </AvatarFallback>
      </Avatar>

      <div className="flex-1 space-y-1">
        <div className="flex items-center justify-between">
          <p className="font-semibold text-sm">{comment.authorName}</p>
          <p className="text-muted-foreground text-xs">{timeAgo}</p>
        </div>

        <p className="text-sm text-foreground/90 whitespace-pre-wrap leading-relaxed">
          {comment.content}
        </p>
      </div>
    </div>
  );
};
