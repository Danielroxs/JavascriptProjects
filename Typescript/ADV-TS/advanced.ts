// -------------- INDEX SIGNATURE

type TranslationDict = {
    [key: string]: string; // index signature
  };
  
  const translations: TranslationDict = {
    hello: "hola",
    goodbye: "adiós",
    welcome: "bienvenido"
  };
  
  console.log(translations["hello"]); // "hola"
  