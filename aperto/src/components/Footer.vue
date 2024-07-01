<template>
  <footer>

    <div class="footer-header">
      <div class="footer-item">
        <img class="fondazione_crt_Logo" src="./../../public/fondazione_arte_crt_white.svg"
          style="margin-top:-20px !important;">
      </div>

      <div class="footer-item"><strong>APERTO</strong>
        <br> un progetto di Fondazione per
        <br>l'Arte Moderna e
        Contemporanea CRT
      </div>
    </div>

    <!--FILETTO 1-->

    <div class="footer-sezioneLoghi">
      <h4>Partner di Aperto 2024</h4>

      <div class="footer-sezioneloghi--logo">
        <img class="footer-partner" src="./../../public/sandretto.png" />
      </div>

      <div class="footer-sezioneloghi--logo">
        <img class="footer-partner" src="./../../public/castello_di_rivoli.svg" />
      </div>

      <div class="footer-sezioneloghi--logo">
        <img class="footer-partner" src="./../../public/almanac_id.png" />
      </div>

      <div class="footer-sezioneloghi--logo">
        <img class="footer-partner" src="./../../public/cripta_747.svg" />
      </div>

      <div class="footer-sezioneloghi--logo">
        <img class="footer-partner" src="./../../public/feat.svg" />
      </div>

      <div class="footer-sezioneloghi--logo">
        <img class="footer-partner" src="./../../public/mucho_mas_bianco.png" />
      </div>
    </div>

    <!--FILETTO 2-->

    <div class="footer-features">
      <a href="https://www.iubenda.com/privacy-policy/82318808"
        class="policy iubenda-nostyle iubenda-noiframe iubenda-embed iubenda-noiframe" title="Privacy Policy"
        style="text-transform:lowercase; width: 100%; text-align: left;">Privacy Policy</a>

      <a href="https://www.iubenda.com/privacy-policy/82318808/cookie-policy"
        class=" policy iubenda-nostyle iubenda-noiframe iubenda-embed iubenda-noiframe" title="Cookie Policy"
        style="text-transform:lowercase; width: 100%; text-align: left;">Cookie Policy</a>
        
      <div class="footer-features--contacts footer-item">
        <p>Per info: <a style="color: white;" href="mailto:applications@aperto-crt.it">applications@aperto-crt.it</a></p>
        
          <a href="https://www.instagram.com/fondartecrt/" target="_blank">
            <img class="instagram_Logo" src="./../../public/Instagram_Glyph_White.svg">
          </a>

      </div>
    </div>

  </footer>

</template>

<script setup>
import { ref, onMounted } from 'vue';

onMounted(() => {
  const loadIubenda = () => {
    const script = document.createElement('script');
    script.src = 'https://cdn.iubenda.com/iubenda.js';
    document.body.appendChild(script);
  };

  loadIubenda();
});
</script>
