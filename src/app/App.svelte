<script>
  import { getContext } from '../util'
  import Menu from './Menu.svelte'
  import MenuResizeHandle from './MenuResizeHandle.svelte'
  import Toolbar from './Toolbar.svelte'
  import ThemeOranges from './ThemeOranges.svelte'
  import RenderOffscreen from '../RenderOffscreen.svelte'

  const { options, tree, focus: focus$ } = getContext()

  $: focus = $focus$

  $: ({ fixed, fullscreen, menuWidth } = $options)

  const onKeydown = e => {
    if (e.key === 'Escape') {
      $options.fullscreen = false
    }
  }
</script>

<svelte:window on:keydown={onKeydown} />

<ThemeOranges>
  <div
    class="svench svench"
    class:fixed
    class:fullscreen
    style={fullscreen ? null : `padding-left: ${menuWidth}px`}>
    <section class="ui menu" style="width: {menuWidth}px">
      <h1>
        <a href="/">
          <span class="icon">🔧</span>
          Svench
        </a>
      </h1>
      <Menu items={$tree} />
      <MenuResizeHandle bind:width={menuWidth} />
    </section>

    <section class="ui toolbar" style="left: {menuWidth}px">
      <Toolbar />
    </section>

    <div class="ui toolbar-placeholder" />

    <div
      class="canvas"
      class:focus
      style={!fullscreen && `left: ${menuWidth}px`}>
      <RenderOffscreen {focus}>
        <slot />
      </RenderOffscreen>
    </div>
  </div>
</ThemeOranges>

<style>
  h1 {
    margin: 0.5rem 1rem;
    padding: 0;
    white-space: nowrap;
  }
  h1 a {
    text-decoration: none;
    color: #79889a;
  }
  h1 .icon {
    opacity: 0.5;
    display: inline-block;
    transform: rotateY(180deg);
  }

  :global(body) {
    padding: 0;
  }

  .svench {
    --toolbar-height: 3rem;
  }
  .menu {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
  }
  .toolbar {
    position: fixed;
    top: 0;
    right: 0;
    height: var(--toolbar-height);
    background-color: var(--white);
    z-index: 1;
  }
  .toolbar-placeholder {
    height: var(--toolbar-height);
  }

  .svench.fullscreen .ui {
    display: none;
  }
  .svench.fullscreen .canvas {
    top: 0;
  }

  .menu {
    margin: 0;
    background-color: var(--light-2);
    box-shadow: inset -16px 0 12px -16px rgba(0, 0, 0, 0.2);
    overflow: auto;
  }

  .toolbar {
    border-bottom: 1px solid var(--gray-light);
  }

  .canvas.focus {
    position: fixed;
    overflow: auto;
    top: var(--toolbar-height);
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    flex-direction: column;
  }
</style>