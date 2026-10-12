import { site } from './data/site';
import './legal.css';

const email = site.email;

function PandaMahjongPage({ title, children }) {
  return <main className="legal-page" lang="en"><div className="legal-container">
    <a className="back-link" href="/">← Back to CodeAFM</a>
    <header className="legal-header">
      <img src="/icons/pandamahjong-ios.png" alt="Panda Mahjong" className="legal-app-icon" width="74" height="74" />
      <div><p className="eyebrow">Panda Mahjong · CodeAFM</p><h1>{title}</h1></div>
    </header>
    {children}
    <footer className="legal-footer">© {new Date().getFullYear()} CodeAFM.</footer>
  </div></main>;
}

export function PandaMahjongSupport() {
  return <PandaMahjongPage title="Support">
    <p className="updated">Panda Mahjong Help & Support</p>
    <section><h2>Contact the developer</h2>
      <p>Need help with Panda Mahjong, or want to report a problem? Email CodeAFM. Include your device model, operating system, app version, level number and a description of what happened.</p>
      <a className="legal-button" href={`mailto:${email}?subject=Panda%20Mahjong%20Support`}>Email {email}</a>
      <p>If useful, attach a screenshot with personal information hidden. Never send passwords, verification codes or payment details.</p>
    </section>
    <section><h2>Gameplay</h2>
      <p>Tap two identical free tiles to remove them as a pair. A tile is free when nothing lies on top of it and at least one side, left or right, is open. Clear the board to finish the level.</p>
      <p>Hints show an available pair, Shuffle rearranges the remaining tiles and Undo takes back your last move. When there are no moves left, a shuffle is always free. The campaign has 1,000 levels in three difficulty modes, plus a daily layout.</p>
    </section>
    <section><h2>Troubleshooting</h2>
      <div className="faq-item"><h3>The game will not open</h3><p>Close and reopen the app, restart your device, check for an update and make sure there is free storage.</p></div>
      <div className="faq-item"><h3>An ad or reward is unavailable</h3><p>Advertising needs a working internet connection and an available ad. A rewarded-ad bonus requires completion confirmed by the advertising service. If a completed ad did not grant a reward, tell us the level, approximate time and what you saw.</p></div>
      <div className="faq-item"><h3>Progress or sound settings</h3><p>Completed levels, stars, records and preferences are saved on the device. A round that was not finished starts again after the app is fully closed. Check the in-game sound controls and your device volume. Contact support before uninstalling or clearing app data, because locally saved progress may be lost. Cloud synchronization between devices is not provided by the current game.</p></div>
    </section>
    <section><h2>Privacy requests</h2><p>For questions about information handled by Panda Mahjong or to request deletion of support correspondence, contact us at the address above. The game does not require a CodeAFM player account.</p>
      <a className="legal-secondary-link" href="/panda-mahjong/privacy">Read the Panda Mahjong Privacy Policy</a>
    </section>
  </PandaMahjongPage>;
}

export function PandaMahjongPrivacy() {
  return <PandaMahjongPage title="Privacy Policy">
    <p className="updated">Last updated: October 12, 2026</p>
    <section><h2>1. About this policy</h2><p>CodeAFM develops Panda Mahjong. This policy covers game progress, advertising services included in the game and information you send to support. Contact us at <a href={`mailto:${email}`}>{email}</a>.</p></section>
    <section><h2>2. Game progress and preferences</h2><p>The game stores completed levels, stars, records, hint and shuffle counts and preferences locally on your device. The current game does not require registration, provide a player account or implement cloud synchronization. Removing the app or clearing its data may remove this local information; device backup behavior depends on your operating system.</p></section>
    <section><h2>3. Advertising and service diagnostics</h2>
      <p>On iPhone and iPad, Panda Mahjong shows advertising from Unity Ads; the iOS app also includes the Yandex Mobile Ads SDK, with AppMetrica components, for banner advertising. On Android, the game shows advertising from Yandex Mobile Ads. Rewarded videos start only when you choose to watch them. These services process information for advertising delivery and measurement, service diagnostics and fraud prevention.</p>
      <p>Depending on the service, platform, configuration and applicable permissions or consent, this can involve device and installation identifiers, advertising identifiers, device and operating system details, IP address, approximate location inferred from network information, ad interactions and diagnostic information.</p>
      <p>Providers describe their processing, retention and available privacy choices in their policies:</p>
      <a className="legal-secondary-link" href="https://yandex.com/legal/confidential/">Yandex Privacy Policy, including AppMetrica services</a>
      <a className="legal-secondary-link" href="https://unity.com/legal/game-player-and-app-user-privacy-policy">Unity Game Player and App User Privacy Policy</a>
    </section>
    <section><h2>4. Information you send to support</h2><p>When you contact us, we receive your email address, message and any attachments or device details you choose to provide. We use them to respond, investigate the reported issue and handle privacy requests. Please send only information needed for your request.</p></section>
    <section><h2>5. Sharing and international processing</h2><p>Advertising providers process information through their services. Email providers process support correspondence. Those providers may process information outside your country. Information may also be disclosed when required by law or necessary to investigate abuse and protect the service. Their own policies describe their recipients and international processing arrangements.</p></section>
    <section><h2>6. Retention and deletion</h2><p>Game progress remains locally stored until removed or reset. Support correspondence is kept while needed to resolve the request and related issues, or where retention is required by law. Email us to request deletion of correspondence or ask about information CodeAFM handles. We may need to verify your request. Advertising providers manage retention and deletion of information they hold under their own policies; uninstalling the game does not automatically delete their records.</p></section>
    <section><h2>7. Your choices and rights</h2><p>Your device settings provide available advertising and tracking controls. On iOS, these are in Settings → Privacy & Security → Tracking. Available controls vary by platform; the absence of a tracking prompt does not mean that no information is processed for advertising.</p><p>Depending on your location, you may have rights to access, correct or delete personal information, restrict processing, object to certain uses or withdraw consent where processing relies on consent. Contact us about information CodeAFM handles and use the provider links above for information held by advertising services.</p></section>
    <section><h2>8. Children and privacy</h2><p>If you are a parent or guardian and believe a child has provided personal information that should be removed, contact us. Do not include sensitive information about a child in the initial message. We will review the request and assist with appropriate next steps.</p></section>
    <section><h2>9. Policy updates and contact</h2><p>We will update this page as the game or its services change. The date above identifies this version.</p>
      <a className="legal-button" href={`mailto:${email}?subject=Panda%20Mahjong%20Privacy`}>Contact {email}</a>
      <a className="legal-secondary-link" href="/panda-mahjong/support">Panda Mahjong Support</a>
    </section>
  </PandaMahjongPage>;
}
