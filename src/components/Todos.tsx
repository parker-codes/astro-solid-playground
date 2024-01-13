import { createSignal, Show, type JSX } from "solid-js";
// @ts-expect-error No typings
import Sortable from "solid-sortablejs";
import { createLocalStorageSignal } from "../hooks";

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}
function createTodo(title: string): Todo {
  return {
    id: Date.now(),
    title,
    completed: false,
  };
}

export default function Todos() {
  const [title, setTitle] = createSignal<string>("");
  const [todos, setTodos] = createLocalStorageSignal<Todo[]>("todos", []);

  let inputRef: HTMLInputElement | undefined;

  function addItem(e: SubmitEvent) {
    e.preventDefault();
    const newTodo = createTodo(title());
    setTodos((todos) => [...todos, newTodo]);
    setTitle("");
    inputRef?.focus();
  }
  function removeItem(id: number) {
    setTodos((todos) => todos.filter((todo) => todo.id !== id));
  }
  function toggleCompleted(id: number) {
    setTodos((todos) =>
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }

  return (
    <>
      <form onSubmit={addItem} class="flex gap-2">
        <input
          ref={inputRef}
          value={title()}
          onInput={(e) => setTitle(e.currentTarget.value)}
          class="flex-auto px-4 py-2 min-w-[20rem] rounded bg-slate-700 text-white"
        />
        <button type="submit" class="px-3 py-2 rounded bg-blue-700 text-white">
          Add
        </button>
      </form>

      <Sortable
        items={todos()}
        setItems={setTodos}
        idField="id"
        class="mt-6 flex flex-col gap-2"
      >
        {(todo: Todo) => (
          <div class="flex justify-between gap-10 transition-opacity">
            <span class={todo.completed ? "opacity-70 line-through" : ""}>
              {todo.title}
            </span>

            <div class="flex align-items gap-2">
              <button
                type="button"
                onClick={() => removeItem(todo.id)}
                class="px-2 rounded-full bg-transparent hover:bg-red-900 text-red-400 aspect-square transition-colors duration-150"
                aria-label="Delete item"
              >
                <TrashIcon />
              </button>

              <button
                type="button"
                onClick={() => toggleCompleted(todo.id)}
                class={`px-2 rounded-full bg-transparent ${
                  todo.completed
                    ? "hover:bg-gray-900 text-gray-400"
                    : "hover:bg-green-900 text-green-400"
                } aspect-square transition-colors duration-150`}
                aria-label={
                  todo.completed ? "Mark as not completed" : "Mark as completed"
                }
              >
                <If
                  cond={todo.completed}
                  then={<CheckIcon />}
                  else={<DashIcon />}
                />
              </button>
            </div>
          </div>
        )}
      </Sortable>
    </>
  );
}

function TrashIcon() {
  return (
    <>
      {/* biome-ignore lint/a11y/noSvgWithoutTitle: explain on button */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="w-5 h-5"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
        />
      </svg>
    </>
  );
}

function DashIcon() {
  return (
    <>
      {/* biome-ignore lint/a11y/noSvgWithoutTitle: explain on button */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="w-5 h-5"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M4.5 12.75l6 6 9-13.5"
        />
      </svg>
    </>
  );
}

function CheckIcon() {
  return (
    <>
      {/* biome-ignore lint/a11y/noSvgWithoutTitle: explain on button */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="w-5 h-5"
      >
        <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 12h-15" />
      </svg>
    </>
  );
}

function If(props: { cond: boolean; then: JSX.Element; else?: JSX.Element }) {
  return (
    <Show
      when={props.cond}
      children={props.then}
      fallback={props.else ?? null}
    />
  );
}
