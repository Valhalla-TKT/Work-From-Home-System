function getJwtToken() {
    const cookieName = "JWT=";
    const decodedCookie = decodeURIComponent(document.cookie);
    const cookieArray = decodedCookie.split(';');
    for (let i = 0; i < cookieArray.length; i++) {
        let cookie = cookieArray[i].trim();
        if (cookie.indexOf(cookieName) === 0) {
            return cookie.substring(cookieName.length, cookie.length);
        }
    }
    return null;
}

const jwtToken = getJwtToken();

if (!jwtToken) {
    console.error("JWT cookie not found. Ensure the cookie is set and accessible.");
}
