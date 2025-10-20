const SATURATION = 60;
const LIGHTNESS = 75;

function hashString(str) {
    let hash = 0;
    for (const i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    return hash;
}

function convertUsernameToCssColor(username) {
    const hue = hashString(username) % 360;
    return `hsl(${hue} ${SATURATION}% ${LIGHTNESS}%)`;
}

function calculateInitials(username) {
    if (typeof username !== 'string') return '';
    // Split by anything not alphanumeric (spaces, underscores, dots, hyphens, etc)
    const parts = username.split(/[^\p{L}\p{N}]+/u).filter(c => c !== '');
    if (parts.length === 0) {
        return username.slice(0, 2).toUpperCase();
    } else if (parts.length === 1) {
        return parts[0].slice(0, 2).toUpperCase();
    } else {
        return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
    }
}

function enhanceAvatars() {
    const avatars = document.querySelectorAll('.avatar');
    avatars.forEach(av => {
        const username = av.dataset.username || av.nextElementSibling?.textContent || '';
        const initials = calculateInitials(username);
        av.textContent = initials;
        const color = convertUsernameToCssColor(username);
        av.style.background = color;
    });
}

enhanceAvatars();
