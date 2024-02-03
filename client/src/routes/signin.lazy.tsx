import { createLazyFileRoute } from "@tanstack/react-router";
import SignIn from "../components/page/Signin";

export const Route = createLazyFileRoute("/signin")({
  component: SignIn,
});
