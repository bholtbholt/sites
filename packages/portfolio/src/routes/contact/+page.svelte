<script lang="ts">
  import { site, InputText, InputTextarea, Button } from '$lib/index';
</script>

<article
  id="contact"
  class="
    prose dark:prose-invert prose-slate md:prose-lg lg:prose-xl
    mt-20 mb-32 md:mt-28 lg:mt-32
  "
>
  <h1 class="mb-0! text-emerald-800 dark:text-cyan-400">Say hello</h1>
  <p>
    Send me a message here or on
    <a href="https://linkedin.com/in/bholtbholt" target="_blank" rel="noreferrer">LinkedIn</a>.
  </p>

  <form action="https://formsubmit.co/c168c951e89fffaf972dbecd9fa5e4c1" method="POST">
    <input type="hidden" name="_subject" value="[{site.title}]: New message!" />
    <input type="text" name="_honey" style="display: none" />

    <div class="gap-6 md:flex">
      <InputText name="name" label="Name" margin="mb-12" />
      <InputText name="email" label="Email" margin="mb-12" />
    </div>

    <InputTextarea name="message" label="Message" margin="mb-12" />

    <Button>Send Message</Button>
  </form>
</article>
