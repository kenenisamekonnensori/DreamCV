// import { signIn } from "@/auth";
import { Button } from "@/components/ui/button";
import { Github } from "@/components/ui/github";
import { signIn } from "@/auth";
const GithubSignIn = () => {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("github", { callbackUrl: "/" });
      }}
    >
      <Button className="w-full" variant="outline"
      >
        <Github />
        Continue with GitHub
      </Button>
    </form>
  );
};

export { GithubSignIn };
