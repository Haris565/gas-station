import { createFileRoute } from "@tanstack/react-router";
import Confirm from "../components/page/Confirm";

export const Route = createFileRoute("/confirm")({
  component: Confirm,
});
