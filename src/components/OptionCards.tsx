import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Link from "next/link";
import { ReactNode } from "react";
import { IconType } from "react-icons";

type Props = {
  title: string;
  description: ReactNode;
  icon: IconType;
  list: string[];
  routes: string;
}

export function OptionCards({icon:Icon, title, description, list, routes}: Props) {
  return (
    <Card className="w-full max-w-sm m-auto hover:scale-[1.02] cursor-pointer duration-200 ease-in-out">
      <CardHeader>
        <CardTitle>
          <div className="flex flex-col gap-10 items-center justify-center ">
            {/* <PiBuildingsBold size={30}/> */}
            <Icon size={40}/>
            <h1 className="text-lg font-bold">{title}</h1>
          </div>
        </CardTitle>
         <CardDescription className="text-center">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <CardDescription>
          <ul className="list-disc px-8 flex flex-col gap-2 marker:text-amber-500">
            {list.map((item, index) => <li key={index}>{item}</li>)}
          </ul>
        </CardDescription>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Link href={routes}>
          <Button className="w-full cursor-pointer bg-amber-500">Create {title}</Button>
        </Link>
      </CardFooter>
    </Card>
  )
}
