<script lang="ts">
  import { site, InputText, InputTextarea, Button, Toast } from '$lib/index';
  type NotificationData = {
    message: string;
    body: string;
    success: boolean;
  };
  type Notification =
    | (NotificationData & { type: 'success' })
    | (NotificationData & { type: 'error' })
    | { type: null };
  let disabled = $state(false);
  let notification = $state<Notification>({ type: null });

  async function handleSubmit(event: SubmitEvent) {
    event.preventDefault();

    const form = event.target;
    if (!(form instanceof HTMLFormElement)) return;
    const data = new FormData(form);
    disabled = true;

    try {
      const res = await fetch(form.action, {
        method: form.method,
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(Object.fromEntries(data)),
      });
      const result: NotificationData = await res.json();

      notification = {
        ...result,
        type: result.success ? 'success' : 'error',
        body: result.success
          ? `Thanks for the message. I'll be in touch shortly.`
          : `There was a problem. Please try again or contact me another way.`,
      };
    } catch (error) {
      notification = {
        type: 'error',
        message: 'Error submitting form',
        body: JSON.stringify(error),
        success: false,
      };
    }

    disabled = false;
    setTimeout(() => {
      notification = { type: null };
    }, 6000);
  }
</script>

{#if notification.type !== null}
  <Toast type={notification.type} title={notification.message}>
    {notification.body}
  </Toast>
{/if}

<article
  id="contact"
  class="prose dark:prose-invert prose-slate prose-sm md:prose-lg lg:prose-xl mt-20 mb-32 md:mt-28 lg:mt-32"
>
  <h1 class="mb-0! text-emerald-800 dark:text-cyan-400">Say hello</h1>
  <p>
    Send me a message here or on
    <a href="https://linkedin.com/in/bholtbholt" target="_blank" rel="noreferrer">LinkedIn</a>.
  </p>

  <form onsubmit={handleSubmit} action="https://api.web3forms.com/submit" method="POST">
    <input type="hidden" name="access_key" value="a572658c-e3c7-41c9-af1b-ca31e4e7a101" />
    <input type="hidden" name="subject" value="[{site.title}]: New message!" />
    <input type="hidden" name="from_name" value="brianholt.ca" />
    <input type="checkbox" name="botcheck" id="" style="display: none;" />

    <div class="gap-6 md:flex">
      <InputText name="name" label="Name" margin="mb-12" />
      <InputText name="email" label="Email" margin="mb-12" />
    </div>

    <InputTextarea name="message" label="Message" margin="mb-12" />

    <Button {disabled}>Send Message</Button>
  </form>
</article>
