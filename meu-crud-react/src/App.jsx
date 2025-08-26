import { useState } from "react";

export default function App() {
  // estados basicos
  const [tarefas, setTarefas] = useState([]);
  const [novaTarefa, setNovaTarefa] = useState("");
  const [editandoId, setEditandoId] = useState(null);
  const [textoEditado, setTextoEditado] = useState("");

  function adicionarTarefa(e) {
    e.preventDefault();
    if (novaTarefa.trim() === "") {
      return;
    }
    const nova = {
      id: Date.now(),
      texto: novaTarefa,
    };
    setTarefas([...tarefas, nova]);
    setNovaTarefa("");
  }

  function deletarTarefa(id) {
    const novaLista = tarefas.filter((t) => t.id !== id);
    setTarefas(novaLista);
  }

  function editarTarefa(id, texto) {
    setEditandoId(id);
    setTextoEditado(texto);
  }

  function salvarEdicao(id) {
    const novaLista = tarefas.map((t) => {
      if (t.id === id) {
        return { ...t, texto: textoEditado };
      }
      return t;
    });
    setTarefas(novaLista);
    setEditandoId(null);
    setTextoEditado("");
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-4">
          Lista de Tarefas
        </h1>

        <form onSubmit={adicionarTarefa} className="flex gap-2 mb-4">
          <input
            type="text"
            value={novaTarefa}
            onChange={(e) => setNovaTarefa(e.target.value)}
            placeholder="Digite uma tarefa"
            className="flex-1 border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
          >
            Adicionar
          </button>
        </form>

        <ul className="space-y-2 list-none">
          {tarefas.map((tarefa) => (
            <li
              key={tarefa.id}
              className="flex justify-between items-center bg-gray-100 p-2 rounded"
            >
              {editandoId === tarefa.id ? (
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={textoEditado}
                    onChange={(e) => setTextoEditado(e.target.value)}
                  />
                  <button
                    onClick={() => salvarEdicao(tarefa.id)}
                    className="bg-orange-500 text-white px-3 py-2 rounded hover:bg-yellow-500 transition-colors"
                  >
                    Salvar
                  </button>
                  <button
                    onClick={() => setEditandoId(null)}
                    className="bg-red-500 text-white px-3 py-2 rounded hover:bg-yellow-500 transition-colors"
                  >
                    Cancelar
                  </button>
                </div>
              ) : (
                <div className="flex justify-between w-full">
                  <span>{tarefa.texto}</span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => editarTarefa(tarefa.id, tarefa.texto)}
                      className="bg-yellow-400 text-white px-2 py-1 rounded hover:bg-yellow-500 transition-colors"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => deletarTarefa(tarefa.id)}
                      className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition-colors"
                    >
                      Deletar
                    </button>
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
