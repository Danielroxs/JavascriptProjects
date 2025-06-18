import { useState } from "react";
import CourseGoal from "./components/CourseGoal.tsx";
import HeaderComponent from "./components/Header.tsx";
import CourseGoalList from "./components/CourseGoalList.tsx";
import NewGoal from "./components/NewGoal.tsx";

export type CourseGoal = {
  title: string;
  description: string;
  id: number;
};

const App = () => {
  const [goals, setGoals] = useState<Array<CourseGoal>>([]);

  const handleAddGoal = () => {
    setGoals((prevGoals) => {
      const newGoal: CourseGoal = {
        title: "Learn TS & React",
        description: "Learn it in depth!",
        id: Math.random(),
      };
      return [...prevGoals, newGoal];
    });
  };

  function handleDeleteGoal(id: number) {
    setGoals((prevGoal) => {
      return prevGoal.filter((goal) => goal.id !== id);
    });
  }

  return (
    <main>
      <HeaderComponent src="goals.jpg" alt="A list of Goals">
        <h1>Learn it from the ground up</h1>
      </HeaderComponent>
      <NewGoal />
      <CourseGoalList goals={goals} onDeleteGoal={handleDeleteGoal} />
    </main>
  );
};

export default App;
