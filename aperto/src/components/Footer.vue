<template>
    <footer class="sectionfooter">
      <div class="flex footer-container cento small" style="flex-direction: column;">
        <div class="footer-item">
          <img class="fondazione_crt_Logo" src="./../../public/fondazione_arte_crt_white.svg" style="margin-top:-20px !important;"> 
        </div>
        <div class="footer-item"><strong>APERTO</strong> <br> un progetto di Fondazione per <br>l'Arte Moderna e Contemporanea CRT</div>
      </div>
  
      <!--FILETTO 1-->
      <hr>
      <div style="flex-direction: column;" class="double">
        <div class="flexSpace">
          <h4 class="footer-item" style="width: 100%; margin-left: 5vw;">Partner di Aperto 2024</h4>
          <div class="centraLoghi">
            <img class="footer-partner" src="./../../public/sandretto.png"/> 
          </div>
          <div class="centraLoghi">
            <img class="footer-partner" src="./../../public/castello_di_rivoli.svg"/> 
          </div>
          <div class="centraLoghi">
            <img class="footer-partner" src="./../../public/almanac_id.png"/> 
          </div>
        </div>
        <div class="flexSpace" style="margin-top: 20px;">
          <div class="centraLoghi">
            <img class="footer-partner" src="./../../public/cripta_747.svg"/> 
          </div>
          <div class="centraLoghi">
            <img class="footer-partner" src="./../../public/feat.svg"/> 
          </div>
          <div class="centraLoghi">
            <img class="footer-partner" src="./../../public/mucho_mas_bianco.png"/> 
          </div>
        </div>
      </div>
  
      <!--FILETTO 2-->
      <hr>
      <div class="flexStart small">
        <a href="https://www.iubenda.com/privacy-policy/82318808" class="policy iubenda-nostyle iubenda-noiframe iubenda-embed iubenda-noiframe" title="Privacy Policy" style="text-transform:lowercase; width: 100%; text-align: left;">Privacy Policy</a>
        <a href="https://www.iubenda.com/privacy-policy/82318808/cookie-policy" class=" policy iubenda-nostyle iubenda-noiframe iubenda-embed iubenda-noiframe" title="Cookie Policy" style="text-transform:lowercase; width: 100%; text-align: left;">Cookie Policy</a>
        <div class="footer-item">Per info: <a style="color: white;" href="mailto:applications@aperto-crt.it">applications@aperto-crt.it</a></div>
        <div class="footer-item" style="width: 29px"><a style="color: white; text-decoration:none; width: 29px;" href="https://www.instagram.com/fondartecrt/" target="_blank"><img class="instagram_Logo" src="./../../public/Instagram_Glyph_White.svg"></a></div>
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
  
  <style scoped>
 .sectionfooter{
    display: flex;
}

footer {
    background-color: #000;
    color: #fff;
    text-align: center;
    padding: 40px 5vw;
}
.footer-partner{
    width: 80px;
    margin: auto;
}

.footer-container  {
    gap: 40px;
    width: inherit;
}
.footer-item{
font-size: clamp(0.8rem, 2.5vw, 1em); 
line-height: clamp(1.1rem, 2.8vw, 1.3rem);
margin-top: auto;
font-weight: 400;
letter-spacing: 0.06rem;
padding: 10px;
text-align: left;
}

.centraLoghi{
    align-items:  center;
    margin: auto;
}

.fondazione_crt_Logo{
    width: 150px;
}
  
  .instagram_Logo {
    width: 29px;
  }


.policy{
font-size: 16px;
color: #FFF;
text-align: right;
font-size: 16px;
font-style: normal;
font-weight: 400;
line-height: normal;
text-decoration-line: underline;
text-transform: uppercase;
padding: 10px;
}

.flexStart{
    display: flex;
    flex-wrap: wrap;
    justify-content: start;
    }

    small {
    flex: 1;
    width: 25%;
  }
  .double {
    
    width: 50%;
  }

  .flexSpace{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }

  </style>
  