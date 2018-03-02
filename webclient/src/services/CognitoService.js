import {
    CognitoUserPool,
    CognitoUser,
    AuthenticationDetails,
    CognitoUserSession
} from "amazon-cognito-identity-js";
import { userPoolId, clientId } from "./CognitoConstants";

const cognitoUserPool = new CognitoUserPool({
    UserPoolId: userPoolId,
    ClientId: clientId
});

export function serialiseUser(session) {
    const user = {
        email: session.idToken.payload.email,
        roles: session.idToken.payload["cognito:groups"] || []
    }

    user.tokens = {
        IdToken: session.getIdToken().getJwtToken(),
        AccessToken: session.getAccessToken().getJwtToken(),
        RefreshToken: session.getRefreshToken().getToken(),
    };

    return user;
}

function getCognitoUser(username) {
    return new CognitoUser({
        Pool: cognitoUserPool,
        Username: username
    });
}

export function getCurrentUser() {
    return new Promise((resolve, reject) => {
        const cognitoUser = cognitoUserPool.getCurrentUser();

        if (!cognitoUser) {
            reject({
                message: "Could not retrieve the current user",
            });
            return;
        }

        cognitoUser.getSession((err, session) => {
            if (err) {
                reject(err);
                return;
            }
            resolve({ cognitoUser, session });
        });
    });
}

export function authenticateUser(username, password) {
    const authDetails = new AuthenticationDetails({
        Username: username,
        Password: password
    });

    const cognitoUser = getCognitoUser(username);

    return new Promise((resolve, reject) => cognitoUser.authenticateUser(authDetails, {
        onFailure: reject,

        onSuccess(session) {
            resolve({ cognitoUser, session, newPasswordRequired: false });
        },

        newPasswordRequired(userAttributes, requiredAttributes) {
            resolve({ userAttributes, newPasswordRequired: true });
        }
    }));
}

export function completeForcedPasswordChange(username, password, newPassword) {

    const authDetails = new AuthenticationDetails({
        Username: username,
        Password: password
    });

    const cognitoUser = getCognitoUser(username);

    return new Promise((resolve, reject) => cognitoUser.authenticateUser(authDetails, {
        onFailure: reject,
        onSuccess: (session) => {
            resolve({ cognitoUser, session });
        },
        newPasswordRequired(userAttributes, requiredAttributes) {
            delete userAttributes.email_verified;
            delete userAttributes.phone_number_verified;
            cognitoUser.completeNewPasswordChallenge(newPassword, userAttributes, this);
        }
    }));
}

export function forgotPassword(username) {
    const cognitoUser = getCognitoUser(username);

    return new Promise((resolve, reject) => cognitoUser.forgotPassword({
        onFailure: reject,
        onSuccess: resolve
    }));
}

export function confirmPassword(username, code, newPassword) {
    const cognitoUser = getCognitoUser(username);

    return new Promise((resolve, reject) => cognitoUser.confirmPassword(code, newPassword, {
        onFailure: reject,
        onSuccess: resolve
    }));
}

export function changePassword(user, oldPassword, newPassword) {
    return new Promise((resolve, reject) => {
        // Make sure the user is authenticated
        if (user == null || (user && user.tokens == null)) {
            reject({
                message: "User is unauthenticated"
            });
            return;
        }

        getCurrentUser().then((res) =>
            res.cognitoUser.changePassword(oldPassword, newPassword, (err) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve();
            }));
    });
}

export function signOutCognito(user) {
    return new Promise((resolve, reject) => {
        // Make sure user is authenticated
        if (user == null || (user && user.tokens == null)) {
            reject({
                message: "User is unauthenticated"
            });
            return;
        }

        const cognitoUser = getCognitoUser(user.email);

        cognitoUser.signOut();
        resolve();
    });
}