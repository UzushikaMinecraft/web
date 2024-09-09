import { LoaderFunction, redirect } from "@remix-run/server-runtime";

export const loader: LoaderFunction = async ({ request }) => {
    const jwt = request.headers.get('Cookie')?.split(';').find(c => c.startsWith('jwt='));
    if (!jwt) return redirect('http://uzsk.iamtakagi.net/auth');
    return redirect('http://uzsk.iamtakagi.net/');
};