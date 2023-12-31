import {
  SecretsManagerClient,
  GetSecretValueCommand,
} from "@aws-sdk/client-secrets-manager";

export default async function get_DB_password() {
  const secret_name = process.env.PGSQL_CREDENTIALS;
  console.debug(secret_name);
  const region = "eu-west-1";
  const client = new SecretsManagerClient({
    region: region,
  });
  let response;
  try {
    response = await client.send(
      new GetSecretValueCommand({
        SecretId: secret_name,
        VersionStage: "AWSCURRENT", // VersionStage defaults to AWSCURRENT if unspecified
      })
    );
  } catch (error) {
    // For a list of exceptions thrown, see
    // https://docs.aws.amazon.com/secretsmanager/latest/apireference/API_GetSecretValue.html
    console.error(error);
    return null;
  }
  const password = JSON.parse(response.SecretString).password;
  return password;
}
