export default function Header({ titulo, subtitulo }) {
  return (
    <header className="header">
      <div>
        <h1>{titulo}</h1>
        <p>{subtitulo}</p>
      </div>

      <div className="header-badge">
        ERP & Análises
      </div>
    </header>
  );
}