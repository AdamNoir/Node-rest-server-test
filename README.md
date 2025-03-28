# Node Rest Server Test

**Steps:**

1. Build Project: `npm i`
2. Create `.env` file prom `.env.template`
3. Generetate self-certificates with: `openssl req -x509 -sha256 -nodes -days 365 -newkey rsa:2048 -keyout server.key -out server.crt`
4. Put the certificates in the folder `./keys`
5. Run: `npm run dev`
