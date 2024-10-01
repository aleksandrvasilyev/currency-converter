export const fetchData = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return await response.json();
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getCurrencies = async (url) => {
  const popularCurrencies = [
    "usd",
    "eur",
    "pln",
    "jpy",
    "gbp",
    "aud",
    "cad",
    "chf",
    "cny",
    "sek",
    "nzd",
    "sgd",
    "hkd",
    "krw",
    "try",
    "inr",
    "uah",
    "brl",
    "zar",
    "dkk",
  ];
  const result = {};
  const data = await fetchData(url);
  popularCurrencies.forEach((currency) => {
    if (Object.keys(data.usd).includes(currency)) {
      result[currency] = data.usd[currency];
    }
  });
  // console.log(result);
  return { result: result, date: data.date };
};
