<script lang="ts">
  import Label from './Label.svelte';
  type Props = {
    id?: string;
    label: string;
    margin?: string;
    name: string;
  };
  let { name, id = name, label, margin }: Props = $props();
</script>

<fieldset class="{margin} flex-1">
  <Label {id}>{label}</Label>
  <input
    type="text"
    {id}
    {name}
    required
    class="block w-full
      rounded-md bg-white px-3 py-1.5 text-lg
      outline-1 -outline-offset-1 outline-slate-300
      focus:outline-4 focus:-outline-offset-1 focus:outline-slate-400
      dark:bg-slate-900 dark:outline-slate-600 focus:dark:outline-slate-500
    "
  />
</fieldset>
