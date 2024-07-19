import * as Arc from "../Arc";
import arcJson from "../arc.json";

export default function Home({ params }: { params: { taskId: string } }) {
  const arc = arcJson as Arc.Arc;
  const { taskId } = params;

  if (typeof taskId !== "string") {
    throw new Error(`Invalid task ID: ${taskId}`);
  }

  const task = arc[taskId] as Arc.TrainingTask;

  if (task === undefined) {
    throw new Error(`Task not found: ${taskId}`);
  }

  const getColorClass = (cell: Arc.Cell) => {
    if (cell >= 0 && cell <= 9) {
      return `cell-${cell}`;
    }

    throw new Error(`Invalid cell value: ${cell}`);
  };

  return (
    <div className="task">
      <a href={`1https://arcprize.org/play?task=${taskId}`} target="_blank">
        <h1>{taskId}</h1>
      </a>
      <h1>Examples</h1>
      <div className="examples">
        {task.train.map((example, i) => {
          return (
            <div key={i} className="example">
              <div className="grid">
                {example.input.map((row, i) => (
                  <div key={i} className="row">
                    {row.map((cell, j) => (
                      <div className={`cell ${getColorClass(cell)}`} key={j} />
                    ))}
                  </div>
                ))}
              </div>

              <div className="grid">
                {example.output.map((row, i) => (
                  <div key={i} className="row">
                    {row.map((cell, j) => (
                      <div className={`cell ${getColorClass(cell)}`} key={j} />
                    ))}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
