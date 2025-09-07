import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Chrome, Mail } from 'lucide-react'; // Import icons
import Link from 'next/link';

export default function LoginPage() {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader className="text-center">
        <CardTitle>Continue with an account</CardTitle>
        <CardDescription>
          You must log in or register to continue.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        {/* Google Button with Icon */}
        <Button variant="outline" className="flex items-center gap-2">
          <Chrome size={18} />
          Continue with Google
        </Button>

        {/* Email Button with Icon */}
        <Button asChild className="flex items-center gap-2">
          <Link href="/login/email">
            <Mail size={18} />
            Login with Email
          </Link>
        </Button>

        <div className="text-center text-sm text-muted-foreground">
          New User?{' '}
          <Link
            href="/register"
            className="font-semibold underline underline-offset-4 hover:text-primary"
          >
            Create New Account
          </Link>
        </div>
        <p className="px-8 text-center text-xs text-muted-foreground">
          By continuing, you agree to our Privacy Policy and T&Cs.
        </p>
      </CardContent>
    </Card>
  );
}