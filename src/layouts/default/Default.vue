<script lang="ts" setup>
import DefaultView from './View.vue'
</script>

<template>
  <v-card>
    <v-layout>
      <v-navigation-drawer
        expand-on-hover
        rail
      >
        <v-list density="compact" nav>
          <router-link style="text-decoration: none; color: inherit;" to="/">
            <v-list-item prepend-icon="mdi-home" title="Home" value="/"/>
          </router-link>

          <router-link style="text-decoration: none; color: inherit;" to="/pessoas">
            <v-list-item prepend-icon="mdi-account-multiple" title="Pessoas" value="/pessoas"/>
          </router-link>
        </v-list>
      </v-navigation-drawer>

      <v-main>
        <default-view />
      </v-main>
    </v-layout>
  </v-card>
</template>