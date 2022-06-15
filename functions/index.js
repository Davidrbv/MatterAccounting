const functions = require("firebase-functions");

// The Firebase Admin SDK to access Firestore.
const admin = require("firebase-admin");
admin.initializeApp();

/**
 * Initiate a recursive delete of documents at a given path.
 *
 * @param {string} data.path the document or collection path to delete.
 */
exports.recursiveDelete = functions
  .runWith({
    timeoutSeconds: 540,
    memory: "2GB"
  })
  .https.onCall(async (data, context) => {
    // Only allow admin users to execute this function.
    if (!(context.auth && context.auth.token && context.auth.token.admin)) {
      throw new functions.https.HttpsError(
        "permission-denied",
        "Must be an administrative user to initiate delete."
      );
    }

    const path = data.path;
    console.log(
      `User ${context.auth.uid} has requested to delete path ${path}`
    );

    // Run a recursive delete on the given document or collection path.
    // The 'token' must be set in the functions config, and can be generated
    // at the command line by running 'firebase login:ci'.
    await firebase_tools.firestore.delete(path, {
      project: process.env.GCLOUD_PROJECT,
      recursive: true,
      yes: true,
      token: functions.config().fb.token
    });

    return {
      path: path
    };
  });

function deleteAtPath(path) {
  var deleteFn = firebase.functions().httpsCallable("recursiveDelete");
  deleteFn({ path: path })
    .then(function(result) {
      logMessage("Delete success: " + JSON.stringify(result));
    })
    .catch(function(err) {
      logMessage("Delete failed, see console,");
      console.warn(err);
    });
}
