import { Button, Form, Stack } from 'react-bootstrap';
import { SectionType } from '../types.d';
import { IconCopy, IconVolume } from '@tabler/icons-react';
import { VOICES_FOR_LANGUAGE } from '../constants';
import { useStore } from '../hooks/useStore';

interface Props {
  type: SectionType;
  value: string;
  loading?: boolean;
  onChange: (text: string) => void;
}

const getPlaceholder = ({ type, loading }: { type: SectionType; loading?: boolean }) => {
  if (type === SectionType.From) return 'Introduce el texto';
  if (loading) return 'Traduciendo...';
  return 'Traducción';
};

const commonStyles = { height: '200px' };

const TextArea: React.FC<Props> = ({ type, value, loading, onChange }) => {
  const { toLanguage } = useStore();

  const styles = type === SectionType.From ? commonStyles : { ...commonStyles, backgroundColor: '#f5f5f5' };

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(event.target.value);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(value);
  };

  const handleSpeak = () => {
    const utterance = new SpeechSynthesisUtterance(value);
    utterance.lang = VOICES_FOR_LANGUAGE[toLanguage];
    speechSynthesis.speak(utterance);
  };

  return (
    <Stack gap={2}>
      <Form.Control
        autoFocus={type === SectionType.From}
        disabled={type === SectionType.To}
        as='textarea'
        placeholder={getPlaceholder({ type, loading })}
        value={value}
        onChange={handleChange}
        style={styles}
      />
      <Stack direction='horizontal' gap={2}>
        {/* {type === SectionType.From && (
          <Button>
            <IconMicrophone />
          </Button>
        )} */}
        {type === SectionType.To && (
          <>
            <Button onClick={handleCopy}>
              <IconCopy />
            </Button>
            <Button onClick={handleSpeak}>
              <IconVolume />
            </Button>
          </>
        )}
      </Stack>
    </Stack>
  );
};

export default TextArea;
