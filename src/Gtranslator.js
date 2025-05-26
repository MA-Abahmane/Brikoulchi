function loadGoogleTranslate() {
    if (window.google && google.translate) {
      new google.translate.TranslateElement({ pageLanguage: 'en' }, 'google_translate_element');
    }
  }
  
  function translateLanguage(lang) {
    const select = document.querySelector(".goog-te-combo");
    if (select) {
      select.value = lang;
      select.dispatchEvent(new Event("change"));
      setTimeout(() => {
        const banner = document.querySelector('iframe.goog-te-banner-frame');
        if (banner) banner.remove();
        document.body.style.top = '0px';
        document.documentElement.style.marginTop = '0px';
      }, 500);
    }
  }
  
  document.addEventListener("DOMContentLoaded", () => {
    // Inject Google Translate root
    const hiddenDiv = document.createElement('div');
    hiddenDiv.id = 'google_translate_element';
    hiddenDiv.style.display = 'none';
    document.body.appendChild(hiddenDiv);
  
    // Inject custom dropdown
    const customDropdown = document.createElement('div');
    customDropdown.id = 'custom_translate';
    customDropdown.style.cssText = 'position: fixed; bottom: 40px; right: 20px; z-index: 9999;';
    customDropdown.innerHTML = `
        <style>
        
        .lang-wrapper {
            position: fixed;
            bottom: 20px;
            right: 20px;
            z-index: 9999;
            font-family: sans-serif;
            user-select: none;
        }

        .lang-pill {
            width: 130px;
            padding: 8px 16px;
            display: inline-block;
            align-items: center;
            justify-content: space-evenly;
            cursor: pointer;
            font-weight: bold;
            overflow: hidden;
            border: none;
            border-radius: 50px;
            background: #f0f0f0;
            box-shadow: 0 4px 10px rgba(0,0,0,0.1);
            transition: width 0.4s ease , background 0.3s;
            white-space: nowrap;
        }

        .lang-list {
            margin-top: 8px;
            background: white;
            border-radius: 12px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.1);
            padding: 8px 0;
            display: none;
            flex-direction: column;
            overflow: hidden;
            animation: fadeIn 0.3s ease-in-out;
            transition: width 1.4s ease-in-out;
        }

        .lang-list.show {
            display: flex;
        }

        .lang-item {
            padding: 10px 20px;
            cursor: pointer;
            transition: background 0.2s;
            display: flex;
            align-items: center;

        }

        .lang-item:hover {
            background: #eee;
        }

        @keyframes fadeIn {
            from { opacity: 0; transform: scale(0.95); }
            to { opacity: 1; transform: scale(1); }
        }
        </style>

        <div class="lang-wrapper">
            <div class="lang-list" id="langList">
                <div class="lang-item" data-lang="en"><img src="/flags/en.png" width="20px">&nbsp English</div>
                <div class="lang-item" data-lang="es"><img src="/flags/es.png" width="20px">&nbsp Spanish</div>
                <div class="lang-item" data-lang="fr"><img src="/flags/fr.png" width="20px">&nbsp French</div>
                <div class="lang-item" data-lang="ar"><img src="/flags/ar.png" width="20px">&nbsp Arabic</div>
            </div>
            <div class="lang-pill" id="langToggle">🌐&nbspEnglish</div>
        </div>
    `;

    document.body.appendChild(customDropdown);
  
    // Inject Google Translate script
    const gScript = document.createElement('script');
    gScript.src = 'https://translate.google.com/translate_a/element.js?cb=loadGoogleTranslate';
    document.body.appendChild(gScript);
  
    // Optional: remove top frame artifacts
    const style = document.createElement('style');
    style.innerHTML = `
      body > .skiptranslate, .goog-te-banner-frame {
        display: none !important;
        height: 0 !important;
      }
      html {
        margin-top: 0px !important;
      }
    `;
    document.head.appendChild(style);

    const langToggle = document.getElementById("langToggle");
  const langList = document.getElementById("langList");

  langToggle.addEventListener("mouseenter", () => {
    langList.classList.add("show");
  });

  langToggle.addEventListener("mouseleave", () => {
    setTimeout(() => {
      if (!langList.matches(":hover")) langList.classList.remove("show");
    }, 300);
  });

  langList.addEventListener("mouseleave", () => {
    langList.classList.remove("show");
  });

  document.querySelectorAll(".lang-item").forEach(item => {
    item.addEventListener("click", () => {
      const lang = item.getAttribute("data-lang");
      const label = item.textContent;
      translateLanguage(lang);
      langToggle.textContent = `🌐 \n ${label}`;
      langList.classList.remove("show");
    });
  });
  });
  

