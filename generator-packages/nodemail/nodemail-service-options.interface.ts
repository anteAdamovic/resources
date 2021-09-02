export interface NodemailServiceOptions {
  /**
   * Email address from which email will be sent.
   * 
   * Overrides environment variable NODEMAIL_EMAIL_ADDRESS
   */
  emailAddress: string;

  /**
   * Email password from which email will be sent.
   * 
   * Overrides environment variable NODEMAIL_EMAIL_PASSWORD
   */
  emailPassword: string;
}