const inputs = document.querySelectorAll("input");
const currency = () => {
  const getCurrency = (event, input) => {
    const isDigit = /^\d+$/.test(event.key);
    const isBackspace = event.key === "Backspace";
    const isDelete = event.key === "Delete";

    if (input.value) {
      if (isDigit || isBackspace || isDelete) {
        reCount(input, input.value);
      }
    }

    if (input.value === "") {
      clearAllInputs();
    }
  };

  const clearAllInputs = () => {
    inputs.forEach((input) => {
      input.value = "";
    });
  };

  const reCount = (input, value) => {
    const currencies = Array.from(inputs).filter(
      (item) => item.id !== input.id
    );

    currencies.forEach((element) => {
      if (input.id === "usd") {
        element.value = Number(value * element.dataset.value).toFixed(2);
      } else {
        element.value = Number(
          (1 / input.dataset.value) * element.dataset.value * value
        ).toFixed(2);
      }
    });
  };

  inputs.forEach((input) => {
    input.addEventListener("keyup", (event) => {
      getCurrency(event, input);
    });
  });
};

const dropdownLanguages = () => {
  const dropdownButton = document.getElementById("dropdownButton");
  const dropdownMenu = document.getElementById("dropdownMenu");
  const linksLanguage = document.querySelectorAll("#dropdownMenu li");

  dropdownButton.addEventListener("click", () => {
    dropdownMenu.classList.toggle("hidden");
  });

  window.addEventListener("click", function (e) {
    if (
      !dropdownButton.contains(e.target) &&
      !dropdownMenu.contains(e.target)
    ) {
      dropdownMenu.classList.add("hidden");
    }
  });

  linksLanguage.forEach((li) => {
    li.addEventListener("click", (e) => {
      const link = li.querySelector("a");
      if (link) {
        const selectedLang = link.getAttribute("data-lang");
        localStorage.setItem("selectedLanguage", selectedLang);
      }
    });
  });
};

const redirectToLanguage = () => {
  const storageLanguage = localStorage.getItem("selectedLanguage");
  if (storageLanguage) {
    const supportedLangs = ["ru", "de", "en"];
    const url = window.location.pathname;
    // const storageLanguage = localStorage.getItem("selectedLanguage");
    const urlLanguage = document.querySelector("html").lang;

    if (urlLanguage !== storageLanguage) {
      const urls = url.split("/");
      if (!supportedLangs.includes(urls[1])) {
        window.location.replace("/" + storageLanguage + url);
      } else {
        // urls.splice(1, 1);
        // window.location.replace("/" + storageLanguage + urls.join("/"));

        // window.location.replace(
        //   "/" + storageLanguage + "/" + urls.slice(2).join("/")
        // );

        if (storageLanguage === "en") {
          window.location.href = "/" + urls.slice(2).join("/");
        } else {
          window.location.href =
            "/" + storageLanguage + "/" + urls.slice(2).join("/");
        }
      }
    }
  }
};

const main = () => {
  currency();
  dropdownLanguages();
  redirectToLanguage();
};

main();
