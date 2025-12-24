"use client";

import usePresence from "@convex-dev/presence/react";
import FacePile from "@convex-dev/presence/facepile";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";

interface BlogPresenceProps {
  roomId: Id<"blogArticles">;
  userId: string;
}

export const BlogPresence = ({ roomId, userId }: BlogPresenceProps) => {
  const presenceState = usePresence(api.presence, roomId, userId);
  if (!presenceState || presenceState.length === 0) {
    return null;
  }
  return (
    <div className="flex items-center gap-2">
      <p className="text-xs uppercase tracking-wide text-muted-foreground">
        viewing now
      </p>
      <div className="text-black">
        <FacePile presenceState={presenceState} />
      </div>
    </div>
  );
};
