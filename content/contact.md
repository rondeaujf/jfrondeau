---
date: 2025-12-12T00:00:00+01:00
draft: false
title: "Contact"
---

# Contact Me

Feel free to reach out via the form below or connect with me on social media.

---

### Contact Form
{{< rawhtml >}}
<div class="contact-form-container">
  <form action="https://formspree.io/f/xkgdkzjw" method="POST" class="contact-form">
    <div class="form-group">
      <label for="name" class="form-label">Name</label>
      <input type="text" id="name" name="name" class="form-input" required>
    </div>

    <div class="form-group">
      <label for="email" class="form-label">Email</label>
      <input type="email" id="email" name="email" class="form-input" required>
    </div>

    <div class="form-group">
      <label for="message" class="form-label">Message</label>
      <textarea id="message" name="message" class="form-textarea" rows="5" required></textarea>
    </div>

    <div class="form-submit">
      <button type="submit" class="submit-button">Send Message</button>
    </div>
  </form>
</div>

<style>
  .contact-form-container {
    max-width: 600px;
    margin: 0 auto;
    padding: 2rem;
    background: var(--card-background);
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  }

  .contact-form {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .form-group {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .form-label {
    font-weight: 500;
    color: var(--text);
    font-size: 0.95rem;
  }

  .form-input, .form-textarea {
    padding: 0.75rem;
    border: 1px solid var(--border);
    border-radius: 4px;
    background: var(--input-background, var(--card-background));
    color: var(--text);
    font-size: 1rem;
    transition: border-color 0.2s ease;
  }

  .form-input:focus, .form-textarea:focus {
    outline: none;
    border-color: var(--link);
    box-shadow: 0 0 0 2px rgba(var(--link-rgb), 0.2);
  }

  .form-textarea {
    min-height: 120px;
    resize: vertical;
  }

  .form-submit {
    text-align: right;
  }

  .submit-button {
    padding: 0.75rem 1.5rem;
    background: var(--link);
    color: var(--card-background);
    border: none;
    border-radius: 4px;
    font-weight: 500;
    cursor: pointer;
    transition: background 0.2s ease;
  }

  .submit-button:hover {
    background: var(--link-hover, var(--link));
    opacity: 0.9;
  }

  /* Séparateurs entre les sections */
  .contact-form-container + .social-media {
    margin-top: 3rem;
    padding-top: 2rem;
    border-top: 1px solid var(--border);
  }
</style>
{{< /rawhtml >}}

---

### Social Media
<div class="social-media">
  <div class="social-item">
    <strong>LinkedIn:</strong>
    <a href="https://linkedin.com/in/jean-francois-rondeau" target="_blank" rel="noopener">Jean-François Rondeau</a>
  </div>
  <div class="social-item">
    <strong>Email:</strong>
    <a href="mailto:contact@jfrondeau.fr">contact@jfrondeau.fr</a>
  </div>
</div>

<style>
  .social-media {
    max-width: 600px;
    margin: 0 auto;
    padding: 0 2rem;
  }

  .social-item {
    margin-bottom: 0.75rem;
  }

  .social-item a {
    color: var(--link);
    text-decoration: none;
  }

  .social-item a:hover {
    text-decoration: underline;
  }
</style>
