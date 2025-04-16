import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function WaitlistPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Welcome to the ShareYourSpace Talent Pool!</CardTitle>
          <CardDescription className="text-center pt-2">
            Your registration is complete and your email is verified.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-center text-muted-foreground">
            You&apos;ve been successfully added to our talent pool. Space providers, starting with our partners like Pixida, are actively looking for innovative startups and skilled freelancers like you.
          </p>
          <p className="mt-4 text-center text-muted-foreground">
            They will review profiles based on their needs and available space. If there&apos;s a potential match, they will reach out to you directly through the platform to discuss opportunities.
          </p>
          <p className="mt-4 text-center text-sm text-muted-foreground">
            There&apos;s no further action needed from your side at this moment. We appreciate your patience and enthusiasm!
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
