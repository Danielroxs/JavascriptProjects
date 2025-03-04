document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
        console.log('Ejecutar la funcion para reproducir el video')
    } else {
        console.log('Ejecutar la funcion para pausar el video')
    }
})