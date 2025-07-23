import { useState } from "react";
// Importa o hook useState do React para criar estados dentro do componente funcional.

export default function App() {
  // Estado que guarda a lista de tarefas (cada tarefa é um objeto com id e texto)
  const [tarefas, setTarefas] = useState([]);

  // Estado que guarda o valor do input para criar uma nova tarefa
  const [novaTarefa, setNovaTarefa] = useState("");

  // Estado que guarda o id da tarefa que está sendo editada (null se nenhuma)
  const [editandoId, setEditandoId] = useState(null);

  // Estado que guarda o texto que está sendo editado na tarefa selecionada
  const [textoEditado, setTextoEditado] = useState("");

  // Função para adicionar uma nova tarefa na lista
  function adicionarTarefa(event) {
    event.preventDefault(); // previne o comportamento padrão do form que recarrega a página

    if (!novaTarefa.trim()) return;
    // Se o texto estiver vazio ou só espaços, não adiciona a tarefa
    // Cria um objeto nova tarefa com id único baseado no timestamp atual
    const nova = {
      id: Date.now(),
      texto: novaTarefa,
    };
    // Atualiza o estado tarefas adicionando a nova tarefa no final da lista
    setTarefas([...tarefas, nova]);
    // Limpa o campo input para a próxima tarefa
    setNovaTarefa("");
  }
  // Função para deletar uma tarefa pelo seu id
  function deletarTarefa(id) {
    // Filtra todas as tarefas menos a que tem o id passado
    const filtradas = tarefas.filter((tarefa) => tarefa.id !== id);
    // Atualiza o estado tarefas com a lista filtrada
    setTarefas(filtradas);
  }
  // Função para iniciar o modo de edição de uma tarefa
  function editarTarefa(id, textoAtual) {
    // Define o id da tarefa que está sendo editada
    setEditandoId(id);
    // Define o texto atual da tarefa para o input de edição
    setTextoEditado(textoAtual);
  }
  // Função para salvar a edição da tarefa
  function salvarEdicao(id) {
    // Mapeia as tarefas substituindo a tarefa com id igual pelo texto editado
    const atualizadas = tarefas.map((tarefa) =>
      tarefa.id === id ? { ...tarefa, texto: textoEditado } : tarefa
    );
    // Atualiza o estado tarefas com as tarefas atualizadas
    setTarefas(atualizadas);
    // Sai do modo de edição
    setEditandoId(null);
    // Limpa o textoEditado para a próxima edição
    setTextoEditado("");
  }
  return (
    // Container principal com classes Tailwind para layout e estilização
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        {/* Título do app */}
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-4">
          Meu CRUD em React
        </h1>
        {/* Formulário para adicionar nova tarefa */}
        <form onSubmit={adicionarTarefa} className="flex gap-2 mb-4">
          {/* Input controlado para nova tarefa */}
          <input
            type="text"
            value={novaTarefa}
            onChange={(e) => setNovaTarefa(e.target.value)} // atualiza estado novaTarefa conforme usuário digita
            placeholder="Digite uma tarefa"
            className="flex-1 border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {/* Botão para adicionar a tarefa */}
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
          >
            Adicionar
          </button>
        </form>

        {/* Lista de tarefas */}
        <ul className="space-y-2 list-none">
          {/* Percorre a lista tarefas para renderizar cada item */}
          {tarefas.map((tarefa) => (
            <li
              key={tarefa.id} // React usa a key para identificar itens da lista
              className="flex justify-between items-center bg-gray-100 p-2 rounded"
            >
              {/* Se o id da tarefa for igual ao que está em edição, mostra o input de edição */}
              {editandoId === tarefa.id ? (
                <>
                  {/* Input controlado para editar o texto da tarefa */}
                  <input
                    type="text"
                    value={textoEditado}
                    onChange={(e) => setTextoEditado(e.target.value)}
                  />
                  {/* Botão para salvar a edição */}
                  <button
                    onClick={() => salvarEdicao(tarefa.id)}
                    className="bg-orange-500 text-white px-3 py-2 rounded hover:bg-yellow-500 transition-colors"
                  >
                    Salvar
                  </button>
                  {/* Botão para cancelar a edição, volta ao estado normal */}
                  <button
                    onClick={() => setEditandoId(null)}
                    className="bg-red-500 text-white px-3 py-2 rounded hover:bg-yellow-500 transition-colors"
                  >
                    Cancelar
                  </button>
                </>
              ) : (
                <>
                  {/* Se não estiver editando, mostra o texto da tarefa */}
                  <span>{tarefa.texto}</span>

                  {/* Botões de ação para editar e deletar */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => editarTarefa(tarefa.id, tarefa.texto)} // ativa modo edição
                      className="bg-yellow-400 text-white px-2 py-1 rounded hover:bg-yellow-500 transition-colors"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => deletarTarefa(tarefa.id)} // deleta a tarefa
                      className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition-colors"
                    >
                      Deletar
                    </button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
