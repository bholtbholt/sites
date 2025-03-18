<script lang="ts">
  import type { PageProps } from './$types';
  import { Intro, Work } from '$lib/index';

  let { data }: PageProps = $props();
</script>

<Intro />

<section>
  <ul class="works">
    {#each data.works as work}
      <Work {...work} />
    {/each}
  </ul>
</section>
