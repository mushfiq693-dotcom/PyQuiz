import { Question } from '../data/questions/types';
import { StudentAnswer, ScoreResult } from '../types/quiz';

export function calculateQuizScore(
  questions: Question[],
  answers: StudentAnswer[]
): ScoreResult {
  const totalQuestions = questions.length;
  let correctCount = 0;
  let wrongCount = 0;
  let unansweredCount = 0;

  const difficultyBreakdown = {
    easy: { correct: 0, total: 0 },
    medium: { correct: 0, total: 0 },
    hard: { correct: 0, total: 0 },
  };

  const topicMap: Record<string, { correct: number; total: number }> = {};

  questions.forEach((q, idx) => {
    // track difficulty total
    const diff = q.difficulty;
    if (difficultyBreakdown[diff]) {
      difficultyBreakdown[diff].total += 1;
    }

    // track topic total
    if (!topicMap[q.topic]) {
      topicMap[q.topic] = { correct: 0, total: 0 };
    }
    topicMap[q.topic].total += 1;

    // match answer
    const answer = answers.find((a) => a.questionId === q.id) || answers[idx];

    if (!answer || answer.selectedOption === null || answer.isTimedOut) {
      unansweredCount += 1;
    } else if (answer.selectedOption === q.correctAnswer) {
      correctCount += 1;
      if (difficultyBreakdown[diff]) {
        difficultyBreakdown[diff].correct += 1;
      }
      topicMap[q.topic].correct += 1;
    } else {
      wrongCount += 1;
    }
  });

  // Negative marking logic:
  // Penalty applies ONLY IF wrong answers > 30% of total questions (e.g. > 9 for 30 questions)
  const penaltyThreshold = Math.floor(totalQuestions * 0.3);
  let penaltyDeductions = 0;
  let penalizedWrongCount = 0;

  if (wrongCount > penaltyThreshold) {
    penalizedWrongCount = wrongCount;
    penaltyDeductions = wrongCount * 0.25;
  }

  const rawScore = correctCount * 1;
  const finalScore = Math.max(0, parseFloat((rawScore - penaltyDeductions).toFixed(2)));
  const accuracyPercentage =
    totalQuestions > 0 ? parseFloat(((correctCount / totalQuestions) * 100).toFixed(1)) : 0;

  // Topic breakdown & weak areas (< 60% accuracy)
  const topicBreakdown: Record<string, { correct: number; total: number; percentage: number }> = {};
  const weakTopics: string[] = [];

  Object.entries(topicMap).forEach(([topic, stats]) => {
    const pct = stats.total > 0 ? Math.round((stats.correct / stats.total) * 100) : 0;
    topicBreakdown[topic] = {
      correct: stats.correct,
      total: stats.total,
      percentage: pct,
    };
    if (pct < 60) {
      weakTopics.push(topic);
    }
  });

  return {
    totalQuestions,
    correctCount,
    wrongCount,
    unansweredCount,
    penalizedWrongCount,
    rawScore,
    penaltyDeductions,
    finalScore,
    accuracyPercentage,
    difficultyBreakdown,
    topicBreakdown,
    weakTopics,
  };
}
