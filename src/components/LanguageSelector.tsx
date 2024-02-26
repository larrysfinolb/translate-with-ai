import { Form } from 'react-bootstrap';
import { AUTO_LANGUAGE, SUPPORTED_LANGUAGES } from '../constants';
import { SectionType, FromLanguage, Language } from '../types.d';

type Props =
  | { type: SectionType.From; value: FromLanguage; onChange: (language: FromLanguage) => void }
  | { type: SectionType.To; value: Language; onChange: (language: Language) => void };

const LanguageSelector: React.FC<Props> = ({ type, value, onChange }) => {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(event.target.value as Language);
  };

  return (
    <Form.Select aria-label='Selecciona el lenguaje' onChange={handleChange} value={value}>
      {type === SectionType.From && <option value={AUTO_LANGUAGE}>Detectar idioma</option>}

      {Object.entries(SUPPORTED_LANGUAGES).map(([key, literal]) => (
        <option key={key} value={key}>
          {literal}
        </option>
      ))}
    </Form.Select>
  );
};

export default LanguageSelector;
