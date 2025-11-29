export const config = {
  type: process.env.NUTRI_FB_TYPE,
  project_id: process.env.NUTRI_FB_PROJECT_ID,
  private_key_id: process.env.NUTRI_FB_PRIVATE_KEY_ID,
  private_key: process.env.NUTRI_FB_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  client_email: process.env.NUTRI_FB_CLIENT_EMAIL,
  client_id: process.env.NUTRI_FB_CLIENT_ID,
  auth_uri: process.env.NUTRI_FB_AUTH_URI,
  token_uri: process.env.NUTRI_FB_TOKEN_URI,
  auth_provider_x509_cert_url: process.env.NUTRI_FB_AUTH_PROVIDER_X509_CERT_URL,
  client_x509_cert_url: process.env.NUTRI_FB_CLIENT_X509_CERT_URL,
  universe_domain: process.env.NUTRI_FB_UNIVERSE_DOMAIN,
}


