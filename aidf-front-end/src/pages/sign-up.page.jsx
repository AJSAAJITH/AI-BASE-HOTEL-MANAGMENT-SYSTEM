import { SignUp } from "@clerk/clerk-react";

const SignUpPage = () => {
  return (
    <div>
      <main className="flex items-center justify-center min-h-screen px-4">
        <SignUp />
      </main>
    </div>
  );
};

export default SignUpPage;
