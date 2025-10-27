import app from "./app.js";

app.get("/", (req, res) => {
    const htmlResponse = '<html><head><title>Backend</title></head><body>API LEVANTADA</body></html>';
    res.send(htmlResponse);
})

// Solo iniciar el servidor en desarrollo local, no en Vercel
if (process.env.NODE_ENV !== 'production') {
    const PORT = process.env.PORT || 4001;
    app.listen(PORT, () => {
        console.log(`Servidor iniciado en: http://localhost:${PORT}`);
    });
}

// Exporta la app para Vercel
export default app;