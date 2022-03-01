<script setup lang="ts">
</script>

<template>
<vds-root id="root" responsive="100rem|90rem|65rem|40rem|30rem" height="min 100vh" box="n">
  <vds-theme id="main-theme" hue="290" saturation="75"></vds-theme> 
  <vds-theme name="secondary" hue="240" saturation="75"></vds-theme>
  <vds-props bg-color="#secondary-bg" text-color="#secondary-text" text-soft-color="#secondary-text-soft" text-strong-color="#secondary-text-strong" subtle-color="#secondary-subtle" shadow-color="#secondary-shadow" border-color="#secondary-border" input-color="#secondary-input" page-bg-color="^root #bg :dark[#subtle]" second-bg-color="^root #subtle :dark[#bg]" diff-color="#second-bg" topbar-offset="8.75x|||6.75x" sidebar-width="32x||26x" max-content-width="100rem - (@content-padding * 2)" grid-gap="3x" content-padding="6x||3x|6x|3x" column-number="12||||2" column-width="((@max-content-width - (@grid-gap * 11)) / 12)|((100vw - (@content-padding * 2) - (@grid-gap * (@column-number - 1))) / @column-number)" content-width="12sp||||2sp"></vds-props>
  <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
  </nav>
  <router-view/>
</vds-root>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
