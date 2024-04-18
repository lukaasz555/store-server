const PORT = Number(process.env.PORT) || 4000;

export default (): { port: number } => ({
  port: PORT,
});
