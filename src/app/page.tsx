import { Cards } from "@/components/Cards";
import { OptionCards } from "@/components/OptionCards";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { BsBuildingCheck, BsBuildingFillCheck } from "react-icons/bs";
import { FaBriefcase, FaUserCheck } from "react-icons/fa";
import { FiUserCheck } from "react-icons/fi";
import { HiMiniDocumentCheck } from "react-icons/hi2";
import { IoIosTimer } from "react-icons/io";
import { IoAlertCircleOutline, IoShieldCheckmark } from "react-icons/io5";
import { PiBuildingsBold } from "react-icons/pi";

const ACCOUNT_TYPES = [
  {
    icon: PiBuildingsBold,
    type: "Company",
    description: <h1>Post jobs and find top talent for your <br/> organization</h1>,
    list: ["Post unlimited job listings", "Access to candidate database", "Advanced filtering and search", "Company branding tools", "Analytics and reporting"],
    route:'/account/create-company'
  },
  {
    icon: FaUserCheck,
    type: "Recruiter",
    description: <h1>Connect companies with qualified <br/> professionals</h1>,
    list: ["Manage multiple clients", "Commission tracking", "Candidate pipeline management", "Direct employer connections", "Performance metrics"],
    route:'/account/create-recruiter'
  },
  {
    icon: FaBriefcase,
    type: "Professional",
    description: <h1>Discover opportunities and advance your <br/> career</h1>,
    list: ["Create professional profile", "Job recommendations", "Application tracking", "Skills assessment tools", "Career resources and tips"],
    route:'/account/create-professional'
  }
]

const WHY_CHOOSE_US = [
  {
    icon: IoShieldCheckmark,
    iconColor: "green",
    title: "Company Verification System",
    content: "Every company undergoes rigorous verification with legal documentation, business registration, and identity validation."
  },
  {
    icon: HiMiniDocumentCheck,
    iconColor: "blue",
    title: "Document Authentication",
    content: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa."
  },
  {
    icon: IoAlertCircleOutline,
    iconColor: "red",
    title: "Fake Job Detection",
    content: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur"
  },
  {
    icon: FiUserCheck,
    iconColor: "green",
    title: "Verified Profiles",
    content: "Trust badges and verification scores help you identify authentic companies and legitimate opportunities instantly."
  },
  {
    icon: BsBuildingCheck,
    iconColor: "blue",
    title: "Company Transparency",
    content: "Access detailed company information, verification history, and authentic employee reviews before applying."
  },
  {
    icon: IoIosTimer,
    iconColor: "green",
    title: "Real-time Monitoring",
    content: "Continuous monitoring of job postings and company profiles to maintain platform integrity and user safety."
  },
]

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <div
        className="h-[600px] w-full bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/bg-2.jpg')" }}
      >
        <div className="absolute right-10 top-2">
          <Link href={'/account/sign-in'}>
            <Button className="px-5 text-lg py-5 cursor-pointer bg-white text-black hover:text-white">
              Sign In
            </Button>
          </Link>
        </div>
        <div className="flex items-center justify-center h-full bg-black/70">
          <div className="flex flex-col gap-y-4 text-center">
            <div>
              <h1 className="text-3xl md:text-5xl font-bold text-white">
                Find Your Perfect Career
              </h1>
              <h1 className="text-3xl md:text-5xl font-bold text-white">
                Match
              </h1>
            </div>
            <div>
              <p className="text-white text-lg pt-2">
                Whether you're hiring talent, recruiting professionals, or seeking your next
              </p>
              <p className="text-white text-lg pt-2">
                opportunity—we connect the right people with the right roles.
              </p>
            </div>

            <Button
              variant="outline"
              className="self-center mt-10 text-lg font-semibold hover:bg-black/65 hover:text-white py-8"
            >
              Get Started Today
            </Button>
          </div>
        </div>
      </div>

      {/* Account Type Section */}
      <div className="mt-16">
        <h1 className="text-center text-4xl font-semibold">
          Choose Your Account Type
        </h1>
        <p className="text-center py-5 text-black/50 font-medium">
          Select the option that best fits your needs and start your journey with us
        </p>

        {/* Centered Grid */}
        <div className="flex justify-center mt-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl w-full px-5 md:px-3 lg:px-0">
            {ACCOUNT_TYPES.map((item, index) => {
              return <OptionCards key={index} icon={item.icon} list={item.list} description={item.description} title={item.type} routes={item.route}/>
            })}
          </div>
        </div>

        {/* Why choose Us */}
        <div className="flex flex-col justify-center mt-24 mb-16">
          <h1 className="text-center text-4xl font-semibold">Why choose Us?</h1>
          <p className="text-center py-5 text-black/50 font-medium">
            Everything you need to succeed in your career journey
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 px-4 gap-6 mt-10 w-full">
            {WHY_CHOOSE_US.map((item, index) => {
              return <Cards key={index} title={item.title} content={item.content} icon={item.icon} iconColor={item.iconColor}/>
            })}
          </div>
        </div>
      </div>
    </>
  );
}
