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
  
  // -------------- as const 

  let roles = ['admin', 'guest', 'editor'] as const;
  // roles.push('max') as const convierte un valor en una constante literal completamente inmutable (readonly), y hace que los tipos sean literales, no genéricos.
  const firstRole = roles[0]

  //----------------------- RECORD
  type Page = "home" | "about" | "contact";

const routes: Record<Page, string> = {
  home: "/",
  about: "/about",
  contact: "/contact"
};
