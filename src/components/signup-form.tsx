import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"
import { redirect } from "next/navigation"




export function CompanySignupForm({
  className,
  ...props
}: React.ComponentProps<"div">) {

  async function handleSubmit(formData: FormData) {
    // e.preventDefault()
    // const formData = new FormData(e.currentTarget)
    "use server"
    

  const companyName = formData.get("companyName")
  const email = formData.get("email")
  const businessType = formData.get("businessType")
  const phone = formData.get("phone")
  const password = formData.get("password")
  const confirmPassword = formData.get("confirmPassword")

  // alert(
  //     {
  //     companyName,
  //     email,
  //     businessType,
  //     phone,
  //     password,
  //     confirmPassword,
  //   }
  // )
  redirect("/account/verify")
  }

  return (
    <div className={cn("flex flex-col gap-4", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Create your company account</CardTitle>
          <CardDescription>
            Enter your company details below to <br /> create your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={handleSubmit}>
            <FieldGroup className="gap-4">
              <Field>
                <FieldLabel htmlFor="companyName">Company Name</FieldLabel>
                <Input id="companyName" type="text" placeholder="e.g., Dara" required />
              </Field>
              <Field>
                <FieldLabel htmlFor="name">Business Email</FieldLabel>
                <Input id="email" type="email" placeholder="e.g., dara@companyname.com" required />
              </Field>
              <Field>
                <FieldLabel>Business Type</FieldLabel>
                <Select>
                  <SelectTrigger >
                    <SelectValue placeholder="Business Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Type</SelectLabel>
                      <SelectItem value="apple">Corporation</SelectItem>
                      <SelectItem value="banana">SME</SelectItem>
                      <SelectItem value="blueberry">Freelancer Group</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </Field>
              <Field>
                <FieldLabel htmlFor="email">Phone</FieldLabel>
                <Input
                  id="phone"
                  type="text"
                  placeholder="+639700001234"
                  required
                />
              </Field>
              <Field>
                <Field className="grid grid-cols-2 gap-4">
                  <Field>
                    <FieldLabel htmlFor="password">Password</FieldLabel>
                    <Input id="password" type="password" required />
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="confirm-password">
                      Confirm Password
                    </FieldLabel>
                    <Input id="confirm-password" type="password" required />
                  </Field>
                </Field>
                <FieldDescription>
                  Must be at least 8 characters long.
                </FieldDescription>
              </Field>
              <Field>
                <Button type="submit">Create Company</Button>
                <FieldDescription className="text-center">
                  Already have an account? <a href="/account/sign-in">Sign in</a>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
      <FieldDescription className="px-6 text-center">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </FieldDescription>
    </div>
  )
}


export function RecruiterSignupForm({
  className,
  ...props
}: React.ComponentProps<"div">) {

  async function handleSubmit(formData: FormData) {
    // e.preventDefault()
    // const formData = new FormData(e.currentTarget)
    "use server"
    

    const companyName = formData.get("companyName")
    const email = formData.get("email")
    const businessType = formData.get("businessType")
    const phone = formData.get("phone")
    const password = formData.get("password")
    const confirmPassword = formData.get("confirmPassword")

    // alert(
    //     {
    //     companyName,
    //     email,
    //     businessType,
    //     phone,
    //     password,
    //     confirmPassword,
    //   }
    // )
    redirect("/account/verify")
  }

  return (
    <div className={cn("flex flex-col gap-4", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Create your recruiter account</CardTitle>
          <CardDescription>
            Enter your details below to create your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={handleSubmit}>
            <FieldGroup className="gap-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <Field>
                  <FieldLabel htmlFor="fullname">First Name</FieldLabel>
                  <Input id="fullname" type="text" placeholder="e.g., Steven" required />
                </Field>
                <Field>
                  <FieldLabel htmlFor="fullname">Middle Name</FieldLabel>
                  <Input id="fullname" type="text" placeholder="e.g., Paul" required />
                </Field>
                <Field>
                  <FieldLabel htmlFor="fullname">Last Name</FieldLabel>
                  <Input id="fullname" type="text" placeholder="e.g., Jobs" required />
                </Field>
              </div>
              <Field>
                <FieldLabel htmlFor="name">Company Email</FieldLabel>
                <Input id="email" type="email" placeholder="e.g., dara@companyname.com" required />
              </Field>
              <Field>
                <FieldLabel htmlFor="name">Mobile Number</FieldLabel>
                <Input id="email" type="text" placeholder="e.g., +639700001234" required />
              </Field>
              <Field>
                <FieldLabel htmlFor="name">Position/Job Title</FieldLabel>
                <Input id="email" type="text" placeholder="e.g., HR Manager" required />
              </Field>
              <Field>
                <Field className="grid grid-cols-2 gap-4">
                  <Field>
                    <FieldLabel htmlFor="password">Password</FieldLabel>
                    <Input id="password" type="password" required />
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="confirm-password">
                      Confirm Password
                    </FieldLabel>
                    <Input id="confirm-password" type="password" required />
                  </Field>
                </Field>
                <FieldDescription>
                  Must be at least 8 characters long.
                </FieldDescription>
              </Field>
              <Field>
                <Button type="submit">Create Recruiter</Button>
                <FieldDescription className="text-center">
                  Already have an account? <a href="/account/sign-in">Sign in</a>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
      <FieldDescription className="px-6 text-center">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </FieldDescription>
    </div>
  )
}


export function ProfessionalSignupForm({
  className,
  ...props
}: React.ComponentProps<"div">) {

  async function handleSubmit(formData: FormData) {
    // e.preventDefault()
    // const formData = new FormData(e.currentTarget)
    "use server"
    

    const companyName = formData.get("companyName")
    const email = formData.get("email")
    const businessType = formData.get("businessType")
    const phone = formData.get("phone")
    const password = formData.get("password")
    const confirmPassword = formData.get("confirmPassword")

    // alert(
    //     {
    //     companyName,
    //     email,
    //     businessType,
    //     phone,
    //     password,
    //     confirmPassword,
    //   }
    // )
    redirect("/account/verify")
  }

  return (
    <div className={cn("flex flex-col gap-4", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Create your account</CardTitle>
          <CardDescription>
            Enter your details below to create your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={handleSubmit}>
            <FieldGroup className="gap-4">

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <Field>
                  <FieldLabel htmlFor="fullname">First Name</FieldLabel>
                  <Input id="fullname" type="text" placeholder="e.g., Steven" required />
                </Field>
                <Field>
                  <FieldLabel htmlFor="fullname">Middle Name</FieldLabel>
                  <Input id="fullname" type="text" placeholder="e.g., Paul" required />
                </Field>
                <Field>
                  <FieldLabel htmlFor="fullname">Last Name</FieldLabel>
                  <Input id="fullname" type="text" placeholder="e.g., Jobs" required />
                </Field>
              </div>

              <Field>
                <FieldLabel htmlFor="name">Email</FieldLabel>
                <Input id="email" type="email" placeholder="e.g., dara@email.com" required />
              </Field>

              <Field>
                <FieldLabel htmlFor="email">Mobile Number</FieldLabel>
                <Input
                  id="phone"
                  type="text"
                  placeholder="e.g., +639700001234"
                  required
                />
              </Field>
              <Field>
                <Field className="grid grid-cols-2 gap-4">
                  <Field>
                    <FieldLabel htmlFor="password">Password</FieldLabel>
                    <Input id="password" type="password" required />
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="confirm-password">
                      Confirm Password
                    </FieldLabel>
                    <Input id="confirm-password" type="password" required />
                  </Field>
                </Field>
                <FieldDescription>
                  Must be at least 8 characters long.
                </FieldDescription>
              </Field>
              <Field>
                <Button type="submit">Create</Button>
                <FieldDescription className="text-center">
                  Already have an account? <a href="/account/sign-in">Sign in</a>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
      <FieldDescription className="px-6 text-center">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </FieldDescription>
    </div>
  )
}
