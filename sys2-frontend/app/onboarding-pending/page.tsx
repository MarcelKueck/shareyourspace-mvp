import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function OnboardingPendingPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Thank You for Your Interest!</CardTitle>
          <CardDescription className="text-center pt-2">
            Your registration is complete and your email is verified.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-center text-muted-foreground">
            We appreciate your interest in joining ShareYourSpace as a Corporate Partner.
          </p>
          <p className="mt-4 text-center text-muted-foreground">
            A member of the ShareYourSpace team will reach out to you personally via email within the next 24 business hours to discuss the onboarding process, configure your space, and discuss the next steps.
          </p>
          <p className="mt-4 text-center text-sm text-muted-foreground">
            We look forward to partnering with you!
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
