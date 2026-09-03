import { useState, useEffect } from 'react'
import { Trash, CirclePlus, ListTodo, Pencil } from 'lucide-react'

const Tarefas = () => {

    //HOOK-useState - manipula o estado da variavel e guarda os dados
    const [tarefas, setTarefas] = useState(() => {
        const salvarTarefas = localStorage.getItem("item-tarefa");
        return salvarTarefas ? JSON.parse(salvarTarefas) : [];
    });
    //useState para manipular os dados que passar nos campos
    const [campo, setCampo] = useState("");

    //HOOK-useEffect- realiza um efeito colateral, no exemplo vai 
    //carregar automaticamente as tarefas cadastradas.

    useEffect(() => {
        localStorage.setItem("item-tarefa", JSON.stringify(tarefas));
    }, [tarefas])

    //função adicionar tarefa

    const AdicionarTarefa = (e) => {
        e.preventDefault();
        if (!campo.trim()) return;

        const novaTarefa = {
            id: Date.now(),
            text: campo,
        };

        setTarefas([...tarefas, novaTarefa]);
        setCampo();
    };

    const RemoverTarefa = (id) => {
        const apagarTarefa = tarefas.filter((tarefa) => tarefa.id !== id);
        setTarefas(apagarTarefa)
    };

    return (
        <>
            <div className="todo-container">
                <div className='todo-header flex gap-2 items-center mb-4 bg-primary p-4 text-primary-foreground rounded-lg'>
                    <ListTodo size={32} />
                    <h2 className='font-bold'>Minha Lista de Tarefas</h2>
                </div>
                <form onSubmit={AdicionarTarefa} className="todo-form mb-4 flex items-center gap-2">
                   
                    <input
                        type="text"
                        value={campo}
                        onChange={(e) => setCampo(e.target.value)}
                        placeholder="Digite uma nova tarefa..."
                        className="todo-input p-2 px-4 border rounded-full w-full bg-input text-primary-foreground"
                    />
                    <button type="submit" className="flex gap-2 items-center btn-adicionar bg-accent text-primary-foreground p-2 rounded-full transition-all duration-200 hover:bg-accent-foreground hover:text-primary">
                        Adicionar
                        <CirclePlus size={18} />
                    </button>
                </form>

                <ul className="flex flex-col gap-4 todo-lista bg-secondary p-4 rounded-md">
                    {tarefas.map((tarefa) => (
                        <li key={tarefa.id} className="todo-item flex justify-between items-center bg-background p-2 rounded-md border-2 border-dashed border-secondary">
                            <span>{tarefa.text}</span>
                            {/* arrow function (função seta) que encapsula a execução de outra função. 
            Ela garante que removerTarefa só seja executada quando o evento acontecer (como um clique de botão), 
            e não assim que a página carregar.
            */}
                            <button className='flex gap-2 items-center bg-accent text-primary-foreground p-2 rounded-full transition-all duration-200 hover:bg-accent-foreground hover:text-primary' onClick={() => RemoverTarefa(tarefa.id)}

                            >
                                Excluir
                                <Trash className={'color-destructive'} size={18} />
                            </button>
                        </li>
                    ))}

                    {tarefas.length === 0 && <p className="mensagem">Nenhuma tarefa salva ):</p>}
                </ul>


            </div>

        </>
    )
}

export default Tarefas
