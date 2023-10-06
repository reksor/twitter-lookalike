import { useEffect } from "react";
import { BsTwitter } from "react-icons/bs";
import useCurrentUser from "@/hooks/useCurrentUser";
import useNotifications from "@/hooks/useNotifications";
import { useRouter } from "next/router";

const NotificationsFeed = () => {
  const { data: currentUser, mutate: mutateCurrentUser } = useCurrentUser();
  const { data: fetchedNotifiactions = [] } = useNotifications(currentUser?.id);
  const router = useRouter();

  useEffect(() => {
    //refetch the current user so notifications get reset
    mutateCurrentUser();
  }, [mutateCurrentUser]);

  if (fetchedNotifiactions.length === 0) {
    return (
      <div
        className="
            text-neutral-600
            text-center
            p-6
            text-xl
            "
      >
        No notifications
      </div>
    );
  }
  return (
    <div className="flex flex-col">
      {fetchedNotifiactions.map((notification: Record<string, any>) => (
        <div
          onClick={() => {
            const url = `/users/${notification.userId}`;
            router.push(url);
          }}
          key={notification.id}
          className="
                flex
                flex-row
                items-center
                p-6
                gap-4
                border-b-[1px]
                border-neutral-800
                cursor cursor-pointer
                hover opacity-70
                "
        >
          <BsTwitter color="red" size={34} />
          <p className="text-white">{notification.body}</p>
        </div>
      ))}
    </div>
  );
};

export default NotificationsFeed;
