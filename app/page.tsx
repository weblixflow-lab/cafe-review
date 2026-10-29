"use client";

import { useState } from "react";
import {
  Coffee,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  QrCode,
  Heart,
  ExternalLink,
  RotateCcw,
  MessageCircle,
  Star,
} from "lucide-react";

const options: Record<number, string[]> = {
  1: [
    "My experience did not meet expectations.",
    "The service could be improved.",
    "There is room to improve the food and overall experience.",
  ],
  2: [
    "Some parts of my visit could have been better.",
    "The service needs a little improvement.",
    "I hope to see improvements on my next visit.",
  ],
  3: [
    "A decent cafe experience overall.",
    "The atmosphere was pleasant.",
    "A good visit, with a few things that could improve.",
  ],
  4: [
    "Great coffee and a lovely atmosphere.",
    "Friendly service and a very enjoyable visit.",
    "I had a great experience at this cafe.",
  ],
  5: [
    "Amazing coffee and excellent service!",
    "Loved the ambience and the overall experience.",
    "A wonderful cafe experience — I would visit again!",
  ],
};

const reactions: Record<
  number,
  {
    label: string;
    image: string;
    description: string;
  }
> = {
  1: {
    label: "Very Bad",
    image: "/emojis/very-bad.png",
    description: "We're sorry to hear that.",
  },
  2: {
    label: "Bad",
    image: "/emojis/bad.png",
    description: "We can do better.",
  },
  3: {
    label: "Average",
    image: "/emojis/average.png",
    description: "Thanks for your honest feedback.",
  },
  4: {
    label: "Good",
    image: "/emojis/good.png",
    description: "We're glad you enjoyed it!",
  },
  5: {
    label: "Excellent",
    image: "/emojis/excellent.png",
    description: "Yay! We're happy you loved it!",
  },
};

type Step = "rating" | "compose" | "success" | "google";

const steps: Step[] = ["rating", "compose", "success", "google"];

export default function Home() {
  // QR scan ke baad sabse pehle rating screen khulegi.
  const [step, setStep] = useState<Step>("rating");

  const [rating, setRating] = useState(0);
  const [selected, setSelected] = useState<string[]>([]);
  const [custom, setCustom] = useState("");
  const [name, setName] = useState("");

  const review = [...selected, custom.trim()]
    .filter(Boolean)
    .join(" ");

  function reset() {
    setStep("rating");
    setRating(0);
    setSelected([]);
    setCustom("");
    setName("");
  }

  function pick(value: number) {
    setRating(value);
    setSelected([]);
    setCustom("");
    setStep("compose");
  }

  function toggle(suggestion: string) {
    setSelected((current) =>
      current.includes(suggestion)
        ? current.filter((item) => item !== suggestion)
        : [...current, suggestion]
    );
  }

  return (
    <main className="shell">
      <div className="ambient a" />
      <div className="ambient b" />

      <div className="demo-banner">
        <i />
        INTERACTIVE CLIENT DEMO · NOT LIVE REVIEWS
      </div>

      <section className="card">
        {/* BRAND HEADER */}
        <header className="brand">
          <div className="mark">
            <Coffee size={23} />
          </div>

          <div className="brand-copy">
            <p className="eyebrow">YOUR NEIGHBOURHOOD CAFE</p>
            <h1>
              RKN Devl <em>Cafe</em>
            </h1>
          </div>

          <div className="badge">
            <QrCode size={14} />
            QR REVIEW
          </div>
        </header>

        {/* PROGRESS BAR */}
        <div className="progress">
          {steps.map((currentStep, index) => (
            <div
              key={currentStep}
              className={
                steps.indexOf(step) >= index ? "done" : ""
              }
            />
          ))}
        </div>

        {/* SCREEN 1: STAR RATING */}
        {step === "rating" && (
          <div className="screen">
            <div className="pill">
              <Sparkles size={13} />
              A LITTLE MOMENT, A BIG THANK YOU
            </div>

            <h2>
              How was your
              <br />
              <em>cafe experience?</em>
            </h2>

            <p className="muted rating-intro">
              Thank you for visiting RKN Devl Cafe.
              <br />
              Tap the stars to share your experience.
            </p>

            <div className="rating-box star-rating-box">
              <div
                className="stars"
                role="group"
                aria-label="Rate your cafe experience"
              >
                {[1, 2, 3, 4, 5].map((value) => (
                  <button
                    key={value}
                    type="button"
                    className={`star ${
                      rating >= value ? "star-active" : ""
                    }`}
                    onClick={() => pick(value)}
                    aria-label={`${value} out of 5 stars`}
                  >
                    <Star
                      size={44}
                      strokeWidth={1.5}
                      fill={rating >= value ? "currentColor" : "none"}
                    />
                  </button>
                ))}
              </div>

              <p className="rating-hint">
                Select a star to continue
              </p>

              <div className="rating-labels">
                <span>Very Bad</span>
                <span>Excellent</span>
              </div>
            </div>

            <div className="perks">
              <span>
                <Heart size={14} />
                Your feedback matters
              </span>

              <span>
                <MessageCircle size={14} />
                Takes less than a minute
              </span>
            </div>

            <p className="fine">
              Your honest feedback helps us get better.
            </p>
          </div>
        )}

        {/* SCREEN 2: MATCHING CAT + REVIEW SUGGESTIONS */}
        {step === "compose" && (
          <div className="screen">
            <button
              className="back"
              onClick={() => setStep("rating")}
            >
              <ArrowLeft size={15} />
              Change rating
            </button>

            <div className="chosen chosen-emoji">
              <div className="chosen-image-wrap">
                <img
                  src={reactions[rating].image}
                  alt={`${reactions[rating].label} cat`}
                  className="chosen-emoji-image"
                />
              </div>

              <div className="chosen-copy">
                <strong>{reactions[rating].label}</strong>
                <span>{reactions[rating].description}</span>

                <div className="mini-stars">
                  {[1, 2, 3, 4, 5].map((value) => (
                    <Star
                      key={value}
                      size={13}
                      fill={value <= rating ? "currentColor" : "none"}
                    />
                  ))}
                </div>
              </div>

              <span className="rating-number">
                {rating}/5
              </span>
            </div>

            <div className="section-head">
              <div className="section-icon">
                <Sparkles size={18} />
              </div>

              <div>
                <h3>Review suggestions</h3>
                <p>
                  Choose only what reflects your real experience.
                </p>
              </div>
            </div>

            <div className="suggestions">
              {options[rating].map((suggestion) => (
                <button
                  key={suggestion}
                  type="button"
                  className={`suggestion ${
                    selected.includes(suggestion) ? "selected" : ""
                  }`}
                  onClick={() => toggle(suggestion)}
                >
                  <span className="check">
                    {selected.includes(suggestion) ? (
                      <CheckCircle2 size={17} />
                    ) : null}
                  </span>

                  <span>{suggestion}</span>
                </button>
              ))}
            </div>

            <label htmlFor="custom">
              Add your own thoughts <span>(optional)</span>
            </label>

            <textarea
              id="custom"
              rows={3}
              maxLength={500}
              placeholder="What stood out during your visit?"
              value={custom}
              onChange={(event) => setCustom(event.target.value)}
            />

            <div className="character-count">
              {custom.length}/500
            </div>

            <label htmlFor="name">
              Your name <span>(optional)</span>
            </label>

            <input
              id="name"
              maxLength={80}
              placeholder="Enter your name"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />

            {/* LIVE REVIEW PREVIEW */}
            <div className="preview">
              <div className="preview-heading">
                <img
                  src={reactions[rating].image}
                  alt=""
                  className="preview-emoji"
                />

                <strong>YOUR REVIEW PREVIEW</strong>
              </div>

              <div className="preview-rating">
                {[1, 2, 3, 4, 5].map((value) => (
                  <Star
                    key={value}
                    size={15}
                    fill={value <= rating ? "currentColor" : "none"}
                  />
                ))}
              </div>

              <p>
                {review ||
                  "Choose a suggestion or write your own feedback to preview your review."}
              </p>

              {name.trim() && (
                <small className="preview-name">
                  — {name.trim()}
                </small>
              )}
            </div>

            <button
              className="primary"
              disabled={!review.trim()}
              onClick={() => setStep("success")}
            >
              Review looks good
              <ArrowRight size={17} />
            </button>

            <p className="fine">
              This demo does not save or publish your review.
            </p>
          </div>
        )}

        {/* SCREEN 3: SUCCESS + THANK-YOU VIDEO */}
        {step === "success" && (
          <div className="screen center-screen">
            <div className="success-icon">
              <CheckCircle2 size={38} />
            </div>

            <div className="pill">
              DEMO SUBMISSION COMPLETE
            </div>

            {/* SAME THANK-YOU VIDEO FOR EVERY RATING */}
            <div className="success-emoji-wrap">
              <video
                className="success-video"
                autoPlay
                muted
                loop
                playsInline
                aria-label="Cute cat smiling with hearts"
              >
                <source
                  src="/videos/thank-you.mp4"
                  type="video/mp4"
                />
                Your browser does not support video playback.
              </video>
            </div>

            <h2>
              Thank you{name.trim() ? `, ${name.trim()}` : ""}!
              <br />
              <em>We appreciate you.</em>
            </h2>

            <p className="lead">
              Your review preview is ready. In the final product,
              your feedback can be submitted securely and you can
              also choose to share it on Google.
            </p>

            <div className="receipt">
              <div className="receipt-rating">
                <img
                  src={reactions[rating].image}
                  alt={reactions[rating].label}
                  className="receipt-emoji"
                />

                <div>
                  <strong>{reactions[rating].label}</strong>
                  <span>{rating}/5 stars</span>
                </div>
              </div>

              <p>{review}</p>

              <small>PREVIEW ONLY · NOT SAVED</small>
            </div>

            <button
              className="primary"
              onClick={() => setStep("google")}
            >
              Continue to Google Reviews demo
              <ArrowRight size={17} />
            </button>

            <button className="secondary" onClick={reset}>
              <RotateCcw size={15} />
              Restart customer journey
            </button>
          </div>
        )}

        {/* SCREEN 4: GOOGLE REVIEWS PREVIEW */}
        {step === "google" && (
          <div className="screen center-screen">
            <div className="google">G</div>

            <div className="pill">
              GOOGLE REVIEWS · PREVIEW
            </div>

            <h2>
              Share it with
              <br />
              <em>the community.</em>
            </h2>

            <p className="lead">
              In the live version, this will open RKN Devl Cafe&apos;s
              official Google review page. Its Google Business
              Profile link has not been connected yet.
            </p>

            <div className="note">
              <ExternalLink size={17} />

              <span>
                No external review opens in this prototype.
                No rating or review has been sent to Google.
              </span>
            </div>

            <button className="primary" onClick={reset}>
              <RotateCcw size={16} />
              Restart demo
            </button>
          </div>
        )}

        <footer>
          BLACK CHERRY <b>✦</b> CREAM VANILLA <b>✦</b> RKN DEVL CAFE
        </footer>
      </section>

      <p className="bottom">
        Crafted for good moments · <strong>Demo mode only</strong>
      </p>
    </main>
  );
}