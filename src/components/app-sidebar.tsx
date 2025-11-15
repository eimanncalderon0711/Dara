import { Calendar, Home, Inbox, MessagesSquare, Search, Settings, Star } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { IoLogoCodepen } from "react-icons/io"
import { Separator } from "@/components/ui/separator"
import { ImProfile } from "react-icons/im";
import { IconType } from "react-icons"

// Menu items.
const companyMenu = [
  {
    title: "Home",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "Company Profile",
    url: "/profile/company",
    icon: Inbox,
  },
  {
    title: "Applicants",
    url: "/applicants",
    icon: Calendar,
  },
  {
    title: "Job Posts",
    url: "/job-posts",
    icon: Search,
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
  },
]


const recruiterMenu = [
  {
    title: "Home",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "Recruiter Profile",
    url: "/profile/recruiter",
    icon: ImProfile,
  },
  {
    title: "Applicants",
    url: "/applicants",
    icon: Calendar,
  },
  {
    title: "Job Posts",
    url: "/job-posts",
    icon: Search,
  },
  {
    title: "Messages",
    url: "/messages",
    icon: MessagesSquare,
  },
  {
    title: "Reviews",
    url: "/reviews",
    icon: Star,
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
  },
]

export function AppSidebar() {
  const ROLE: string = "recruiter";
  let items:{title:string, url:string, icon:IconType}[] = [];

  if(ROLE === "company"){
    items = companyMenu;
  }

  if(ROLE === "recruiter"){
    items = recruiterMenu;
  }

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <div className="m-auto my-4">
            <IoLogoCodepen size={40}/>
          </div>
          <Separator
            orientation="horizontal"
            className="mb-3"
          />
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}