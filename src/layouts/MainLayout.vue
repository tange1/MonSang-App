<!--
  Titel: MeinLayout
  Description: Defines the main layout.
  Author: Roberto Tangarife
-->
<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn flat
               dense
               round
               icon="fas fa-bars"
               :aria-label="$t('layout.title')"
               @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          {{ $t('layout.title') }}
        </q-toolbar-title>

        <q-avatar rounded>
          <img src="../assets/logo/Logo_final.png">
        </q-avatar>

      </q-toolbar>
    </q-header>

    <!--q-drawer v-model="leftDrawerOpen" bordered>
      <q-list>
        <q-item-label header>{{$t('layout.menu.title')}}</q-item-label>
        <q-item v-for="entry in menuEntries" :key="entry.to">
          <q-icon v-if="entry.icon" :name="'fas fa-' + entry.icon" class="menu-icon"/>
          <router-link :to="entry.to" class="menu-link">
            {{ $t('layout.menu.' + entry.translateString) }}
          </router-link>
        </q-item>
      </q-list>
    </q-drawer-->

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item-label header class="q-mt-xs text-body2 text-weight-bold text-primary text-uppercase">Herzlich Willkommen
          <div>
            {{ (user.prefix ? user.prefix : '') + ' ' + user.givenName + ' ' + user.familyName }}
          </div>
        </q-item-label>

        <q-separator spaced inset />
        <q-item clickable v-ripple to="/notification">
          <q-item-section avatar>
            <q-icon name="notifications"><q-badge floating color="red" rounded></q-badge></q-icon>
          </q-item-section>
          <q-item-section>
            {{ $t('layout.menu.notification') }}
          </q-item-section>
        </q-item>
        <q-separator spaced inset />
        <q-item clickable v-ripple to="/datenschutz">
          <q-item-section avatar>
            <q-icon name="lock"></q-icon>
          </q-item-section>
          <q-item-section>
            {{ $t('layout.menu.privacy') }}
          </q-item-section>
        </q-item>
        <q-separator spaced inset />
        <q-item clickable v-ripple to="/impressum">
          <q-item-section avatar>
            <q-icon name="verified_user"></q-icon>
          </q-item-section>
          <q-item-section>
            {{ $t('layout.menu.imprint') }}
          </q-item-section>
        </q-item>

        <q-separator spaced inset />

        <q-item clickable v-ripple v-if="user.givenName" @click="logout">
          <q-item-section avatar>
            <q-icon name="logout" id="user-icon" />
          </q-item-section>
          <q-item-section>
            {{ $t('layout.menu.logout') }}
          </q-item-section>
        </q-item>

        <q-separator spaced inset />

      </q-list>
    </q-drawer>



    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer>
      <q-tabs class="bg-primary text-white shadow-2">
        <q-route-tab to="/home" icon="home" label="Home" />
        <q-route-tab to="/spenden" icon="bloodtype" label="Spenden" />
        <q-route-tab to="/informationen" icon="info" label="Info" />
        <q-route-tab to="/profil" icon="person" label="Profil" />
      </q-tabs>
    </q-footer>

  </q-layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { LoginType } from 'src/model/interfaces';



export default defineComponent({
  name: 'MainLayout',
  components: {},
  data() {
    return {
      leftDrawerOpen: false,
      user: {} as LoginType,
    }
  },
  mounted() {
    this.user = this.$store.getUser() || {} as LoginType;
  },
  methods: {
    toggleLeftDrawer() {
      this.leftDrawerOpen = !this.leftDrawerOpen;
    },
    logout() {
      if (confirm(this.$t('layout.logoutPrompt'))) {
        this.$store.logoutUser();
        location.reload();
      }

    }
  }
});
</script>
<style scoped lang="scss">
/**
.q-toolbar {
  color: $lightText;
}
.q-toolbar__title {
  font-weight: bold;
}

.sub-title {
  font-weight: lighter;
}
.q-item {
  padding: 0;
  min-height: unset;
}
.q-item__label {
  background-color: $primary;
  text-align: center;
  color: $lightText;
  font-weight: bold;
}
.menu-link {
  color: $text;
  display: block;
  width: 100%;
  text-decoration: none;
  padding: 1em 0.5em;
  height: 3.5em;
}
#user-icon:hover {
  color: $negative;
  cursor: pointer;
}
.q-item:hover .menu-link {
  background-color: $primary;
  color: $lightText;
}
.menu-icon {
  background-color: $primary;
  color: $lightText;
  display: block;
  height: 3.5em;
  width: 2em;
  padding: 0 0.4em;
}
.q-item:hover .menu-icon {
  background-color: $lightText;
  color: $primary;
}

@media (max-width: 500px) {
.sub-title {
  display: none
}
}
*/
</style>
