
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { IconType } from "react-icons";

type Props = {
  title: string;
  content: string;
  iconColor: string;
  icon: IconType
}
export function Cards({title, content, icon: Icon, iconColor}: Props) {
  return (
    <Card className="w-full max-w-sm m-auto">
      <CardHeader>
        <div className={`p-3 bg-${iconColor}-400/10 m-auto rounded-md`}>
          <Icon size={35} color={iconColor} className="m-auto"/>
        </div>
        <CardTitle className="mt-3 text-center">{title}</CardTitle>
        <CardDescription>
          {content}
        </CardDescription>
      </CardHeader>
    </Card>
  )
}