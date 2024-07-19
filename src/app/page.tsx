import * as Arc from "./Arc";
import arcJson from "./arc.json";

export default function Home() {
  const arc = arcJson as Arc.Arc;

  const Task = ({ id, task }: { id: string; task: Arc.TrainingTask }) => {
    const getColorClass = (cell: Arc.Cell) => {
      if (cell >= 0 && cell <= 9) {
        return `cell-${cell}`;
      }

      throw new Error(`Invalid cell value: ${cell}`);
    };

    return (
      <div className="task">
        <a href={`1https://arcprize.org/play?task=${id}`} target="_blank">
          <h1>{id}</h1>
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
                        <div
                          className={`cell ${getColorClass(cell)}`}
                          key={j}
                        />
                      ))}
                    </div>
                  ))}
                </div>

                <div className="grid">
                  {example.output.map((row, i) => (
                    <div key={i} className="row">
                      {row.map((cell, j) => (
                        <div
                          className={`cell ${getColorClass(cell)}`}
                          key={j}
                        />
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
  };

  return (
    <main>
      {Object.entries(arc).map(([key, value]) => {
        return (
          <div key={key}>
            <Task id={key} task={value} />
          </div>
        );
      })}
    </main>
  );
}
