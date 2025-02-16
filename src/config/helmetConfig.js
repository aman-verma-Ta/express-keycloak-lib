const helmet = require("helmet");

module.exports = helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"], // Default for all unspecified directives
      scriptSrc: ["'self'"], //  Add any inline script hashes or 'unsafe-inline' if absolutely necessary.  Avoid 'unsafe-eval'.
      styleSrc: ["'self'"], // Same as scriptSrc for styles
      imgSrc: ["'self'", "data:"], // Allow images from self and data URIs (e.g., base64 encoded images)
      fontSrc: ["'self'"], // Allow fonts from self
      connectSrc: ["'self'"], //  For AJAX and WebSockets - restrict as much as possible
      frameSrc: ["'self'"], // Control iframes.  'none' is usually best unless you need iframes.
      objectSrc: ["'none'"], // Disallow plugins (Flash, Java, etc.)
      mediaSrc: ["'self'"], // Allow media (audio, video) from self
      formAction: ["'self'"], // Where forms can submit to
      frameAncestors: ["'none'"], // Prevent your site from being iframed (more powerful than frameguard)
    },
    // reportOnly: true, // Use this for testing - headers are sent but not enforced
  },
  frameguard: { action: "deny" }, // Recommended
  xssFilter: true, // Recommended
  noSniff: true, // Recommended
  referrerPolicy: { policy: "strict-origin-when-cross-origin" }, // Recommended
  hsts: {
    // Highly Recommended for HTTPS
    maxAge: 31536000, // 1 year in seconds
    includeSubDomains: true, // If you want HSTS for subdomains
    preload: true, // For HSTS preloading (consult docs)
  },
  // ieNoOpen: true,  // Generally not needed anymore
  // dnsPrefetchControl: { allow: false }, //  Can improve privacy but might affect performance slightly
  // expectCt: { // Certificate Transparency - good practice, but requires setup
  //   enforce: true,
  //   maxAge: 86400,
  // },
  hidePoweredBy: true, // Good practice
});