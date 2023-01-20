<!--
  Titel: Checkup-Page
  Description: Shows a check that can be submitted by the donor to check if the most important requirements for a blood donation are met.
  Author: Roberto Tangarife
-->
<template>
  <div padding>
    <q-form class="q-gutter-md">
      <div id="q-app">
        <div class="q-pa-md row items-start q-gutter-md">
          <q-card class="link-card">
            <q-card-section class="card-title">Vorab-Check:</q-card-section>
            <q-card-section>
              <p>1. Sind Sie mindestens 50 kg schwer?</p>
              <q-btn-toggle :disable="confirm && question_1!=null" v-model="question_1" class="my-custom-toggle" no-caps rounded unelevated toggle-color="primary" color="white" text-color="primary" :options="[
  { label: 'Ja', value: 'ja' },
  { label: 'Nein', value: 'nein' },
]"></q-btn-toggle>
            </q-card-section>
            <q-separator inset></q-separator>
            <q-card-section>
              <p>2. Fühlen Sie sich zurzeit gesund?</p>
              <q-btn-toggle :disable="confirm && question_2!=null" v-model="question_2" class="my-custom-toggle" no-caps rounded unelevated toggle-color="primary" color="white" text-color="primary" :options="[
  { label: 'Ja', value: 'ja' },
  { label: 'Nein', value: 'nein' },
]"></q-btn-toggle>
            </q-card-section>
            <q-separator inset></q-separator>
            <q-card-section>
              <p>3. Hatten Sie in den letzten 24 Std. eine dentalhygienische
                Behandlung?</p>
              <q-btn-toggle :disable="confirm && question_3!=null" v-model="question_3" class="my-custom-toggle" no-caps rounded unelevated toggle-color="primary" color="white" text-color="primary" :options="[
  { label: 'Ja', value: 'ja' },
  { label: 'Nein', value: 'nein' },
]"></q-btn-toggle>
            </q-card-section>
            <q-separator inset></q-separator>
            <q-card-section>
              <p>4. Hatten Sie in den letzten 4 Monaten eine Magen- und
                Darmspiegelung?</p>
              <q-btn-toggle :disable="confirm && question_4!=null" v-model="question_4" class="my-custom-toggle" no-caps rounded unelevated toggle-color="primary" color="white" text-color="primary" :options="[
  { label: 'Ja', value: 'ja' },
  { label: 'Nein', value: 'nein' },
]"></q-btn-toggle>
            </q-card-section>
            <q-separator inset></q-separator>
            <q-card-section>
              <p>5. Hatten Sie in den letzten 48 Stunden eine Blutentnahme?</p>
              <q-btn-toggle :disable="confirm && question_5!=null" v-model="question_5" class="my-custom-toggle" no-caps rounded unelevated toggle-color="primary" color="white" text-color="primary" :options="[
  { label: 'Ja', value: 'ja' },
  { label: 'Nein', value: 'nein' },
]"></q-btn-toggle>
            </q-card-section>
            <q-separator inset></q-separator>
            <q-card-section>
              <p>6. Haben Sie in den letzten 2 Wochen Antibiotika-Medikamente
                verwendet?</p>
              <q-btn-toggle :disable="confirm && question_6!=null" v-model="question_6" class="my-custom-toggle" no-caps rounded unelevated toggle-color="primary" color="white" text-color="primary" :options="[
  { label: 'Ja', value: 'ja' },
  { label: 'Nein', value: 'nein' },
]"></q-btn-toggle>
            </q-card-section>
            <q-separator inset></q-separator>
            <q-card-section>
              <p>7. Haben Sie in den letzten 48 Stunden eine Impfung erhalten?</p>
              <q-btn-toggle :disable="confirm && question_7!=null" v-model="question_7" class="my-custom-toggle" no-caps rounded unelevated toggle-color="primary" color="white" text-color="primary" :options="[
  { label: 'Ja', value: 'ja' },
  { label: 'Nein', value: 'nein' },
]"></q-btn-toggle>
            </q-card-section>
            <q-separator inset></q-separator>
            <q-card-section>
              <p>8. Hatten Sie in den letzten 4 Wochen einen Zeckenstich?</p>
              <q-btn-toggle :disable="confirm && question_8!=null" v-model="question_8" class="my-custom-toggle" no-caps rounded unelevated toggle-color="primary" color="white" text-color="primary" :options="[
  { label: 'Ja', value: 'ja' },
  { label: 'Nein', value: 'nein' },
]"></q-btn-toggle>
            </q-card-section>
            <q-separator inset></q-separator>
            <q-card-section>
              <p>9. Haben Sie sich in den letzten 4 Monaten ein Tattoo/Piercing
                stechen lassen?</p>
              <q-btn-toggle :disable="confirm && question_9!=null" v-model="question_9" class="my-custom-toggle" no-caps rounded unelevated toggle-color="primary" color="white" text-color="primary" :options="[
  { label: 'Ja', value: 'ja' },
  { label: 'Nein', value: 'nein' },
]"></q-btn-toggle>
            </q-card-section>

            <q-separator inset></q-separator>

            <q-card-section>
              <q-btn label="Antworten prüfen" class="full-width" color="primary" type="button" @click="confirm = true"></q-btn>
            </q-card-section>
              <q-separator inset></q-separator>
            <q-card-section>
              <q-btn label="Antworten zurücksetzen" class="full-width" color="info" type="button" @click="confirm = false, question_1=null, question_2=null, question_3=null, question_4=null, question_5=null, question_6=null, question_7=null, question_8=null, question_9=null"></q-btn>
            </q-card-section>

            <q-dialog :model-value="(confirm && question_1 == 'ja' && question_2 == 'ja' && question_3 == 'nein' && question_4 == 'nein' && question_5 == 'nein' && question_6 == 'nein' && question_7 == 'nein' && question_8 == 'nein' && question_9 == 'nein')" persistent>
              <q-card class="my-card">
                <q-card-section class="bg-secondary text-white">
                  <q-avatar size="lg" class="align-center" icon="error_outline" color="primary" text-color="white"></q-avatar>
                  <div class="text-h6">Sie dürfen aktuell Blut spenden.</div>
                </q-card-section>
                <q-card-actions align="around">
                  <q-btn flat @click="$router.push('/termin')">Zur Terminvereinbarung</q-btn>
                  <q-btn flat v-close-popup>Abbrechen</q-btn>
                </q-card-actions>
              </q-card>
            </q-dialog>

            <q-dialog :model-value="(confirm && (question_1 === 'nein' || question_2 === 'nein' || question_3 === 'ja' || question_4 === 'ja' || question_5 === 'ja' || question_6 === 'ja' || question_7 === 'ja' || question_8 === 'ja' || question_9 === 'ja'))" persistent>
              <q-card class="my-card">
                <q-card-section class="bg-secondary text-white">
                  <q-avatar size="lg" class="align-center" icon="error_outline" color="primary" text-color="white"></q-avatar>
                  <div class="text-h6">Sie dürfen aktuell nicht Blut spenden.</div>
                </q-card-section>
                <q-card-actions align="around">
                  <q-btn flat label="Ok" color="primary" v-close-popup @click="confirm = false" />
                </q-card-actions>
              </q-card>
            </q-dialog>


            <q-dialog :model-value="(confirm && question_1 === null && question_2 === null && question_3 === null && question_4 === null && question_5 === null && question_6 === null && question_7 === null && question_8 === null && question_9 === null)" persistent>
              <q-card class="my-card">
                <q-card-section class="bg-secondary text-white">
                  <q-avatar size="lg" class="align-center" icon="error_outline" color="primary" text-color="white"></q-avatar>
                  <div class="text-h6">Beantworten Sie bitte alle Fragen.</div>
                </q-card-section>
                <q-card-actions align="around">
                  <q-btn flat label="Ok" color="primary" v-close-popup @click="confirm = false" />
                </q-card-actions>
              </q-card>
            </q-dialog>
          </q-card>
        </div>
      </div>
    </q-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
export default defineComponent({
  name: 'PageIndex',
  el: '#q-app',
  data() {
    return {
      question_1: ref(null),
      question_2: ref(null),
      question_3: ref(null),
      question_4: ref(null),
      question_5: ref(null),
      question_6: ref(null),
      question_7: ref(null),
      question_8: ref(null),
      question_9: ref(null),
      confirm: ref(false),
    };
  },
  methods: {
  }
});
</script>

<style>
.my-custom-toggle {
  border: 1px solid #027be3;
}
</style>

