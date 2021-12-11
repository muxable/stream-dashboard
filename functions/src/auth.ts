import * as cookieParser from "cookie-parser";
import * as crypto from "crypto";
import * as admin from "firebase-admin";
import * as functions from "firebase-functions";
import fetch from "node-fetch";
import { AuthorizationCode, ModuleOptions } from "simple-oauth2";

const HOST =
  process.env.NODE_ENV === "production"
    ? "https://dashboard.mtun.io"
    : "http://localhost:5000";
const SCOPES = "user:read:email";

export const redirect = functions.https.onRequest((req, res) => {
  const authCode = twitchAuthClient();

  cookieParser()(req, res, () => {
    const state =
      req.cookies.__session || crypto.randomBytes(20).toString("hex");
    res.cookie("__session", state.toString(), {
      maxAge: 3600000,
      httpOnly: true,
    });
    const redirectUri = authCode.authorizeURL({
      redirect_uri: `${HOST}/auth/callback`,
      scope: SCOPES,
      state: state,
    });

    // Append `force_verify=true` to avoid the prompt
    res.redirect(`${redirectUri}&force_verify=true`);
  });
});

export const callback = functions.https.onRequest((req, res) => {
  const authCode = twitchAuthClient();
  try {
    cookieParser()(req, res, async () => {
      if (!req.cookies.__session || req.cookies.__session !== req.query.state) {
        functions.logger.warn("Invalid cookie state in twitch auth");
        res.redirect("/auth/redirect");
      } else if (req.query.code === undefined || req.query.code === "") {
        res.redirect("/auth/redirect");
      }
      const accessToken = await authCode.getToken({
        code: String(req.query.code),
        redirect_uri: `${HOST}/auth/callback`,
      });

      const twitchUser = await getTwitchUser(accessToken.token.access_token);

      const firebaseToken = await createFirebaseAccount(twitchUser);
      res.cookie("token", firebaseToken);
      res.redirect("/");
    });
  } catch (error) {
    functions.logger.error(error);
  }
});

async function createFirebaseAccount(twitchUser: TwitchUser) {
  const uid = `twitch:${twitchUser.id}`;

  const db = admin.firestore();
  const databaseTask = db.collection("users").doc(uid).set(twitchUser);

  const userCreationTask = admin
    .auth()
    .updateUser(uid, {
      displayName: twitchUser.displayName,
      photoURL: twitchUser.profileImageUrl,
      email: twitchUser.email,
    })
    .catch((error) => {
      if (error.code === "auth/user-not-found") {
        return admin.auth().createUser({
          uid: uid,
          displayName: twitchUser.displayName,
          photoURL: twitchUser.profileImageUrl,
          email: twitchUser.email,
        });
      }
      throw error;
    });

  await Promise.all([userCreationTask, databaseTask]);

  const token = await admin.auth().createCustomToken(uid);
  return token;
}

/**
 * Retrieves the user's information from Twitch
 * @param accessToken
 * @returns
 */
async function getTwitchUser(accessToken: string) {
  const response = await fetch("https://api.twitch.tv/helix/users", {
    method: "GET",
    headers: {
      "Client-Id": functions.config().twitch.client_id,
      Authorization: "Bearer " + accessToken,
    },
  });
  const data: any = await response.json();
  return {
    id: data.data[0]["id"],
    displayName: data.data[0]["display_name"],
    email: data.data[0]["email"],
    profileImageUrl: data.data[0]["profile_image_url"],
  } as TwitchUser;
}

function twitchAuthClient() {
  const credentials: ModuleOptions = {
    client: {
      id: functions.config().twitch.client_id,
      secret: functions.config().twitch.client_secret,
    },
    auth: {
      tokenHost: "https://id.twitch.tv",
      tokenPath: "/oauth2/token",
      authorizePath: "/oauth2/authorize",
    },
    options: {
      authorizationMethod: "body",
      bodyFormat: "json",
    },
  };
  return new AuthorizationCode(credentials);
}

interface TwitchUser {
  id: string;
  displayName: string;
  email: string;
  profileImageUrl: string;
}
