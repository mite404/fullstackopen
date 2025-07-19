export function Search({ searchTerm, onChange }) {

  return (
      <div>
        Search:
        <input  value={searchTerm} onChange={onChange} />
        <h2>Names</h2>
      </div>
    )
}

