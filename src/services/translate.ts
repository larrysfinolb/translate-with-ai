import { GoogleGenerativeAI } from '@google/generative-ai';
import { FromLanguage, Language } from '../types.d';

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

export async function translate({
  fromText,
  fromLanguage,
  toLanguage,
}: {
  fromText: string;
  fromLanguage: FromLanguage;
  toLanguage: Language;
}) {
  const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

  const prompt = `Tú eres una IA que se encarga de traducir texto. El idioma de origen es '${fromLanguage}' y el idioma de destino es '${toLanguage}'. Tú puedes recibir como idioma de origin 'auto'. Tú solo debes responder con la traducción. Traduce del '${fromLanguage}' al '${toLanguage}' el siguiente texto: ${fromText}`;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();

  return text;
}
