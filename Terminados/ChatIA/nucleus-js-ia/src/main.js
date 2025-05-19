import './style.css'

const form = document.querySelector('#form')

form.addEventListener('submit', (e) => {
    e.preventDefault()

    const prompt = document.querySelector('#prompt').value

    if (prompt.trim() === '') {
        alert('La consulta no puede ir vacia')
        return
    }

    console.log(prompt)

})