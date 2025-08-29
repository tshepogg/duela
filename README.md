# Mokoro Water Voucher — MVP (GitHub Pages)
1) In Firebase Console: enable Email/Password under Authentication.
2) Add your domain (e.g., tshepogg.github.io) to Authentication → Authorized domains.
3) Realtime Database → Rules → paste rules.json and Publish. (Create /admins/<yourUID>=true if you want admin.)
4) Commit all files to `main`. In GitHub: Settings → Pages → Deploy from a branch → `main` / root.
5) Open https://tshepogg.github.io/duela/ — sign up, sign in, buy voucher (demo), view history.

## Notes
- This is a **client-only POC** (no live card processing). Replace the demo payment with a PCI-DSS gateway + webhooks on a server in production.
- Use only hash routes (#/…) to avoid 404s on Pages.
- Keep Firebase CDN version at 10.12.0 unless you update all imports consistently.
