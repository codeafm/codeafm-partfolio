import { projects } from './data/projects';
import { useEffect } from 'react';
import React from "react";
import "./legal.css";

const EMAIL_TO = "codeafm@gmail.com";
export function BottleSortPrivacy() {
  useEffect(() => { document.title = 'Bottle Sort — Privacy Policy | CodeAFM'; }, []);
  return (
    <div className="legal-page" lang="en">
      <div className="legal-container">
        <a className="back-link" href="/">
          ← Back to CodeAFM
        </a>

        <div className="legal-header">
          <img
            src={projects.find(project => project.id === "bottle-sort").icon}
            alt="Bottle Sort"
            className="legal-app-icon"
          />

          <div>
            <p className="eyebrow">Bottle Sort</p>
            <h1>Privacy Policy</h1>
          </div>
        </div>

        <p className="updated">Last updated: August 24, 2026</p>

        <section>
          <h2>1. Introduction</h2>

          <p>
            This Privacy Policy explains how Bottle Sort handles information
            when you use the application.
          </p>

          <p>
            Bottle Sort is a casual puzzle game developed and published by
            CodeAFM.
          </p>

          <p>
            We respect your privacy and aim to collect only the information
            necessary to operate, maintain, and improve the application.
          </p>
        </section>

        <section>
          <h2>2. Information We Collect</h2>

          <p>
            Bottle Sort does not require users to create an account or provide
            a name, email address, phone number, or other personal information
            in order to play the game.
          </p>

          <p>
            We do not directly collect personal information through account
            registration because Bottle Sort does not include an account
            registration system.
          </p>
        </section>

        <section>
          <h2>3. Advertising</h2>

          <p>
            Bottle Sort may display advertisements provided by third-party
            advertising services, including Yandex Mobile Ads SDK.
          </p>

          <p>
            Advertising providers may automatically process certain technical
            information required to deliver, measure, secure, and improve
            advertisements.
          </p>

          <p>
            Depending on the user's device, region, privacy settings, and
            applicable law, this information may include technical identifiers,
            device information, advertising interaction information, diagnostic
            data, and approximate location derived from network information.
          </p>

          <p>
            Any information processed by third-party advertising providers is
            subject to their own privacy policies.
          </p>
        </section>

        <section>
          <h2>4. Device Permissions</h2>

          <p>
            Bottle Sort does not require access to contacts, microphone, or
            precise location for its core gameplay.
          </p>

          <p>
            If the application or an integrated service requests a device
            permission, iOS will display the appropriate system permission
            prompt before access is provided.
          </p>

          <p>
            Users can manage application permissions at any time in the iOS
            Settings application.
          </p>
        </section>

        <section>
          <h2>5. App Tracking Transparency</h2>

          <p>
            Where required by Apple policies or applicable law, permission will
            be requested before accessing data used to track users across apps
            or websites owned by other companies.
          </p>

          <p>
            Users may deny this permission and continue using the core gameplay
            features of Bottle Sort.
          </p>
        </section>

        <section>
          <h2>6. Analytics and Technical Information</h2>

          <p>
            Third-party services integrated into the application may process
            technical information such as device type, operating system
            version, application version, crash information, performance data,
            advertising events, and general usage information.
          </p>

          <p>
            This information may be used to maintain the application, diagnose
            technical issues, prevent abuse, and improve the user experience.
          </p>
        </section>

        <section>
          <h2>7. Children's Privacy</h2>

          <p>
            Bottle Sort is a general-audience casual puzzle game.
          </p>

          <p>
            We do not knowingly collect personal information directly from
            children through an account registration system.
          </p>

          <p>
            Third-party services used by the application may operate according
            to their own privacy policies and legal obligations.
          </p>
        </section>

        <section>
          <h2>8. Data Sharing</h2>

          <p>
            We do not sell personal information provided directly to Bottle
            Sort.
          </p>

          <p>
            Technical information may be processed by service providers that
            help us operate the application, including advertising providers.
          </p>
        </section>

        <section>
          <h2>9. Data Security</h2>

          <p>
            We take reasonable measures to protect the application and the
            information associated with its operation.
          </p>

          <p>
            However, no method of electronic transmission or storage can be
            guaranteed to be completely secure.
          </p>
        </section>

        <section>
          <h2>10. International Users</h2>

          <p>
            Bottle Sort may be available in multiple countries and regions.
            Third-party service providers may process information in countries
            other than the user's country of residence.
          </p>
        </section>

        <section>
          <h2>11. Changes to This Privacy Policy</h2>

          <p>
            We may update this Privacy Policy when the application's features,
            services, or legal requirements change.
          </p>

          <p>
            Any updates will be published on this page with a revised
            "Last updated" date.
          </p>
        </section>

        <section>
          <h2>12. Contact Us</h2>

          <p>
            If you have questions regarding this Privacy Policy or Bottle Sort,
            please contact us.
          </p>

          <a className="legal-button" href={`mailto:${EMAIL_TO}`}>
            {EMAIL_TO}
          </a>

          <a
            className="legal-secondary-link"
            href="/bottle-sort/support"
          >
            Bottle Sort Support
          </a>
        </section>

        <footer className="legal-footer">
          © {new Date().getFullYear()} CodeAFM. All rights reserved.
        </footer>
      </div>
    </div>
  );
}

export function BottleSortSupport() {
  useEffect(() => { document.title = 'Bottle Sort — Support | CodeAFM'; }, []);
  return (
    <div className="legal-page" lang="en">
      <div className="legal-container">
        <a className="back-link" href="/">
          ← Back to CodeAFM
        </a>

        <div className="legal-header">
          <img
            src={projects.find(project => project.id === "bottle-sort").icon}
            alt="Bottle Sort"
            className="legal-app-icon"
          />

          <div>
            <p className="eyebrow">Bottle Sort</p>
            <h1>Support</h1>
          </div>
        </div>

        <p className="updated">Bottle Sort Help & Support</p>

        <section>
          <h2>About Bottle Sort</h2>

          <p>
            Bottle Sort is a casual puzzle game where the objective is to sort
            colored liquids into bottles until each bottle contains only one
            color.
          </p>

          <p>
            The game includes multiple levels designed to provide a simple,
            relaxing, and progressively challenging puzzle experience.
          </p>
        </section>

        <section>
          <h2>How to Play</h2>

          <ol>
            <li>Tap a bottle to select it.</li>

            <li>Tap another bottle to pour the liquid into it.</li>

            <li>
              Liquid can only be poured when the move is allowed by the game
              rules.
            </li>

            <li>
              Continue sorting until every bottle contains a single color.
            </li>

            <li>Complete the level and continue to the next puzzle.</li>
          </ol>
        </section>

        <section>
          <h2>Frequently Asked Questions</h2>

          <div className="faq-item">
            <h3>Do I need an account?</h3>

            <p>
              No. Bottle Sort does not require registration or login. You can
              start playing immediately after opening the app.
            </p>
          </div>

          <div className="faq-item">
            <h3>Does Bottle Sort require an internet connection?</h3>

            <p>
              Core gameplay may be available without an internet connection.
              Some features, including advertisements, may require internet
              access.
            </p>
          </div>

          <div className="faq-item">
            <h3>Why am I seeing advertisements?</h3>

            <p>
              Bottle Sort may display advertisements to support development and
              maintenance of the game.
            </p>
          </div>

          <div className="faq-item">
            <h3>The game is not working correctly. What should I do?</h3>

            <p>
              Close and reopen Bottle Sort. You can also restart your device and
              make sure you are using the latest available version of the
              application.
            </p>
          </div>

          <div className="faq-item">
            <h3>How can I report a problem?</h3>

            <p>
              Contact us by email and include a short description of the
              problem. If possible, include a screenshot or screen recording.
            </p>
          </div>
        </section>

        <section>
          <h2>Technical Support</h2>

          <p>
            If you experience a problem with Bottle Sort, please include the
            following information when contacting support:
          </p>

          <ul>
            <li>Your iPhone or iPad model</li>
            <li>Your iOS or iPadOS version</li>
            <li>The Bottle Sort app version</li>
            <li>A description of the problem</li>
            <li>A screenshot or screen recording, if available</li>
          </ul>
        </section>

        <section>
          <h2>Contact</h2>

          <p>
            For technical support, questions, or feedback regarding Bottle Sort,
            contact CodeAFM:
          </p>

          <a className="legal-button" href={`mailto:${EMAIL_TO}`}>
            ✉ {EMAIL_TO}
          </a>
        </section>

        <section>
          <h2>Privacy Policy</h2>

          <p>
            You can read the Bottle Sort Privacy Policy using the link below.
          </p>

          <a
            className="legal-secondary-link"
            href="/bottle-sort/privacy"
          >
            View Privacy Policy
          </a>
        </section>

        <footer className="legal-footer">
          © {new Date().getFullYear()} CodeAFM. All rights reserved.
        </footer>
      </div>
    </div>
  );
}
