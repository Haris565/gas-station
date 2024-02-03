import { createLazyFileRoute } from "@tanstack/react-router";
import SignIn from "../components/page/Signup";

export const Route = createLazyFileRoute("/signup")({
  component: SignIn,
});
