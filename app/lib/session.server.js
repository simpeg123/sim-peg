const { createCookieSessionStorage, redirect } = require('@remix-run/node');

const sessionSecret = process.env.SESSION_SECRET;
if (!sessionSecret) {
    throw new Error('SESSION_SECRET must be set');
}

const storage = createCookieSessionStorage({
    cookie: {
        name: 'RJ_session',
        // normally you want this to be `secure: true`
        // but that doesn't work on localhost for Safari
        // https://web.dev/when-to-use-local-https/
        secure: process.env.NODE_ENV === 'production',
        secrets: [sessionSecret],
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60 * 24 * 30, // 30 days
        httpOnly: true,
    },
});

export async function createUserSession(
    { token, name, user_id, email, role, photo },
    redirectTo
) {
    const session = await storage.getSession();

    session.set('name', name);
    session.set('token', token);
    session.set('user_id', user_id);
    session.set('email', email);
    session.set('role', role);
    session.set('photo', photo);

    return redirect(redirectTo, {
        headers: {
            'Set-Cookie': await storage.commitSession(session),
        },
    });
}

function getUserSession(request) {
    return storage.getSession(request.headers.get('Cookie'));
}

export async function getUserToken(request) {
    const session = await getUserSession(request);
    const token = session.get('token');
    if (!token || typeof token !== 'string') return null;
    return token;
}

export async function getUserDetails(request) {
    const session = await getUserSession(request);

    const name = session.get('name');
    const token = session.get('token');
    const user_id = session.get('user_id');
    const email = session.get('email');
    const role = session.get('role');
    const photo = session.get('photo');

    if (!token || typeof token !== 'string') return null;
    return {
        name,
        token,
        user_id,
        email,
        role,
        photo,
    };
}

export async function requireUserToken(request, redirectTo) {
    const session = await getUserSession(request);
    const token = session.get('token');

    if (!token || typeof token !== 'string') {
        redirectTo = redirectTo.replace(/^\//, '');
        throw redirect(`/login?${redirectTo}`);
    }
    return token;
}

export async function logout(request) {
    const session = await getUserSession(request);
    return redirect('/login', {
        headers: {
            'Set-Cookie': await storage.destroySession(session),
        },
    });
}
