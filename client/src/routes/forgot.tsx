import { createFileRoute } from "@tanstack/react-router";
import Forgot from "../components/page/Forget";

export const Route = createFileRoute("/forgot")({
  component: Forgot,
});
