import { LoaderFunction, redirect } from "@remix-run/server-runtime";
import { isAuthenticated } from "~/utils/auth";

export const loader: LoaderFunction = async ({ request }) => {
    if (!isAuthenticated(request)) return redirect('/login');
};

export default function Me() {
    return (
        <div>
            <h1>Me</h1>
        </div>
    );
}