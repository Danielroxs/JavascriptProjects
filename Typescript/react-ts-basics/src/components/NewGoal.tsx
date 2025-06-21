import { useRef, type FormEvent } from "react";

type NewGoalProps = {
  onAddGoal: (goal: string, summary: string) => void;
};

export default function NewGoal({ onAddGoal }: NewGoalProps) {
  const goal = useRef<HTMLInputElement>(null);
  const summary = useRef<HTMLInputElement>(null);
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const enteredGoal = goal.current?.value.trim() ?? "";
    const enteredSummary = summary.current?.value.trim() ?? "";

    if (!enteredGoal) {
      alert("El objetivo no puede estar vacío.");
      return;
    }
    if (!enteredSummary) {
      alert("El resumen no puede estar vacío.");
      return;
    }
    if (enteredGoal.length < 3) {
      alert("El objetivo debe tener al menos 3 caracteres.");
      return;
    }
    if (enteredSummary.length < 5) {
      alert("El resumen debe tener al menos 5 caracteres.");
      return;
    }
    if (!/^[a-zA-Z0-9\s]+$/.test(enteredGoal)) {
      alert("El objetivo solo puede contener letras, números y espacios.");
      return;
    }
    if (!/^[a-zA-Z0-9\s.,!?]+$/.test(enteredSummary)) {
      alert("El resumen contiene caracteres no permitidos.");
      return;
    }

    event.currentTarget.reset();

    onAddGoal(enteredGoal, enteredSummary);
  }

  return (
    <form onSubmit={handleSubmit}>
      <p>
        <label htmlFor="goal">Your Goal</label>
        <input id="goal" type="text" name="goal" ref={goal} />
      </p>
      <p>
        <label htmlFor="summary">Short summary</label>
        <input id="summary" type="text" ref={summary} />
      </p>
      <p>
        <button>Add Goal</button>
      </p>
    </form>
  );
}
