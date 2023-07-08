import { useEffect, useCallback } from "react";
import { putForm } from "../../utils/api";
import { debounce } from "../../utils/common";

const DEBOUNCE_SAVE_DELAY_MS = 1000;

const Autosave = ({ formRef, questions, shouldPublish }) => {
  const debouncedSave = useCallback(
    debounce(async (newQuestions, newShouldPublish) => {
      await putForm({
        formRef,
        questions: newQuestions,
        shouldPublish: newShouldPublish,
      });
    }, DEBOUNCE_SAVE_DELAY_MS),
    []
  );

  // The magic useEffect hook. This runs only when `question` changes.
  // We could add more properties, should we want to listen for their changes.
  useEffect(() => {
    if (questions && questions.length && shouldPublish !== null) {
      debouncedSave(questions, shouldPublish);
    }

    // debouncedSave is wrapped in a useCallback with an empty dependency list,
    // thus it will not change and in turn will not re-trigger this effect.
  }, [questions, shouldPublish, debouncedSave]);

  // Do not display anything on the screen.
  return null;
};

export default Autosave;
