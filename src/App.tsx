import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { useStore } from './hooks/useStore';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { AUTO_LANGUAGE } from './constants';
import LanguageSelector from './components/LanguageSelector';
import { SectionType } from './types.d';
import TextArea from './components/TextArea';
import { useEffect } from 'react';
import { translate } from './services/translate';
import { useDebounce } from './hooks/useDebounce';
import { IconArrowsExchange } from '@tabler/icons-react';

function App() {
  const {
    fromLanguage,
    toLanguage,
    fromText,
    result,
    loading,
    interchangeLanguages,
    setFromLanguage,
    setToLanguage,
    setFromText,
    setResult,
  } = useStore();

  const debouncedFromText = useDebounce(fromText, 500);

  useEffect(() => {
    if (!debouncedFromText) return;

    translate({ fromText: debouncedFromText, fromLanguage, toLanguage })
      .then((result) => {
        setResult(result);
      })
      .catch((error) => {
        setResult('¡Error!');
        console.error('Error translating:', error);
      });
  }, [debouncedFromText, fromLanguage, toLanguage]);

  return (
    <Container fluid>
      <h1 style={{ textAlign: 'center' }}>Traductor con IA</h1>

      <Row>
        <Col>
          <LanguageSelector type={SectionType.From} onChange={setFromLanguage} value={fromLanguage} />
        </Col>

        <Col xs='auto'>
          <Button variant='link' disabled={fromLanguage === AUTO_LANGUAGE} onClick={interchangeLanguages}>
            <IconArrowsExchange />
          </Button>
        </Col>

        <Col>
          <LanguageSelector type={SectionType.To} onChange={setToLanguage} value={toLanguage} />
        </Col>
      </Row>

      <Row>
        <Col>
          <TextArea type={SectionType.From} value={fromText} onChange={setFromText} />
        </Col>
      </Row>

      <Row>
        <Col>
          <TextArea type={SectionType.To} value={result} loading={loading} onChange={setResult} />
        </Col>
      </Row>
    </Container>
  );
}

export default App;
