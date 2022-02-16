document.addEventListener('alpine:init', () => {
    Alpine.data('todoapp', () => ({
        todos: JSON.parse(localStorage.getItem('todo-store') || '[]'),
        filter: 'all',
        newTodo: '',
        editedTodo: null,
        get active(){
            return this.todos.filter(todo => ! todo.completed )
        },
        get completedTodo(){
            return this.todos.filter(todo => todo.completed )
        },
        get filteredTodos() {
            return {
                all: this.todos,
                active: this.active,
                completed: this.completedTodo
            }[this.filter]
        },
        get allCompleted() {
            return this.todos.length === this.completedTodo.length
        },
        save() {
            localStorage.setItem('todo-store', JSON.stringify(this.todos))
        },
        addTodo(){
            if (! this.newTodo) {
                return
            }
            this.todos.push({
                id: Date.now(),
                body: this.newTodo,
                completed: false
            })
            this.newTodo = ' '
        },
        editTodo(todo) {
            todo.cachedBody = todo.body
            this.editedTodo = todo
        },
        cancelEdit(todo) {
            todo.body = todo.cachedBody
            this.editedTodo = null
            delete todo.cachedBody
        },
        editCompleted(todo) {
            if (todo.body.trim() === '') {
                return this.removeTodo(todo)
            }
            this.editedTodo = null
        },
        removeTodo(todo){
            let position = this.todos.indexOf(todo)
            this.todos.splice(position, 1)
        },
        toggleAllTodos() {
            let allCompleted = this.allCompleted
            this.todos.forEach(todo => todo.completed = ! allCompleted)
        }
    }));
})