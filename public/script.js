const inputs = document.querySelectorAll("input");

const getCurrency = (event, input) => {
  const isDigit = /^\d+$/.test(event.key);
  const isBackspace = event.key === "Backspace";
  const isDelete = event.key === "Delete";

  if (input.value) {
    if (isDigit || isBackspace || isDelete) {
      reCount(input, input.value);
    }
  }
};

const reCount = (input, value) => {
  const currencies = Array.from(inputs).filter((item) => item.id !== input.id);

  currencies.forEach((element) => {
    if (input.id === "eur") {
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
