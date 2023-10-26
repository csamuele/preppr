export function checkAuth(): boolean {
    const cookies = document.cookie.split('; ');
    const sessionCookie = document.cookie.split('; ').find(row => row.startsWith('session='));
    if (!sessionCookie) {
        return false;
    }
    return true;
}
