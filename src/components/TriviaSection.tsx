import React, { useEffect, useState } from "react";
import axios from "axios";
import { PieChart, Pie, Cell, Tooltip } from "recharts";

interface Question {
  pergunta: string;
  resposta_certa: string;
  respostas: string[];
}

const TriviaSection: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchQuestions = async () => {
    setLoading(true);
    try {
      const resToken = await axios.get("https://tryvia.ptr.red/api_token.php?command=request");
      const token = resToken.data.token;
      const resQuiz = await axios.get(`https://tryvia.ptr.red/api.php?amount=5&token=${token}`);

      const formatted: Question[] = resQuiz.data.results.map((q: any) => ({
        pergunta: decodeURIComponent(q.question),
        resposta_certa: decodeURIComponent(q.correct_answer),
        respostas: [
          ...q.incorrect_answers.map((a: string) => decodeURIComponent(a)),
          decodeURIComponent(q.correct_answer),
        ].sort(() => Math.random() - 0.5),
      }));

      setQuestions(formatted);
    } catch {
      setQuestions([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  const handleAnswer = (answer: string) => {
    if (questions[currentIndex] && answer === questions[currentIndex].resposta_certa)
      setScore((prev) => prev + 1);

    const nextIndex = currentIndex + 1;
    if (nextIndex < questions.length) setCurrentIndex(nextIndex);
    else setQuizFinished(true);
  };

  const restartQuiz = () => {
    setCurrentIndex(0);
    setScore(0);
    setQuizFinished(false);
    setTimeout(fetchQuestions, 500);
  };

  if (loading) return <div className="container py-5 text-center">Carregando quiz...</div>;
  if (!questions.length) return <div className="container py-5 text-center">Nenhuma pergunta disponível.</div>;

  if (quizFinished) {
    const data = [
      { name: "Acertos", value: score },
      { name: "Restante", value: questions.length - score },
    ];
    const COLORS = score >= 3 ? (score >= 5 ? ["#28a745", "#d3d3d3"] : ["#007bff", "#d3d3d3"]) : ["#dc3545", "#d3d3d3"];
    const message = score >= 3 ? (score >= 5 ? "Muito Bom!" : "Bom!") : "Tente Novamente";

    return (
      <div className="container py-5 text-center d-flex flex-column align-items-center">
        <h2>Quiz Finalizado!</h2>
        <PieChart width={200} height={200} className="my-4">
          <Pie data={data} innerRadius={50} outerRadius={80} dataKey="value" startAngle={90} endAngle={-270}>
            {data.map((entry, index) => (
              <Cell key={index} fill={COLORS[index]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
        <h4>{message}</h4>
        <p>Pontuação: {score} / {questions.length}</p>
        <button className="btn btn-primary mt-3" onClick={restartQuiz}>
          Jogar Novamente
        </button>
      </div>
    );
  }

  const q = questions[currentIndex];

  return (
    <div className="container py-5 text-center">
      <h2 className="mb-4">Quiz</h2>
      <h5 dangerouslySetInnerHTML={{ __html: q.pergunta }} />
      <div className="d-flex justify-content-center flex-wrap mt-3 gap-3">
        {q.respostas.map((opt, i) => (
          <button
            key={i}
            className="btn btn-outline-primary btn-lg"
            style={{ minWidth: "150px" }}
            onClick={() => handleAnswer(opt)}
            dangerouslySetInnerHTML={{ __html: opt }}
          />
        ))}
      </div>
      <p className="mt-3">
        Pergunta {currentIndex + 1} de {questions.length}
      </p>
    </div>
  );
};

export default TriviaSection;
