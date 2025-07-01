import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Apple, Chrome, Github, Loader, Twitter } from "lucide-react";
import { Link, useNavigate } from "react-router";
import { homePath, signUpPath } from "@/paths";
import { FormItem } from "@/components/form/form-item";
import { useState, type FormEvent } from "react";
import { useSignUp } from "../hooks/use-sign-up";

export const SignInForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const { signIn, signInLoading } = useSignUp();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    signIn(
      { email, password },
      {
        onSettled: () => {
          setEmail("");
          setPassword("");
        },
      }
    );
  };
  return (
    <div className="w-full max-w-sm 2xl:max-w-lg">
      <Card className="shadow-xl">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">
            <Link to={homePath()}>TaskFlow</Link>
          </CardTitle>
          <CardDescription>Sign in to your account"</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Social Auth Buttons */}
          <div className="grid grid-cols-2 gap-3">
            <Button variant="outline" className="w-full">
              <Chrome className="w-4 h-4 mr-2" />
              Google
            </Button>
            <Button variant="outline" className="w-full">
              <Github className="w-4 h-4 mr-2" />
              GitHub
            </Button>
            <Button variant="outline" className="w-full">
              <Apple className="w-4 h-4 mr-2" />
              Apple
            </Button>
            <Button variant="outline" className="w-full">
              <Twitter className="w-4 h-4 mr-2" />
              Twitter
            </Button>
          </div>

          {/* Email/Password Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <FormItem
              onChange={(mail) => setEmail(mail)}
              value={email}
              name="email"
              label="Email"
              placeholder="Enter your email"
              type="email"
            />
            <FormItem
              value={password}
              onChange={(password) => setPassword(password)}
              name="password"
              label="Password"
              placeholder="Enter your password"
              type="password"
            />
            <Button type="submit" className="w-full">
              {signInLoading ? (
                <>
                  <Loader /> Wait
                </>
              ) : (
                "Sign In"
              )}
            </Button>
          </form>

          <div className="text-sm flex-center">
            <span>Don't have an account?</span>
            <Button
              onClick={() => navigate(signUpPath())}
              variant="link"
              className="p-0 h-auto"
            >
              Sign up
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
