"use client";

import { Archive, MoreHorizontal, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useRouter } from "next/navigation";
import { groupAndSortChats } from "@/lib/utils";
import { useChat, useChatActions } from "@/store";
import { cn } from "@/lib/utils";

export function NavChatHistory({
  chats,
}: {
  chats: {
    id: string;
    title: string;
    url: string;
    date: string;
  }[];
}) {
  const sortedGroupEntries = groupAndSortChats(chats);
  const { currentConversationId } = useChat();
  const { deleteConversation } = useChatActions();
  const router = useRouter();
  const { isMobile, setOpenMobile } = useSidebar();
  const [hoveredChatId, setHoveredChatId] = useState<string | null>(null);
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);

  const handleDeleteConfirm = () => {
    if (!deleteTargetId) return;
    deleteConversation(deleteTargetId);
    setDeleteTargetId(null);
    toast.success("Conversation deleted");
  };

  const handleConversationClick = (conversationId: string) => {
    router.push(`/c/${conversationId}`);
    if (isMobile) {
      setOpenMobile(false);
    }
  };

  return (
    <>
      <SidebarGroup>
        {sortedGroupEntries.map(({ dateLabel, chats: chatsInGroup }) => (
          <div key={dateLabel} className="mb-4">
            <SidebarGroupLabel>{dateLabel}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuSub className="border-0 ml-0">
                  {chatsInGroup.map((chat) => (
                    <SidebarMenuSubItem key={chat.id}>
                      <SidebarMenuSubButton
                        asChild
                        className={cn(
                          currentConversationId === chat.id || openDropdownId === chat.id
                            ? "bg-sidebar-accent text-sidebar-accent-foreground"
                            : "",
                          "w-full h-full py-1 px-3"
                        )}
                      >
                        <div
                          role="button"
                          tabIndex={0}
                          onClick={() => handleConversationClick(chat.id)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ") {
                              handleConversationClick(chat.id);
                            }
                          }}
                          onMouseEnter={() => setHoveredChatId(chat.id)}
                          onMouseLeave={() => setHoveredChatId(null)}
                          className="flex items-center justify-between w-full cursor-pointer"
                        >
                          <span>{chat.title}</span>

                          <DropdownMenu
                            onOpenChange={(open) =>
                              setOpenDropdownId(open ? chat.id : null)
                            }
                          >
                            <DropdownMenuTrigger
                              asChild
                              onClick={(e) => e.stopPropagation()}
                            >
                              <span
                                role="button"
                                tabIndex={0}
                                className="inline-flex items-center justify-center"
                              >
                                <MoreHorizontal
                                  className={`${
                                    hoveredChatId === chat.id ||
                                    openDropdownId === chat.id
                                      ? "opacity-100"
                                      : "opacity-0"
                                  } transition-opacity`}
                                />
                              </span>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                              <DropdownMenuItem>
                                <Archive className="mr-2 h-4 w-4" />
                                Archive
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setDeleteTargetId(chat.id);
                                }}
                              >
                                <Trash2 className="mr-2 h-4 w-4 text-red-500" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  ))}
                </SidebarMenuSub>
              </SidebarMenu>
            </SidebarGroupContent>
          </div>
        ))}
      </SidebarGroup>

      <AlertDialog
        open={deleteTargetId !== null}
        onOpenChange={(open) => {
          if (!open) setDeleteTargetId(null);
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete conversation</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete this conversation
              and all its messages.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirm}
              className="bg-destructive text-white hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
