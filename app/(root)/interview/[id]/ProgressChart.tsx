"use client";

import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { listAttemptsByQuestion } from "@/lib/actions/general.action";

interface AttemptData {
  id: string;
  attemptNo: number;
  feedback: {
    summary: string;
    dimensions: Record<string, { score: number; feedback: string }>;
    total: number;
  };
}

interface ProgressChartProps {
  userId: string;
  interviewId: string;
  questionId: string;
  attempts?: AttemptData[];
}

interface ChartDataPoint {
  attempt: string;
  score: number;
}

export default function ProgressChart({
  userId,
  interviewId,
  questionId,
  attempts: initialAttempts,
}: ProgressChartProps) {
  const [attempts, setAttempts] = useState<AttemptData[]>(initialAttempts || []);
  const [loading, setLoading] = useState(!initialAttempts);

  useEffect(() => {
    // Only fetch if attempts weren't provided as prop
    if (initialAttempts) {
      setAttempts(initialAttempts);
      setLoading(false);
      return;
    }

    async function fetchAttempts() {
      try {
        const data = await listAttemptsByQuestion({
          userId,
          interviewId,
          questionId,
        });
        setAttempts(data);
      } catch (error) {
        console.error("Error fetching attempts:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchAttempts();
  }, [userId, interviewId, questionId, initialAttempts]);

  const chartData: ChartDataPoint[] = attempts.map((attempt) => ({
    attempt: `#${attempt.attemptNo}`,
    score: Math.round(attempt.feedback.total),
  }));

  if (loading) {
    return (
      <div className="card-border">
        <div className="card p-6">
          <p className="text-light-100">Loading progress data...</p>
        </div>
      </div>
    );
  }

  if (attempts.length === 0) {
    return (
      <div className="card-border">
        <div className="card p-6">
          <h3 className="mb-2">Progress Over Time</h3>
          <p className="text-light-100">
            Submit your first attempt to see your progress!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="card-border">
      <div className="card p-6">
        <h3 className="mb-4">Progress Over Time</h3>
        <div style={{ width: "100%", height: "300px" }}>
          <ResponsiveContainer>
            <LineChart data={chartData}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="rgba(214, 224, 255, 0.1)"
              />
              <XAxis
                dataKey="attempt"
                stroke="#d6e0ff"
                style={{ fontSize: "12px" }}
              />
              <YAxis
                domain={[0, 100]}
                stroke="#d6e0ff"
                style={{ fontSize: "12px" }}
                label={{
                  value: "Score",
                  angle: -90,
                  position: "insideLeft",
                  style: { textAnchor: "middle", fill: "#d6e0ff" },
                }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#27282f",
                  border: "1px solid #4f557d",
                  borderRadius: "8px",
                  color: "#d6e0ff",
                }}
                formatter={(value: number) => [`${value}/100`, "Score"]}
              />
              <Line
                type="monotone"
                dataKey="score"
                stroke="#cac5fe"
                strokeWidth={2}
                dot={{ fill: "#cac5fe", r: 5 }}
                activeDot={{ r: 7 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <p className="text-sm text-light-400 mt-4 text-center">
          Track your improvement across multiple attempts
        </p>
      </div>
    </div>
  );
}

