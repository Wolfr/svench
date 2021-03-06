<script>
  import Prism from '../Prism.svelte'

  export let focus
  export let name
  export let source
  export let href
  export let options
  export let error = null

  $: ({
    outline,
    centered,
    padding,
    canvasBackground,
    viewBackground,
  } = options)

  const backgroundAliases = {
    '@none':
      'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAA4SURBVHgB7dOxDQBACAJA/b1Y54dyHRZzBQoLY6Am1xCS5A8hAErpvRiOQYMbwFSL6qM8isGTYAOhNQbW5Q4iGwAAAABJRU5ErkJggg==)',
  }

  const viewBackgroundAliases = {
    '@none': 'transparent',
  }

  $: canvasBg = backgroundAliases[canvasBackground] || canvasBackground
  $: viewBg = viewBackgroundAliases[viewBackground] || viewBackground

  let showSource = null

  const toggleSource = () => {
    showSource = !showSource
  }
</script>

<div
  class="svench view box"
  class:svench-ui={!focus}
  class:flex={focus}
  class:outline
  class:centered
  class:padding
  style="background: {canvasBg}">
  {#if !focus}
    <h3 class="svench view">
      <div class="toolbar">
        {#if source}
          <button class="code" on:click={toggleSource}>{'</>'}</button>
        {/if}
      </div>
      <a {href}>
        <span class="icon">⟡</span>
        {name}
      </a>
    </h3>
    {#if showSource}
      <Prism code={source} />
    {/if}
  {/if}
  <div class="svench view canvas">
    <div class="svench view outline" style="background: {viewBg}">
      {#if error}
        <pre>{error}</pre>
      {:else}
        <slot />
      {/if}
    </div>
  </div>
</div>

<style>
  h3 {
    margin: 0;
    padding: 0;
  }
  h3 a {
    display: block;
    padding: 0.33em 1em;
    padding-left: 0.5em;
    text-decoration: none;
    opacity: 0.95;
  }
  h3 a[href]:hover {
    opacity: 1;
  }
  h3 a,
  h3 a * {
    background: var(--secondary, #aaa);
    color: var(--secondary-r, #fff);
  }

  h3 a .icon {
    display: inline-block;
    width: 1.5em;
    text-align: center;
  }

  .box.svench-ui {
    border-bottom: 1px solid var(--secondary);
  }

  .box.flex {
    flex: 1;
    display: flex;
    flex-direction: column;
  }
  .box.flex.centered .canvas {
    margin: auto;
  }

  .box {
    background-color: #fff;
  }
  .box.centered .canvas {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .box.padding .canvas {
    padding: 1em;
  }
  .box .outline {
    display: inline-block;
    overflow: visible;
    position: relative;
  }
  .box.outline .outline:before {
    content: ' ';
    display: block;
    border: 2px solid cyan;
    position: absolute;
    z-index: 1;
    left: -2px;
    right: -2px;
    top: -2px;
    bottom: -2px;
    pointer-events: none;
  }

  h3 {
    position: relative;
  }
  .toolbar {
    position: absolute;
    right: 0;
    z-index: 1;
  }
  .toolbar button {
    background: none;
    border: none;
    font-weight: bold;
    color: #fff;
    border: 2px solid;
    border-radius: 2px;
    font-size: 0.8em;
    padding: 0.1em 0.2em;
    margin: 0.33em 0.5em;
    opacity: 0.9;
  }
  .toolbar button:hover {
    cursor: pointer;
    opacity: 1;
    background-color: rgba(255, 255, 255, 0.1);
  }
  button.code {
    font-family: 'Fira Code';
  }
</style>
