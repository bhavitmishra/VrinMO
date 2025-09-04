import AppBar from "@repo/ui/Appbar";
import { Card } from "@repo/ui/card";
export default function () {
  return (
    <div className="flex justify-center items-center h-screen">
      <Card
        i1={true}
        Heading="User Log in"
        Sign="Sign in with Phone Number"
        b1="credentials"
        b2=""
      />
    </div>
  );
}
