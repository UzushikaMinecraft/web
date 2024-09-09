import { LoaderFunction, redirect } from "@remix-run/server-runtime";
import { isAuthenticated } from "~/utils/auth";

export const loader: LoaderFunction = async ({ request }) => {
    if (!isAuthenticated(request)) return redirect('http://uzsk.iamtakagi.net/auth');
    return redirect('http://uzsk.iamtakagi.net/');
};