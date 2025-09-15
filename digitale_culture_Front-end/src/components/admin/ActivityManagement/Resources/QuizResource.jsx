import { Box } from "@mui/material";
import { NormalInput, SelectInput } from "../../../ValidationInputs";

const QuizResource = ({ data, errors, onChange, onOptionChange }) => {
  return (
    <Box sx={{ width: '100%' }}>
      <NormalInput
        label="Quiz Question"
        placeholder="Ex : Quel est le rôle des cookies"
        name="question"
        value={data.question}
        setValue={onChange}
        error={errors?.question}
      />
      
      <Box sx={{ border: 'solid 1px #CBD5E1', borderRadius: 2, p: 2 }}>
        {data.answers.map((option, index) => (
          <NormalInput
            label={`Réponse ${index + 1}`}
            placeholder="Ex : Une option de réponse"
            value={option}
            setValue={(e) => onOptionChange(e, index)}
            error={errors?.answers?.[index]}
          />
        ))}
        
        <SelectInput
          label="Choisir la réponse correcte"
          name="correct"
          value={data.correct}
          setValue={onChange}
          options={data.answers
            .filter(opt => opt.trim())
            .map((opt, index) => ({ 
              value: opt, 
              label: opt || `Option ${index + 1}` 
            }))}
          error={errors?.correct}
        />
      </Box>
    </Box>
  );
};

export default QuizResource;