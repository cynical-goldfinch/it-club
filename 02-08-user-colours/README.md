User avatars — Pastel colour demo

This small demo shows a static list of usernames with circular avatar placeholders.
JavaScript generates initials and picks a pastel HSL colour derived from each username.

How to open:

1. Open `index.html` in your browser (double-click or use a simple static server).

Notes:

- Colours are generated deterministically from the username.
- Initials are derived by splitting the username on punctuation and taking first/last letters.
- The CSS keeps the layout minimal and responsive.
