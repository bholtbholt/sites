<script lang="ts">
  import type { PageProps } from './$types';
  import { socials, contactForm, site } from '$lib/index';

  let { data }: PageProps = $props();
</script>

<article>
  <div>
    <h1>Say hello 👋</h1>
    <p>
      Get at me on
      <a href={socials.github} target="_blank" rel="noreferrer">GitHub</a>,
      <a href={socials.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>, or send me an
      message here.
    </p>

    <form action={contactForm.action} method="POST">
      <input type="hidden" name="_subject" value="[{site.title}]: New message!" />
      <input type="text" name="_honey" style="display: none" />

      <div>
        <div>
          <label for="name">Your name:</label>
          <input id="name" type="text" name="name" required />
        </div>

        <div>
          <label for="email">Your email:</label>
          <input id="email" type="email" name="email" required />
        </div>
      </div>

      <label for="message">Your message:</label>
      <textarea id="message" name="message" required></textarea>

      <button type="submit">Send Message</button>
    </form>
  </div>
</article>
