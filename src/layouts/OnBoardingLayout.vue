
<template>
  <q-layout view="hHh lpR fFf">
    <q-header>
      <q-toolbar class="text-yellow-9 q-pa-lg bg-white">
        <q-btn flat round dense icon="store" />
        <q-toolbar-title>Lemon Store </q-toolbar-title>
        <q-space />
        <q-btn flat type="a" round dense icon="login" href="/login" />
      </q-toolbar>
    </q-header>

    <q-page-container>
      <div class="q-pa-md">
        <q-parallax>
          <template v-slot:media>
            <img
              style="filter: blur(4px); filter: grayscale(60%)"
              src="https://www.tastingtable.com/img/gallery/31-types-of-lemons-and-what-makes-them-unique/l-intro-1656086555.jpg"
            />
          </template>

          <template v-slot:content="scope">
            <div
              :style="{
                top: scope.percentScrolled * 60 + '%',
                left: 0,
                right: 0,
              }"
              class="absolute column items-center q-pa-lg"
            >
              <!--
                opacity: 0.9 + (1 - scope.percentScrolled) * 0.55, -->
              <img
                src="~assets/lemon-icon.svg"
                style="
                  width: 150px;
                  height: 150px;
                  filter: invert(42%) sepia(93%) saturate(1352%)
                    hue-rotate(87deg) brightness(119%) contrast(119%);
                "
              />
              <div class="text-h3 text-white text-center">LEMON STORE</div>
            </div>
          </template>
        </q-parallax>
      </div>
    </q-page-container>
  </q-layout>
</template>

<script>
export default {};
</script>

<style>
</style>