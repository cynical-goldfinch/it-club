const SATURATION = 50;
const LIGHTNESS = 75;

const addUserForm = document.getElementById('addUserForm');
const addUserInput = document.getElementById('usernameInput');
const userList = document.getElementById('userList');

// Various hash functions to generate number (color base) out of string (username).

// 1. The most primitive "hash" function - just takes the string's length.
// Problem: Not many colors are generated. Lots of the same ones.
function hashStringUsingLength(str) {
    return str.length;
}

// 2. Slightly better: sum of character codes.
// Problem: Distribution is bad.
// 'a' is very similar to 'b', 'alice1' to 'alice2', '1alice' to '2alice', etc.
function hashStringUsingCharCodeSum(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash += str.charCodeAt(i);
    }
    return hash;
}

// 3. Sum of character codes, but each code is multiplied by 100.
// Now consecutive letters produce very different results.
function hashStringUsingMultipliedCharCodeSum(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash += str.charCodeAt(i) * 100;
    }
    return hash;
}

// 4. Common basic hashing algorithm.
// Problem: Bad distribution if only the last characters differ.
// 'alice1' vs 'alice2', 'a' vs 'b'.
function hashStringBasic(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
        hash |= 0;
    }
    return hash;
}

// 5. Better hash function: cyrb53
// https://stackoverflow.com/a/52171480/628257
const hashStringWithCyrb53 = (str, seed = 0) => {
    let h1 = 0xdeadbeef ^ seed, h2 = 0x41c6ce57 ^ seed;
    for (let i = 0, ch; i < str.length; i++) {
        ch = str.charCodeAt(i);
        h1 = Math.imul(h1 ^ ch, 2654435761);
        h2 = Math.imul(h2 ^ ch, 1597334677);
    }
    h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507);
    h1 ^= Math.imul(h2 ^ (h2 >>> 13), 3266489909);
    h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507);
    h2 ^= Math.imul(h1 ^ (h1 >>> 13), 3266489909);

    return 4294967296 * (2097151 & h2) + (h1 >>> 0);
};

function convertUsernameToCssColor(username) {
    const hue = hashStringUsingCharCodeSum(username) % 360;
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
    for (const avatar of avatars) {
        const username = avatar.dataset.username || avatar.nextElementSibling?.textContent || '';
        const initials = calculateInitials(username);
        avatar.textContent = initials;
        const color = convertUsernameToCssColor(username);
        avatar.style.background = color;
    }
}

function addUser(username) {
    const initials = calculateInitials(username);
    const avatarColor = convertUsernameToCssColor(username);

    const li = document.createElement('li');
    li.className = 'user-item';

    const avatar = document.createElement('div');
    avatar.className = 'avatar';
    avatar.dataset.username = username;
    avatar.textContent = initials;
    avatar.style.background = avatarColor;

    const span = document.createElement('span');
    span.className = 'username';
    span.textContent = username;

    li.appendChild(avatar);
    li.appendChild(span);

    userList.appendChild(li);
}

addUserForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const formData = new FormData(addUserForm);
    const username = formData.get('username').trim();

    if (username === '') {
        addUserInput.focus();
        return;
    }

    addUser(username);

    addUserInput.value = '';
    addUserInput.focus();
});

enhanceAvatars();
