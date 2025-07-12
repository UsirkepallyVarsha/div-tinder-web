import React from "react";

const ContactPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-base-200 to-base-300 p-6">
      <div className="card w-full max-w-lg shadow-xl bg-base-100 max-h-[80vh] overflow-y-auto">
        <div className="card-body space-y-4">
          <h2 className="text-4xl font-bold text-center text-primary">Contact Us</h2>
          <p className="text-center text-gray-500 mb-4">
            We are here to provide solutions to your queries. Reach out to us anytime.
          </p>

          <form className="space-y-4">
            <div className="form-control">
              <label className="label mb-2">
                <span className="label-text font-semibold">Name</span>
              </label>
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                className="input input-bordered input-primary"
                required
              />
            </div>

            <div className="form-control">
              <label className="label mb-2">
                <span className="label-text font-semibold">Email</span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                className="input input-bordered input-primary"
                required
              />
            </div>

            <div className="form-control">
              <label className="label mb-2">
                <span className="label-text font-semibold mb-2">Message</span>
              </label>
              <textarea
                name="message"
                placeholder="Your Message"
                className="textarea textarea-bordered textarea-primary"
                rows="4"
                required
              ></textarea>
            </div>

            <button
              type="submit"
              className="btn btn-primary w-full text-lg tracking-wide"
            >
              Send Message
            </button>
          </form>

          <div className="divider">OR</div>

          <div className="text-center">
            <p className="text-sm">
              You can also email us directly at{" "}
              <a
                href="mailto:varshausirkepallyvarsha@gmail.com"
                className="link link-primary font-medium"
              >
                varshausirkepallyvarsha@gmail.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
