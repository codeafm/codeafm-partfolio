import { projects } from './data/projects';
import { useEffect } from "react";

const SUPPORT_EMAIL = "codeafm@gmail.com";

function CrowdClashPage({ title, children }) {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = `Crowd Clash — ${title} | CodeAFM`;
    return () => { document.title = previousTitle; };
  }, [title]);

  return (
    <main className="legal-page" lang="en">
      <div className="legal-container">
        <a className="back-link" href="/">← Back to CodeAFM</a>
        <header className="legal-header">
          <img
            src={projects.find(project => project.id === "crowd-clash").icon}
            alt="Crowd Clash"
            className="legal-app-icon"
            width="74"
            height="74"
          />
          <div>
            <p className="eyebrow">Crowd Clash · CodeAFM</p>
            <h1>{title}</h1>
          </div>
        </header>
        {children}
        <footer className="legal-footer">
          © {new Date().getFullYear()} CodeAFM. All rights reserved.
        </footer>
      </div>
    </main>
  );
}

export function CrowdClashSupport() {
  return (
    <CrowdClashPage title="Support">
      <p className="updated">Crowd Clash Help & Support</p>
      <section>
        <h2>How can we help?</h2>
        <p>Contact CodeAFM for help with Crowd Clash, to report a problem, or to share feedback.</p>
        <a className="legal-button" href={`mailto:${SUPPORT_EMAIL}?subject=Crowd%20Clash%20Support`}>
          Email {SUPPORT_EMAIL}
        </a>
      </section>
      <section>
        <h2>Troubleshooting</h2>
        <div className="faq-item">
          <h3>The game crashes or will not open</h3>
          <p>Close and reopen Crowd Clash, restart your device, and check the store for an app update. Check that your device has free storage space.</p>
        </div>
        <div className="faq-item">
          <h3>I need help with my linked account</h3>
          <p>Make sure you are using the same Google or Apple account that you originally linked to Crowd Clash. If linking or signing in fails, check your connection and contact support with the error message. Never send us your password or verification codes.</p>
        </div>
        <div className="faq-item">
          <h3>An advertisement is not loading or seems inappropriate</h3>
          <p>Check your internet connection and try again later. To report an advertisement, describe what you saw and include a screenshot if possible. Crowd Clash uses Yandex advertising services.</p>
        </div>
        <div className="faq-item">
          <h3>Should I reinstall the game?</h3>
          <p>Contact support before uninstalling the game or clearing its data: progress stored on your device may be lost.</p>
        </div>
      </section>
      <section>
        <h2>Reporting a problem</h2>
        <p>Please include the following details in your email:</p>
        <ul>
          <li>Your device model and operating system version</li>
          <li>Your Crowd Clash app version</li>
          <li>A description of the issue and when it occurs</li>
          <li>A screenshot or screen recording, if helpful</li>
        </ul>
        <p>Do not include passwords, payment card details, or other sensitive information. Hide personal information in screenshots before sending them.</p>
      </section>
      <section>
        <h2>Account and data deletion</h2>
        <p>To request deletion of your Crowd Clash account and associated personal information, email us with the subject “Crowd Clash Account Deletion”. State which sign-in provider you used. We may need to verify account ownership before processing your request; do not send your password.</p>
        <a className="legal-button" href={`mailto:${SUPPORT_EMAIL}?subject=Crowd%20Clash%20Account%20Deletion`}>Request account deletion</a>
        <p>Uninstalling the game or revoking Google or Apple access does not by itself request deletion of information held by CodeAFM.</p>
        <a className="legal-secondary-link" href="/crowd-clash/privacy">Read the Crowd Clash Privacy Policy</a>
      </section>
    </CrowdClashPage>
  );
}

export function CrowdClashPrivacy() {
  return (
    <CrowdClashPage title="Privacy Policy">
      <p className="updated">Last updated: September 22, 2026</p>
      <section>
        <h2>1. About this policy</h2>
        <p>This policy explains how CodeAFM handles information in connection with Crowd Clash, including account linking through Google and Apple, Yandex advertisements, and support requests.</p>
        <p>Contact us about privacy at <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>.</p>
      </section>
      <section>
        <h2>2. Google and Apple account linking</h2>
        <p>When you link an account, the sign-in provider supplies an account identifier and authentication information so that Crowd Clash can recognize your linked account. Depending on the permissions requested and information you choose to share, this may also include your name and email address.</p>
        <p>Apple may supply a private relay email address if you choose Hide My Email. Authentication is handled by Google or Apple; CodeAFM does not receive your Google or Apple password.</p>
        <p>We use information received through sign-in to provide and manage the account connection and to help resolve account-related support requests.</p>
      </section>
      <section>
        <h2>3. Yandex advertising</h2>
        <p>Crowd Clash displays advertisements through the Yandex Mobile Ads SDK. Yandex processes information to deliver and measure advertisements and protect its advertising services against fraud.</p>
        <p>Depending on the platform, SDK settings, permissions, and your consent, advertising processing may involve device or advertising identifiers, device and network information, IP address, and interactions with advertisements. Advertising identifiers are subject to the permissions and restrictions of your device.</p>
        <p>Yandex describes its processing and privacy choices in its own policy:</p>
        <a className="legal-secondary-link" href="https://yandex.com/legal/confidential/">Yandex Privacy Policy</a>
      </section>
      <section>
        <h2>4. Information you send to support</h2>
        <p>If you contact us, we receive your email address, message, and any attachments or device details you provide. We use this information to answer your request, investigate problems, and assist with account or privacy requests. Please send only information relevant to your issue.</p>
      </section>
      <section>
        <h2>5. Service providers and sharing</h2>
        <p>Google and Apple process information to provide authentication, and Yandex processes information to provide advertising. Email service providers process correspondence used to provide support. Information may also be disclosed when required by law or necessary to protect users and the security of the service.</p>
        <p>The providers explain their own data handling in the following policies:</p>
        <a className="legal-secondary-link" href="https://policies.google.com/privacy">Google Privacy Policy</a>
        <a className="legal-secondary-link" href="https://www.apple.com/legal/privacy/data/en/sign-in-with-apple/">Sign in with Apple & Privacy</a>
        <p>Service providers may process information in countries other than your country of residence.</p>
      </section>
      <section>
        <h2>6. Retention and deletion</h2>
        <p>We retain account information while needed to provide your linked account and support correspondence while needed to resolve your request and related issues. Information may be retained longer where required by law or necessary for security or dispute resolution.</p>
        <p>You can request deletion of your Crowd Clash account and associated personal information by emailing us with the subject “Crowd Clash Account Deletion”. We may ask for information to verify account ownership. We will explain any information that must be retained and the reason for retaining it.</p>
        <p>Removing the app or revoking provider access does not automatically delete information already held by CodeAFM. Google, Apple, and Yandex manage information they hold under their respective retention policies.</p>
        <a className="legal-button" href={`mailto:${SUPPORT_EMAIL}?subject=Crowd%20Clash%20Account%20Deletion`}>Request account deletion</a>
      </section>
      <section>
        <h2>7. Your choices</h2>
        <p>You can manage or revoke the Crowd Clash connection in your Google or Apple account settings. This may affect access to features associated with that account.</p>
        <p>Your device privacy settings let you manage available app permissions and advertising or tracking controls. On iOS, tracking permissions can be managed in Settings under Privacy & Security → Tracking. Available controls vary by operating system and version.</p>
        <p>Depending on your location, you may have rights to access, correct, delete, or restrict the use of your personal information, or to withdraw consent. Contact us to make a request or ask about your options.</p>
      </section>
      <section>
        <h2>8. Children's privacy</h2>
        <p>If you are a parent or guardian and believe your child has provided personal information to Crowd Clash that should be removed, contact us. We will review the request and take appropriate steps to address it, including deletion where applicable.</p>
      </section>
      <section>
        <h2>9. Security and policy updates</h2>
        <p>We use reasonable safeguards to protect information we handle. No electronic storage or transmission method can guarantee complete security.</p>
        <p>We may update this policy as Crowd Clash or its services change. The current version will be published on this page with an updated date.</p>
      </section>
      <section>
        <h2>10. Contact CodeAFM</h2>
        <a className="legal-button" href={`mailto:${SUPPORT_EMAIL}?subject=Crowd%20Clash%20Privacy`}>{SUPPORT_EMAIL}</a>
        <a className="legal-secondary-link" href="/crowd-clash/support">Crowd Clash Support</a>
      </section>
    </CrowdClashPage>
  );
}
