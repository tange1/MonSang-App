<!--
  Titel: BeforeDonating-Page
  Description: Shows what is important before donating blood.
  Author: Roberto Tangarife
-->
<template>
  <q-page padding class="start">
    <div id="q-app">
      <q-card class="link-card">
        <q-card-section class="card-title">Wichtige Informationen vor der Blutspende:</q-card-section>

        <q-item>
          <q-item-section>
            <q-item-label>Alkohol</q-item-label>
            <q-item-label caption lines="3">Am Abend vor der Spende sollte auf
              Alkoholgenuß verzichtet werden.</q-item-label>
          </q-item-section>
          <q-item-section side>
            <q-icon name="local_bar" color="primary" />
          </q-item-section>

        </q-item>

        <q-separator spaced inset />

        <q-item>
          <q-item-section>
            <q-item-label>Essen</q-item-label>
            <q-item-label caption lines="3">Kommen Sie nicht zur Spende, ohne vorher etwas
              gegessen zu haben. Vermeiden Sie schon einen Tag vor der Spende stark
              fetthaltige Speisen.</q-item-label>
          </q-item-section>
          <q-item-section side>
            <q-icon name="fastfood" color="primary" />
          </q-item-section>
        </q-item>

        <q-separator spaced inset />

        <q-item>
          <q-item-section>
            <q-item-label>Trinken</q-item-label>
            <q-item-label caption lines="3">Nehmen Sie vor der Spende
              reichlich Flüssigkeit zu sich.</q-item-label>
          </q-item-section>
          <q-item-section side>
            <q-icon name="local_drink" color="primary" />
          </q-item-section>
        </q-item>

        <q-separator spaced inset />


        <q-item>
          <q-item-section>
            <q-item-label>Wohlbefinden</q-item-label>
            <q-item-label caption lines="3">Kommen Sie nur zur Blutspende, wenn Sie sich völlig
              wohl fühlen!</q-item-label>
          </q-item-section>
          <q-item-section side>
            <q-icon name="sentiment_satisfied" color="primary" />
          </q-item-section>
        </q-item>
      </q-card>
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'PageIndex',
  el: '#q-app',
  data() {
    return {
      autoplay: true,
      slide: 'first',
      fullscreen: false,
    }
  }
});
</script>

<style>
.start {
  margin-top: 0pt;
}
</style>
