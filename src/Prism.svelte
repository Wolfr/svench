<script>
  import { slide } from 'svelte/transition'

  export let code
  export let language = 'svelte'

  const Prism = window.Prism

  let el

  $: if (Prism && el && code && language) {
    Prism.highlightElement(el)
  }
</script>

<div transition:slide|local={{ duration: 200 }}>
  <pre class="prism">
    <code bind:this={el} class="language-{language}">{code}</code>
  </pre>
</div>

<style>
  pre.prism {
    margin: 0;
    padding: 0.5rem;
  }
</style>
