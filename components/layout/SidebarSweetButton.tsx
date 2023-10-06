import useCurrentUser from "@/hooks/useCurrentUser";
import useLoginModal from "@/hooks/useLoginModal";
import { useRouter } from "next/router";
import { useCallback } from "react";
import { FaFeather } from "react-icons/fa";

const SidebarSweetButton = () => {
  const router = useRouter();
  const loginModal = useLoginModal();
  const { data: currentUser } = useCurrentUser();

  const onClick = useCallback(() => {
    if (!currentUser) {
      return loginModal.onOpen();
    }

    router.push("/");
  }, [loginModal, currentUser, router]);

  return (
    <div onClick={onClick}>
      <div
        className="
            mt-6
            lg:hidden
            rounded-full
            h-14
            w-14
            p-4
            flex
            items-center
            justify-center
            bg-red-600
            hover:bg-opacity-80
            transition
            cursor-pointer
            "
      >
        <FaFeather size={28} color="white" />
      </div>
      <div
        className="
            mt-6
            hidden
            lg:block
            px-4
            py-2
            rounded-full
            bg-red-600
            hover:bg-opacity-90
            cursor-pointer
            transition
            "
      >
        <p
          className="
            hidden
            lg:block
            text-center
            font_semibold
            text-white
            text-[20px]
            "
        >
          Sweet
        </p>
      </div>
    </div>
  );
};

export default SidebarSweetButton;
