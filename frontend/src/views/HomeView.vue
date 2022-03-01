<template>
  <vds-flow gap="2x">
    <vds-attrs for="card" border="0"></vds-attrs>
    <vds-h3>Normal palette</vds-h3>
    <vds-flex gap flow="row wrap">
      <vds-card gap fill="subtle">
        <vds-theme hue="250" saturation="100" mod="special"></vds-theme>
        <vds-block>Card text</vds-block>

        <vds-block><vds-btn special>Special</vds-btn></vds-block>
      </vds-card>

      <vds-card gap fill="subtle">
        <vds-theme hue="320" saturation="100" mod="special"></vds-theme>
        <vds-block>Card text</vds-block>

        <vds-block><vds-btn special>Special</vds-btn></vds-block>
      </vds-card>

      <vds-card gap fill="subtle">
        <vds-theme hue="200" saturation="100" mod="special"></vds-theme>
        <vds-block>Card text</vds-block>

        <vds-block><vds-btn special>Special</vds-btn></vds-block>
      </vds-card>

      <vds-card gap fill="subtle">
        <vds-theme hue="150" saturation="100" mod="special"></vds-theme>
        <vds-block>Card text</vds-block>

        <vds-block><vds-btn special>Special</vds-btn></vds-block>
      </vds-card>
    </vds-flex>

    <vds-h3>Pastel palette</vds-h3>

    <vds-flex gap flow="row wrap">
      <vds-card gap fill="subtle">
        <vds-theme hue="250" saturation="100" mod="special" pastel></vds-theme>
        <vds-block>Card text</vds-block>

        <vds-block><vds-btn special>Special</vds-btn></vds-block>
      </vds-card>

      <vds-card gap fill="subtle">
        <vds-theme hue="300" saturation="100" mod="special" pastel></vds-theme>
        <vds-block>Card text</vds-block>

        <vds-block><vds-btn special>Special</vds-btn></vds-block>
      </vds-card>

      <vds-card gap fill="subtle">
        <vds-theme hue="50" saturation="100" mod="special" pastel></vds-theme>
        <vds-block>Card text</vds-block>

        <vds-block><vds-btn special>Special</vds-btn></vds-block>
      </vds-card>

      <vds-card gap fill="subtle">
        <vds-theme hue="150" saturation="100" mod="special" pastel></vds-theme>
        <vds-block>Card text</vds-block>

        <vds-block><vds-btn special>Special</vds-btn></vds-block>
      </vds-card>
    </vds-flex>
    </vds-flow>
</template>